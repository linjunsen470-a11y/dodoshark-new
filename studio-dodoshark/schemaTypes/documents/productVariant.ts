import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'productVariant',
    title: '产品型号',
    type: 'document',
    icon: () => '📐',
    fields: [
        defineField({
            name: 'modelName',
            title: '型号名称',
            type: 'string',
            description: '如 Model DS-19',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'image',
            title: '型号配图',
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
            name: 'shortDescription',
            title: '型号简述',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'specifications',
            title: '规格参数',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'label', title: '参数名称', type: 'string', description: '如: 产能' },
                        { name: 'value', title: '数值', type: 'string', description: '如: 80 - 150' },
                        { name: 'unit', title: '单位', type: 'string', description: '如: kg/h' },
                    ],
                    preview: {
                        select: { label: 'label', value: 'value', unit: 'unit' },
                        prepare({ label, value, unit }) {
                            return {
                                title: `${label}: ${value} ${unit || ''}`,
                            }
                        }
                    }
                }
            ]
        }),
    ],
    preview: {
        select: { title: 'modelName', media: 'image' },
    },
})
