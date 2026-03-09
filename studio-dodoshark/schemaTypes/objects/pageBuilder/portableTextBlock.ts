import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'portableTextBlock',
    title: 'Portable Text (沉浸式长文)',
    type: 'object',
    icon: () => '📝',
    fields: [
        defineField({
            name: 'backgroundVariant',
            title: '背景样式',
            type: 'string',
            options: {
                list: [
                    { title: '默认白底', value: 'default' },
                    { title: '浅灰底', value: 'muted' },
                    { title: '深色底', value: 'dark' },
                ],
                layout: 'radio',
            },
            initialValue: 'default',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'content',
            title: '富文本内容',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: '正文', value: 'normal' },
                        { title: 'H2', value: 'h2' },
                        { title: 'H3', value: 'h3' },
                        { title: 'H4', value: 'h4' },
                        { title: '引用', value: 'blockquote' },
                    ],
                    lists: [
                        { title: '无序列表', value: 'bullet' },
                        { title: '有序列表', value: 'number' }
                    ],
                    marks: {
                        decorators: [
                            { title: '加粗', value: 'strong' },
                            { title: '斜体', value: 'em' },
                            { title: '高亮', value: 'highlight' }
                        ]
                    }
                },
                // Custom inline blocks
                { type: 'image', options: { hotspot: true } },
                {
                    type: 'object',
                    name: 'productReference',
                    title: '产品推荐内联块',
                    fields: [
                        {
                            name: 'product',
                            type: 'reference',
                            to: [{ type: 'product' }]
                        },
                        {
                            name: 'titleOverride',
                            type: 'string',
                            title: '标题覆盖'
                        }
                    ]
                }
            ]
        })
    ],
    preview: {
        prepare() {
            return {
                title: '沉浸式长文 (Portable Text)',
                subtitle: '自由排版的纯富文本容器'
            }
        }
    }
})
