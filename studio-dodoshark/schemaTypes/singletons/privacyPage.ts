import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {itemCount, pickText} from '../shared/studio'

const sectionFields = [
  defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
  defineField({
    name: 'body',
    title: 'Paragraphs',
    type: 'array',
    of: [defineArrayMember({type: 'text', rows: 3})],
    validation: (rule) => rule.min(1),
  }),
]

export default defineType({
  name: 'privacyPage',
  title: 'Privacy Page',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'content', title: 'Sections'},
    {name: 'cta', title: 'Bottom CTA'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'seo', title: 'SEO Settings', type: 'seoMeta', group: 'seo'}),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated Label',
      type: 'string',
      group: 'hero',
      description: 'Example: March 4, 2026',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 3,
      group: 'hero',
    }),
    defineField({
      name: 'sections',
      title: 'Policy Sections',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({type: 'object', fields: sectionFields})],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'bottomCta',
      title: 'Bottom CTA',
      type: 'object',
      group: 'cta',
      fields: [
        defineField({name: 'title', title: 'Title', type: 'string'}),
        defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
        defineField({name: 'buttonLabel', title: 'Button Label', type: 'string'}),
        defineField({name: 'buttonHref', title: 'Button Link', type: 'string'}),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heroTitle',
      lastUpdated: 'lastUpdated',
      sections: 'sections',
    },
    prepare({title, lastUpdated, sections}) {
      return {
        title: title || 'Privacy Page',
        subtitle:
          pickText(lastUpdated, itemCount(sections) ? `${itemCount(sections)} sections` : undefined) ||
          'Privacy policy singleton',
      }
    },
  },
})
