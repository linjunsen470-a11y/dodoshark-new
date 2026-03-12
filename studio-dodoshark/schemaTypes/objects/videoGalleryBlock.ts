import {VideoIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {itemCount} from '../shared/studio'

export default defineType({
  name: 'videoGalleryBlock',
  title: 'Video Gallery Block',
  type: 'object',
  icon: VideoIcon,
  fields: [
    defineField({name: 'title', title: 'Gallery Title', type: 'string'}),
    defineField({name: 'videos', title: 'Videos', type: 'array', description: 'Each item requires a title and URL.', of: [{type: 'object', fields: [defineField({name: 'title', title: 'Video Title', type: 'string', validation: (rule) => rule.required()}), defineField({name: 'thumbnail', title: 'Thumbnail', type: 'image', options: {hotspot: true}, fields: [{name: 'alt', type: 'string', title: 'Alt Text', validation: (Rule) => Rule.required()}]}), defineField({name: 'url', title: 'Video URL', type: 'url', description: 'Example: YouTube or Vimeo link.', validation: (rule) => rule.required()})], preview: {select: {title: 'title', media: 'thumbnail', subtitle: 'url'}, prepare({title, media, subtitle}) { return {title: title || 'Untitled video', subtitle: subtitle || 'Video item', media} }}}]}),
  ],
  preview: {select: {title: 'title', media: 'videos.0.thumbnail', videos: 'videos'}, prepare({title, media, videos}) { return {title: title || 'Video Gallery Block', subtitle: `${itemCount(videos)} videos`, media} }},
})