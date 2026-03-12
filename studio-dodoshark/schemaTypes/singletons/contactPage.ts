import {EnvelopeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {itemCount, pickText} from '../shared/studio'

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({name: 'seo', title: 'SEO Settings', type: 'seoMeta'}),
    defineField({name: 'hero', title: 'Hero Section', type: 'object', fields: [defineField({name: 'tag', title: 'Top Tag', type: 'string'}), defineField({name: 'title', title: 'Title', type: 'string', description: 'Main contact page heading.', validation: (rule) => rule.required()}), defineField({name: 'subtitle', title: 'Subtitle', type: 'text', rows: 3, description: 'Supporting intro copy.'})]}),
    defineField({name: 'stats', title: 'Response Stats', type: 'object', fields: [defineField({name: 'respTime', title: 'Response Time', type: 'string', description: 'Example: 24h'}), defineField({name: 'testCycle', title: 'Test Cycle', type: 'string', description: 'Example: 72h'})]}),
    defineField({name: 'globalOffices', title: 'Global Offices', type: 'array', description: 'Office cards shown on the contact page.', of: [{type: 'object', fields: [defineField({name: 'region', title: 'Region', type: 'string'}), defineField({name: 'tag', title: 'Status Tag', type: 'string'}), defineField({name: 'description', title: 'Description', type: 'text', rows: 3}), defineField({name: 'hours', title: 'Working Hours', type: 'string'})], preview: {select: {title: 'region', subtitle: 'tag'}, prepare({title, subtitle}) { return {title: title || 'Untitled office', subtitle: subtitle || 'Office item'} }}}]}),
  ],
  preview: {select: {title: 'hero.title', subtitle: 'hero.subtitle', offices: 'globalOffices'}, prepare({title, subtitle, offices}) { return {title: title || 'Contact Page', subtitle: pickText(subtitle, itemCount(offices) ? `${itemCount(offices)} offices` : undefined) || 'Contact page singleton'} }},
})