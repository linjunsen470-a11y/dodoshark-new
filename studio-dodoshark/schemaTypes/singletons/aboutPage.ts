import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'aboutPage',
    title: '关于我们',
    type: 'document',
    icon: () => '📋',
    groups: [
        { name: 'hero', title: 'Hero 区', default: true },
        { name: 'seo', title: 'SEO' },
    ],
    fields: [
        defineField({ name: 'seo', title: 'SEO 设置', type: 'seoMeta', group: 'seo' }),
        // --- Hero ---
        defineField({
            name: 'hero',
            title: 'Hero 区',
            type: 'object',
            group: 'hero',
            fields: [
                defineField({ name: 'estYear', title: '成立年份', type: 'string', description: '如 Est. 2006' }),
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
            ],
        }),
    ],
    preview: {
        prepare() {
            return { title: '关于我们' }
        },
    },
})
