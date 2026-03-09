import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'contactPage',
    title: '联系我们',
    type: 'document',
    icon: () => '📞',
    fields: [
        defineField({ name: 'seo', title: 'SEO 设置', type: 'seoMeta' }),
        defineField({
            name: 'hero',
            title: 'Hero 区',
            type: 'object',
            fields: [
                defineField({ name: 'tag', title: '顶部标签', type: 'string' }),
                defineField({ name: 'title', title: '主标题', type: 'string', validation: (rule) => rule.required() }),
                defineField({ name: 'subtitle', title: '副标题', type: 'text', rows: 3 }),
            ],
        }),
        defineField({
            name: 'stats',
            title: '响应统计',
            type: 'object',
            fields: [
                defineField({ name: 'respTime', title: '响应时间', type: 'string', description: '如 24h' }),
                defineField({ name: 'testCycle', title: '测试周期', type: 'string', description: '如 72h' }),
            ],
        }),
        defineField({
            name: 'globalOffices',
            title: '全球办事处',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'region', title: '区域名称', type: 'string' }),
                        defineField({ name: 'tag', title: '状态标签', type: 'string' }),
                        defineField({ name: 'description', title: '描述', type: 'text', rows: 3 }),
                        defineField({ name: 'hours', title: '工作时间', type: 'string' }),
                    ],
                    preview: {
                        select: { title: 'region', subtitle: 'tag' },
                    },
                },
            ],
        }),
    ],
    preview: {
        prepare() {
            return { title: '联系我们' }
        },
    },
})
