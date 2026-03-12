import {CaseIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {itemCount, pickText} from '../shared/studio'

export default defineType({
  name: 'casesPage',
  title: 'Case Studies Listing Page',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({name: 'seo', title: 'SEO Settings', type: 'seoMeta'}),
    defineField({name: 'hero', title: 'Hero Section', type: 'object', fields: [defineField({name: 'badge', title: 'Badge', type: 'string'}), defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}), defineField({name: 'subtitle', title: 'Subtitle', type: 'text', rows: 3}), defineField({name: 'image', title: 'Hero Image', type: 'image', options: {hotspot: true}, fields: [{name: 'alt', type: 'string', title: 'Alt Text', validation: (Rule) => Rule.required()}]}), defineField({name: 'stats', title: 'Hero Stats', type: 'array', of: [{type: 'object', fields: [defineField({name: 'label', title: 'Label', type: 'string'}), defineField({name: 'value', title: 'Value', type: 'string'})], preview: {select: {title: 'label', subtitle: 'value'}}}]})]}),
    defineField({name: 'industries', title: 'Industry Filters', type: 'array', of: [{type: 'reference', to: [{type: 'category'}]}], validation: (rule) => rule.unique(), description: 'Industry filters shown on the listing page.'}),
    defineField({name: 'cta', title: 'Bottom CTA', type: 'object', fields: [defineField({name: 'title', title: 'Title', type: 'string'}), defineField({name: 'buttonText', title: 'Button Text', type: 'string'}), defineField({name: 'buttonLink', title: 'Button Link', type: 'url'})]}),
  ],
  preview: {select: {title: 'hero.title', subtitle: 'hero.subtitle', media: 'hero.image', stats: 'hero.stats'}, prepare({title, subtitle, media, stats}) { return {title: title || 'Case Studies Listing Page', subtitle: pickText(subtitle, itemCount(stats) ? `${itemCount(stats)} hero stats` : undefined) || 'Case studies listing singleton', media} }},
})