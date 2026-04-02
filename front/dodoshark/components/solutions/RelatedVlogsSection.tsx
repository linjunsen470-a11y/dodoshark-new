'use client'

import React from 'react'
import VlogVideoGrid, { type VlogVideoCardItem } from '@/components/vlog/VlogVideoGrid'
import SectionHeader from '@/components/page-builder/SectionHeader'
import SectionShell from '@/components/page-builder/SectionShell'
import { toImageSrc } from '@/lib/sanity-utils'
import type { SanityImage } from '@/lib/types/sanity'

type RelatedVlogDoc = {
  _id: string
  title?: string
  excerpt?: string
  youtubeUrl?: string
  thumbnail?: SanityImage
  category?: { title?: string }
}

type RelatedVlogsSectionProps = {
  vlogs: Array<RelatedVlogDoc | null | undefined>
}

export default function RelatedVlogsSection({ vlogs }: RelatedVlogsSectionProps) {
  if (!vlogs || vlogs.length === 0) return null

  const validVlogs = vlogs.filter((vlog): vlog is RelatedVlogDoc => Boolean(vlog?._id))

  if (validVlogs.length === 0) return null

  // Transform vlogs into the format expected by VlogVideoGrid
  const vlogItems: VlogVideoCardItem[] = validVlogs.map((vlog) => ({
    id: vlog._id,
    title: vlog.title || 'Untitled Video',
    excerpt: vlog.excerpt || 'Watch the full video demonstration.',
    imageSrc: toImageSrc(vlog.thumbnail, 800, { height: 500, fit: 'crop' }),
    imageAlt: vlog.thumbnail?.alt || vlog.title || 'Video thumbnail',
    youtubeUrl: vlog.youtubeUrl,
    tagLabel: vlog.category?.title || 'Solution Video',
  }))

  return (
    <SectionShell sectionClassName="bg-white border-t border-slate-100">
      <SectionHeader
        title="Related Videos"
        tone="light"
        className="mb-12"
      />
      <VlogVideoGrid items={vlogItems} />
    </SectionShell>
  )
}
