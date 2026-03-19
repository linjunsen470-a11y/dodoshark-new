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
    defineField({name: 'tagFilters', title: 'Tag Filters', type: 'array', of: [{type: 'reference', to: [{type: 'contentTag'}]}], validation: (rule) => rule.unique(), description: 'Optional shared tags shown on the listing page. Leave empty to use all shared tags.'}),
    defineField({name: 'cta', title: 'Bottom CTA', type: 'object', fields: [defineField({name: 'title', title: 'Title', type: 'string'}), defineField({name: 'buttonText', title: 'Button Text', type: 'string'}), defineField({name: 'buttonLink', title: 'Button Link', type: 'url'})]}),
  ],
  preview: {select: {title: 'hero.title', subtitle: 'hero.subtitle', media: 'hero.image', stats: 'hero.stats', tags: 'tagFilters'}, prepare({title, subtitle, media, stats, tags}) { return {title: title || 'Case Studies Listing Page', subtitle: pickText(subtitle, itemCount(tags) ? `${itemCount(tags)} tag filters` : undefined, itemCount(stats) ? `${itemCount(stats)} hero stats` : undefined) || 'Case studies listing singleton', media} }},
})
