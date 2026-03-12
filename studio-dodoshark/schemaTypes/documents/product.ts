import {WrenchIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {joinPreview, pickText} from '../shared/studio'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: WrenchIcon,
  groups: [
    {name: 'basic', title: 'Basic', default: true},
    {name: 'content', title: 'Page Content'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'seo', title: 'SEO Settings', type: 'seoMeta', group: 'seo'}),
    defineField({name: 'title', title: 'Product Name', type: 'string', description: 'Main product title.', group: 'basic', validation: (rule) => rule.required()}),
    defineField({name: 'slug', title: 'URL Slug', type: 'slug', group: 'basic', options: {source: 'title', maxLength: 96}, description: 'Used for the product detail URL.', validation: (rule) => rule.required()}),
    defineField({name: 'category', title: 'Category', type: 'reference', to: [{type: 'category'}], group: 'basic', description: 'Used in product listing filters.'}),
    defineField({name: 'seriesTag', title: 'Series Tag', type: 'string', group: 'basic', description: 'Optional short label such as Industrial Crushing Series.'}),
    defineField({name: 'shortDescription', title: 'Short Description', type: 'text', rows: 3, group: 'basic', description: 'Used in cards and quick summaries.'}),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      group: 'basic',
      description: 'Primary product image used in Studio previews and cards.',
      options: {hotspot: true},
      fields: [{name: 'alt', type: 'string', title: 'Alt Text', validation: (Rule) => Rule.required()}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'contentBlocks',
      title: 'Page Builder',
      type: 'array',
      group: 'content',
      description: 'Blocks are rendered in this order on the product page.',
      of: [
        {type: 'heroBlock'},
        {type: 'richSectionBlock'},
        {type: 'featureListBlock'},
        {type: 'mediaGalleryBlock'},
        {type: 'cardGridBlock'},
        {type: 'tableBlock'},
        {type: 'metricsBlock'},
        {type: 'ctaBlock'},
        {type: 'portableTextBlock'},
        {type: 'collectionReferenceBlock'},
        {type: 'machineSelectorBlock'},
        {type: 'showcaseBlock'},
      ],
    }),
  ],
  preview: {
    select: {title: 'title', categoryTitle: 'category.title', seriesTag: 'seriesTag', description: 'shortDescription', media: 'mainImage'},
    prepare({title, categoryTitle, seriesTag, description, media}) {
      return {
        title: title || 'Untitled product',
        subtitle: pickText(joinPreview([seriesTag, categoryTitle]), description) || 'Product document',
        media,
      }
    },
  },
})