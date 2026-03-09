import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
    name: 'post',
    title: '博客文章',
    type: 'document',
    icon: () => '✏️',
    groups: [
        { name: 'basic', title: '基本信息', default: true },
        { name: 'content', title: '正文内容' },
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
            title: '文章标题',
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
            name: 'excerpt',
            title: '文章摘要',
            type: 'text',
            rows: 3,
            group: 'basic',
        }),
        defineField({
            name: 'categories',
            title: '分类',
            type: 'array',
            group: 'basic',
            of: [{ type: 'reference', to: [{ type: 'category' }] }],
            validation: (rule) => rule.unique(),
        }),
        defineField({
            name: 'author',
            title: '作者',
            type: 'reference',
            to: [{ type: 'author' }],
            group: 'basic',
        }),
        defineField({
            name: 'publishedAt',
            title: '发布时间',
            type: 'datetime',
            group: 'basic',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'readingTime',
            title: '阅读时间 (分钟)',
            type: 'number',
            group: 'basic',
        }),
        defineField({
            name: 'mainImage',
            title: '封面大图',
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
        // --- 正文 ---
        defineField({
            name: 'body',
            title: '文章正文',
            type: 'array',
            group: 'content',
            validation: (rule) => rule.required(),
            of: [
                defineArrayMember({
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
                            { title: 'Underline', value: 'underline' },
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
                            {
                                name: 'inlineProductRef',
                                type: 'object',
                                title: '行内产品推荐',
                                icon: () => '🔧',
                                fields: [
                                    defineField({
                                        name: 'product',
                                        type: 'reference',
                                        to: [{ type: 'product' }],
                                        title: '推荐产品',
                                    }),
                                ],
                            },
                        ],
                    },
                    lists: [
                        { title: '无序列表', value: 'bullet' },
                        { title: '有序列表', value: 'number' },
                    ],
                }),
                defineArrayMember({
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
                defineArrayMember({
                    type: 'table',
                }),
            ],
        }),
        // --- 推荐阅读 ---
        defineField({
            name: 'relatedPosts',
            title: '推荐阅读',
            type: 'array',
            group: 'basic',
            of: [{ type: 'reference', to: [{ type: 'post' }] }],
            validation: (rule) => rule.unique(),
        }),
    ],
    preview: {
        select: { title: 'title', subtitle: 'author.name', media: 'mainImage' },
    },
    orderings: [
        {
            title: '发布时间（新→旧）',
            name: 'publishedAtDesc',
            by: [{ field: 'publishedAt', direction: 'desc' }],
        },
    ],
})


