import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'productRecommendationBlock',
    title: '产品推荐',
    type: 'object',
    fields: [
        defineField({
            name: 'title',
            title: '块标题',
            type: 'string',
        }),
        defineField({
            name: 'subtitle',
            title: '块副标题',
            type: 'text',
            rows: 2,
        }),
        defineField({
            name: 'recommendedProducts',
            title: '推荐产品',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'product' }] }],
            validation: (rule) => rule.unique(),
            description: '从产品库中选择推荐产品',
        }),
    ],
    preview: {
        select: { title: 'title' },
        prepare({ title }) {
            return { title: title || '产品推荐', subtitle: 'Product Recommendation' }
        },
    },
})

