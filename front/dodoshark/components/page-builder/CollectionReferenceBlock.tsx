import Image from 'next/image'
import Link from 'next/link'

import { urlFor } from '@/app/lib/sanity'
import Icon from '@/components/ui/Icon'
import { getSharedBackgroundTheme } from './backgroundTheme'
import SectionHeader from './SectionHeader'

type SanityImage = {
  alt?: string
  asset?: {
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

type ReferenceDoc = {
  _id?: string
  _type?: string
  title?: string
  name?: string
  modelName?: string
  slug?: { current?: string }
  shortDescription?: string
  description?: string
  excerpt?: string
  mainImage?: SanityImage
  image?: SanityImage
  coverImage?: SanityImage
  heroImage?: SanityImage
}

type ReferenceItem = {
  _key?: string
  labelOverride?: string
  isClickable?: boolean
  reference?: ReferenceDoc
}

export type CollectionReferenceBlockData = {
  _type: 'collectionReferenceBlock'
  _key?: string
  title?: string
  subtitle?: string
  backgroundVariant?: 'default' | 'muted' | 'dark'
  layout?: 'grid' | 'list' | 'carousel'
  columns?: 2 | 3 | 4
  references?: ReferenceItem[]
}

function resolveTitle(item: ReferenceItem) {
  return (
    item.labelOverride ||
    item.reference?.title ||
    item.reference?.name ||
    item.reference?.modelName ||
    'Untitled Item'
  )
}

function resolveDescription(doc?: ReferenceDoc) {
  return doc?.shortDescription || doc?.description || doc?.excerpt || ''
}

function resolveImage(doc?: ReferenceDoc) {
  return doc?.mainImage || doc?.image || doc?.coverImage || doc?.heroImage
}

function resolveHref(doc?: ReferenceDoc) {
  const slug = doc?.slug?.current
  if (!slug) return undefined

  if (doc?._type === 'product') return `/products/${slug}`
  if (doc?._type === 'solution') return `/solutions/${slug}`
  if (doc?._type === 'post') return `/blog/${slug}`
  if (doc?._type === 'caseStudy') return `/cases/${slug}`
  return undefined
}

function ReferenceCard({ item }: { item: ReferenceItem }) {
  const title = resolveTitle(item)
  const description = resolveDescription(item.reference)
  const image = resolveImage(item.reference)
  const href = item.isClickable === false ? undefined : resolveHref(item.reference)
  const content = (
    <article className="premium-card p-4 md:p-5 h-full">
      <div className="aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 mb-5">
        {image?.asset ? (
          <Image
            src={urlFor(image).width(800).fit('max').url()}
            alt={image.alt || title}
            width={800}
            height={600}
            className="w-full h-full object-cover"
          />
        ) : null}
      </div>

      <h3 className="text-lg font-display font-black text-slate-900 mb-2">{title}</h3>
      {description && <p className="text-slate-500 text-sm leading-relaxed mb-4">{description}</p>}
      {href && (
        <span className="text-sm font-bold text-orange-600">
          View Details <Icon icon="arrow-right" className="ms-1 inline h-4 w-4" />
        </span>
      )}
    </article>
  )

  if (!href) return content

  return <Link href={href}>{content}</Link>
}

function columnsClass(columns?: number) {
  if (columns === 2) return 'md:grid-cols-2'
  if (columns === 4) return 'md:grid-cols-2 xl:grid-cols-4'
  return 'md:grid-cols-2 xl:grid-cols-3'
}

export default function CollectionReferenceBlock({
  block,
}: {
  block: CollectionReferenceBlockData
}) {
  const variant = block.backgroundVariant ?? 'muted'
  const theme = getSharedBackgroundTheme(variant)
  const isDark = variant === 'dark'
  const layout = block.layout ?? 'grid'
  const refs = (block.references ?? []).filter((item) => item.reference)
  const sectionBorderClass = isDark ? 'border-y border-slate-800' : 'border-y border-slate-100'
  const subtitleClass = isDark ? theme.subtitle : theme.body

  if (!block.title && !block.subtitle && refs.length === 0) return null

  return (
    <section className={`py-24 ${theme.section} ${sectionBorderClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(block.title || block.subtitle) && (
          <SectionHeader
            title={block.title}
            subtitle={block.subtitle}
            isDark={isDark}
            className="mb-12"
            titleClassName={`text-3xl md:text-4xl font-display font-black tracking-tight ${theme.heading}`}
            subtitleClassName={`${subtitleClass} max-w-3xl mx-auto`}
          />
        )}

        {layout === 'grid' && (
          <div className={`grid gap-8 ${columnsClass(block.columns)}`}>
            {refs.map((item, idx) => (
              <ReferenceCard key={item._key ?? idx} item={item} />
            ))}
          </div>
        )}

        {layout === 'list' && (
          <div className="space-y-6">
            {refs.map((item, idx) => (
              <div key={item._key ?? idx} className="max-w-5xl mx-auto">
                <ReferenceCard item={item} />
              </div>
            ))}
          </div>
        )}

        {layout === 'carousel' && (
          <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2">
            {refs.map((item, idx) => (
              <div
                key={item._key ?? idx}
                className="min-w-[280px] md:min-w-[360px] max-w-[400px] snap-start"
              >
                <ReferenceCard item={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
