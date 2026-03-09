import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'accessory',
    title: '配件',
    type: 'document',
    icon: () => '🔩',
    fields: [
        defineField({
            name: 'name',
            title: '配件名称',
            type: 'string',
            description: '如 Pulse Dust Collector',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'image',
            title: '配件图片',
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
            name: 'description',
            title: '配件简介',
            type: 'text',
            rows: 3,
        }),
    ],
    preview: {
        select: { title: 'name', media: 'image' },
    },
})
