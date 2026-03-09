import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'heroBlock',
    title: 'Hero Block',
    type: 'object',
    icon: () => '🎖️',
    fields: [
        defineField({
            name: 'title',
            title: '标题',
            type: 'string',
        }),
        defineField({
            name: 'subtitle',
            title: '副标题',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: '描述',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'images',
            title: 'Hero 图片组 (支持滑动切换)',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        {
                            name: 'alt',
                            type: 'string',
                            title: '替代文字',
                            validation: (Rule) => Rule.required(),
                        }
                    ]
                }
            ],
            validation: (rule) => rule.min(1)
        }),
        defineField({
            name: 'ctaButtons',
            title: '操作按钮',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'label', title: '按钮文字', type: 'string' },
                        {
                            name: 'href',
                            title: '链接地址',
                            type: 'url',
                            validation: (rule) =>
                                rule.uri({allowRelative: true,scheme: ['http','https','mailto','tel']}),
                        },
                        { name: 'primary', title: '是否为主按钮', type: 'boolean', initialValue: false }
                    ]
                }
            ]
        }),
        defineField({
            name: 'alignment',
            title: '对齐方式',
            type: 'string',
            options: {
                list: [
                    { title: '居左', value: 'left' },
                    { title: '居右', value: 'right' },
                ],
                layout: 'radio'
            },
            initialValue: 'left'
        })
    ],
    preview: {
        select: { title: 'title', subtitle: 'subtitle', media: 'images.0' },
        prepare({ title, subtitle, media }) {
            return {
                title: title || 'Hero Block (首屏)',
                subtitle: subtitle || 'Hero Block (Slider)',
                media
            }
        }
    }
})
