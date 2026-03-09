import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'richSectionBlock',
    title: 'Rich Section (图文排版)',
    type: 'object',
    icon: () => '📰',
    fields: [
        defineField({
            name: 'heading',
            title: '版块标题',
            type: 'string',
        }),
        defineField({
            name: 'subtitle',
            title: '副标题',
            type: 'string',
        }),
        defineField({
            name: 'body',
            title: '主体内容 (短图文关联描述)',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: '正文', value: 'normal' },
                        { title: 'H2', value: 'h2' },
                        { title: 'H3', value: 'h3' },
                    ]
                }
            ]
        }),
        defineField({
            name: 'media',
            title: '媒体文件',
            type: 'image',
            options: { hotspot: true },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: '替代文字 (Alt Text)',
                }
            ]
        }),
        defineField({
            name: 'layout',
            title: '排版布局',
            type: 'string',
            options: {
                list: [
                    { title: '文字在左，图片在右', value: 'textLeftMediaRight' },
                    { title: '媒体在左，文字在右', value: 'mediaLeftTextRight' },
                ],
            },
            initialValue: 'textLeftMediaRight',
            validation: (rule) => rule.required()
        }),
        defineField({
            name: 'disableMediaFrameEffect',
            title: '取消图片边框与效果',
            type: 'boolean',
            description: '开启后将不显示图片圆角、阴影等装饰效果',
            initialValue: false
        }),
        defineField({
            name: 'backgroundVariant',
            title: '背景样式',
            type: 'string',
            options: {
                list: [
                    { title: '默认白底', value: 'default' },
                    { title: '浅灰底', value: 'muted' },
                    { title: '深色底', value: 'dark' },
                ]
            },
            initialValue: 'default'
        }),
        defineField({
            name: 'anchorId',
            title: '锚点 ID (可选)',
            type: 'string',
            description: '用于设置本节的锚点以便跳转，如 "features"',
        })
    ],
    preview: {
        select: { title: 'heading', subtitle: 'layout', media: 'media' },
        prepare({ title, subtitle, media }) {
            return {
                title: title || '图文排版 (Rich Section)',
                subtitle: `布局: ${subtitle}`,
                media
            }
        }
    }
})
