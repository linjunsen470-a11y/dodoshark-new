import {BulbOutlineIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {joinPreview, pickText} from '../shared/studio'

function imageField(name: string, title: string, description: string) {
  return defineField({
    name,
    title,
    type: 'image',
    description,
    options: {hotspot: true},
    fields: [
      defineField({
        name: 'alt',
        type: 'string',
        title: 'Alt Text',
        validation: (Rule) => Rule.required(),
      }),
    ],
  })
}

export default defineType({
  name: 'supportPage',
  title: 'Support Page',
  type: 'document',
  icon: BulbOutlineIcon,
  fields: [
    defineField({
      name: 'images',
      title: 'Page Images',
      type: 'object',
      fields: [
        imageField(
          'heroBackground',
          'Hero Background Image',
          'Top hero background image.',
        ),
        imageField(
          'preSalesStageImage',
          'Pre-Sales Stage Image',
          'Image shown beside the Pre-Sales service stage.',
        ),
        imageField(
          'midSalesStageImage',
          'Mid-Sales Stage Image',
          'Image shown beside the Mid-Sales service stage.',
        ),
        imageField(
          'afterSalesStageImage',
          'After-Sales Stage Image',
          'Image shown beside the After-Sales service stage.',
        ),
        imageField(
          'supportTeamImage',
          'Support Team Image',
          'Image shown in the urgent assistance section.',
        ),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'images.heroBackground.alt',
      subtitle: 'images.supportTeamImage.alt',
      media: 'images.heroBackground',
    },
    prepare({title, subtitle, media}) {
      return {
        title: 'Support Page',
        subtitle:
          joinPreview([
            pickText(title) ? 'Hero image set' : undefined,
            pickText(subtitle) ? 'Support team image set' : undefined,
          ]) || 'Support page image slots',
        media,
      }
    },
  },
})
