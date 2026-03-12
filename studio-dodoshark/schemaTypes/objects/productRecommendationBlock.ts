import {WrenchIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {itemCount} from '../shared/studio'

export default defineType({
  name: 'productRecommendationBlock',
  title: 'Product Recommendation Block',
  type: 'object',
  icon: WrenchIcon,
  fields: [
    defineField({name: 'title', title: 'Block Title', type: 'string'}),
    defineField({name: 'subtitle', title: 'Block Subtitle', type: 'text', rows: 2}),
    defineField({name: 'recommendedProducts', title: 'Recommended Products', type: 'array', of: [{type: 'reference', to: [{type: 'product'}]}], validation: (rule) => rule.unique(), description: 'Choose one or more product documents.'}),
  ],
  preview: {select: {title: 'title', media: 'recommendedProducts.0.mainImage', items: 'recommendedProducts'}, prepare({title, media, items}) { return {title: title || 'Product Recommendation Block', subtitle: `${itemCount(items)} recommended products`, media} }},
})