'use client'

import { renderSentenceCase } from '@/app/lib/sanity-utils'
import { normalizeYouTubeEmbedUrl } from '@/app/lib/video'
import VideoPreviewTrigger from '@/components/ui/VideoPreviewTrigger'
import Icon from '@/components/ui/Icon'

export type VlogVideoCardItem = {
  id: string
  title: string
  excerpt: string
  imageSrc?: string
  imageAlt?: string
  youtubeUrl?: string
  tagLabel: string
}

type VlogVideoGridProps = {
  items: VlogVideoCardItem[]
}

export default function VlogVideoGrid({ items }: VlogVideoGridProps) {
  return (
    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const canPlay = Boolean(normalizeYouTubeEmbedUrl(item.youtubeUrl || ''))

        return (
          <article key={item.id} className="premium-card flex flex-col overflow-hidden">
            <VideoPreviewTrigger
              title={item.title}
              youtubeUrl={item.youtubeUrl}
              imageSrc={item.imageSrc}
              imageAlt={item.imageAlt || item.title || 'Video cover'}
              className="group"
              mediaClassName="h-64"
              imageSizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            >
              <div className="flex flex-1 flex-col p-8">
                <div className="mb-4 flex justify-center">
                  <div
                    className="inline-flex max-w-full items-center gap-2 whitespace-nowrap rounded-full border border-orange-200 bg-orange-50 px-3 py-1.5 text-[13px] font-semibold leading-none text-orange-600 shadow-[0_8px_24px_rgba(249,115,22,0.08)]"
                    title={renderSentenceCase(item.tagLabel)}
                  >
                    <span className="h-2 w-2 shrink-0 rounded-full bg-orange-400" />
                    <span className="block truncate max-w-[180px]">
                      {renderSentenceCase(item.tagLabel)}
                    </span>
                  </div>
                </div>

                <h3 className="mb-4 line-clamp-2 text-xl font-bold leading-snug text-slate-900 transition-colors group-hover:text-orange-500 group-focus-visible:text-orange-500">
                  {item.title}
                </h3>
                <p className="line-clamp-3 text-sm font-light text-slate-500">
                  {item.excerpt || 'Watch the full video for equipment demos and process highlights.'}
                </p>
                <div className="mt-auto flex items-center justify-center border-t border-slate-50 pt-6">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#14b8a6] underline decoration-current underline-offset-4 transition-colors duration-200 group-hover:text-[#f59e0b] group-focus-visible:text-[#f59e0b]">
                    {canPlay ? 'Play Video' : 'Video Unavailable'}
                    <Icon icon="arrow-right" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </VideoPreviewTrigger>
          </article>
        )
      })}
    </div>
  )
}
