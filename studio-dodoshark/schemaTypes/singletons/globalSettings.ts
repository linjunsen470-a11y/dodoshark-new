import {CogIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {itemCount, pickText} from '../shared/studio'

export default defineType({
  name: 'globalSettings',
  title: 'Global Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({name: 'siteName', title: 'Site Name', type: 'string', description: 'Brand or website name.'}),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Square PNG used for browser tabs, shortcuts, and Apple touch icon. Recommended size: 512x512 or larger.',
      validation: (rule) => rule.assetRequired().warning('Upload a square PNG for the site favicon.'),
    }),
    defineField({name: 'logo', title: 'Site Logo', type: 'image', description: 'Used in shared header/footer areas.', fields: [{name: 'alt', type: 'string', title: 'Alt Text', validation: (Rule) => Rule.required()}]}),
    defineField({name: 'contact', title: 'Contact Details', type: 'object', fields: [defineField({name: 'phone', title: 'Phone', type: 'string', description: 'Public phone number.', validation: (rule) => rule.custom((value) => { if (!value) return true; return /^[+]?[$\d\s\-()]{7,20}$/.test(value) || 'Invalid phone number format' })}), defineField({name: 'email', title: 'Email', type: 'string', description: 'Public email address.', validation: (rule) => rule.email().warning('Invalid email format')}), defineField({name: 'whatsapp', title: 'WhatsApp', type: 'string', description: 'Optional messaging number.', validation: (rule) => rule.custom((value) => { if (!value) return true; return /^[+]?[$\d\s\-()]{7,20}$/.test(value) || 'Invalid WhatsApp number format' })})]}),
    defineField({name: 'hq', title: 'Headquarters', type: 'object', fields: [defineField({name: 'address', title: 'Address', type: 'portableTextContent', description: 'Rich text address content.'})]}),
    defineField({name: 'footerLinks', title: 'Footer Links', type: 'array', description: 'Ordered links shown in the global footer.', of: [{type: 'object', fields: [defineField({name: 'label', title: 'Label', type: 'string'}), defineField({name: 'url', title: 'URL', type: 'url'})], preview: {select: {title: 'label', subtitle: 'url'}}}]}),
  ],
  preview: {select: {title: 'siteName', media: 'logo', footerLinks: 'footerLinks', email: 'contact.email'}, prepare({title, media, footerLinks, email}) { return {title: title || 'Global Settings', subtitle: pickText(email, itemCount(footerLinks) ? `${itemCount(footerLinks)} footer links` : undefined) || 'Global settings singleton', media} }},
})
