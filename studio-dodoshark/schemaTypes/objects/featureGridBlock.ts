import {ThLargeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'featureGridBlock',
  title: 'Feature Grid',
  type: 'object',
  icon: ThLargeIcon,
  fields: [
    defineField({name: 'title', title: 'Grid Title', type: 'string'}),
    defineField({name: 'items', title: 'Items', type: 'array', description: 'Each item represents one feature card.', of: [{type: 'object', fields: [defineField({name: 'icon', title: 'Icon Class', type: 'string', description: 'Example: fa-gear'}), defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}), defineField({name: 'description', title: 'Description', type: 'text', rows: 3}), defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}, fields: [{name: 'alt', type: 'string', title: 'Alt Text', validation: (Rule) => Rule.required()}]})], preview: {select: {title: 'title', subtitle: 'icon', media: 'image'}, prepare({title, subtitle, media}) { return {title: title || 'Untitled feature', subtitle: subtitle || 'Feature item', media} }}}]}),
  ],
  preview: {select: {title: 'title', media: 'items.0.image', items: 'items'}, prepare({title, media, items}) { const count = Array.isArray(items) ? items.length : 0; return {title: title || 'Feature Grid', subtitle: `${count} feature items`, media} }},
})