export type VideoOrientation = 'landscape' | 'portrait'

type YouTubePosterQuality =
  | 'default'
  | 'hqdefault'
  | 'mqdefault'
  | 'sddefault'
  | 'maxresdefault'

function parseHttpUrl(raw?: string) {
  const value = raw?.trim()
  if (!value) return undefined

  try {
    const parsed = new URL(value)
    if (!['http:', 'https:'].includes(parsed.protocol)) return undefined
    return parsed
  } catch {
    return undefined
  }
}

function isYouTubeHost(hostname: string) {
  return hostname.includes('youtube.com') || hostname.includes('youtube-nocookie.com')
}

export function extractYouTubeVideoId(raw?: string) {
  const parsed = parseHttpUrl(raw)
  if (!parsed) return undefined

  const host = parsed.hostname.toLowerCase()
  const pathname = parsed.pathname

  if (host === 'youtu.be') {
    const id = pathname.split('/').filter(Boolean)[0]
    return id || undefined
  }

  if (isYouTubeHost(host)) {
    if (pathname === '/watch') return parsed.searchParams.get('v') || undefined

    const segments = pathname.split('/').filter(Boolean)
    if (!segments.length) return undefined

    if (segments[0] === 'embed' && segments[1]) return segments[1]
    if ((segments[0] === 'shorts' || segments[0] === 'live') && segments[1]) return segments[1]
  }

  return undefined
}

export function isYouTubeShortsUrl(raw?: string) {
  const parsed = parseHttpUrl(raw)
  if (!parsed || !isYouTubeHost(parsed.hostname.toLowerCase())) return false

  const segments = parsed.pathname.split('/').filter(Boolean)
  return segments[0] === 'shorts' && Boolean(segments[1])
}

export function getVideoOrientation(raw?: string): VideoOrientation {
  return isYouTubeShortsUrl(raw) ? 'portrait' : 'landscape'
}

export function resolveYouTubeThumbnailUrl(raw?: string, quality: YouTubePosterQuality = 'hqdefault') {
  const videoId = extractYouTubeVideoId(raw)
  if (!videoId) return undefined

  return `https://i.ytimg.com/vi/${videoId}/${quality}.jpg`
}

export function normalizeYouTubeEmbedUrl(raw: string) {
  const videoId = extractYouTubeVideoId(raw)
  if (!videoId) return undefined

  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`
}
