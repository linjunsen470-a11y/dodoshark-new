import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'ctaBlock',
  title: 'Call to Action (行为召唤)',
  type: 'object',
  icon: () => '📣',
  fields: [
    defineField({
      name: 'title',
      title: '标题',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: '副标题说明',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'variant',
      title: '风格变体',
      type: 'string',
      options: {
        list: [
          {title: '简单横幅 (Simple Banner)', value: 'banner'},
          {title: '大色块卡片 (Colorful Card)', value: 'card'},
          {title: '带有表单 (Form Embedded)', value: 'form'},
        ],
        layout: 'radio',
      },
      initialValue: 'banner',
    }),
    defineField({
      name: 'formType',
      title: '表单类型',
      description: '如果风格为表单，请选择表单类型',
      type: 'string',
      options: {
        list: [
          {title: 'Newsletter / 资料下载', value: 'newsletter'},
          {title: '联系表单 (完整)', value: 'contact'},
          {title: '预约演示', value: 'demo'},
        ],
      },
      hidden: ({parent}) => parent?.variant !== 'form',
    }),
    defineField({
      name: 'buttons',
      title: '操作按钮',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', title: '文字', type: 'string'},
            {
              name: 'href',
              title: '链接',
              type: 'url',
              validation: (rule) =>
                rule.uri({allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel']}),
            },
          ],
        },
      ],
      hidden: ({parent}) => parent?.variant === 'form',
    }),
  ],
  preview: {
    select: {title: 'title', variant: 'variant'},
    prepare({title, variant}) {
      return {
        title: title || '行为召唤 (CTA)',
        subtitle: `CTA Block (${variant})`,
      }
    },
  },
})
