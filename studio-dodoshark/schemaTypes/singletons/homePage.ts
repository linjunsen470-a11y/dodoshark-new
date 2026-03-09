import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'homePage',
    title: '首页',
    type: 'document',
    icon: () => '🏠',
    groups: [
        { name: 'hero', title: 'Hero', default: true },
        { name: 'video', title: 'Why Choose Us 视频' },
        { name: 'seo', title: 'SEO' },
    ],
    fields: [
        defineField({
            name: 'seo',
            title: 'SEO 设置',
            type: 'seoMeta',
            group: 'seo',
        }),
        defineField({
            name: 'heroBackgrounds',
            title: 'Hero 背景图数组',
            description: '用于首页首屏背景，建议上传 2-5 张统一风格图片（至少 2 张可启用轮播效果）。',
            type: 'array',
            group: 'hero',
            of: [
                {
                    name: 'heroBackgroundItem',
                    title: '背景图',
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
            validation: (rule) => rule.required().min(1).error('请至少上传 1 张 Hero 背景图'),
        }),
        defineField({
            name: 'whyChooseUsVideoUrl',
            title: 'Why Choose Us 视频链接',
            type: 'url',
            group: 'video',
            description: '支持 YouTube / Vimeo 链接，前端将自动转换为嵌入播放器。',
            validation: (rule) =>
                rule
                    .required()
                    .uri({ scheme: ['https'] })
                    .error('请填写有效的 HTTPS 视频链接'),
        }),
    ],
    preview: {
        prepare() {
            return { title: '首页' }
        },
    },
})
