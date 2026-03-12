import {SearchIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'seoMeta',
  title: 'SEO Settings',
  type: 'object',
  icon: SearchIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'SEO Title',
      type: 'string',
      description: 'Recommended length: 50-60 characters. Falls back to the page title when empty.',
      validation: (rule) => rule.max(70).warning('Recommended: keep within 60 characters.'),
    }),
    defineField({
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Recommended length: within 160 characters. Used for search result snippets.',
      validation: (rule) => rule.max(160).warning('Recommended: keep within 160 characters.'),
    }),
    defineField({
      name: 'keywords',
      title: 'Keyword Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      description: 'Editorial keyword tags for internal SEO organization.',
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Share Image',
      type: 'image',
      description: 'Recommended size: 1200 x 630 px.',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Describe the image for accessibility and editorial clarity.',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'Use when multiple URLs could show the same content.',
    }),
    defineField({
      name: 'noIndex',
      title: 'No Index',
      type: 'boolean',
      description: 'Enable only when this page should stay out of search results.',
      initialValue: false,
    }),
  ],
})