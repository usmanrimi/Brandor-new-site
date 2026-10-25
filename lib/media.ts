/**
 * Helpers for media stored in the Brandor media library (`/api/media/:id`).
 *
 * Uploaded originals are often multi-megabyte camera files. The media route
 * can return a resized WebP when a `w` (width) parameter is supplied, so
 * thumbnails, partner logos and covers never download the full original.
 * Static `/assets/...` files and external URLs are returned unchanged.
 */

export const MEDIA_WIDTHS = [320, 480, 640, 800, 1200, 1600] as const

export function isLibraryMedia(url?: string | null): url is string {
  return !!url && url.startsWith('/api/media/') && !url.includes('?')
}

/** Resized URL for library media; returns other URLs untouched. */
export function mediaSrc(url: string | null | undefined, width: number, fallback = '/assets/why-image.jpg'): string {
  const src = url || fallback
  if (!isLibraryMedia(src)) return src
  return `${src}?w=${width}`
}

/** `srcSet` for library media, or undefined for static/external images. */
export function mediaSrcSet(url: string | null | undefined, widths: number[] = [480, 800, 1200]): string | undefined {
  if (!isLibraryMedia(url)) return undefined
  return widths.map(w => `${url}?w=${w} ${w}w`).join(', ')
}

/** Parse the project `images` field (JSON array, comma-separated list or single URL). */
export function parseImages(imagesStr?: string | null): string[] {
  if (!imagesStr) return []
  try {
    if (imagesStr.trim().startsWith('[')) {
      const parsed = JSON.parse(imagesStr)
      if (Array.isArray(parsed)) return parsed.filter((s): s is string => typeof s === 'string' && s.length > 0)
    }
  } catch {
    // fall through to plain-string handling
  }
  if (imagesStr.includes(',')) return imagesStr.split(',').map(s => s.trim()).filter(Boolean)
  return [imagesStr]
}

/** Extract a YouTube video id from watch, youtu.be, shorts, live or embed URLs. */
export function getYouTubeId(url?: string | null): string | null {
  if (!url) return null
  try {
    const u = new URL(url)
    const host = u.hostname.replace(/^www\.|^m\./, '')
    if (host === 'youtu.be') return u.pathname.slice(1).split('/')[0] || null
    if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
      if (u.searchParams.get('v')) return u.searchParams.get('v')
      const m = u.pathname.match(/^\/(embed|shorts|live|v)\/([\w-]{6,})/)
      if (m) return m[2]
    }
  } catch {
    return null
  }
  return null
}
