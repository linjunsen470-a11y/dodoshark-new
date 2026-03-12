import {CaseIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {itemCount} from '../shared/studio'

export default defineType({
  name: 'caseStudyBlock',
  title: 'Case Study Block',
  type: 'object',
  icon: CaseIcon,
  fields: [
    defineField({name: 'title', title: 'Block Title', type: 'string', description: 'Optional heading shown above the selected case studies.'}),
    defineField({name: 'caseStudies', title: 'Case Studies', type: 'array', of: [{type: 'reference', to: [{type: 'caseStudy'}]}], validation: (rule) => rule.unique(), description: 'Choose one or more case study documents.'}),
  ],
  preview: {select: {title: 'title', media: 'caseStudies.0.coverImage', items: 'caseStudies'}, prepare({title, media, items}) { return {title: title || 'Case Study Block', subtitle: `${itemCount(items)} case studies`, media} }},
})