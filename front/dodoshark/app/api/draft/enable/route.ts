import { defineEnableDraftMode } from 'next-sanity/draft-mode'
import { previewClient } from '@/app/lib/sanity'

export const { GET } = defineEnableDraftMode({ client: previewClient })
