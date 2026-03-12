import {PlugIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'accessory',
  title: 'Accessory',
  type: 'document',
  icon: PlugIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Accessory Name',
      type: 'string',
      description: 'Example: Pulse Dust Collector.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Accessory Image',
      type: 'image',
      description: 'Used in Studio previews and reference cards.',
      options: {hotspot: true},
      fields: [
        {name: 'alt', type: 'string', title: 'Alt Text', validation: (Rule) => Rule.required()},
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Optional short summary for editors and cards.',
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'description', media: 'image'},
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Untitled accessory',
        subtitle: subtitle || 'Accessory item',
        media,
      }
    },
  },
})