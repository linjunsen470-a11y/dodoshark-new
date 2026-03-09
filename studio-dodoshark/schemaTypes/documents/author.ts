import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'author',
    title: '人员',
    type: 'document',
    icon: () => '👤',
    fields: [
        defineField({
            name: 'name',
            title: '姓名',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'URL 路径',
            type: 'slug',
            options: { source: 'name', maxLength: 96 },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'image',
            title: '头像',
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
            name: 'role',
            title: '职位角色',
            type: 'string',
            description: '如 Chief Engineer',
        }),
        defineField({
            name: 'bio',
            title: '个人简介',
            type: 'text',
            rows: 4,
        }),
    ],
    preview: {
        select: { title: 'name', subtitle: 'role', media: 'image' },
    },
})
