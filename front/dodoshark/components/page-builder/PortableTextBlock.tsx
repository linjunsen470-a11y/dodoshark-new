import Image from 'next/image'
import Link from 'next/link'
import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from 'next-sanity'

import { urlFor } from '@/app/lib/sanity'
import Icon from '@/components/ui/Icon'
import { getSharedBackgroundTheme } from './backgroundTheme'

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

type ProductReferenceDoc = {
  _id?: string
  title?: string
  slug?: { current?: string }
  shortDescription?: string
  mainImage?: SanityImage
}

type PortableTextNode = PortableTextBlock & {
  _type?: string
  image?: SanityImage
  product?: ProductReferenceDoc
  titleOverride?: string
}

export type PortableTextBlockData = {
  _type: 'portableTextBlock'
  _key?: string
  backgroundVariant?: 'default' | 'muted' | 'dark'
  content?: PortableTextNode[]
}

function getPortableTextComponents(isDark: boolean): PortableTextComponents {
  const textColor = isDark ? 'text-slate-300' : 'text-slate-600'
  const headingColor = isDark ? 'text-slate-100' : 'text-slate-900'
  const blockQuoteClass = isDark
    ? 'border-l-4 border-orange-300 bg-slate-800 text-slate-200'
    : 'border-l-4 border-orange-400 bg-orange-50 text-slate-700'
  const listMarkerClass = isDark ? 'marker:text-orange-300' : 'marker:text-orange-500'
  const highlightClass = isDark
    ? 'bg-orange-400/20 text-orange-200'
    : 'bg-orange-100 text-orange-800'
  const linkClass = isDark
    ? 'text-orange-300 underline underline-offset-4 hover:text-orange-200'
    : 'text-orange-600 underline underline-offset-4 hover:text-orange-700'
  const mediaFrameClass = isDark ? 'border-slate-700' : 'border-slate-200'
  const imageCaptionClass = isDark ? 'text-slate-400' : 'text-slate-500'
  const productCardClass = isDark
    ? 'my-10 rounded-lg border border-slate-700 bg-slate-800 p-4 md:p-6'
    : 'my-10 premium-card p-4 md:p-6'
  const productTitleClass = isDark ? 'text-slate-100' : 'text-slate-900'
  const productDescriptionClass = isDark ? 'text-slate-300' : 'text-slate-500'
  const productLinkClass = isDark
    ? 'text-orange-300 font-bold text-sm hover:text-orange-200'
    : 'text-orange-600 font-bold text-sm hover:text-orange-700'
  const productImageFallbackClass = isDark ? 'bg-slate-700' : 'bg-slate-100'

  return {
    block: {
      normal: ({ children }) => (
        <p className={`mb-6 text-base md:text-lg leading-loose font-light ${textColor}`}>
          {children}
        </p>
      ),
      h2: ({ children }) => (
        <h2 className={`text-3xl font-display font-black mt-12 mb-6 tracking-tight ${headingColor}`}>
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className={`text-2xl font-display font-bold mt-10 mb-4 tracking-tight ${headingColor}`}>
          {children}
        </h3>
      ),
      h4: ({ children }) => (
        <h4 className={`text-xl font-display font-bold mt-8 mb-3 ${headingColor}`}>{children}</h4>
      ),
      blockquote: ({ children }) => (
        <blockquote className={`my-8 px-5 py-4 italic ${blockQuoteClass}`}>
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className={`mb-6 ml-6 list-disc ${listMarkerClass} ${textColor} space-y-2`}>
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className={`mb-6 ml-6 list-decimal ${listMarkerClass} ${textColor} space-y-2`}>
          {children}
        </ol>
      ),
    },
    marks: {
      strong: ({ children }) => <strong className={`font-bold ${headingColor}`}>{children}</strong>,
      em: ({ children }) => <em className="italic">{children}</em>,
      highlight: ({ children }) => (
        <span className={`px-1.5 py-0.5 rounded ${highlightClass}`}>{children}</span>
      ),
      link: ({ children, value }) => {
        const href = value?.href as string | undefined
        if (!href) return <>{children}</>

        const isExternal = /^https?:\/\//i.test(href)
        if (isExternal) {
          return (
            <a href={href} className={linkClass} target="_blank" rel="noreferrer">
              {children}
            </a>
          )
        }

        return (
          <Link href={href} className={linkClass}>
            {children}
          </Link>
        )
      },
    },
    types: {
      image: ({ value }) => {
        const image = value as SanityImage
        if (!image?.asset) return null

        const width = image.asset.metadata?.dimensions?.width ?? 1200
        const height = image.asset.metadata?.dimensions?.height ?? 800
        const hasLqip = Boolean(image.asset.metadata?.lqip)

        return (
          <figure className="my-10">
            <div className={`rounded-lg overflow-hidden border shadow-xl ${mediaFrameClass}`}>
              <Image
                src={urlFor(image).width(1400).fit('max').url()}
                alt={image.alt || 'Embedded image'}
                width={width}
                height={height}
                className="w-full h-auto object-cover"
                placeholder={hasLqip ? 'blur' : 'empty'}
                blurDataURL={image.asset.metadata?.lqip}
              />
            </div>
            {image.alt && (
              <figcaption className={`mt-3 text-center text-xs ${imageCaptionClass}`}>
                {image.alt}
              </figcaption>
            )}
          </figure>
        )
      },
      productReference: ({ value }) => {
        const data = value as {
          product?: ProductReferenceDoc
          titleOverride?: string
        }

        if (!data?.product) return null

        const title = data.titleOverride || data.product.title || 'Related Product'
        const href = data.product.slug?.current
          ? `/products/${data.product.slug.current}`
          : undefined

        return (
          <article className={productCardClass}>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-56 shrink-0">
                <div className={`aspect-[4/3] rounded-lg overflow-hidden ${productImageFallbackClass}`}>
                  {data.product.mainImage?.asset && (
                    <Image
                      src={urlFor(data.product.mainImage).width(600).fit('max').url()}
                      alt={data.product.mainImage.alt || title}
                      width={600}
                      height={450}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>
              <div className="flex-1">
                <h4 className={`text-xl font-display font-black mb-2 ${productTitleClass}`}>{title}</h4>
                {data.product.shortDescription && (
                  <p className={`text-sm leading-relaxed mb-4 ${productDescriptionClass}`}>
                    {data.product.shortDescription}
                  </p>
                )}
                {href && (
                  <Link href={href} className={productLinkClass}>
                    View Product <Icon icon="arrow-right" className="ms-1 inline h-4 w-4" />
                  </Link>
                )}
              </div>
            </div>
          </article>
        )
      },
    },
  }
}

export default function PortableTextBlockComponent({
  block,
}: {
  block: PortableTextBlockData
}) {
  const variant = block.backgroundVariant ?? 'default'
  const theme = getSharedBackgroundTheme(variant)
  const isDark = variant === 'dark'
  if (!block.content?.length) return null

  return (
    <section className={`py-24 ${theme.section}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="portable-text">
          <PortableText value={block.content} components={getPortableTextComponents(isDark)} />
        </article>
      </div>
    </section>
  )
}
