import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'tableBlock',
  title: 'Table (数据表格)',
  type: 'object',
  icon: () => '📊',
  fields: [
    defineField({
      name: 'title',
      title: '表格标题',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: '表格说明',
      type: 'text',
      rows: 2,
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
      initialValue: 'muted',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'table',
      title: '表格数据',
      type: 'table',
      description:
        '单元格支持简单转义：\\n 表示换行，\\\\ 表示反斜杠；换行后以 - 、* 或 • 开头的行会渲染为列表。示例：电机功率\\n(千瓦)',
      validation: (Rule) => Rule.required().error('请填写表格数据'),
    }),
    defineField({
      name: 'hasHeaderRow',
      title: '首行为表头',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'note',
      title: '表备注小字',
      type: 'text',
      rows: 2,
      description: '显示在表格下方的小字备注（可选）。',
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return {
        title: title || '数据表格 (Table)',
        subtitle: 'Table Block',
      }
    },
  },
})
