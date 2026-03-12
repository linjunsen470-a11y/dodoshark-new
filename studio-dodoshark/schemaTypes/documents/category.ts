import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Category Name',
      type: 'string',
      description: 'Example: Agriculture / Food Processing / Biomass Energy.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      description: 'Used in category links and filters.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Optional editorial note for internal use.',
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'description'},
    prepare({title, subtitle}) {
      return {
        title: title || 'Untitled category',
        subtitle: subtitle || 'Category taxonomy item',
      }
    },
  },
})