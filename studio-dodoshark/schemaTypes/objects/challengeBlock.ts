import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'challengeBlock',
    title: '痛点/挑战',
    type: 'object',
    fields: [
        defineField({
            name: 'title',
            title: '块标题',
            type: 'string',
        }),
        defineField({
            name: 'items',
            title: '痛点条目',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'icon',
                            title: '图标类名',
                            type: 'string',
                            description: 'Font Awesome 类名，如 fa-exclamation-triangle',
                        }),
                        defineField({
                            name: 'title',
                            title: '痛点标题',
                            type: 'string',
                            validation: (rule) => rule.required(),
                        }),
                        defineField({
                            name: 'description',
                            title: '痛点描述',
                            type: 'text',
                            rows: 3,
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
            return { title: title || '痛点/挑战', subtitle: 'Challenge Block' }
        },
    },
})
