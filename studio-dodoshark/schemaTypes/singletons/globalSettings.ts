import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'globalSettings',
  title: '全局设置',
  type: 'document',
  icon: () => '⚙️',
  fields: [
    defineField({name: 'siteName', title: '站点名称', type: 'string'}),
    defineField({
      name: 'logo',
      title: '站点 Logo',
      type: 'image',
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
      name: 'contact',
      title: '联系方式',
      type: 'object',
      fields: [
        defineField({
          name: 'phone',
          title: '电话',
          type: 'string',
          validation: (rule) =>
            rule.custom((value) => {
              if (!value) return true
              return /^[+]?[\d\s\-()]{7,20}$/.test(value) || 'Invalid phone number format'
            }),
        }),
        defineField({
          name: 'email',
          title: '邮箱',
          type: 'string',
          validation: (rule) => rule.email().warning('Invalid email format'),
        }),
        defineField({
          name: 'whatsapp',
          title: 'WhatsApp',
          type: 'string',
          validation: (rule) =>
            rule.custom((value) => {
              if (!value) return true
              return /^[+]?[\d\s\-()]{7,20}$/.test(value) || 'Invalid WhatsApp number format'
            }),
        }),
      ],
    }),
    defineField({
      name: 'hq',
      title: '总部',
      type: 'object',
      fields: [
        defineField({name: 'address', title: '地址', type: 'portableTextContent'}),
      ],
    }),
    defineField({
      name: 'footerLinks',
      title: '页脚链接',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'label', title: '链接文字', type: 'string'}),
            defineField({name: 'url', title: '链接地址', type: 'url'}),
          ],
          preview: {
            select: {title: 'label', subtitle: 'url'},
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: '全局设置'}
    },
  },
})
