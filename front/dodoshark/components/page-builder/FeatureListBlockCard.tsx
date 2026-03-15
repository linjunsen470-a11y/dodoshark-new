import Image from 'next/image'

import {urlFor} from '@/app/lib/sanity'
import Icon from '@/components/ui/Icon'

import type {SharedBackgroundTheme} from './backgroundTheme'
import {bodyTextClass, cardTitleClass} from './sectionStyles'

export type FeatureListImage = {
  alt?: string
  asset?: {
    _id?: string
    _ref?: string
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

export type FeatureListItem = {
  _key?: string
  title?: string
  topAccentTitle?: string
  description?: string
  icon?: FeatureListImage
  image?: FeatureListImage
}

export function FeatureListItemAccentTitle({
  title,
  reserveSpace = false,
  className = '',
}: {
  title?: string
  reserveSpace?: boolean
  className?: string
}) {
  const resolvedTitle = title?.trim()

  if (!resolvedTitle && !reserveSpace) return null

  if (!resolvedTitle) {
    return <div aria-hidden className={`min-h-[1.75rem] md:min-h-[2rem] ${className}`.trim()} />
  }

  return (
    <div className={`flex min-h-[1.75rem] items-stretch gap-3 md:min-h-[2rem] ${className}`.trim()}>
      <div className="w-1 shrink-0 self-stretch rounded-full bg-orange-500" />
      <p className="font-display text-lg font-extrabold leading-[1.1] tracking-[-0.02em] text-slate-900 md:text-xl">
        {resolvedTitle}
      </p>
    </div>
  )
}

function hasImageIdentity(image?: FeatureListImage) {
  const ref = image?.asset?._ref?.trim()
  const id = image?.asset?._id?.trim()
  const url = image?.asset?.url?.trim()

  return Boolean(ref || id || url)
}

function resolveImageSrc(
  image?: FeatureListImage,
  options: {width?: number; height?: number; fit?: 'crop' | 'max'} = {},
) {
  if (!image) return undefined

  const directUrl = image.asset?.url?.trim()
  if (directUrl) return directUrl
  if (!hasImageIdentity(image)) return undefined

  try {
    let builder = urlFor(image).width(options.width ?? 1200)

    if (options.height) {
      builder = builder.height(options.height)
    }

    return builder.fit(options.fit ?? 'crop').url()
  } catch {
    return undefined
  }
}

function resolveFeatureMedia(item: FeatureListItem) {
  if (hasImageIdentity(item.image)) {
    return {image: item.image, isIconFallback: false}
  }

  if (hasImageIdentity(item.icon)) {
    return {image: item.icon, isIconFallback: true}
  }

  return {image: item.image ?? item.icon, isIconFallback: false}
}

export function FeatureListStandaloneCard({
  item,
  theme,
  sizes,
  reserveAccentSpace = false,
}: {
  item: FeatureListItem
  theme: SharedBackgroundTheme
  sizes: string
  reserveAccentSpace?: boolean
}) {
  const {image, isIconFallback} = resolveFeatureMedia(item)
  const accentTitle = item.topAccentTitle?.trim()
  const imageSrc = resolveImageSrc(
    image,
    isIconFallback
      ? {width: 960, height: 720, fit: 'max'}
      : {width: 1200, height: 960, fit: 'crop'},
  )
  const blurDataURL = image?.asset?.metadata?.lqip
  const hasLqip = Boolean(blurDataURL)
  const mediaBackgroundClass = theme.surfaceMuted
  const placeholderClass = theme.subtitle
  const frameClass = theme.surfaceElevated
  const contentClass = 'bg-white/95 text-slate-900'
  const descriptionClass = 'text-slate-700'

  return (
    <div className="flex h-full flex-col">
      <FeatureListItemAccentTitle
        title={accentTitle}
        reserveSpace={reserveAccentSpace}
        className="mb-4 md:mb-5"
      />

      <article className={`flex min-h-0 flex-1 flex-col overflow-hidden rounded-[1.125rem] ${frameClass}`}>
        <div className={`relative aspect-[5/4] overflow-hidden ${mediaBackgroundClass}`}>
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={image?.alt || item.title || 'Feature image'}
              fill
              sizes={sizes}
              className={isIconFallback ? 'object-contain p-10' : 'object-cover'}
              placeholder={hasLqip ? 'blur' : 'empty'}
              blurDataURL={blurDataURL}
            />
          ) : (
            <div className={`absolute inset-0 flex items-center justify-center ${placeholderClass}`}>
              <Icon icon="image" className="h-10 w-10" />
            </div>
          )}
        </div>

        <div className={`flex flex-1 flex-col justify-start px-6 py-6 md:px-7 md:py-7 ${contentClass}`}>
          {item.title && (
            <h3 className={`mb-3 whitespace-pre-line ${cardTitleClass}`}>
              {item.title}
            </h3>
          )}
          {item.description && (
            <p className={`whitespace-pre-line ${bodyTextClass} ${descriptionClass}`}>
              {item.description}
            </p>
          )}
        </div>
      </article>
    </div>
  )
}
