import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
    name: 'portableTextContent',
    title: '富文本块',
    type: 'object',
    fields: [
        defineField({
            name: 'title',
            title: '块标题',
            type: 'string',
        }),
        defineField({
            name: 'body',
            title: '正文内容',
            type: 'array',
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
    ],
    preview: {
        select: { title: 'title' },
        prepare({ title }) {
            return { title: title || '富文本块', subtitle: 'Portable Text' }
        },
    },
})
