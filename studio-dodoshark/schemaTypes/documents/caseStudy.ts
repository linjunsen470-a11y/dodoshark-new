import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'caseStudy',
    title: '客户案例',
    type: 'document',
    icon: () => '📊',
    groups: [
        { name: 'basic', title: '基本信息', default: true },
        { name: 'content', title: '正文内容' },
        { name: 'relations', title: '关联' },
        { name: 'seo', title: 'SEO' },
    ],
    fields: [
        // --- SEO ---
        defineField({
            name: 'seo',
            title: 'SEO 设置',
            type: 'seoMeta',
            group: 'seo',
        }),
        // --- 基本信息 ---
        defineField({
            name: 'title',
            title: '案例标题',
            type: 'string',
            group: 'basic',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'URL 路径',
            type: 'slug',
            group: 'basic',
            options: { source: 'title', maxLength: 96 },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'coverImage',
            title: '封面图',
            type: 'image',
            group: 'basic',
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
            name: 'industry',
            title: '所属行业',
            type: 'reference',
            to: [{ type: 'category' }],
            group: 'basic',
        }),
        defineField({
            name: 'excerpt',
            title: '案例简述',
            type: 'text',
            rows: 3,
            group: 'basic',
        }),
        defineField({
            name: 'location',
            title: '项目地点',
            type: 'string',
            group: 'basic',
            description: '如 Thailand, Germany',
        }),
        defineField({
            name: 'metrics',
            title: '量化指标',
            type: 'array',
            group: 'basic',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'label', title: '指标名称', type: 'string' }),
                        defineField({ name: 'value', title: '指标值', type: 'string' }),
                    ],
                    preview: {
                        select: { title: 'label', subtitle: 'value' },
                    },
                },
            ],
        }),
        defineField({
            name: 'impactStats',
            title: '影响力统计',
            type: 'array',
            group: 'basic',
            description: '用于聚合页卡片展示，如 +40% Throughput',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'label', title: '标签文字(标签值为空时的fallback）', type: 'string' }),
                        defineField({ name: 'value', title: '标签值', type: 'string' }),
                    ],
                    preview: {
                        select: { title: 'label', subtitle: 'value' },
                    },
                },
            ],
        }),
        // --- 正文 ---
        defineField({
            name: 'body',
            title: '案例正文',
            type: 'array',
            group: 'content',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: '正文', value: 'normal' },
                        { title: 'H2', value: 'h2' },
                        { title: 'H3', value: 'h3' },
                        { title: 'H4', value: 'h4' },
                        { title: '引用', value: 'blockquote' },
                    ],
                    marks: {
                        decorators: [
                            { title: 'Bold', value: 'strong' },
                            { title: 'Italic', value: 'em' },
                        ],
                        annotations: [
                            {
                                name: 'link',
                                type: 'object',
                                title: '链接',
                                fields: [
                                    defineField({
                                        name: 'href',
                                        type: 'url',
                                        title: 'URL',
                                        validation: (rule) =>
                                            rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel'] }),
                                    }),
                                ],
                            },
                        ],
                    },
                    lists: [
                        { title: '无序列表', value: 'bullet' },
                        { title: '有序列表', value: 'number' },
                    ],
                },
                {
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
                },
            ],
        }),
        // --- 关联 ---
        defineField({
            name: 'usedEquipment',
            title: '关联设备',
            type: 'array',
            group: 'relations',
            of: [{ type: 'reference', to: [{ type: 'product' }] }],
            validation: (rule) => rule.unique(),
        }),
    ],
    preview: {
        select: { title: 'title', subtitle: 'location', media: 'coverImage' },
    },
})

