'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { A11y, Keyboard } from 'swiper/modules'
import type { Swiper as SwiperInstance } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { urlFor } from '@/app/lib/sanity'
import Icon from '@/components/ui/Icon'
import { getSharedBackgroundTheme } from './backgroundTheme'
import SectionShell from './SectionShell'
import SectionHeader from './SectionHeader'
import { bodyTextClass, cardTitleClass, sectionSubtitleClass } from './sectionStyles'
import 'swiper/css'

type CardImage = {
  alt?: string
  asset?: {
    _id?: string
    _ref?: string
    url?: string
  }
}

type CardCta = {
  label?: string
  href?: string
}

type CardReference = {
  _type?: 'product' | 'solution' | 'caseStudy' | 'post' | string
  title?: string
  slug?: { current?: string }
  shortDescription?: string
  description?: string
  mainImage?: CardImage
  image?: CardImage
  cta?: CardCta
}

type CardItem = {
  _key?: string
  cardType?: 'reference' | 'inline'
  title?: string
  description?: string
  clickable?: boolean
  reference?: CardReference
  inlineCard?: {
    title?: string
    image?: CardImage
    description?: string
    cta?: CardCta
  }
}

type CardGroup = {
  _key?: string
  subtitle?: string
  cards?: CardItem[]
  groupTitle?: string
  groupSubtitle?: string
  topCards?: CardItem[]
  bottomCards?: CardItem[]
}

type SliderControls = {
  hasOverflow: boolean
  currentPage: number
  totalPages: number
}

const defaultSliderControls: SliderControls = {
  hasOverflow: false,
  currentPage: 0,
  totalPages: 1,
}

const defaultBannerOverlayColor = 'rgba(15,23,42,0.45)'

export type CardGridBlockData = {
  _type: 'cardGridBlock'
  _key?: string
  title?: string
  subtitle?: string
  firstLineCardTitle?: string
  backgroundVariant?: 'default' | 'muted' | 'dark'
  enableBannerOverlap?: boolean
  bannerImage?: CardImage
  bannerOverlayColor?: string
  nestedCards?: CardItem[]
  nestedCardTitle?: string
  cards?: CardItem[]
  groups?: CardGroup[]
  disableCardFrameEffect?: boolean
}

const columnClassMap = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-2 lg:grid-cols-3',
  4: 'md:grid-cols-2 lg:grid-cols-4',
} as const

function isExternalHref(href: string) {
  return /^(https?:|mailto:|tel:)/i.test(href)
}

function resolveImageSrc(
  image?: CardImage,
  options: { width?: number; height?: number; fit?: 'crop' | 'max' } = {},
) {
  if (!image) return undefined

  const directUrl = image.asset?.url?.trim()
  if (directUrl) return directUrl

  const hasIdentity = Boolean(image.asset?._ref || image.asset?._id)
  if (!hasIdentity) return undefined

  try {
    let builder = urlFor(image).width(options.width ?? 900)

    if (options.height) {
      builder = builder.height(options.height)
    }

    return builder.fit(options.fit ?? 'crop').url()
  } catch {
    return undefined
  }
}

function getColumnsForCardCount(count: number): 2 | 3 | 4 {
  if (count <= 2) return 2
  if (count >= 4) return 4
  return 3
}

function getSliderControls(instance: SwiperInstance): SliderControls {
  const hasOverflow = !instance.isLocked && instance.slides.length > 1
  const totalPages = Math.max(instance.snapGrid.length, 1)

  return {
    hasOverflow,
    currentPage: Math.min(instance.snapIndex, totalPages - 1),
    totalPages,
  }
}

function getReferenceHref(reference?: CardReference) {
  const slug = reference?.slug?.current?.trim()
  if (!slug) return ''

  if (reference?._type === 'product') return `/products/${slug}`
  if (reference?._type === 'solution') return `/solutions/${slug}`
  if (reference?._type === 'caseStudy') return `/cases/${slug}`
  if (reference?._type === 'post') return `/blog/${slug}`

  return `/${slug}`
}

function resolveCard(item: CardItem) {
  const title = item.title?.trim() || ''
  const description = item.description?.trim() || ''
  const clickable = item.clickable !== false

  if (item.cardType === 'inline') {
    const href = item.inlineCard?.cta?.href?.trim() || ''
    const legacyTitle = item.inlineCard?.title?.trim() || ''
    const legacyDescription = item.inlineCard?.description?.trim() || ''

    return {
      title: title || legacyTitle,
      description: description || legacyDescription,
      image: item.inlineCard?.image,
      ctaLabel: clickable ? item.inlineCard?.cta?.label?.trim() || '' : '',
      href: clickable ? href : '',
    }
  }

  const reference = item.reference
  const resolvedTitle = title || reference?.title?.trim() || ''
  const resolvedDescription =
    description ||
    reference?.shortDescription?.trim() ||
    reference?.description?.trim() ||
    ''
  const href = reference?.cta?.href?.trim() || getReferenceHref(reference)

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    image: reference?.mainImage || reference?.image,
    ctaLabel: clickable ? reference?.cta?.label?.trim() || 'View Details' : '',
    href: clickable ? href : '',
  }
}

function CardLink({
  href,
  className,
  children,
}: {
  href: string
  className: string
  children: ReactNode
}) {
  if (!href) {
    return <span className={className}>{children}</span>
  }

  if (isExternalHref(href)) {
    return (
      <a
        href={href}
        className={className}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noreferrer' : undefined}
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}

function GridCard({
  item,
  size,
  disableCardFrameEffect = false,
  isDarkBackground = false,
}: {
  item: CardItem
  size: 'large' | 'small'
  disableCardFrameEffect?: boolean
  isDarkBackground?: boolean
}) {
  const data = resolveCard(item)
  const hasContent = Boolean(data.title || data.description || data.image?.asset)
  if (!hasContent) return null

  const imageHeightClass = size === 'large' ? 'aspect-[16/10]' : 'aspect-[4/3]'
  const titleClass =
    size === 'large'
      ? cardTitleClass
      : 'text-lg font-display font-bold leading-[1.2] tracking-[-0.02em]'
  const textClass = size === 'large' ? bodyTextClass : 'text-sm leading-6'
  const ctaClass = size === 'large' ? 'text-sm' : 'text-xs'
  const titleTone = disableCardFrameEffect && isDarkBackground ? 'text-slate-100' : 'text-slate-900'
  const descriptionTone =
    disableCardFrameEffect && isDarkBackground ? 'text-slate-300' : 'text-slate-500'
  const ctaTone = disableCardFrameEffect && isDarkBackground ? 'text-orange-300' : 'text-orange-500'
  const articleClass = disableCardFrameEffect
    ? 'text-center'
    : 'overflow-hidden rounded-lg border border-slate-100 bg-white text-center transition-shadow hover:shadow-lg'
  const contentClass = size === 'large' ? 'p-6' : 'p-5'
  const imageBgClass = disableCardFrameEffect && isDarkBackground ? 'bg-slate-800' : 'bg-slate-100'
  const emptyImageClass = disableCardFrameEffect && isDarkBackground ? 'text-slate-500' : 'text-slate-300'
  const imageSrc = resolveImageSrc(data.image, { width: 900, height: 700, fit: 'crop' })

  return (
    <article className={articleClass}>
      <div className={`relative ${imageHeightClass} ${imageBgClass}`}>
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={data.image?.alt || data.title || 'Card image'}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className={`absolute inset-0 flex items-center justify-center ${emptyImageClass}`}>
            <Icon icon="image" className="h-8 w-8" />
          </div>
        )}
      </div>
      <div className={contentClass}>
        {data.title && (
          <h3 className={`${titleClass} mb-2 ${titleTone}`}>
            {data.title}
          </h3>
        )}
        {data.description && (
          <p className={`${textClass} mb-4 ${descriptionTone}`}>
            {data.description}
          </p>
        )}
        {data.ctaLabel && (
          <CardLink
            href={data.href}
            className={`${ctaClass} inline-flex items-center justify-center gap-2 font-bold ${ctaTone}`}
          >
            {data.ctaLabel}
            <Icon icon="arrow-right" className="h-4 w-4" />
          </CardLink>
        )}
      </div>
    </article>
  )
}

function MobileCarouselCard({
  item,
  isDarkBackground = false,
  disableCardFrameEffect = false,
  showControls = false,
  controls,
  onSelectPage,
}: {
  item: CardItem
  isDarkBackground?: boolean
  disableCardFrameEffect?: boolean
  showControls?: boolean
  controls: SliderControls
  onSelectPage: (index: number) => void
}) {
  const data = resolveCard(item)
  const hasContent = Boolean(data.title || data.description || data.image?.asset)
  if (!hasContent) return null

  const titleTone = disableCardFrameEffect && isDarkBackground ? 'text-slate-100' : 'text-slate-900'
  const descriptionTone =
    disableCardFrameEffect && isDarkBackground ? 'text-slate-300' : 'text-slate-500'
  const ctaTone = disableCardFrameEffect && isDarkBackground ? 'text-orange-300' : 'text-orange-500'
  const articleClass = disableCardFrameEffect
    ? 'text-center'
    : 'overflow-hidden rounded-lg border border-slate-100 bg-white text-center shadow-sm'
  const imageBgClass = disableCardFrameEffect && isDarkBackground ? 'bg-slate-800' : 'bg-slate-100'
  const emptyImageClass = disableCardFrameEffect && isDarkBackground ? 'text-slate-500' : 'text-slate-300'
  const dotsBaseClass = isDarkBackground ? 'bg-slate-500/50' : 'bg-slate-300'
  const dotsActiveClass = isDarkBackground ? 'bg-orange-300' : 'bg-orange-500'
  const imageSrc = resolveImageSrc(data.image, { width: 900, height: 700, fit: 'crop' })

  return (
    <article className={articleClass}>
      <div className={`relative aspect-[16/10] ${imageBgClass}`}>
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={data.image?.alt || data.title || 'Card image'}
            fill
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className={`absolute inset-0 flex items-center justify-center ${emptyImageClass}`}>
            <Icon icon="image" className="h-8 w-8" />
          </div>
        )}

      </div>

      {showControls && (
        <div className="flex items-center justify-center px-5 py-4">
          <div className="flex items-center gap-2">
            {Array.from({ length: controls.totalPages }, (_, index) => {
              const active = index === controls.currentPage

              return (
                <button
                  key={`card-page-${index}`}
                  type="button"
                  aria-label={`Go to card page ${index + 1}`}
                  aria-pressed={active}
                  onClick={() => onSelectPage(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    active ? `w-8 ${dotsActiveClass}` : `w-2.5 ${dotsBaseClass}`
                  }`}
                />
              )
            })}
          </div>
        </div>
      )}

      <div className="p-6">
        {data.title && (
          <h3 className={`mb-2 ${cardTitleClass} ${titleTone}`}>
            {data.title}
          </h3>
        )}
        {data.description && (
          <p className={`mb-4 ${bodyTextClass} ${descriptionTone}`}>
            {data.description}
          </p>
        )}
        {data.ctaLabel && (
          <CardLink
            href={data.href}
            className={`inline-flex items-center justify-center gap-2 text-sm font-bold ${ctaTone}`}
          >
            {data.ctaLabel}
            <Icon icon="arrow-right" className="h-4 w-4" />
          </CardLink>
        )}
      </div>
    </article>
  )
}

function SectionTitle({
  title,
  isDarkBackground = false,
}: {
  title?: string
  isDarkBackground?: boolean
}) {
  if (!title) return null

  const separatorClass = isDarkBackground ? 'bg-slate-600' : 'bg-slate-300'
  const titleClass = isDarkBackground ? 'text-slate-100' : 'text-slate-800'

  return (
    <header className="mb-8 text-center md:mb-10">
      <div className="flex items-center gap-6">
        <span className={`h-px flex-1 ${separatorClass}`} />
        <h3 className={`text-2xl font-display font-bold tracking-[-0.02em] md:text-[1.75rem] ${titleClass}`}>
          {title}
        </h3>
        <span className={`h-px flex-1 ${separatorClass}`} />
      </div>
    </header>
  )
}

function GroupGrid({
  sectionTitle,
  cards,
  disableCardFrameEffect,
  isDarkBackground,
}: {
  sectionTitle?: string
  cards: CardItem[]
  disableCardFrameEffect?: boolean
  isDarkBackground?: boolean
}) {
  const [mobileSwiper, setMobileSwiper] = useState<SwiperInstance | null>(null)
  const [mobileControls, setMobileControls] = useState<SliderControls>(defaultSliderControls)

  const columnsToUse = getColumnsForCardCount(cards.length)
  const desktopCardSize: 'large' | 'small' = columnsToUse <= 2 ? 'large' : 'small'

  if (cards.length === 0) return null

  return (
    <section className="py-8">
      <SectionTitle title={sectionTitle} isDarkBackground={isDarkBackground} />

      <div className="md:hidden">
        <Swiper
          key={`${sectionTitle ?? 'cards'}-${cards.length}`}
          modules={[Keyboard, A11y]}
          slidesPerView={1}
          slidesPerGroup={1}
          spaceBetween={16}
          speed={450}
          watchOverflow
          grabCursor
          keyboard={{ enabled: true }}
          a11y={{
            prevSlideMessage: 'Previous cards',
            nextSlideMessage: 'Next cards',
          }}
          onSwiper={(instance) => {
            setMobileSwiper(instance)
            setMobileControls(getSliderControls(instance))
          }}
          onSlideChange={(instance) => setMobileControls(getSliderControls(instance))}
          onResize={(instance) => setMobileControls(getSliderControls(instance))}
        >
          {cards.map((item, index) => (
            <SwiperSlide key={item._key ?? `group-card-mobile-${index}`} className="h-auto">
              <MobileCarouselCard
                item={item}
                disableCardFrameEffect={disableCardFrameEffect}
                isDarkBackground={isDarkBackground}
                showControls={mobileControls.hasOverflow}
                controls={mobileControls}
                onSelectPage={(pageIndex) => mobileSwiper?.slideTo(pageIndex)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className={`hidden gap-6 md:grid ${columnClassMap[columnsToUse]}`}>
        {cards.map((item, index) => (
          <GridCard
            key={item._key ?? `group-card-${index}`}
            item={item}
            size={desktopCardSize}
            disableCardFrameEffect={disableCardFrameEffect}
            isDarkBackground={isDarkBackground}
          />
        ))}
      </div>
    </section>
  )
}

export default function CardGridBlock({ block }: { block: CardGridBlockData }) {
  const variant = block.backgroundVariant ?? 'muted'
  const theme = getSharedBackgroundTheme(variant)
  const isDarkBackground = variant === 'dark'
  const enableBannerOverlap = Boolean(block.enableBannerOverlap)
  const nestedCards = (block.nestedCards ?? []).filter(
    (item) => item?.cardType || item?.reference || item?.inlineCard,
  )
  const legacyGroupCards = (block.groups ?? []).flatMap((group) => {
    const groupCards = (group.cards ?? []).filter(
      (item) => item?.cardType || item?.reference || item?.inlineCard,
    )
    const fallbackTop = (group.topCards ?? []).filter(
      (item) => item?.cardType || item?.reference || item?.inlineCard,
    )
    const fallbackBottom = (group.bottomCards ?? []).filter(
      (item) => item?.cardType || item?.reference || item?.inlineCard,
    )
    return groupCards.length > 0 ? groupCards : [...fallbackTop, ...fallbackBottom]
  })
  const legacyCards = (block.cards ?? []).filter(
    (item) => item?.cardType || item?.reference || item?.inlineCard,
  )
  const mergedNestedCards = nestedCards.length > 0 ? nestedCards : legacyGroupCards
  const hasNestedCards = mergedNestedCards.length > 0
  const hasLegacy = legacyCards.length > 0
  const hasCardContent = hasLegacy || hasNestedCards
  const disableCardFrameEffect = Boolean(block.disableCardFrameEffect)
  const firstLineCardTitle = block.firstLineCardTitle?.trim() || undefined
  const cardsSectionTitle =
    firstLineCardTitle || (!enableBannerOverlap && hasLegacy ? block.subtitle?.trim() || undefined : undefined)
  const nestedSectionTitle = block.nestedCardTitle?.trim() || undefined
  const bannerImageSrc = resolveImageSrc(block.bannerImage, { width: 2000, height: 900, fit: 'crop' })
  const bannerOverlayColor = block.bannerOverlayColor?.trim() || defaultBannerOverlayColor
  const contentIsDarkBackground = enableBannerOverlap ? false : isDarkBackground

  const headerSubtitle = firstLineCardTitle ? block.subtitle : hasLegacy ? undefined : block.subtitle
  const subtitleClass = isDarkBackground ? theme.subtitle : theme.body

  if (!block.title && !block.subtitle && !hasNestedCards && !hasLegacy) return null

  const content = (
    <>
      {hasLegacy && (
        <GroupGrid
          sectionTitle={cardsSectionTitle}
          cards={legacyCards}
          disableCardFrameEffect={disableCardFrameEffect}
          isDarkBackground={contentIsDarkBackground}
        />
      )}

      {hasNestedCards && (
        <GroupGrid
          sectionTitle={nestedSectionTitle}
          cards={mergedNestedCards}
          disableCardFrameEffect={disableCardFrameEffect}
          isDarkBackground={contentIsDarkBackground}
        />
      )}
    </>
  )

  if (enableBannerOverlap) {
    return (
      <section className={`${theme.section} pb-20 md:pb-24`}>
        <div className="relative h-[300px] overflow-hidden sm:h-[360px] lg:h-[420px]">
          {bannerImageSrc ? (
            <Image
              src={bannerImageSrc}
              alt={block.bannerImage?.alt || block.title || 'Card grid banner'}
              fill
              sizes="100vw"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-slate-800" />
          )}
          <div className="absolute inset-0" style={{ backgroundColor: bannerOverlayColor }} />

          <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 text-center sm:px-6 lg:px-8">
            <div className="w-full">
              <SectionHeader
                title={block.title}
                subtitle={headerSubtitle}
                tone="dark"
                className="mx-auto max-w-3xl"
                subtitleClassName="mx-auto max-w-3xl text-sm leading-7 text-slate-300 md:text-base"
              />
            </div>
          </div>
        </div>

        {hasCardContent && (
          <div className="relative z-10 mx-auto -mt-20 max-w-7xl px-4 sm:px-6 lg:-mt-24 lg:px-8">
            <div className="rounded-[1.5rem] bg-white px-6 py-8 shadow-[0_24px_60px_-24px_rgba(15,23,42,0.35)] sm:px-8 md:py-10 lg:px-10 lg:py-12">
              {content}
            </div>
          </div>
        )}
      </section>
    )
  }

  return (
    <SectionShell sectionClassName={theme.section}>
      {(block.title || block.subtitle) && (
        <SectionHeader
          title={block.title}
          subtitle={headerSubtitle}
          tone={isDarkBackground ? 'dark' : 'light'}
          className="mb-10 md:mb-12"
          titleClassName={theme.heading}
          subtitleClassName={`mx-auto max-w-3xl ${sectionSubtitleClass} ${subtitleClass}`}
        />
      )}

      {content}
    </SectionShell>
  )
}
