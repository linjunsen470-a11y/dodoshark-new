import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'mediaGalleryBlock',
  title: 'Media Gallery',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Carousel', value: 'carousel' },
          { title: 'Thumbnail Gallery', value: 'thumbnailGallery' },
          { title: 'Video Card Carousel', value: 'videoCardCarousel' },
        ],
        layout: 'radio',
      },
      initialValue: 'thumbnailGallery',
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
      initialValue: 'default',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'cta',
      title: 'Section CTA',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Button Label',
          type: 'string',
        }),
        defineField({
          name: 'href',
          title: 'Button Link',
          type: 'url',
          validation: (rule) =>
            rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel'] }),
        }),
      ],
    }),
    defineField({
      name: 'items',
      title: 'Media Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'type',
              title: 'Media Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Image', value: 'image' },
                  { title: 'Video URL', value: 'videoUrl' },
                ],
                layout: 'radio',
              },
              initialValue: 'image',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              hidden: ({ parent }) => parent?.type !== 'image',
              options: { hotspot: true },
              fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
            }),
            defineField({
              name: 'videoUrl',
              title: 'Video URL (YouTube/Vimeo)',
              type: 'url',
              validation: (rule) => rule.uri({ scheme: ['http', 'https'] }),
              hidden: ({ parent }) => parent?.type !== 'videoUrl',
            }),
            defineField({
              name: 'videoThumbnail',
              title: 'Video Thumbnail',
              type: 'image',
              hidden: ({ parent }) => parent?.type !== 'videoUrl',
              options: { hotspot: true },
              description: 'Optional. In Video Card Carousel, a blank value falls back to the default YouTube preview when the video URL is a YouTube link.',
            }),
            defineField({ name: 'caption', title: 'Caption', type: 'string' }),
            defineField({
              name: 'metaText',
              title: 'Meta Text',
              type: 'string',
              description: 'Secondary text shown under the card title in video card carousel layout.',
            }),
          ],
          preview: {
            select: {
              type: 'type',
              caption: 'caption',
              image: 'image',
              videoThumbnail: 'videoThumbnail',
            },
            prepare({ type, caption, image, videoThumbnail }) {
              const isImage = type === 'image'
              return {
                title: caption || (isImage ? 'Image' : 'Video'),
                subtitle: type,
                media: isImage ? image : videoThumbnail,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', layout: 'layout' },
    prepare({ title, layout }) {
      return {
        title: title || 'Media Gallery',
        subtitle: `Layout: ${layout || 'thumbnailGallery'}`,
      }
    },
  },
})
