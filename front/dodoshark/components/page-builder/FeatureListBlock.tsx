import Image from 'next/image'

import { urlFor } from '@/app/lib/sanity'
import {
  getSharedBackgroundTheme,
  mapFeatureBackgroundStyleToVariant,
} from './backgroundTheme'
import SectionHeader from './SectionHeader'

type FeatureIconImage = {
  alt?: string
  asset?: {
    _id?: string
    url?: string
  }
}

type FeatureListItem = {
  _key?: string
  mediaType?: 'icon' | 'image'
  title?: string
  description?: string
  icon?: FeatureIconImage
  image?: FeatureIconImage
}

export type FeatureListBlockData = {
  _type: 'featureListBlock'
  _key?: string
  title?: string
  subtitle?: string
  backgroundStyle?: 'white' | 'lightGray' | 'darkGray'
  items?: FeatureListItem[]
}

function FeatureMedia({ item }: { item: FeatureListItem }) {
  const media = item.mediaType === 'image' ? item.image : item.icon
  if (!media?.asset) return null

  return (
    <div className="relative mx-auto mb-5 h-24 w-24 overflow-hidden rounded-md border-2 border-[#E0B847] bg-white">
      <Image
        src={urlFor(media).width(160).height(160).fit('crop').url()}
        alt={media.alt || item.title || 'Feature media'}
        fill
        sizes="96px"
        className="object-contain p-4"
      />
    </div>
  )
}

type FeatureListBlockProps = {
  block: FeatureListBlockData
  seamlessFromPrev?: boolean
}

export default function FeatureListBlock({
  block,
  seamlessFromPrev = false,
}: FeatureListBlockProps) {
  const items = (block.items ?? []).filter((item) => item?.title)
  const backgroundStyle = block.backgroundStyle ?? 'white'
  const backgroundVariant = mapFeatureBackgroundStyleToVariant(backgroundStyle)
  const theme = getSharedBackgroundTheme(backgroundVariant)
  const isDark = backgroundVariant === 'dark'
  const hasHeader = Boolean(block.title?.trim() || block.subtitle?.trim())

  if (!hasHeader && items.length === 0) return null

  const titleClass = theme.heading
  const subtitleClass = isDark ? theme.subtitle : theme.body
  const itemTitleClass = theme.heading
  const itemDescriptionClass = theme.body
  const sectionSpacingClass =
    seamlessFromPrev && !hasHeader ? '-mt-1 pt-0 pb-16 md:pb-20' : 'py-16 md:py-20'

  return (
    <section className={`${sectionSpacingClass} ${theme.section}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {hasHeader && (
          <SectionHeader
            title={block.title}
            subtitle={block.subtitle}
            isDark={isDark}
            className="mx-auto mb-12 max-w-3xl"
            titleClassName={`text-3xl font-display font-black tracking-tight md:text-4xl ${titleClass}`}
            subtitleClassName={`text-base md:text-lg ${subtitleClass}`}
          />
        )}

        <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-x-8 gap-y-10">
          {items.map((item, index) => (
            <article key={item._key ?? `${item.title}-${index}`} className="text-center">
              <FeatureMedia item={item} />
              <h3 className={`mb-3 text-3xl font-display font-black leading-tight ${itemTitleClass}`}>
                {item.title}
              </h3>
              {item.description && (
                <p className={`mx-auto max-w-xs text-lg leading-snug ${itemDescriptionClass}`}>
                  {item.description}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
