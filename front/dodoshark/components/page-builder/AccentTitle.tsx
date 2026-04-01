import { renderText } from '@/lib/sanity-utils'

export default function AccentTitle({
  title,
  reserveSpace = false,
  className = '',
}: {
  title?: string
  reserveSpace?: boolean
  className?: string
}) {
  const resolvedTitle = renderText(title)

  if (!resolvedTitle && !reserveSpace) return null

  if (!resolvedTitle) {
    return <div aria-hidden className={`min-h-[1.75rem] md:min-h-[2rem] ${className}`.trim()} />
  }

  return (
    <div className={`flex min-h-[1.75rem] items-stretch gap-3 md:min-h-[2rem] ${className}`.trim()}>
      <div className="w-1 shrink-0 self-stretch rounded-full bg-orange-500" />
      <p className="whitespace-pre-line font-display text-lg font-extrabold leading-[1.1] tracking-[-0.02em] text-slate-900 md:text-xl">
        {resolvedTitle}
      </p>
    </div>
  )
}
