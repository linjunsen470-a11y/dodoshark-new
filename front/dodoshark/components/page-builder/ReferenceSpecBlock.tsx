import CMSImage from '@/components/ui/CMSImage'
import { renderText } from '@/lib/sanity-utils'
import type { SanityImage } from '@/lib/types/sanity'

import {
  getSharedBackgroundTheme,
  type SharedBackgroundVariant,
} from './backgroundTheme'
import SectionHeader from './SectionHeader'
import SectionShell from './SectionShell'
import { bodyTextClass, sectionSubtitleClass } from './sectionStyles'

type ReferenceFeatureItem = {
  _key?: string
  text?: string
}

type ReferenceModelItem = {
  _key?: string
  text?: string
}

export type ReferenceSpecBlockData = {
  _type: 'referenceSpecBlock'
  _key?: string
  mainTitle?: string
  subTitle?: string
  backgroundVariant?: SharedBackgroundVariant
  referenceImage?: SanityImage
  referenceCaption?: string
  featuresTitle?: string
  modelsTitle?: string
  features?: ReferenceFeatureItem[]
  models?: ReferenceModelItem[]
}

function hasFeatureContent(item?: ReferenceFeatureItem) {
  return Boolean(renderText(item?.text))
}

function hasModelContent(item?: ReferenceModelItem) {
  return Boolean(renderText(item?.text))
}

export default function ReferenceSpecBlock({ block }: { block: ReferenceSpecBlockData }) {
  const variant = block.backgroundVariant ?? 'lightGray'
  const theme = getSharedBackgroundTheme(variant)
  const features = (block.features ?? []).filter(hasFeatureContent)
  const models = (block.models ?? []).filter(hasModelContent)
  const mainTitle = renderText(block.mainTitle)
  const subTitle = renderText(block.subTitle)
  const featuresTitle = renderText(block.featuresTitle)
  const modelsTitle = renderText(block.modelsTitle)
  const referenceCaption = renderText(block.referenceCaption)
  const hasImage = Boolean(block.referenceImage?.asset)

  if (!mainTitle && !subTitle && !hasImage && !featuresTitle && !modelsTitle && features.length === 0 && models.length === 0) {
    return null
  }

  return (
    <SectionShell sectionClassName={`${theme.section} ${theme.sectionBorder}`}>
      {(mainTitle || subTitle) && (
        <SectionHeader
          title={mainTitle}
          subtitle={subTitle}
          tone={theme.tone}
          className="mb-10 md:mb-12"
          titleClassName={theme.heading}
          subtitleClassName={`${sectionSubtitleClass} mx-auto max-w-3xl ${theme.subtitle}`}
        />
      )}

      {hasImage && (
        <div className="mx-auto mb-10 max-w-5xl text-center md:mb-12">
          <div className="overflow-hidden rounded-[1.5rem]">
            <CMSImage
              image={block.referenceImage}
              alt={mainTitle || 'Reference image'}
              width={1600}
              height={900}
              className="h-auto w-full rounded-[1.5rem] object-contain"
            />
          </div>
          {referenceCaption && (
            <p className={`mx-auto mt-4 max-w-3xl whitespace-pre-line text-sm leading-7 md:text-base ${theme.subtitle}`}>
              {referenceCaption}
            </p>
          )}
        </div>
      )}

      <div className={`overflow-hidden rounded-[1.5rem] ${theme.surfaceElevated}`}>
        <div className="grid md:grid-cols-[minmax(0,1.8fr)_minmax(260px,0.72fr)]">
          <div className="border-b border-slate-200/80 md:border-b-0 md:border-r md:border-r-slate-200/80">
            {featuresTitle && (
              <div className="border-b border-slate-200/80 bg-cyan-100/80 px-6 py-5 text-center md:px-8">
                <h3 className={`text-lg font-display font-extrabold tracking-[-0.02em] md:text-[1.75rem] ${theme.heading}`}>
                  {featuresTitle}
                </h3>
              </div>
            )}
            <div className="space-y-5 px-6 py-6 md:space-y-6 md:px-8 md:py-8">
              {features.map((item, index) => {
                const itemText = renderText(item.text)

                return itemText ? (
                  <article key={item._key ?? `feature-${index}`}>
                    <p className={`whitespace-pre-line ${bodyTextClass} ${theme.body}`}>
                      {itemText}
                    </p>
                  </article>
                ) : null
              })}
            </div>
          </div>

          <div>
            {modelsTitle && (
              <div className="border-b border-slate-200/80 bg-cyan-100/80 px-6 py-5 text-center md:px-8">
                <h3 className={`text-lg font-display font-extrabold tracking-[-0.02em] md:text-[1.75rem] ${theme.heading}`}>
                  {modelsTitle}
                </h3>
              </div>
            )}
            <div className="space-y-5 px-6 py-6 md:space-y-6 md:px-8 md:py-8">
              {models.map((item, index) => {
                const itemText = renderText(item.text)

                return itemText ? (
                  <article key={item._key ?? `model-${index}`}>
                    <p className={`whitespace-pre-line ${bodyTextClass} ${theme.body}`}>
                      {itemText}
                    </p>
                  </article>
                ) : null
              })}
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
