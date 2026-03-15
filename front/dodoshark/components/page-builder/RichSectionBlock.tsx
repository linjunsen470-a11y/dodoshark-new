import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from 'next-sanity'

import {
  getSharedBackgroundTheme,
  type SharedBackgroundTheme,
  type SharedBackgroundVariant,
} from './backgroundTheme'
import RichSectionMediaCarousel from './RichSectionMediaCarousel'
import {
  getValidRichSectionMediaItems,
  RichSectionMediaGrid,
  type RichSectionMediaItem,
} from './RichSectionMedia'
import SectionShell from './SectionShell'
import SectionHeader from './SectionHeader'
import {bodyTextClass, cardTitleClass, sectionSubtitleClass} from './sectionStyles'

export type RichSectionLayout =
  | 'textLeftMediaRight'
  | 'mediaLeftTextRight'
  | 'centeredMediaGridBodyBelow'

export type RichSectionColumnItem = {
  _key?: string
  title?: string
  description?: string
}

export type RichSectionBlockData = {
  _type: 'richSectionBlock'
  _key?: string
  heading?: string
  subtitle?: string
  body?: PortableTextBlock[]
  mediaItems?: RichSectionMediaItem[]
  layout?: RichSectionLayout
  enableTwoColumnContent?: boolean
  twoColumnHeading?: string
  twoColumnSubtitle?: string
  leftColumnItems?: RichSectionColumnItem[]
  rightColumnItems?: RichSectionColumnItem[]
  disableMediaFrameEffect?: boolean
  backgroundVariant?: SharedBackgroundVariant
  anchorId?: string
}

function normalizeRichSectionLayout(layout?: RichSectionLayout): RichSectionLayout {
  if (layout === 'mediaLeftTextRight' || layout === 'centeredMediaGridBodyBelow') {
    return layout
  }

  return 'textLeftMediaRight'
}

function getValidRichSectionColumnItems(items?: RichSectionColumnItem[]) {
  return (items ?? []).filter(
    (item) => Boolean(item?.title?.trim()) || Boolean(item?.description?.trim()),
  )
}

function hasTwoColumnHeader(block: RichSectionBlockData) {
  return Boolean(block.twoColumnHeading?.trim() || block.twoColumnSubtitle?.trim())
}

function useTwoColumnContent(block: RichSectionBlockData) {
  return (
    normalizeRichSectionLayout(block.layout) === 'centeredMediaGridBodyBelow' &&
    block.enableTwoColumnContent === true
  )
}

export function hasRichSectionContent(block: RichSectionBlockData) {
  const layout = normalizeRichSectionLayout(block.layout)
  const hasMedia = getValidRichSectionMediaItems(block.mediaItems).length > 0
  const hasSubtitle = Boolean(block.subtitle?.trim())
  const hasTwoColumnMode =
    layout === 'centeredMediaGridBodyBelow' && block.enableTwoColumnContent === true
  const hasTwoColumnItems =
    getValidRichSectionColumnItems(block.leftColumnItems).length > 0 ||
    getValidRichSectionColumnItems(block.rightColumnItems).length > 0
  const hasTwoColumnContent = hasTwoColumnMode && (hasTwoColumnHeader(block) || hasTwoColumnItems)
  const hasBody = hasTwoColumnMode ? false : Boolean(block.body?.length)

  return Boolean(block.heading || hasSubtitle || hasBody || hasMedia || hasTwoColumnContent)
}

function getPortableTextComponents(theme: SharedBackgroundTheme): PortableTextComponents {
  const textColor = theme.body
  const headingColor = theme.heading
  const quoteBorder = 'border-slate-300'
  const listMarker = 'marker:text-orange-500'
  const linkColor = 'text-orange-600'

  return {
    block: {
      normal: ({children}) => (
        <p className={`mb-5 font-normal ${bodyTextClass} ${textColor}`}>
          {children}
        </p>
      ),
      h2: ({children}) => (
        <h2 className={`mb-5 ${cardTitleClass} ${headingColor}`}>
          {children}
        </h2>
      ),
      h3: ({children}) => (
        <h3
          className={`mb-4 text-xl font-display font-bold leading-[1.12] tracking-[-0.02em] md:text-2xl ${headingColor}`}
        >
          {children}
        </h3>
      ),
      blockquote: ({children}) => (
        <blockquote className={`my-8 border-l-4 pl-5 italic ${quoteBorder} ${textColor}`}>
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({children}) => (
        <ul className={`mb-5 ml-6 list-disc space-y-2 leading-[1.8] ${listMarker} ${textColor}`}>
          {children}
        </ul>
      ),
      number: ({children}) => (
        <ol className={`mb-5 ml-6 list-decimal space-y-2 leading-[1.8] ${listMarker} ${textColor}`}>
          {children}
        </ol>
      ),
    },
    marks: {
      link: ({children, value}) => {
        const href = value?.href as string | undefined
        if (!href) return <>{children}</>

        const isExternal = /^https?:\/\//i.test(href)
        return (
          <a
            href={href}
            className={`${linkColor} underline underline-offset-4`}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noreferrer' : undefined}
          >
            {children}
          </a>
        )
      },
    },
  }
}

function RichSectionTwoColumnContent({
  block,
  theme,
}: {
  block: RichSectionBlockData
  theme: SharedBackgroundTheme
}) {
  const heading = block.twoColumnHeading?.trim()
  const subtitle = block.twoColumnSubtitle?.trim()
  const leftItems = getValidRichSectionColumnItems(block.leftColumnItems)
  const rightItems = getValidRichSectionColumnItems(block.rightColumnItems)
  const columns = [
    {key: 'left', items: leftItems},
    {key: 'right', items: rightItems},
  ].filter((column) => column.items.length > 0)

  if (!heading && !subtitle && columns.length === 0) return null

  const gridClass =
    columns.length > 1
      ? 'grid gap-8 md:grid-cols-2 md:gap-10'
      : 'mx-auto max-w-3xl'

  return (
    <div className="mx-auto max-w-5xl">
      {(heading || subtitle) && (
        <SectionHeader
          title={heading}
          subtitle={subtitle}
          tone="light"
          align="center"
          className="mx-auto mb-8 max-w-3xl md:mb-10"
          titleClassName={theme.heading}
          subtitleClassName={`mx-auto max-w-3xl font-normal ${sectionSubtitleClass} ${theme.subtitle}`}
        />
      )}

      {columns.length > 0 && (
        <div className={gridClass}>
          {columns.map((column) => (
            <div
              key={column.key}
              className="space-y-6 rounded-[1.5rem] border border-slate-200/80 bg-white/70 px-6 py-7 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.18)] backdrop-blur-sm md:px-8"
            >
              {column.items.map((item, index) => (
                <div key={item._key ?? `${column.key}-${item.title ?? 'item'}-${index}`}>
                  {item.title && (
                    <h3 className={`mb-3 whitespace-pre-line ${cardTitleClass} ${theme.heading}`}>
                      {item.title}
                    </h3>
                  )}
                  {item.description?.trim() && (
                    <p
                      className={`whitespace-pre-line font-normal ${bodyTextClass} ${theme.body}`}
                    >
                      {item.description.trim()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

type RichSectionBlockProps = {
  block: RichSectionBlockData
}

type RichSectionBlockContentProps = {
  block: RichSectionBlockData
  trimTrailingContentSpacing?: boolean
}

export function RichSectionBlockContent({
  block,
  trimTrailingContentSpacing = false,
}: RichSectionBlockContentProps) {
  const layout = normalizeRichSectionLayout(block.layout)
  const variant = block.backgroundVariant ?? 'white'
  const theme = getSharedBackgroundTheme(variant)
  const mediaItems = getValidRichSectionMediaItems(block.mediaItems)
  const hasMedia = mediaItems.length > 0
  const hasTwoColumnMode = useTwoColumnContent(block)
  const hasBody = hasTwoColumnMode ? false : Boolean(block.body?.length)
  const hasSubtitle = Boolean(block.subtitle?.trim())

  if (!hasRichSectionContent(block)) return null

  const layoutClass = 'grid items-start gap-14 lg:grid-cols-2 lg:gap-16'

  const textOrderClass =
    layout === 'mediaLeftTextRight' ? 'lg:order-2' : 'lg:order-1'
  const mediaOrderClass =
    layout === 'mediaLeftTextRight' ? 'lg:order-1' : 'lg:order-2'
  const bodyClass = trimTrailingContentSpacing
    ? 'max-w-[36rem] [&_blockquote:last-child]:mb-0 [&_h2:last-child]:mb-0 [&_h3:last-child]:mb-0 [&_ol:last-child]:mb-0 [&_p:last-child]:mb-0 [&_ul:last-child]:mb-0'
    : 'max-w-[36rem]'

  if (layout === 'centeredMediaGridBodyBelow') {
    const centeredBodyClass = trimTrailingContentSpacing
      ? 'mx-auto max-w-5xl [&_blockquote:last-child]:mb-0 [&_h2:last-child]:mb-0 [&_h3:last-child]:mb-0 [&_ol:last-child]:mb-0 [&_p:last-child]:mb-0 [&_ul:last-child]:mb-0'
      : 'mx-auto max-w-5xl'

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(block.heading || hasSubtitle) && (
          <SectionHeader
            title={block.heading}
            subtitle={hasSubtitle ? block.subtitle : undefined}
            tone="light"
            align="center"
            className="mx-auto mb-10 max-w-4xl md:mb-12"
            titleClassName={theme.heading}
            subtitleClassName={`mx-auto max-w-3xl font-normal ${sectionSubtitleClass} ${theme.subtitle}`}
          />
        )}

        <div className="space-y-10 md:space-y-12">
          {hasMedia && (
            <div className="mx-auto max-w-5xl">
              <RichSectionMediaGrid
                items={mediaItems}
                title={block.heading}
                theme={theme}
                disableMediaFrameEffect={block.disableMediaFrameEffect}
              />
            </div>
          )}

          {hasTwoColumnMode ? (
            <RichSectionTwoColumnContent block={block} theme={theme} />
          ) : hasBody ? (
            <div className={centeredBodyClass}>
              <PortableText
                value={block.body as PortableTextBlock[]}
                components={getPortableTextComponents(theme)}
              />
            </div>
          ) : null}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className={layoutClass}>
        <div className={`${textOrderClass} min-w-0 max-w-[36rem]`}>
          {(block.heading || hasSubtitle) && (
            <SectionHeader
              title={block.heading}
              subtitle={hasSubtitle ? block.subtitle : undefined}
              tone="light"
              align="left"
              className="mb-10 max-w-[36rem] md:mb-12"
              titleClassName={theme.heading}
              subtitleClassName={`max-w-[34rem] font-normal ${sectionSubtitleClass} ${theme.subtitle}`}
            />
          )}

          {hasBody && (
            <div className={bodyClass}>
              <PortableText
                value={block.body as PortableTextBlock[]}
                components={getPortableTextComponents(theme)}
              />
            </div>
          )}
        </div>

        {hasMedia && (
          <div className={`${mediaOrderClass} min-w-0`}>
            <RichSectionMediaCarousel
              items={mediaItems}
              title={block.heading}
              theme={theme}
              disableMediaFrameEffect={block.disableMediaFrameEffect}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default function RichSectionBlock({block}: RichSectionBlockProps) {
  if (!hasRichSectionContent(block)) return null

  const variant = block.backgroundVariant ?? 'white'
  const theme = getSharedBackgroundTheme(variant)
  const anchorId = block.anchorId?.trim() || undefined

  return (
    <SectionShell id={anchorId} sectionClassName={theme.section}>
      <RichSectionBlockContent block={block} />
    </SectionShell>
  )
}
