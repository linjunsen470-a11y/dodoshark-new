import {ControlsIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {itemCount, pickText} from '../shared/studio'

export default defineType({
  name: 'productVariant',
  title: 'Product Variant',
  type: 'document',
  icon: ControlsIcon,
  fields: [
    defineField({
      name: 'modelName',
      title: 'Model Name',
      type: 'string',
      description: 'Example: Model DS-19.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Variant Image',
      type: 'image',
      description: 'Shown in selector cards and Studio previews.',
      options: {hotspot: true},
      fields: [
        {name: 'alt', type: 'string', title: 'Alt Text', validation: (Rule) => Rule.required()},
      ],
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Optional short summary for selector cards.',
    }),
    defineField({
      name: 'specifications',
      title: 'Specifications',
      type: 'array',
      description: 'Each row represents one spec item.',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', title: 'Label', type: 'string', description: 'Example: Output'},
            {name: 'value', title: 'Value', type: 'string', description: 'Example: 80 - 150'},
            {name: 'unit', title: 'Unit', type: 'string', description: 'Example: kg/h'},
          ],
          preview: {
            select: {label: 'label', value: 'value', unit: 'unit'},
            prepare({label, value, unit}) {
              return {
                title: label || 'Untitled spec',
                subtitle: pickText([value, unit].filter(Boolean).join(' '), 'Specification row'),
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'modelName', subtitle: 'shortDescription', media: 'image', specifications: 'specifications'},
    prepare({title, subtitle, media, specifications}) {
      return {
        title: title || 'Untitled variant',
        subtitle: pickText(subtitle, itemCount(specifications) ? `${itemCount(specifications)} specs` : undefined) || 'Product variant',
        media,
      }
    },
  },
})