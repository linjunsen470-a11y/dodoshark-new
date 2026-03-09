import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'solutionsPage',
    title: '解决方案聚合页',
    type: 'document',
    icon: () => '💡',
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
            ],
        }),
        defineField({
            name: 'solutionCategories',
            title: '分类筛选器',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'category' }] }],
            validation: (rule) => rule.unique(),
        }),
        defineField({
            name: 'featuredSolutions',
            title: '推荐解决方案',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'solution' }] }],
            validation: (rule) => rule.unique(),
        }),
    ],
    preview: {
        prepare() {
            return { title: '解决方案聚合页' }
        },
    },
})


