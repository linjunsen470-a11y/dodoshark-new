import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'seoMeta',
    title: 'SEO 设置',
    type: 'object',
    fields: [
        defineField({
            name: 'title',
            title: 'SEO 标题',
            type: 'string',
            description: '建议 50-60 字符，不填则使用页面标题',
            validation: (rule) => rule.max(70).warning('建议不超过 60 字符'),
        }),
        defineField({
            name: 'description',
            title: 'Meta 描述',
            type: 'text',
            rows: 3,
            description: '搜索引擎摘要，上限 160 字符',
            validation: (rule) => rule.max(160).warning('建议不超过 160 字符'),
        }),
        defineField({
            name: 'keywords',
            title: '关键词标签',
            type: 'array',
            of: [{ type: 'string' }],
            options: { layout: 'tags' },
            description: '标签化输入，用于内部 SEO 标记',
        }),
        defineField({
            name: 'ogImage',
            title: '社交媒体分享图',
            type: 'image',
            description: '推荐尺寸 1200×630px',
            options: { hotspot: true },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: '替代文字 (Alt Text)',
                    description: '描述图片内容，用于 SEO',
                    validation: (Rule) => Rule.required(),
                },
            ],
        }),
        defineField({
            name: 'canonicalUrl',
            title: '规范地址',
            type: 'url',
            description: '防止多路径重复内容权重分散',
        }),
        defineField({
            name: 'noIndex',
            title: '禁止搜索引擎收录',
            type: 'boolean',
            description: '开启后生成 noindex 标签',
            initialValue: false,
        }),
    ],
})
