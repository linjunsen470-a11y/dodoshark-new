import {DocumentTextIcon, WrenchIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {joinPreview, pickText} from '../shared/studio'

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    {name: 'basic', title: 'Basic', default: true},
    {name: 'content', title: 'Body'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'seo', title: 'SEO Settings', type: 'seoMeta', group: 'seo'}),
    defineField({name: 'title', title: 'Post Title', type: 'string', group: 'basic', description: 'Main article title.', validation: (rule) => rule.required()}),
    defineField({name: 'slug', title: 'URL Slug', type: 'slug', group: 'basic', options: {source: 'title', maxLength: 96}, description: 'Used for the blog post URL.', validation: (rule) => rule.required()}),
    defineField({name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3, group: 'basic', description: 'Short summary for cards and listing pages.'}),
    defineField({name: 'categories', title: 'Categories', type: 'array', group: 'basic', description: 'Categories available for filtering.', of: [{type: 'reference', to: [{type: 'category'}]}], validation: (rule) => rule.unique()}),
    defineField({name: 'author', title: 'Author', type: 'reference', to: [{type: 'author'}], group: 'basic', description: 'Author profile reference.'}),
    defineField({name: 'publishedAt', title: 'Published At', type: 'datetime', group: 'basic', description: 'Used for ordering and metadata.', validation: (rule) => rule.required()}),
    defineField({name: 'readingTime', title: 'Reading Time (Minutes)', type: 'number', group: 'basic', description: 'Optional reading time label.'}),
    defineField({name: 'mainImage', title: 'Main Image', type: 'image', group: 'basic', description: 'Main article image used in previews and cards.', options: {hotspot: true}, fields: [{name: 'alt', type: 'string', title: 'Alt Text', validation: (Rule) => Rule.required()}]}),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      group: 'content',
      description: 'Long-form article content.',
      validation: (rule) => rule.required(),
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}, {title: 'H2', value: 'h2'}, {title: 'H3', value: 'h3'}, {title: 'H4', value: 'h4'}, {title: 'Quote', value: 'blockquote'}],
          marks: {
            decorators: [{title: 'Bold', value: 'strong'}, {title: 'Italic', value: 'em'}, {title: 'Underline', value: 'underline'}],
            annotations: [
              {name: 'link', type: 'object', title: 'Link', fields: [defineField({name: 'href', type: 'url', title: 'URL', validation: (rule) => rule.uri({allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel']})})]},
              {name: 'inlineProductRef', type: 'object', title: 'Inline Product Reference', icon: WrenchIcon, fields: [defineField({name: 'product', type: 'reference', to: [{type: 'product'}], title: 'Recommended Product'})]},
            ],
          },
          lists: [{title: 'Bullet', value: 'bullet'}, {title: 'Number', value: 'number'}],
        }),
        defineArrayMember({type: 'image', options: {hotspot: true}, fields: [{name: 'alt', type: 'string', title: 'Alt Text', validation: (Rule) => Rule.required()}]}),
        defineArrayMember({type: 'table'}),
      ],
    }),
    defineField({name: 'relatedPosts', title: 'Related Posts', type: 'array', group: 'basic', description: 'Related reading shown near the end of the post.', of: [{type: 'reference', to: [{type: 'post'}]}], validation: (rule) => rule.unique()}),
  ],
  preview: {
    select: {title: 'title', authorName: 'author.name', readingTime: 'readingTime', media: 'mainImage'},
    prepare({title, authorName, readingTime, media}) {
      return {
        title: title || 'Untitled post',
        subtitle: pickText(joinPreview([authorName, typeof readingTime === 'number' ? `${readingTime} min read` : undefined]), 'Blog post'),
        media,
      }
    },
  },
  orderings: [{title: 'Published Date (Newest)', name: 'publishedAtDesc', by: [{field: 'publishedAt', direction: 'desc'}]}],
})