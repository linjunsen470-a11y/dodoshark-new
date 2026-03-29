import type { ReactNode } from 'react'
import { renderText } from '@/app/lib/sanity-utils'

import {
  eyebrowClass,
  getSectionToneClasses,
  sectionSubtitleClass,
  sectionTitleClass,
  type SectionSpacing,
  type SectionTone,
} from './sectionStyles'

type SectionHeaderProps = {
  eyebrow?: ReactNode
  title?: ReactNode
  subtitle?: ReactNode
  isDark?: boolean
  tone?: SectionTone
  align?: 'left' | 'center'
  spacing?: SectionSpacing
  showDivider?: boolean
  className?: string
  titleClassName?: string
  subtitleClassName?: string
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  isDark = false,
  tone,
  align = 'center',
  spacing = 'default',
  showDivider = true,
  className = '',
  titleClassName = '',
  subtitleClassName = '',
}: SectionHeaderProps) {
  const resolvedTone = tone ?? (isDark ? 'dark' : 'light')
  const toneClasses = getSectionToneClasses(resolvedTone)
  const alignClass = align === 'left' ? 'text-left' : 'text-center'
  const lineAlignClass = align === 'left' ? 'mx-0' : 'mx-auto'
  const stackClass = spacing === 'compact' ? 'space-y-3' : 'space-y-4'
  const dividerSpacingClass = spacing === 'compact' ? 'mt-4' : 'mt-5'
  const resolvedTitle = typeof title === 'string' ? renderText(title) : title
  const resolvedSubtitle = typeof subtitle === 'string' ? renderText(subtitle) : subtitle
  const resolvedSubtitleClass =
    subtitleClassName || `${sectionSubtitleClass} max-w-3xl ${toneClasses.subtitle}`

  if (!eyebrow && !resolvedTitle && !resolvedSubtitle) return null

  return (
    <header className={`${alignClass} ${className}`.trim()}>
      <div className={stackClass}>
        {eyebrow && (
          <p className={`${eyebrowClass} ${toneClasses.eyebrow}`}>
            {eyebrow}
          </p>
        )}
        {resolvedTitle && (
          <h2
            className={`${sectionTitleClass} whitespace-pre-line ${toneClasses.title} ${titleClassName}`.trim()}
          >
            {resolvedTitle}
          </h2>
        )}
        {resolvedSubtitle && (
          <p className={`whitespace-pre-line ${resolvedSubtitleClass}`.trim()}>
            {resolvedSubtitle}
          </p>
        )}
      </div>
      {showDivider && (resolvedTitle || resolvedSubtitle) && (
        <div
          className={`${dividerSpacingClass} h-1.5 w-20 rounded-full ${toneClasses.divider} ${lineAlignClass}`}
        />
      )}
    </header>
  )
}
