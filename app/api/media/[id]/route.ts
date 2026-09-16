import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { jwtVerify } from 'jose'

const prisma = new PrismaClient()
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'brandor-super-secret-key-2026')

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const asset = await prisma.mediaAsset.findUnique({
      where: { id }
    })

    if (!asset || !asset.data) {
      return new NextResponse(
        `<!DOCTYPE html>
        <html lang="en">
        <head><meta charset="utf-8"><title>Report Unavailable - Brandor</title>
        <style>body{font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;background:#FFEBD0;color:#173b61;text-align:center;}
        .card{background:#fff;padding:40px;border-radius:16px;box-shadow:0 10px 30px rgba(23,59,97,0.1);max-width:480px;}
        h1{color:#173b61;margin-bottom:12px;}p{color:#64748b;margin-bottom:24px;}
        a{display:inline-block;background:#FD8916;color:#fff;padding:10px 24px;border-radius:999px;text-decoration:none;font-weight:bold;}</style>
        </head>
        <body><div class="card">
        <h1>Document Unavailable</h1>
        <p>This report file could not be found or has not been uploaded to the media library yet.</p>
        <a href="/projects">Back to Projects</a>
        </div></body></html>`,
        { status: 404, headers: { 'Content-Type': 'text/html' } }
      )
    }

    // Check if this is an unpublished project report
    if (asset.type === 'application/pdf' || asset.name?.toLowerCase().endsWith('.pdf')) {
      const associatedProject = await prisma.project.findFirst({
        where: {
          OR: [
            { pdfUrl: `/api/media/${id}` },
            { pdfUrl: { contains: id } }
          ]
        }
      })

      if (associatedProject && associatedProject.isPdfPublished === false) {
        // Verify admin token
        const token = request.cookies.get('admin_token')?.value
        let isAdmin = false
        if (token) {
          try {
            await jwtVerify(token, JWT_SECRET)
            isAdmin = true
          } catch {
            isAdmin = false
          }
        }

        if (!isAdmin) {
          return new NextResponse(
            `<!DOCTYPE html>
            <html lang="en">
            <head><meta charset="utf-8"><title>Report Unpublished - Brandor</title>
            <style>body{font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;background:#FFEBD0;color:#173b61;text-align:center;}
            .card{background:#fff;padding:40px;border-radius:16px;box-shadow:0 10px 30px rgba(23,59,97,0.1);max-width:480px;}
            h1{color:#173b61;margin-bottom:12px;}p{color:#64748b;margin-bottom:24px;}
            a{display:inline-block;background:#173b61;color:#FFEBD0;padding:10px 24px;border-radius:999px;text-decoration:none;font-weight:bold;}</style>
            </head>
            <body><div class="card">
            <h1>Report Unpublished</h1>
            <p>This project report is currently in draft mode and not available to the public.</p>
            <a href="/projects">Back to Projects</a>
            </div></body></html>`,
            { status: 403, headers: { 'Content-Type': 'text/html' } }
          )
        }
      }
    }

    // Fast parsing without regex backtracking
    let mimeType = asset.type || 'application/octet-stream'
    let base64Data = asset.data

    if (asset.data.startsWith('data:')) {
      const commaIdx = asset.data.indexOf(',')
      if (commaIdx !== -1) {
        const meta = asset.data.substring(5, commaIdx)
        const semicolonIdx = meta.indexOf(';')
        if (semicolonIdx !== -1) {
          mimeType = meta.substring(0, semicolonIdx)
        }
        base64Data = asset.data.substring(commaIdx + 1)
      }
    }

    const buffer = Buffer.from(base64Data, 'base64')
    const safeName = (asset.name || 'document.pdf').replace(/[^a-zA-Z0-9._-]/g, '_')

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': mimeType,
        'Content-Disposition': `inline; filename="${safeName}"`,
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
        'Content-Length': buffer.length.toString(),
      }
    })
  } catch (error) {
    console.error('Error fetching media:', error)
    return new NextResponse("Error fetching media", { status: 500 })
  }
}
