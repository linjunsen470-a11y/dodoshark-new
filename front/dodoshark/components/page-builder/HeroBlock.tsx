'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

import { urlFor } from '@/app/lib/sanity'

type HeroImage = {
  _key?: string
  alt?: string
  asset?: {
    _ref?: string
    _id?: string
    url?: string
  }
}

function hasImageIdentity(image?: HeroImage) {
  const ref = image?.asset?._ref?.trim()
  const id = image?.asset?._id?.trim()
  const url = image?.asset?.url?.trim()
  return Boolean(ref || id || url)
}

function resolveHeroImageSrc(image?: HeroImage) {
  if (!image) return undefined

  if (!hasImageIdentity(image)) return undefined

  try {
    return urlFor(image).width(1920).fit('max').auto('format').quality(75).url()
  } catch {
    return image?.asset?.url?.trim()
  }
}

type HeroCtaButton = {
  _key?: string
  label?: string
  href?: string
  primary?: boolean
}

export type HeroBlockData = {
  _type: 'heroBlock'
  _key?: string
  title?: string
  subtitle?: string
  description?: string
  images?: HeroImage[]
  ctaButtons?: HeroCtaButton[]
  alignment?: 'left' | 'right'
}

function resolveAlignment(value?: string): 'left' | 'right' {
  return value === 'right' ? 'right' : 'left'
}

function isExternalHref(href: string) {
  return /^(https?:|mailto:|tel:)/i.test(href)
}

function CtaButton({ button }: { button: HeroCtaButton }) {
  const label = button.label?.trim()
  const href = button.href?.trim()

  if (!label || !href) return null

  const className = [
    'inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-semibold transition-colors',
    button.primary
      ? 'bg-orange-500 text-black hover:bg-orange-600'
      : 'border border-black/50 text-black hover:bg-black/10',
  ].join(' ')

  if (isExternalHref(href)) {
    return (
      <a
        href={href}
        className={className}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noreferrer' : undefined}
      >
        {label}
      </a>
    )
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  )
}

export default function HeroBlock({ block }: { block: HeroBlockData }) {
  const images = useMemo(
    () => (block.images ?? []).filter((image) => hasImageIdentity(image)),
    [block.images]
  )

  const [activeImageIndex, setActiveImageIndex] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return
    const timer = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [images.length])

  const safeActiveImageIndex = images.length > 0 ? activeImageIndex % images.length : 0
  const image = images[safeActiveImageIndex]
  const imageSrc = resolveHeroImageSrc(image)

  const align = resolveAlignment(block.alignment)
  const contentPositionClass = align === 'right' ? 'justify-end' : 'justify-start'
  const panelAlignClass = align === 'right' ? 'items-end text-right' : 'items-start text-left'
  const indicatorAlignClass = align === 'right' ? 'justify-end' : 'justify-start'

  return (
    <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden">
      <div className="relative min-h-[520px] sm:min-h-[620px] lg:min-h-[700px]">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={image?.alt || block.title || 'Hero image'}
            fill
            sizes="100vw"
            preload={safeActiveImageIndex === 0}
            fetchPriority={safeActiveImageIndex === 0 ? 'high' : 'auto'}
            loading={safeActiveImageIndex === 0 ? 'eager' : 'lazy'}
            quality={safeActiveImageIndex === 0 ? 74 : 68}
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-200 via-slate-100 to-white" />
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-slate-800/60 via-slate-800/35 to-slate-800/10" />

        <div className={`relative z-10 mx-auto flex min-h-[520px] max-w-7xl px-4 py-16 sm:min-h-[620px] sm:px-6 lg:min-h-[700px] lg:px-8 ${contentPositionClass}`}>
          <div className={`flex max-w-xl flex-col ${panelAlignClass}`}>
            {block.title && (
              <h1 className="mb-4 text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                {block.title}
              </h1>
            )}

            {block.subtitle && (
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-black">
                {block.subtitle}
              </p>
            )}

            <div className={`mb-7 flex ${indicatorAlignClass}`}>
              <span className="h-1.5 w-14 bg-[#243b7c]" />
              <span className="h-1.5 w-4 bg-[#e7be4a]" />
            </div>

            {block.description && (
              <p className="whitespace-pre-line text-base leading-relaxed text-black sm:text-lg">
                {block.description}
              </p>
            )}

            {!!block.ctaButtons?.length && (
              <div className={`mt-8 flex flex-wrap gap-3 ${indicatorAlignClass}`}>
                {block.ctaButtons.map((button) => (
                  <CtaButton
                    key={button._key ?? `${button.label}-${button.href}`}
                    button={button}
                  />
                ))}
              </div>
            )}

          </div>
        </div>

        {images.length > 1 && (
          <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
            {images.map((item, index) => (
              <button
                key={item._key ?? index}
                type="button"
                onClick={() => setActiveImageIndex(index)}
                className={`h-2.5 rounded-full transition-all ${index === safeActiveImageIndex ? 'w-7 bg-orange-400' : 'w-2.5 bg-black/35 hover:bg-black/60'}`}
                aria-label={`Switch hero image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
