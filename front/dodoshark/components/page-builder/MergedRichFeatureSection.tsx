import { FeatureListBlockContent, type FeatureListBlockData } from './FeatureListBlock'
import { getSharedBackgroundTheme } from './backgroundTheme'
import {
  RichSectionBlockContent,
  type RichSectionBlockData,
} from './RichSectionBlock'

type MergedRichFeatureSectionProps = {
  richBlock: RichSectionBlockData
  featureBlock: FeatureListBlockData
}

export default function MergedRichFeatureSection({
  richBlock,
  featureBlock,
}: MergedRichFeatureSectionProps) {
  const variant = richBlock.backgroundVariant ?? 'default'
  const theme = getSharedBackgroundTheme(variant)
  const anchorId = richBlock.anchorId?.trim() || undefined

  return (
    <section id={anchorId} className={`py-24 ${theme.section}`}>
      <RichSectionBlockContent block={richBlock} trimTrailingContentSpacing />
      <div className="mt-12 md:mt-16">
        <FeatureListBlockContent
          block={featureBlock}
          showHeader={false}
          renderMode="mergedCards"
        />
      </div>
    </section>
  )
}
