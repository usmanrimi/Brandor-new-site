import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { jwtVerify } from 'jose'

// Node runtime is required for Buffer and sharp.
export const runtime = 'nodejs'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'brandor-super-secret-key-2026')

// Media assets are immutable per id (every upload creates a new record), so
// image responses can be cached aggressively by browsers and the Vercel CDN.
const IMMUTABLE_CACHE = 'public, max-age=31536000, s-maxage=31536000, immutable'
// Reports can be unpublished later, so keep their public cache short.
const REPORT_CACHE = 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400'

const ALLOWED_WIDTHS = [160, 320, 480, 640, 800, 1200, 1600, 1920]

// Small in-memory cache so a warm serverless instance does not re-query the
// database and re-decode multi-megabyte base64 strings for every request.
type CachedAsset = { buffer: Buffer; mimeType: string; name: string; type: string }
const assetCache = new Map<string, CachedAsset>()
const variantCache = new Map<string, Buffer>()
const MAX_CACHE_ENTRIES = 40

function remember<T>(map: Map<string, T>, key: string, value: T) {
  if (map.size >= MAX_CACHE_ENTRIES) {
    const oldest = map.keys().next().value
    if (oldest !== undefined) map.delete(oldest)
  }
  map.set(key, value)
}

function htmlNotice(title: string, message: string, status: number) {
  return new NextResponse(
    `<!DOCTYPE html>
    <html lang="en">
    <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} - Brandor</title>
    <style>body{font-family:system-ui,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#FFEBD0;color:#173b61;text-align:center;padding:20px;box-sizing:border-box}
    .card{background:#fff;padding:40px;border-radius:16px;box-shadow:0 10px 30px rgba(23,59,97,0.1);max-width:480px;}
    h1{color:#173b61;margin:0 0 12px;}p{color:#475569;margin:0 0 24px;line-height:1.6}
    a{display:inline-block;background:#173b61;color:#FFEBD0;padding:10px 24px;border-radius:999px;text-decoration:none;font-weight:bold;}</style>
    </head>
    <body><div class="card"><h1>${title}</h1><p>${message}</p><a href="/projects">Back to Projects</a></div></body></html>`,
    { status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } }
  )
}

async function loadAsset(id: string): Promise<CachedAsset | null> {
  const cached = assetCache.get(id)
  if (cached) return cached

  const asset = await prisma.mediaAsset.findUnique({
    where: { id },
    select: { name: true, type: true, data: true },
  })
  if (!asset || !asset.data) return null

  // Fast parsing without regex backtracking (regex on multi-MB strings hangs).
  let mimeType = asset.type || 'application/octet-stream'
  let base64Data = asset.data
  if (asset.data.startsWith('data:')) {
    const commaIdx = asset.data.indexOf(',')
    if (commaIdx !== -1) {
      const meta = asset.data.substring(5, commaIdx)
      const semicolonIdx = meta.indexOf(';')
      if (semicolonIdx !== -1) mimeType = meta.substring(0, semicolonIdx)
      else if (meta) mimeType = meta
      base64Data = asset.data.substring(commaIdx + 1)
    }
  }

  const entry: CachedAsset = {
    buffer: Buffer.from(base64Data, 'base64'),
    mimeType,
    name: asset.name || 'file',
    type: asset.type || mimeType,
  }
  remember(assetCache, id, entry)
  return entry
}

async function isAdminRequest(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value
  if (!token) return false
  try {
    await jwtVerify(token, JWT_SECRET)
    return true
  } catch {
    return false
  }
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const asset = await loadAsset(id)

    if (!asset) {
      return htmlNotice('Document Unavailable', 'This file could not be found or has not been uploaded to the media library yet.', 404)
    }

    const isPdf = asset.mimeType === 'application/pdf' || asset.type === 'application/pdf' || asset.name.toLowerCase().endsWith('.pdf')
    const safeName = asset.name.replace(/[^a-zA-Z0-9._-]/g, '_') || 'document'
    const wantsDownload = request.nextUrl.searchParams.get('download') === '1'

    // ---------- PDF reports: respect the project's published state ----------
    if (isPdf) {
      const associatedProject = await prisma.project.findFirst({
        where: { OR: [{ pdfUrl: `/api/media/${id}` }, { pdfUrl: { contains: id } }] },
        select: { isPdfPublished: true },
      })
      const isUnpublished = !!associatedProject && associatedProject.isPdfPublished === false

      if (isUnpublished && !(await isAdminRequest(request))) {
        return htmlNotice('Report Unpublished', 'This project report is currently in draft mode and not available to the public.', 403)
      }

      return new NextResponse(new Uint8Array(asset.buffer), {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `${wantsDownload ? 'attachment' : 'inline'}; filename="${safeName}"`,
          'Content-Length': asset.buffer.length.toString(),
          'Cache-Control': isUnpublished ? 'private, no-store' : REPORT_CACHE,
          'X-Content-Type-Options': 'nosniff',
        },
      })
    }

    // ---------- Images: optional resize to WebP via ?w= ----------
    const requestedWidth = Number(request.nextUrl.searchParams.get('w'))
    const isResizableImage = asset.mimeType.startsWith('image/') && !asset.mimeType.includes('svg') && !asset.mimeType.includes('gif')

    if (requestedWidth && isResizableImage) {
      // Snap to an allowed width so the CDN cache is not fragmented.
      const width = ALLOWED_WIDTHS.find(w => w >= requestedWidth) ?? ALLOWED_WIDTHS[ALLOWED_WIDTHS.length - 1]
      const variantKey = `${id}:${width}`
      let variant = variantCache.get(variantKey)
      if (!variant) {
        try {
          const sharp = (await import('sharp')).default
          variant = await sharp(asset.buffer, { failOn: 'none' })
            .rotate()
            .resize({ width, withoutEnlargement: true })
            .webp({ quality: 78, effort: 4 })
            .toBuffer()
          remember(variantCache, variantKey, variant)
        } catch (resizeError) {
          console.error('Image resize failed, serving original:', resizeError)
          variant = undefined
        }
      }
      if (variant) {
        return new NextResponse(new Uint8Array(variant), {
          status: 200,
          headers: {
            'Content-Type': 'image/webp',
            'Content-Length': variant.length.toString(),
            'Cache-Control': IMMUTABLE_CACHE,
            'X-Content-Type-Options': 'nosniff',
          },
        })
      }
    }

    return new NextResponse(new Uint8Array(asset.buffer), {
      status: 200,
      headers: {
        'Content-Type': asset.mimeType,
        'Content-Disposition': `${wantsDownload ? 'attachment' : 'inline'}; filename="${safeName}"`,
        'Content-Length': asset.buffer.length.toString(),
        'Cache-Control': IMMUTABLE_CACHE,
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch (error) {
    console.error('Error fetching media:', error)
    return new NextResponse('Error fetching media', { status: 500, headers: { 'Cache-Control': 'no-store' } })
  }
}
