import {DocumentSheetIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {itemCount, joinPreview} from '../../shared/studio'

function requireAltText(value: unknown) {
  const image = value as {asset?: unknown; alt?: string} | undefined
  if (image?.asset && !image.alt?.trim()) return 'Alt Text is required after uploading an image.'
  return true
}

export default defineType({
  name: 'referenceSpecBlock',
  title: 'Reference Spec Block',
  type: 'object',
  icon: DocumentSheetIcon,
  fields: [
    defineField({
      name: 'mainTitle',
      title: 'Main Title',
      type: 'text',
      rows: 2,
      description: 'Press Enter to control line breaks.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subTitle',
      title: 'Subtitle',
      type: 'text',
      rows: 3,
      description: 'Optional subtitle shown below the main title.',
    }),
    defineField({
      name: 'backgroundVariant',
      title: 'Background Style',
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
      initialValue: 'lightGray',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'referenceImage',
      title: 'Reference Image',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt Text', type: 'string'})],
      validation: (rule) => rule.custom(requireAltText),
    }),
    defineField({
      name: 'referenceCaption',
      title: 'Reference Caption',
      type: 'text',
      rows: 2,
      description: 'Optional text shown below the image.',
    }),
    defineField({
      name: 'featuresTitle',
      title: 'Features Column Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'modelsTitle',
      title: 'Models Column Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'featureItem',
          title: 'Feature Item',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Text',
              type: 'text',
              rows: 3,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'text',
            },
            prepare({title}) {
              return {
                title: title || 'Feature Item',
              }
            },
          },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'models',
      title: 'Models',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'modelItem',
          title: 'Model Item',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Text',
              type: 'text',
              rows: 2,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'text',
            },
          },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'mainTitle',
      image: 'referenceImage',
      features: 'features',
      models: 'models',
    },
    prepare({title, image, features, models}) {
      return {
        title: title || 'Reference Spec Block',
        subtitle:
          joinPreview([
            itemCount(features) ? `${itemCount(features)} features` : undefined,
            itemCount(models) ? `${itemCount(models)} models` : undefined,
            image?.asset ? 'Image added' : 'No image',
          ]) || 'Reference spec block',
        media: image,
      }
    },
  },
})
