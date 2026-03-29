import {BulbOutlineIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {joinPreview, pickText} from '../shared/studio'

function imageField(name: string, title: string, description: string) {
  return defineField({
    name,
    title,
    type: 'image',
    description,
    options: {hotspot: true},
    fields: [defineField({name: 'alt', type: 'string', title: 'Alt Text'})],
  })
}

export default defineType({
  name: 'supportPage',
  title: 'Support Page',
  type: 'document',
  icon: BulbOutlineIcon,
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'content', title: 'Editable Text'},
    {name: 'images', title: 'Images'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'seo', title: 'SEO Settings', type: 'seoMeta', group: 'seo'}),
    defineField({
      name: 'hero',
      title: 'Hero Content',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
        defineField({name: 'title', title: 'Title', type: 'text', rows: 2}),
        defineField({name: 'description', title: 'Description', type: 'text', rows: 4}),
      ],
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Label', type: 'string'}),
            defineField({name: 'value', title: 'Value', type: 'string'}),
          ],
          preview: {select: {title: 'label', subtitle: 'value'}},
        }),
      ],
    }),
    defineField({
      name: 'serviceIntro',
      title: 'Service Intro',
      type: 'object',
      group: 'content',
      fields: [
        defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
        defineField({name: 'title', title: 'Title', type: 'string'}),
      ],
    }),
    defineField({
      name: 'serviceStages',
      title: 'Service Stages',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'id', title: 'Stage ID', type: 'string'}),
            defineField({name: 'phase', title: 'Phase', type: 'string'}),
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'description', title: 'Description', type: 'text', rows: 4}),
            defineField({
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [defineArrayMember({type: 'string'})],
            }),
            imageField('image', 'Image', 'Image shown beside the service stage.'),
          ],
          preview: {select: {title: 'title', subtitle: 'phase', media: 'image'}},
        }),
      ],
    }),
    defineField({
      name: 'urgentAssistance',
      title: 'Urgent Assistance',
      type: 'object',
      group: 'content',
      fields: [
        defineField({name: 'title', title: 'Title', type: 'string'}),
        defineField({name: 'description', title: 'Description', type: 'text', rows: 4}),
        defineField({name: 'hotlineLabel', title: 'Hotline Label', type: 'string'}),
        defineField({name: 'hotlineValue', title: 'Hotline Value', type: 'string'}),
        defineField({name: 'salesLabel', title: 'Sales Label', type: 'string'}),
        defineField({name: 'salesEmail', title: 'Sales Email', type: 'string'}),
        defineField({name: 'supportLabel', title: 'Support Label', type: 'string'}),
        defineField({name: 'supportEmail', title: 'Support Email', type: 'string'}),
        defineField({name: 'teamCaptionTitle', title: 'Team Caption Title', type: 'string'}),
        defineField({name: 'teamCaptionDescription', title: 'Team Caption Description', type: 'string'}),
      ],
    }),
    defineField({
      name: 'cta',
      title: 'Bottom CTA',
      type: 'object',
      group: 'content',
      fields: [
        defineField({name: 'title', title: 'Title', type: 'string'}),
        defineField({name: 'description', title: 'Description', type: 'text', rows: 4}),
        defineField({name: 'buttonLabel', title: 'Button Label', type: 'string'}),
        defineField({name: 'buttonHref', title: 'Button Link', type: 'string'}),
      ],
    }),
    defineField({
      name: 'images',
      title: 'Page Images',
      type: 'object',
      group: 'images',
      fields: [
        imageField('heroBackground', 'Hero Background Image', 'Top hero background image.'),
        imageField('supportTeamImage', 'Support Team Image', 'Image shown in the urgent assistance section.'),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'hero.title',
      subtitle: 'urgentAssistance.title',
      media: 'images.heroBackground',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Support Page',
        subtitle:
          joinPreview([pickText(subtitle), pickText(title) ? 'Mapped hero content' : undefined]) ||
          'Support page image slots and key copy',
        media,
      }
    },
  },
})
