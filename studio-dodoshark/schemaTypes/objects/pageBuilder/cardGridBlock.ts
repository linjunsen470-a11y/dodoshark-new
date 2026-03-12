import { defineField, defineType } from 'sanity'

const cardFields = [
  defineField({
    name: 'cardType',
    title: 'Card Type',
    type: 'string',
    options: {
      list: [
        { title: 'Reference', value: 'reference' },
        { title: 'Inline', value: 'inline' },
      ],
    },
    initialValue: 'reference',
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: 'title',
    title: 'Title',
    type: 'string',
  }),
  defineField({
    name: 'description',
    title: 'Description',
    type: 'text',
    rows: 3,
    description: '适用于 Reference 和 Inline。',
  }),
  defineField({
    name: 'clickable',
    title: 'Clickable',
    type: 'boolean',
    description: '关闭后将不输出跳转链接（CTA）。',
    initialValue: true,
  }),
  defineField({
    name: 'reference',
    title: 'Reference Item',
    type: 'reference',
    to: [{ type: 'product' }, { type: 'caseStudy' }, { type: 'post' }, { type: 'solution' }],
    hidden: ({ parent }) => parent?.cardType !== 'reference',
    validation: (rule) =>
      rule.custom((value, context) => {
        const cardType = (context.parent as { cardType?: string } | undefined)?.cardType
        if (cardType === 'reference' && !value) {
          return 'Card Type 为 Reference 时，必须选择 Reference Item'
        }
        return true
      }),
  }),
  defineField({
    name: 'inlineCard',
    title: 'Inline Card',
    type: 'object',
    hidden: ({ parent }) => parent?.cardType !== 'inline',
    validation: (rule) =>
      rule.custom((value, context) => {
        const cardType = (context.parent as { cardType?: string } | undefined)?.cardType
        if (cardType === 'inline' && !value) {
          return 'Card Type 为 Inline 时，必须填写 Inline Card 内容'
        }
        return true
      }),
    fields: [
      defineField({
        name: 'image',
        type: 'image',
        title: 'Image',
        options: { hotspot: true },
        fields: [
          defineField({
            name: 'alt',
            type: 'string',
            title: 'Alt Text',
            description: '用于 SEO 与无障碍，请准确描述图片内容。',
          }),
        ],
        validation: (rule) =>
          rule.custom((value) => {
            const image = value as { asset?: unknown; alt?: string } | undefined
            if (image?.asset && !image.alt?.trim()) {
              return '上传图片后必须填写 Alt Text（SEO）'
            }
            return true
          }),
      }),
      defineField({
        name: 'cta',
        type: 'object',
        title: 'CTA',
        fields: [
          defineField({ name: 'label', type: 'string', title: 'Label' }),
          defineField({
            name: 'href',
            type: 'url',
            title: 'Link',
            validation: (rule) =>
              rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel'] }),
          }),
        ],
      }),
    ],
  }),
]

const cardPreview = {
  select: {
    cardType: 'cardType',
    title: 'title',
    refTitle: 'reference.title',
    refMedia: 'reference.mainImage',
    inlineMedia: 'inlineCard.image',
  },
  prepare({ cardType, title, refTitle, refMedia, inlineMedia }) {
    const isReference = cardType === 'reference'
    const resolvedTitle = title || (isReference ? refTitle : '')
    return {
      title: resolvedTitle || (isReference ? 'Reference Item' : 'Inline Card'),
      subtitle: isReference ? 'Reference' : 'Inline',
      media: isReference ? refMedia : inlineMedia,
    }
  },
}

export default defineType({
  name: 'cardGridBlock',
  title: 'Card Grid',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'backgroundVariant',
      title: 'Background Style',
      type: 'string',
      options: {
        list: [
          { title: 'Default (White)', value: 'default' },
          { title: 'Muted (Light Gray)', value: 'muted' },
          { title: 'Dark', value: 'dark' },
        ],
        layout: 'radio',
      },
      initialValue: 'muted',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'enableBannerOverlap',
      title: 'Enable Banner Overlap Layout',
      description: '开启后使用首页 products 区块类似的 banner 图 + 下方内容上浮布局。',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'bannerImage',
      title: 'Banner Image',
      type: 'image',
      hidden: ({ parent }) => !parent?.enableBannerOverlap,
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: '用于 SEO 与无障碍，请准确描述图片内容。',
        }),
      ],
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { enableBannerOverlap?: boolean } | undefined
          const image = value as { asset?: unknown; alt?: string } | undefined

          if (!parent?.enableBannerOverlap) return true
          if (image?.asset && !image.alt?.trim()) {
            return '上传 Banner Image 后必须填写 Alt Text（SEO）'
          }

          return true
        }),
    }),
    defineField({
      name: 'bannerOverlayColor',
      title: 'Banner Overlay Color',
      description: '输入 CSS 颜色值，例如 rgba(15,23,42,0.45) 或 #0f172acc。',
      type: 'string',
      hidden: ({ parent }) => !parent?.enableBannerOverlap,
      initialValue: 'rgba(15,23,42,0.45)',
    }),
    defineField({
      name: 'firstLineCardTitle',
      title: 'First line card title',
      type: 'string',
      description: '用于第一行卡片区标题；填写后将不再复用 Subtitle 作为该区块标题。',
    }),
    defineField({
      name: 'cards',
      title: 'Cards (Legacy)',
      description: '首行卡片分组',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: cardFields,
          preview: cardPreview,
        },
      ],
    }),
    defineField({
      name: 'nestedCards',
      title: 'Nested Card',
      description: '单一数组结构。每张卡可配置 Card Type / Reference / Inline / Title / Description / Clickable。',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: cardFields,
          preview: cardPreview,
        },
      ],
      validation: (rule) => rule.max(12),
    }),
    defineField({
      name: 'nestedCardTitle',
      title: 'Nested Card Title',
      type: 'string',
      description: '用于 Nested Card 区块标题（前端渲染为中间标题+两侧横线）',
    }),
    defineField({
      name: 'disableCardFrameEffect',
      title: '取消卡片边框与效果',
      description: '开启后，卡片图片和文字区域将移除边框、圆角、阴影等装饰效果。',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      nestedLen: 'nestedCards.length',
      legacyLen: 'cards.length',
      bannerEnabled: 'enableBannerOverlap',
    },
    prepare({ title, nestedLen, legacyLen, bannerEnabled }) {
      const parts = []

      if (nestedLen) parts.push(`Nested cards: ${nestedLen}`)
      if (legacyLen) parts.push(`Legacy cards: ${legacyLen}`)
      if (bannerEnabled) parts.push('Banner overlap enabled')

      return {
        title: title || 'Card Grid',
        subtitle: parts.join(' | ') || 'Card Grid block',
      }
    },
  },
})
