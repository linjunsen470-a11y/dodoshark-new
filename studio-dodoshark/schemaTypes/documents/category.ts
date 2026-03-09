import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'category',
    title: '分类标签',
    type: 'document',
    icon: () => '🏷️',
    fields: [
        defineField({
            name: 'title',
            title: '分类名称',
            type: 'string',
            description: '如 Agriculture, Food Processing, Biomass Energy',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'URL 路径',
            type: 'slug',
            options: { source: 'title', maxLength: 96 },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'description',
            title: '分类说明',
            type: 'text',
            rows: 3,
        }),
    ],
    preview: {
        select: { title: 'title' },
    },
})
