type SectionHeaderProps = {
  title?: string
  subtitle?: string
  isDark?: boolean
  align?: 'left' | 'center'
  className?: string
  titleClassName?: string
  subtitleClassName?: string
}

export default function SectionHeader({
  title,
  subtitle,
  isDark = false,
  align = 'center',
  className = '',
  titleClassName = '',
  subtitleClassName = '',
}: SectionHeaderProps) {
  if (!title && !subtitle) return null

  const alignClass = align === 'left' ? 'text-left' : 'text-center'
  const lineAlignClass = align === 'left' ? 'mx-0' : 'mx-auto'
  const lineClass = isDark
    ? 'bg-gradient-to-r from-slate-300 to-orange-400'
    : 'bg-gradient-to-r from-slate-800 to-orange-500'
  const resolvedSubtitleClass = subtitleClassName || (isDark ? 'text-slate-300' : 'text-slate-600')

  return (
    <header className={`${alignClass} ${className}`.trim()}>
      {title && (
        <h2 className={titleClassName}>
          {title}
        </h2>
      )}
      {subtitle && (
        <p className={resolvedSubtitleClass}>
          {subtitle}
        </p>
      )}
      <div className={`mt-6 h-1 w-16 rounded-md ${lineClass} ${lineAlignClass}`} />
    </header>
  )
}
