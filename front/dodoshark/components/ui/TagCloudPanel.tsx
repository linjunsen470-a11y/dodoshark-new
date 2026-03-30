import Link from 'next/link'
import { renderSentenceCase } from '@/app/lib/sanity-utils'

export type TagCloudItem = {
  key: string
  href: string
  label: string
  active: boolean
}

type TagCloudPanelProps = {
  title: string
  description?: string
  allLabel: string
  allHref: string
  allActive: boolean
  items: TagCloudItem[]
}

export default function TagCloudPanel({
  title,
  description,
  allLabel,
  allHref,
  allActive,
  items,
}: TagCloudPanelProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/85 p-6 shadow-sm sm:p-7">
      <div className="mb-5 text-center">
        <h2 className="text-[1.65rem] font-display font-black tracking-tight text-slate-900 sm:text-[1.85rem]">
          {renderSentenceCase(title)}
        </h2>
        {description ? (
          <p className="mt-2 text-sm leading-relaxed text-slate-500">{description}</p>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-2.5">
        <Link
          href={allHref}
          className={`whitespace-nowrap rounded-lg border px-4 py-1.5 text-[11px] font-medium transition-all sm:px-[18px] sm:text-xs ${
            allActive
              ? 'border-slate-900 bg-slate-800 text-white'
              : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-800'
          }`}
        >
          {renderSentenceCase(allLabel)}
        </Link>

        {items.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className={`whitespace-nowrap rounded-lg border px-4 py-1.5 text-[11px] font-medium transition-all sm:px-[18px] sm:text-xs ${
              item.active
                ? 'border-slate-900 bg-slate-800 text-white'
                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-800'
            }`}
            >
            {renderSentenceCase(item.label)}
          </Link>
        ))}
      </div>
    </div>
  )
}
