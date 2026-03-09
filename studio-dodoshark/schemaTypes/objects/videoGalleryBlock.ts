import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'videoGalleryBlock',
    title: '视频画廊',
    type: 'object',
    fields: [
        defineField({
            name: 'title',
            title: '画廊标题',
            type: 'string',
        }),
        defineField({
            name: 'videos',
            title: '视频列表',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'title',
                            title: '视频标题',
                            type: 'string',
                            validation: (rule) => rule.required(),
                        }),
                        defineField({
                            name: 'thumbnail',
                            title: '缩略图',
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
                        defineField({
                            name: 'url',
                            title: '视频链接',
                            type: 'url',
                            description: 'YouTube / Vimeo 等视频外链地址',
                            validation: (rule) => rule.required(),
                        }),
                    ],
                    preview: {
                        select: { title: 'title', media: 'thumbnail' },
                    },
                },
            ],
        }),
    ],
    preview: {
        select: { title: 'title' },
        prepare({ title }) {
            return { title: title || '视频画廊', subtitle: 'Video Gallery' }
        },
    },
})
