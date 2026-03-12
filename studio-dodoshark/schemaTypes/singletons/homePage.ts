import {HomeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'video', title: 'Why Choose Us Video'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'seo', title: 'SEO Settings', type: 'seoMeta', group: 'seo'}),
    defineField({
      name: 'heroBackgrounds',
      title: 'Hero Background Images',
      description: 'Recommended: 2-5 images with a consistent style. At least one image is required.',
      type: 'array',
      group: 'hero',
      of: [{name: 'heroBackgroundItem', title: 'Background Image', type: 'image', options: {hotspot: true}, fields: [{name: 'alt', type: 'string', title: 'Alt Text', validation: (Rule) => Rule.required()}]}],
      validation: (rule) => rule.required().min(1).error('Please upload at least one hero background image.'),
    }),
    defineField({name: 'whyChooseUsVideoUrl', title: 'Why Choose Us Video URL', type: 'url', group: 'video', description: 'Supports YouTube or Vimeo HTTPS links.', validation: (rule) => rule.required().uri({scheme: ['https']}).error('Please enter a valid HTTPS video URL.')}),
  ],
  preview: {
    select: {media: 'heroBackgrounds.0'},
    prepare({media}) {
      return {title: 'Home Page', subtitle: 'Homepage singleton', media}
    },
  },
})