import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'featureListBlock',
  title: 'Feature List',
  type: 'object',
  icon: () => '✨',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'backgroundStyle',
      title: 'Background Style',
      type: 'string',
      initialValue: 'white',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Light Gray', value: 'lightGray' },
          { title: 'Dark Gray', value: 'darkGray' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Feature Items',
      type: 'array',
      of: [
        defineField({
          name: 'featureItem',
          title: 'Feature Item',
          type: 'object',
          fields: [
            defineField({
              name: 'mediaType',
              title: 'Media Type',
              type: 'string',
              initialValue: 'icon',
              options: {
                list: [
                  { title: 'Icon', value: 'icon' },
                  { title: 'Image', value: 'image' },
                ],
                layout: 'radio',
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'image',
              hidden: ({ parent }) => parent?.mediaType !== 'icon',
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const mediaType = (context.parent as { mediaType?: string } | undefined)?.mediaType
                  if (mediaType === 'icon' && !value) {
                    return 'Icon is required when media type is Icon.'
                  }
                  if (mediaType === 'image' && value) {
                    return 'Remove icon when media type is Image.'
                  }
                  return true
                }),
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              hidden: ({ parent }) => parent?.mediaType !== 'image',
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const mediaType = (context.parent as { mediaType?: string } | undefined)?.mediaType
                  if (mediaType === 'image' && !value) {
                    return 'Image is required when media type is Image.'
                  }
                  if (mediaType === 'icon' && value) {
                    return 'Remove image when media type is Icon.'
                  }
                  return true
                }),
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'string',
              validation: (Rule) => Rule.max(180),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              mediaType: 'mediaType',
            },
            prepare({ title, mediaType }) {
              return {
                title: title || 'Untitled feature item',
                subtitle: mediaType ? `Media: ${mediaType}` : 'Media: icon',
              }
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(3).max(6),
    }),
  ],
  preview: {
    select: { title: 'title', itemCount: 'items' },
    prepare({ title, itemCount }) {
      const count = Array.isArray(itemCount) ? itemCount.length : 0
      return {
        title: title || 'Feature List',
        subtitle: `${count} item${count === 1 ? '' : 's'}`,
      }
    },
  },
})
