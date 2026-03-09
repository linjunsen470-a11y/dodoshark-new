import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'casesPage',
    title: '客户案例聚合页',
    type: 'document',
    icon: () => '🏆',
    fields: [
        defineField({ name: 'seo', title: 'SEO 设置', type: 'seoMeta' }),
        defineField({
            name: 'hero',
            title: 'Hero 区',
            type: 'object',
            fields: [
                defineField({ name: 'badge', title: '顶部标签', type: 'string' }),
                defineField({ name: 'title', title: '主标题', type: 'string', validation: (rule) => rule.required() }),
                defineField({ name: 'subtitle', title: '副标题', type: 'text', rows: 3 }),
                defineField({
                    name: 'image',
                    title: 'Hero 背景图',
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        {
                            name: 'alt',
                            type: 'string',
                            title: '替代文字 (Alt Text)',
                            validation: (Rule) => Rule.required(),
                        },
                    ],
                }),
                defineField({
                    name: 'stats',
                    title: '数据表现',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                defineField({ name: 'label', title: '标签', type: 'string' }),
                                defineField({ name: 'value', title: '数值', type: 'string' }),
                            ],
                            preview: {
                                select: { title: 'label', subtitle: 'value' },
                            },
                        },
                    ],
                }),
            ],
        }),
        defineField({
            name: 'industries',
            title: '行业筛选器',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'category' }] }],
            validation: (rule) => rule.unique(),
        }),
        defineField({
            name: 'cta',
            title: '底部行动号召',
            type: 'object',
            fields: [
                defineField({ name: 'title', title: '标题', type: 'string' }),
                defineField({ name: 'buttonText', title: '按钮文字', type: 'string' }),
                defineField({ name: 'buttonLink', title: '按钮链接', type: 'url' }),
            ],
        }),
    ],
    preview: {
        prepare() {
            return { title: '客户案例聚合页' }
        },
    },
})

