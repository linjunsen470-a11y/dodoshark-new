import {BulbOutlineIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {itemCount, pickText} from '../shared/studio'

export default defineType({
  name: 'solutionsPage',
  title: 'Solutions Listing Page',
  type: 'document',
  icon: BulbOutlineIcon,
  fields: [
    defineField({name: 'seo', title: 'SEO Settings', type: 'seoMeta'}),
    defineField({name: 'hero', title: 'Hero Section', type: 'object', fields: [defineField({name: 'badge', title: 'Badge', type: 'string'}), defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}), defineField({name: 'subtitle', title: 'Subtitle', type: 'text', rows: 3}), defineField({name: 'image', title: 'Hero Image', type: 'image', options: {hotspot: true}, fields: [{name: 'alt', type: 'string', title: 'Alt Text', validation: (Rule) => Rule.required()}]})]}),
    defineField({name: 'solutionCategories', title: 'Category Filters', type: 'array', of: [{type: 'reference', to: [{type: 'category'}]}], validation: (rule) => rule.unique(), description: 'Categories available as solution filters.'}),
    defineField({name: 'featuredSolutions', title: 'Featured Solutions', type: 'array', of: [{type: 'reference', to: [{type: 'solution'}]}], validation: (rule) => rule.unique(), description: 'Highlighted solutions for lead sections.'}),
  ],
  preview: {select: {title: 'hero.title', subtitle: 'hero.subtitle', media: 'hero.image', featuredSolutions: 'featuredSolutions'}, prepare({title, subtitle, media, featuredSolutions}) { return {title: title || 'Solutions Listing Page', subtitle: pickText(subtitle, itemCount(featuredSolutions) ? `${itemCount(featuredSolutions)} featured solutions` : undefined) || 'Solutions listing singleton', media} }},
})