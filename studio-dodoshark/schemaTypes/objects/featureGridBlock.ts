import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'featureGridBlock',
    title: '特性网格',
    type: 'object',
    fields: [
        defineField({
            name: 'title',
            title: '网格标题',
            type: 'string',
        }),
        defineField({
            name: 'items',
            title: '特性条目',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'icon',
                            title: '图标类名',
                            type: 'string',
                            description: 'Font Awesome 类名，如 fa-gear',
                        }),
                        defineField({
                            name: 'title',
                            title: '特性标题',
                            type: 'string',
                            validation: (rule) => rule.required(),
                        }),
                        defineField({
                            name: 'description',
                            title: '特性描述',
                            type: 'text',
                            rows: 3,
                        }),
                        defineField({
                            name: 'image',
                            title: '特性配图',
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
                    ],
                    preview: {
                        select: { title: 'title', subtitle: 'icon' },
                    },
                },
            ],
        }),
    ],
    preview: {
        select: { title: 'title' },
        prepare({ title }) {
            return { title: title || '特性网格', subtitle: 'Feature Grid' }
        },
    },
})
