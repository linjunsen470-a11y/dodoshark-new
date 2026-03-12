import {UserIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {pickText} from '../shared/studio'

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Public display name for the author profile.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {source: 'name', maxLength: 96},
      description: 'Used if you link to an author page.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      description: 'Shown in author cards and metadata.',
      options: {hotspot: true},
      fields: [
        {name: 'alt', type: 'string', title: 'Alt Text', validation: (Rule) => Rule.required()},
      ],
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      description: 'Example: Chief Engineer.',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
      description: 'Short profile summary.',
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'role', bio: 'bio', media: 'image'},
    prepare({title, subtitle, bio, media}) {
      return {
        title: title || 'Untitled author',
        subtitle: pickText(subtitle, bio) || 'Author profile',
        media,
      }
    },
  },
})