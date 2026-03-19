import {VideoIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {joinPreview, pickText} from '../shared/studio'

function isValidYouTubeUrl(value?: string) {
  if (!value) return true

  let parsed: URL
  try {
    parsed = new URL(value)
  } catch {
    return false
  }

  if (parsed.protocol !== 'https:') return false

  const host = parsed.hostname.toLowerCase()
  const pathname = parsed.pathname

  if (host === 'youtu.be') {
    return Boolean(pathname.split('/').filter(Boolean)[0])
  }

  if (host.includes('youtube.com') || host.includes('youtube-nocookie.com')) {
    if (pathname === '/watch') return Boolean(parsed.searchParams.get('v'))

    const segments = pathname.split('/').filter(Boolean)
    if (!segments.length) return false

    if (segments[0] === 'embed' && segments[1]) return true
    if ((segments[0] === 'shorts' || segments[0] === 'live') && segments[1]) return true
  }

  return false
}

export default defineType({
  name: 'vlogItem',
  title: 'Vlog Video',
  type: 'document',
  icon: VideoIcon,
  groups: [
    {name: 'basic', title: 'Basic', default: true},
    {name: 'relations', title: 'Relations'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'seo', title: 'SEO Settings', type: 'seoMeta', group: 'seo'}),
    defineField({
      name: 'title',
      title: 'Video Title',
      type: 'string',
      group: 'basic',
      description: 'Main video title used on the listing page.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      group: 'basic',
      description: 'Supports standard YouTube, youtu.be, shorts, live, or embed links.',
      validation: (rule) =>
        rule
          .required()
          .uri({scheme: ['https']})
          .custom((value) => (isValidYouTubeUrl(value) ? true : 'Please enter a valid HTTPS YouTube URL.')),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      group: 'basic',
      description: 'Main card image for the vlog listing.',
      options: {hotspot: true},
      fields: [{name: 'alt', type: 'string', title: 'Alt Text', validation: (Rule) => Rule.required()}],
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      group: 'basic',
      description: 'Short description shown under the video title.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      group: 'basic',
      description: 'Used for sorting and editorial tracking.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'internalCategory',
      title: 'Internal Category',
      type: 'string',
      group: 'basic',
      description: 'Optional internal grouping label for editors. Not used in frontend filters.',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'basic',
      initialValue: 'draft',
      options: {
        list: [
          {title: 'Draft', value: 'draft'},
          {title: 'Published', value: 'published'},
          {title: 'Archived', value: 'archived'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      group: 'basic',
      initialValue: false,
      description: 'Reserved for future editorial highlighting.',
    }),
    defineField({
      name: 'product',
      title: 'Primary Product',
      type: 'reference',
      to: [{type: 'product'}],
      group: 'relations',
      description: 'Optional product associated with this video.',
    }),
    defineField({
      name: 'tags',
      title: 'Shared Tags',
      type: 'array',
      group: 'relations',
      description: 'Used for /vlog filters and shared with case studies.',
      of: [{type: 'reference', to: [{type: 'contentTag'}]}],
      validation: (rule) => rule.unique(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      status: 'status',
      publishedAt: 'publishedAt',
      firstTag: 'tags.0.title',
      media: 'coverImage',
    },
    prepare({title, status, publishedAt, firstTag, media}) {
      const publishedLabel =
        typeof publishedAt === 'string' && publishedAt.trim()
          ? (() => {
              const date = new Date(publishedAt)
              return Number.isNaN(date.getTime()) ? undefined : date.toLocaleDateString('en-US')
            })()
          : undefined

      return {
        title: title || 'Untitled vlog video',
        subtitle:
          pickText(joinPreview([status, firstTag, publishedLabel]), 'Vlog video'),
        media,
      }
    },
  },
  orderings: [{title: 'Published Date (Newest)', name: 'publishedAtDesc', by: [{field: 'publishedAt', direction: 'desc'}]}],
})
