import {InfoOutlineIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon: InfoOutlineIcon,
  groups: [{name: 'hero', title: 'Hero', default: true}, {name: 'seo', title: 'SEO'}],
  fields: [
    defineField({name: 'seo', title: 'SEO Settings', type: 'seoMeta', group: 'seo'}),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({name: 'estYear', title: 'Established Year', type: 'string', description: 'Example: Est. 2006'}),
        defineField({name: 'title', title: 'Title', type: 'string', description: 'Main hero title.', validation: (rule) => rule.required()}),
        defineField({name: 'subtitle', title: 'Subtitle', type: 'text', rows: 3, description: 'Supporting intro copy.'}),
        defineField({name: 'image', title: 'Hero Image', type: 'image', description: 'Used in the page hero and Studio preview.', options: {hotspot: true}, fields: [{name: 'alt', type: 'string', title: 'Alt Text', validation: (Rule) => Rule.required()}]}),
      ],
    }),
  ],
  preview: {select: {title: 'hero.title', subtitle: 'hero.subtitle', media: 'hero.image'}, prepare({title, subtitle, media}) { return {title: title || 'About Page', subtitle: subtitle || 'About page singleton', media} }},
})