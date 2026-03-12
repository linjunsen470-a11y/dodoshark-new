import {DocumentTextIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {pickText} from '../shared/studio'

export default defineType({
  name: 'blogPage',
  title: 'Blog Listing Page',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({name: 'seo', title: 'SEO Settings', type: 'seoMeta'}),
    defineField({name: 'hero', title: 'Hero Section', type: 'object', fields: [defineField({name: 'badge', title: 'Badge', type: 'string'}), defineField({name: 'title', title: 'Title', type: 'string', description: 'Main listing page heading.', validation: (rule) => rule.required()}), defineField({name: 'subtitle', title: 'Subtitle', type: 'text', rows: 3}), defineField({name: 'image', title: 'Hero Image', type: 'image', options: {hotspot: true}, fields: [{name: 'alt', type: 'string', title: 'Alt Text', validation: (Rule) => Rule.required()}]})]}),
    defineField({name: 'categories', title: 'Category Filters', type: 'array', of: [{type: 'reference', to: [{type: 'category'}]}], validation: (rule) => rule.unique(), description: 'Categories available as blog listing filters.'}),
    defineField({name: 'featuredPost', title: 'Featured Post', type: 'reference', to: [{type: 'post'}], description: 'Highlighted article for the top section.'}),
  ],
  preview: {select: {title: 'hero.title', subtitle: 'hero.subtitle', media: 'hero.image', featuredTitle: 'featuredPost.title'}, prepare({title, subtitle, media, featuredTitle}) { return {title: title || 'Blog Listing Page', subtitle: pickText(subtitle, featuredTitle ? `Featured: ${featuredTitle}` : undefined) || 'Blog listing singleton', media} }},
})