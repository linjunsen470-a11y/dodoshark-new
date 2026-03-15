import {BlockContentIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

import {itemCount, joinPreview, pickText} from '../../shared/studio'

type RichSectionParentValue = {
  layout?: string
  enableTwoColumnContent?: boolean
}

function isCenteredLayout(parent?: RichSectionParentValue) {
  return parent?.layout === 'centeredMediaGridBodyBelow'
}

function showTwoColumnFields(parent?: RichSectionParentValue) {
  return isCenteredLayout(parent) && parent?.enableTwoColumnContent === true
}

function createTwoColumnItemFields() {
  return [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
  ]
}

const twoColumnItemPreview = {
  select: {
    title: 'title',
    description: 'description',
  },
  prepare({
    title,
    description,
  }: {
    title?: string
    description?: string
  }) {
    return {
      title: title || 'Untitled column item',
      subtitle: pickText(description) || 'Column item',
    }
  },
}

export default defineType({
  name: 'richSectionBlock',
  title: 'Rich Section',
  type: 'object',
  icon: BlockContentIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Body Content',
      type: 'array',
      description: 'Rich text content displayed alongside the media area.',
      hidden: ({parent}) => showTwoColumnFields(parent as RichSectionParentValue | undefined),
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
          ],
        },
      ],
    }),
    defineField({
      name: 'mediaItems',
      title: 'Media Items',
      type: 'array',
      description: 'The first image is used as the Studio preview thumbnail.',
      of: [
        defineArrayMember({
          title: 'Media Item',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
            }),
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
            }),
            defineField({
              name: 'caption',
              type: 'string',
              title: 'Caption',
            }),
          ],
          preview: {
            select: {
              image: 'image',
              title: 'caption',
              alt: 'alt',
            },
            prepare({image, title, alt}) {
              return {
                title: title || alt || 'Media Item',
                media: image,
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Text Left / Media Right', value: 'textLeftMediaRight'},
          {title: 'Media Left / Text Right', value: 'mediaLeftTextRight'},
          {title: 'Centered Title / Media Grid / Body', value: 'centeredMediaGridBodyBelow'},
        ],
      },
      initialValue: 'textLeftMediaRight',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'enableTwoColumnContent',
      title: 'Enable Two-Column Content',
      type: 'boolean',
      initialValue: false,
      description:
        'Replaces the body rich text with a dedicated two-column content area for the centered layout.',
      hidden: ({parent}) => !isCenteredLayout(parent as RichSectionParentValue | undefined),
    }),
    defineField({
      name: 'twoColumnHeading',
      title: 'Two-Column Section Heading',
      type: 'string',
      hidden: ({parent}) => !showTwoColumnFields(parent as RichSectionParentValue | undefined),
    }),
    defineField({
      name: 'twoColumnSubtitle',
      title: 'Two-Column Section Subtitle',
      type: 'text',
      rows: 3,
      hidden: ({parent}) => !showTwoColumnFields(parent as RichSectionParentValue | undefined),
    }),
    defineField({
      name: 'leftColumnItems',
      title: 'Left Column Items',
      type: 'array',
      hidden: ({parent}) => !showTwoColumnFields(parent as RichSectionParentValue | undefined),
      of: [
        defineArrayMember({
          title: 'Left Column Item',
          type: 'object',
          fields: createTwoColumnItemFields(),
          preview: twoColumnItemPreview,
        }),
      ],
    }),
    defineField({
      name: 'rightColumnItems',
      title: 'Right Column Items',
      type: 'array',
      hidden: ({parent}) => !showTwoColumnFields(parent as RichSectionParentValue | undefined),
      of: [
        defineArrayMember({
          title: 'Right Column Item',
          type: 'object',
          fields: createTwoColumnItemFields(),
          preview: twoColumnItemPreview,
        }),
      ],
    }),
    defineField({
      name: 'disableMediaFrameEffect',
      title: 'Disable Media Frame Effect',
      type: 'boolean',
      description: 'Removes rounded corners and shadow styling from media.',
      initialValue: false,
    }),
    defineField({
      name: 'backgroundVariant',
      title: 'Background Variant',
      type: 'string',
      options: {
        list: [
          {title: 'White', value: 'white'},
          {title: 'Light Gray', value: 'lightGray'},
          {title: 'Blue Gradient Soft', value: 'blueGradientSoft'},
          {title: 'Blue Gradient Air', value: 'blueGradientAir'},
        ],
        layout: 'radio',
      },
      initialValue: 'white',
    }),
    defineField({
      name: 'anchorId',
      title: 'Anchor ID',
      type: 'string',
      description: 'Example: features',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      layout: 'layout',
      media: 'mediaItems.0.image',
      mediaItems: 'mediaItems',
      subtitle: 'subtitle',
      disableMediaFrameEffect: 'disableMediaFrameEffect',
      body: 'body',
      enableTwoColumnContent: 'enableTwoColumnContent',
      twoColumnHeading: 'twoColumnHeading',
      twoColumnSubtitle: 'twoColumnSubtitle',
      leftColumnItems: 'leftColumnItems',
      rightColumnItems: 'rightColumnItems',
    },
    prepare({
      title,
      layout,
      media,
      mediaItems,
      subtitle,
      disableMediaFrameEffect,
      body,
      enableTwoColumnContent,
      twoColumnHeading,
      twoColumnSubtitle,
      leftColumnItems,
      rightColumnItems,
    }) {
      const layoutLabel =
        layout === 'centeredMediaGridBodyBelow'
          ? 'Centered media grid'
          : layout === 'mediaLeftTextRight'
            ? 'Media Left / Text Right'
            : 'Text Left / Media Right'

      const twoColumnSummary =
        layout === 'centeredMediaGridBodyBelow' && enableTwoColumnContent
          ? joinPreview([
              'Two-column content',
              pickText(twoColumnHeading, twoColumnSubtitle) ? 'Section header set' : undefined,
              itemCount(leftColumnItems) ? `Left ${itemCount(leftColumnItems)} items` : undefined,
              itemCount(rightColumnItems) ? `Right ${itemCount(rightColumnItems)} items` : undefined,
            ])
          : undefined

      return {
        title: title || 'Rich Section',
        subtitle:
          joinPreview([
            pickText(subtitle),
            layoutLabel,
            itemCount(mediaItems) ? `${itemCount(mediaItems)} media items` : undefined,
            twoColumnSummary ||
              (itemCount(body) ? `${itemCount(body)} body blocks` : undefined),
            disableMediaFrameEffect ? 'Frame effect off' : undefined,
          ]) || 'Rich section',
        media,
      }
    },
  },
})
