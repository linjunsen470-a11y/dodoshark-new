'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import { urlFor } from '@/app/lib/sanity'
import Icon from '@/components/ui/Icon'
import { getSharedBackgroundTheme } from './backgroundTheme'
import SectionHeader from './SectionHeader'

type GalleryImage = {
  alt?: string
  asset?: {
    _ref?: string
    _id?: string
    url?: string
    metadata?: {
      lqip?: string
      dimensions?: {
        width?: number
        height?: number
      }
    }
  }
}

function hasImageIdentity(image?: GalleryImage) {
  const ref = image?.asset?._ref?.trim()
  const id = image?.asset?._id?.trim()
  return Boolean(ref || id)
}

function resolveImageSrc({
  image,
  width,
}: {
  image?: GalleryImage
  width: number
}) {
  if (!image) return undefined

  const directUrl = image?.asset?.url?.trim()
  if (directUrl) return directUrl

  if (!hasImageIdentity(image)) return undefined

  try {
    return urlFor(image).width(width).fit('max').url()
  } catch {
    return undefined
  }
}

type GalleryItem = {
  _key?: string
  type?: 'image' | 'videoUrl'
  image?: GalleryImage
  videoUrl?: string
  videoThumbnail?: GalleryImage
  caption?: string
}

type ActiveVideo = {
  src: string
  title: string
}

export type MediaGalleryBlockData = {
  _type: 'mediaGalleryBlock'
  _key?: string
  title?: string
  backgroundVariant?: 'default' | 'muted' | 'dark'
  layout?: 'grid' | 'carousel' | 'masonry'
  items?: GalleryItem[]
}

function resolveVideoEmbedSrc(url?: string) {
  const raw = url?.trim()
  if (!raw) return undefined

  let parsed: URL
  try {
    parsed = new URL(raw)
  } catch {
    return undefined
  }

  if (!['https:', 'http:'].includes(parsed.protocol)) return undefined

  const host = parsed.hostname.toLowerCase()
  const pathname = parsed.pathname

  const withParam = (key: string, value: string) => {
    parsed.searchParams.set(key, value)
    return parsed.toString()
  }

  const extractYouTubeId = () => {
    if (host === 'youtu.be') {
      const id = pathname.split('/').filter(Boolean)[0]
      return id || undefined
    }

    if (host.includes('youtube.com') || host.includes('youtube-nocookie.com')) {
      if (pathname === '/watch') return parsed.searchParams.get('v') || undefined

      const segments = pathname.split('/').filter(Boolean)
      if (!segments.length) return undefined

      if (segments[0] === 'embed' && segments[1]) return segments[1]
      if ((segments[0] === 'shorts' || segments[0] === 'live') && segments[1]) return segments[1]
    }

    return undefined
  }

  const youtubeId = extractYouTubeId()
  if (youtubeId) {
    return `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`
  }

  if (host.includes('vimeo.com')) {
    const segments = pathname.split('/').filter(Boolean)
    const videoId = segments.reverse().find((segment) => /^\d+$/.test(segment))
    if (videoId) return `https://player.vimeo.com/video/${videoId}?autoplay=1`
  }

  if (host.includes('bilibili.com')) {
    if (host.includes('player.bilibili.com')) return withParam('autoplay', '1')
    const match = pathname.match(/\/video\/([a-zA-Z0-9]+)/)
    if (match?.[1]) {
      return `https://player.bilibili.com/player.html?bvid=${match[1]}&autoplay=1`
    }
  }

  if (pathname.includes('/embed/')) return withParam('autoplay', '1')

  return withParam('autoplay', '1')
}

function ImageTile({
  image,
  caption,
  isDarkBackground = false,
}: {
  image?: GalleryImage
  caption?: string
  isDarkBackground?: boolean
}) {
  const src = resolveImageSrc({ image, width: 1200 })

  if (!src || !image) {
    return (
      <div className="rounded-lg bg-slate-100 border border-slate-200 p-10 text-slate-400 text-sm text-center">
        Image unavailable
      </div>
    )
  }

  const width = image.asset?.metadata?.dimensions?.width ?? 1200
  const height = image.asset?.metadata?.dimensions?.height ?? 900
  const hasLqip = Boolean(image.asset?.metadata?.lqip)

  return (
    <figure className="group">
      <div className="aspect-video bg-slate-800 rounded-lg relative overflow-hidden shadow-xl">
        <Image
          src={src}
          alt={image.alt || caption || 'Gallery image'}
          width={width}
          height={height}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          placeholder={hasLqip ? 'blur' : 'empty'}
          blurDataURL={image.asset?.metadata?.lqip}
        />
      </div>
      {caption && (
        <figcaption
          className={`mt-4 text-center text-sm font-bold uppercase tracking-wide ${isDarkBackground ? 'text-slate-200' : 'text-slate-700'}`}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

function VideoTile({
  url,
  thumbnail,
  caption,
  isDarkBackground = false,
  onOpenVideo,
}: {
  url?: string
  thumbnail?: GalleryImage
  caption?: string
  isDarkBackground?: boolean
  onOpenVideo: (url?: string, caption?: string) => void
}) {
  if (!url) return null

  const width = thumbnail?.asset?.metadata?.dimensions?.width ?? 1280
  const height = thumbnail?.asset?.metadata?.dimensions?.height ?? 720
  const thumbnailSrc = resolveImageSrc({ image: thumbnail, width: 1200 })

  return (
    <button type="button" onClick={() => onOpenVideo(url, caption)} className="group block w-full text-left">
      <div className="aspect-video bg-slate-800 rounded-lg relative overflow-hidden shadow-xl">
        {thumbnailSrc ? (
          <Image
            src={thumbnailSrc}
            alt={thumbnail?.alt || caption || 'Video thumbnail'}
            width={width}
            height={height}
            className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-800 text-slate-200">
            <Icon icon="film" className="h-10 w-10" />
          </div>
        )}

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-md flex items-center justify-center group-hover:bg-orange-500 group-hover:scale-110 transition-all text-white">
            <Icon icon="play" className="ml-1 h-6 w-6" />
          </div>
        </div>
      </div>
      {caption && (
        <h5
          className={`mt-4 text-center font-bold font-display uppercase tracking-widest text-sm ${isDarkBackground ? 'text-slate-100' : 'text-slate-900'}`}
        >
          {caption}
        </h5>
      )}
    </button>
  )
}

function GalleryTile({
  item,
  isDarkBackground = false,
  onOpenVideo,
}: {
  item: GalleryItem
  isDarkBackground?: boolean
  onOpenVideo: (url?: string, caption?: string) => void
}) {
  if (item.type === 'videoUrl') {
    return (
      <VideoTile
        url={item.videoUrl}
        thumbnail={item.videoThumbnail}
        caption={item.caption}
        isDarkBackground={isDarkBackground}
        onOpenVideo={onOpenVideo}
      />
    )
  }

  return <ImageTile image={item.image} caption={item.caption} isDarkBackground={isDarkBackground} />
}

export default function MediaGalleryBlock({ block }: { block: MediaGalleryBlockData }) {
  const variant = block.backgroundVariant ?? 'default'
  const theme = getSharedBackgroundTheme(variant)
  const isDark = variant === 'dark'
  const layout = block.layout ?? 'grid'
  const [activeVideo, setActiveVideo] = useState<ActiveVideo | null>(null)
  const items = (block.items ?? []).filter(
    (item) =>
      (item.type === 'videoUrl' && item.videoUrl) ||
      (item.type !== 'videoUrl' &&
        Boolean(resolveImageSrc({ image: item.image, width: 1200 })))
  )

  function openVideo(url?: string, caption?: string) {
    const src = resolveVideoEmbedSrc(url)
    if (!src) return
    setActiveVideo({
      src,
      title: caption?.trim() || 'Video',
    })
  }

  function closeVideo() {
    setActiveVideo(null)
  }

  useEffect(() => {
    if (!activeVideo) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveVideo(null)
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [activeVideo])

  if (!block.title && items.length === 0) return null

  return (
    <>
      <section className={`py-24 ${theme.section}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {block.title && (
            <SectionHeader
              title={block.title}
              isDark={isDark}
              className="mb-12"
              titleClassName={`text-3xl font-display font-black uppercase tracking-tight ${theme.heading}`}
            />
          )}

          {layout === 'grid' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item, index) => (
                <div key={item._key ?? `${item.caption}-${index}`}>
                  <GalleryTile item={item} isDarkBackground={isDark} onOpenVideo={openVideo} />
                </div>
              ))}
            </div>
          )}

          {layout === 'carousel' && (
            <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2">
              {items.map((item, index) => (
                <div
                  key={item._key ?? `${item.caption}-${index}`}
                  className="min-w-[280px] md:min-w-[420px] max-w-[500px] snap-start"
                >
                  <GalleryTile item={item} isDarkBackground={isDark} onOpenVideo={openVideo} />
                </div>
              ))}
            </div>
          )}

          {layout === 'masonry' && (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
              {items.map((item, index) => (
                <div
                  key={item._key ?? `${item.caption}-${index}`}
                  className="mb-6 break-inside-avoid"
                >
                  <GalleryTile item={item} isDarkBackground={isDark} onOpenVideo={openVideo} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {activeVideo && (
        <div
          className="fixed inset-0 z-[120] bg-black/80 p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={activeVideo.title}
          onClick={closeVideo}
        >
          <div className="mx-auto flex h-full w-full max-w-6xl items-center justify-center">
            <div className="w-full" onClick={(event) => event.stopPropagation()}>
              <div className="mb-3 flex items-center justify-between text-white">
                <h3 className="text-sm md:text-base font-semibold tracking-wide">{activeVideo.title}</h3>
                <button
                  type="button"
                  onClick={closeVideo}
                  className="rounded-md border border-white/30 px-4 py-1.5 text-xs md:text-sm hover:bg-white/15 transition-colors"
                >
                  Close
                </button>
              </div>
              <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black shadow-2xl">
                <iframe
                  src={activeVideo.src}
                  title={activeVideo.title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
