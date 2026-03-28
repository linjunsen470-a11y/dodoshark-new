import {BulbOutlineIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {itemCount, pickText} from '../shared/studio'

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
  name: 'solutionsPage',
  title: 'Solutions Listing Page',
  type: 'document',
  icon: BulbOutlineIcon,
  fields: [
    defineField({name: 'seo', title: 'SEO Settings', type: 'seoMeta'}),
    defineField({name: 'hero', title: 'Hero Section', type: 'object', fields: [defineField({name: 'badge', title: 'Badge', type: 'string'}), defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}), defineField({name: 'subtitle', title: 'Subtitle', type: 'text', rows: 3}), defineField({name: 'image', title: 'Hero Image', type: 'image', options: {hotspot: true}, fields: [{name: 'alt', type: 'string', title: 'Alt Text', validation: (Rule) => Rule.required()}]})]}),
    defineField({name: 'solutionCategories', title: 'Category Filters', type: 'array', of: [{type: 'reference', to: [{type: 'category'}]}], validation: (rule) => rule.unique(), description: 'Categories available as solution filters.'}),
    deprecatedField({name: 'featuredSolutions', title: 'Featured Solutions (Deprecated)', type: 'array', of: [{type: 'reference', to: [{type: 'solution'}]}], validation: (rule) => rule.unique(), description: 'No longer consumed by the listing page.'}),
  ],
  preview: {select: {title: 'hero.title', subtitle: 'hero.subtitle', media: 'hero.image', categories: 'solutionCategories'}, prepare({title, subtitle, media, categories}) { return {title: title || 'Solutions Listing Page', subtitle: pickText(subtitle, itemCount(categories) ? `${itemCount(categories)} category filters` : undefined) || 'Solutions listing singleton', media} }},
})
