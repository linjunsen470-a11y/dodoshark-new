import {EnvelopeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {pickText} from '../shared/studio'

function imageField(name: string, title: string, description: string) {
  return defineField({
    name,
    title,
    type: 'image',
    description,
    options: {hotspot: true},
    fields: [
      defineField({
        name: 'alt',
        type: 'string',
        title: 'Alt Text',
        validation: (Rule) => Rule.required(),
      }),
    ],
  })
}

function deprecatedField(config: Parameters<typeof defineField>[0]) {
  return defineField({
    ...config,
    deprecated: {
      reason:
        'No longer consumed by the frontend. Kept temporarily to avoid data loss during cleanup.',
    },
    readOnly: true,
    hidden: ({value}) => value === undefined,
    initialValue: undefined,
  })
}

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({name: 'seo', title: 'SEO Settings', type: 'seoMeta'}),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({name: 'subtitle', title: 'Subtitle', type: 'text', rows: 3}),
        imageField('backgroundImage', 'Background Image', 'Hero background image.'),
        deprecatedField({
          name: 'tag',
          title: 'Top Tag (Deprecated)',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'showroom',
      title: 'Showroom Card',
      type: 'object',
      fields: [
        defineField({name: 'title', title: 'Title', type: 'string'}),
        defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
        imageField('image', 'Image', 'Main showroom image shown beside the form.'),
      ],
    }),
    defineField({
      name: 'inquiryPanel',
      title: 'Inquiry Panel',
      type: 'object',
      fields: [
        defineField({name: 'title', title: 'Title', type: 'string'}),
        defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
      ],
    }),
    deprecatedField({
      name: 'stats',
      title: 'Response Stats (Deprecated)',
      type: 'object',
      fields: [
        defineField({name: 'respTime', title: 'Response Time', type: 'string'}),
        defineField({name: 'testCycle', title: 'Test Cycle', type: 'string'}),
      ],
    }),
    deprecatedField({
      name: 'globalOffices',
      title: 'Global Offices (Deprecated)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'region', title: 'Region', type: 'string'}),
            defineField({name: 'tag', title: 'Status Tag', type: 'string'}),
            defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
            defineField({name: 'hours', title: 'Working Hours', type: 'string'}),
          ],
          preview: {
            select: {title: 'region', subtitle: 'tag'},
            prepare({title, subtitle}) {
              return {title: title || 'Untitled office', subtitle: subtitle || 'Office item'}
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'hero.title', subtitle: 'inquiryPanel.title', media: 'hero.backgroundImage'},
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Contact Page',
        subtitle: pickText(subtitle) || 'Contact page singleton',
        media,
      }
    },
  },
})
