import {UserIcon} from '@sanity/icons'
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
  name: 'recruitAgentsPage',
  title: 'Recruit Agents Page',
  type: 'document',
  icon: UserIcon,
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
          'recruitmentScopeImage',
          'Recruitment Scope Image',
          'Image shown beside the strategic recruitment scope section.',
        ),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'images.heroBackground.alt',
      subtitle: 'images.recruitmentScopeImage.alt',
      media: 'images.heroBackground',
    },
    prepare({title, subtitle, media}) {
      return {
        title: 'Recruit Agents Page',
        subtitle:
          joinPreview([
            pickText(title) ? 'Hero image set' : undefined,
            pickText(subtitle) ? 'Scope image set' : undefined,
          ]) || 'Recruit agents page image slots',
        media,
      }
    },
  },
})
