import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'collectionReferenceBlock',
    title: 'Collection Reference (动态内容引用)',
    type: 'object',
    icon: () => '🔗',
    fields: [
        defineField({
            name: 'title',
            title: '区块标题',
            type: 'string',
        }),
        defineField({
            name: 'subtitle',
            title: '副标题',
            type: 'string'
        }),
        defineField({
            name: 'backgroundVariant',
            title: '背景样式',
            type: 'string',
            options: {
                list: [
                    { title: '默认白底', value: 'default' },
                    { title: '浅灰底', value: 'muted' },
                    { title: '深色底', value: 'dark' }
                ],
                layout: 'radio'
            },
            initialValue: 'muted',
            validation: (rule) => rule.required()
        }),
        defineField({
            name: 'layout',
            title: '展示布局',
            type: 'string',
            options: {
                list: [
                    { title: '网格 (Grid)', value: 'grid' },
                    { title: '列表 (List)', value: 'list' },
                    { title: '轮播 (Carousel)', value: 'carousel' }
                ]
            },
            initialValue: 'grid'
        }),
        defineField({
            name: 'columns',
            title: '每行显示数量 (仅对网格生效)',
            type: 'number',
            options: {
                list: [2, 3, 4]
            },
            initialValue: 3,
            hidden: ({ parent }) => parent?.layout !== 'grid'
        }),
        defineField({
            name: 'references',
            title: '引用项集合',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'referenceItem',
                    title: '引用项',
                    fields: [
                        defineField({
                            name: 'reference',
                            title: '关联引用',
                            type: 'reference',
                            to: [
                                { type: 'product' },
                                { type: 'productVariant' },
                                { type: 'accessory' },
                                { type: 'author' },
                                { type: 'post' },
                                { type: 'solution' },
                                { type: 'caseStudy' }
                            ],
                            validation: (rule) => rule.required()
                        }),
                        defineField({
                            name: 'labelOverride',
                            title: '显示文本覆盖',
                            type: 'string',
                            description: '留空则使用被引用项的原有名称'
                        }),
                        defineField({
                            name: 'isClickable',
                            title: '是否可跳转到详情页',
                            type: 'boolean',
                            initialValue: true,
                            description: '部分型号或配件若无独立页面，请关闭此项'
                        })
                    ],
                    preview: {
                        select: {
                            refTitle: 'reference.title',
                            refName: 'reference.name',
                            refModel: 'reference.modelName',
                            labelOverride: 'labelOverride',
                            isClickable: 'isClickable',
                            media: 'reference.mainImage',
                            mediaDoc: 'reference.image',
                            mediaCover: 'reference.coverImage',
                            mediaHero: 'reference.heroImage'
                        },
                        prepare({ refTitle, refName, refModel, labelOverride, isClickable, media, mediaDoc, mediaCover, mediaHero }) {
                            const title = labelOverride || refTitle || refName || refModel || '未命名引用';
                            return {
                                title: title,
                                subtitle: `${isClickable ? '✅ 可跳转' : '🚫 不可跳转'}`,
                                media: media || mediaDoc || mediaCover || mediaHero
                            }
                        }
                    }
                }
            ]
        })
    ],
    preview: {
        select: { title: 'title', layout: 'layout' },
        prepare({ title, layout }) {
            return {
                title: title || '动态内容引用区块',
                subtitle: `布局: ${layout}`
            }
        }
    }
})
