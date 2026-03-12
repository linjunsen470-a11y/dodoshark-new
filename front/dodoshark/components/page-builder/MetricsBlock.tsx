import { getSharedBackgroundTheme } from './backgroundTheme'
import SectionShell from './SectionShell'
import SectionHeader from './SectionHeader'
import Icon from '@/components/ui/Icon'
import { bodyTextClass } from './sectionStyles'

type MetricItem = {
  _key?: string
  value?: string
  unit?: string
  label?: string
  icon?: string
}

export type MetricsBlockData = {
  _type: 'metricsBlock'
  _key?: string
  title?: string
  backgroundVariant?: 'default' | 'muted' | 'dark'
  items?: MetricItem[]
}

export default function MetricsBlock({ block }: { block: MetricsBlockData }) {
  const variant = block.backgroundVariant ?? 'default'
  const theme = getSharedBackgroundTheme(variant)
  const isDark = variant === 'dark'
  const items = (block.items ?? []).filter((item) => item.value || item.label)
  const sectionBorderClass = isDark ? 'border-y border-slate-800' : 'border-y border-slate-100'

  if (!block.title && items.length === 0) return null

  return (
    <SectionShell spacing="compact" sectionClassName={`${theme.section} ${sectionBorderClass}`}>
      {block.title && (
        <SectionHeader
          title={block.title}
          tone={isDark ? 'dark' : 'light'}
          className="mb-10 md:mb-12"
          titleClassName={theme.heading}
        />
      )}

      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 md:gap-8">
          {items.map((item, idx) => {
            const iconClass = item.icon?.trim() || 'chart-line'

            return (
              <article
                key={item._key ?? `${item.label}-${idx}`}
                className="premium-card p-6 md:p-8 text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-md bg-orange-50 text-orange-600 border border-orange-100 flex items-center justify-center">
                  <Icon icon={iconClass} className="h-5 w-5" />
                </div>

                <div className="mb-1 text-3xl font-display font-black text-slate-900 md:text-4xl">
                  <span className="text-orange-500">{item.value}</span>
                  {item.unit && <span className="text-xl align-top ms-1">{item.unit}</span>}
                </div>

                {item.label && (
                  <p className={`text-[11px] uppercase tracking-[0.16em] text-slate-500 md:text-xs ${bodyTextClass}`}>
                    {item.label}
                  </p>
                )}
              </article>
            )
          })}
      </div>
    </SectionShell>
  )
}
