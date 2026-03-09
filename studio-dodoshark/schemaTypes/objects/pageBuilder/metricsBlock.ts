import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'metricsBlock',
    title: 'Metrics (数据指标)',
    type: 'object',
    icon: () => '📈',
    fields: [
        defineField({
            name: 'title',
            title: '指标大区标题 (可选)',
            type: 'string',
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
                ],
                layout: 'radio',
            },
            initialValue: 'default',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'items',
            title: '数据指标列表',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'value', title: '指标数值 (如: 100+)', type: 'string', validation: (rule) => rule.required() },
                        { name: 'unit', title: '单位', type: 'string' },
                        { name: 'label', title: '指标说明 (如: 完成项目)', type: 'string', validation: (rule) => rule.required() },
                        { name: 'icon', title: '图标类名', type: 'string', description: '例如: fas fa-users' }
                    ],
                    preview: {
                        select: { value: 'value', label: 'label' },
                        prepare({ value, label }) {
                            return { title: `${value} - ${label}` }
                        }
                    }
                }
            ]
        })
    ],
    preview: {
        select: { title: 'title', items: 'items' },
        prepare({ title, items }) {
            return {
                title: title || '数据指标 (Metrics)',
                subtitle: `包含 ${items?.length || 0} 个数据项`
            }
        }
    }
})
