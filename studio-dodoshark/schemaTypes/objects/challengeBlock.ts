import {WarningOutlineIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'challengeBlock',
  title: 'Challenge Block',
  type: 'object',
  icon: WarningOutlineIcon,
  fields: [
    defineField({name: 'title', title: 'Block Title', type: 'string'}),
    defineField({name: 'items', title: 'Items', type: 'array', description: 'Each item represents one challenge card.', of: [{type: 'object', fields: [defineField({name: 'icon', title: 'Icon Class', type: 'string', description: 'Example: fa-exclamation-triangle'}), defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}), defineField({name: 'description', title: 'Description', type: 'text', rows: 3})], preview: {select: {title: 'title', subtitle: 'icon'}, prepare({title, subtitle}) { return {title: title || 'Untitled challenge', subtitle: subtitle || 'Challenge item'} }}}]}),
  ],
  preview: {select: {title: 'title', items: 'items'}, prepare({title, items}) { const count = Array.isArray(items) ? items.length : 0; return {title: title || 'Challenge Block', subtitle: `${count} challenge items`} }},
})