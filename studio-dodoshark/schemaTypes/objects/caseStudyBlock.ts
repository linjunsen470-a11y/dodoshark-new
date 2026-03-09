import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'caseStudyBlock',
    title: '案例展示',
    type: 'object',
    fields: [
        defineField({
            name: 'title',
            title: '块标题',
            type: 'string',
        }),
        defineField({
            name: 'caseStudies',
            title: '关联案例',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'caseStudy' }] }],
            validation: (rule) => rule.unique(),
            description: '从客户案例库中选择',
        }),
    ],
    preview: {
        select: { title: 'title' },
        prepare({ title }) {
            return { title: title || '案例展示', subtitle: 'Case Study Block' }
        },
    },
})

