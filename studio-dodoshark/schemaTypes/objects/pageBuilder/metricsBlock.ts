import {BarChartIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {itemCount} from '../../shared/studio'

export default defineType({
  name: 'metricsBlock',
  title: 'Metrics Block',
  type: 'object',
  icon: BarChartIcon,
  fields: [
    defineField({name: 'title', title: 'Section Title', type: 'string'}),
    defineField({name: 'backgroundVariant', title: 'Background Style', type: 'string', options: {list: [{title: 'Default', value: 'default'}, {title: 'Muted', value: 'muted'}, {title: 'Dark', value: 'dark'}], layout: 'radio'}, initialValue: 'default', validation: (rule) => rule.required()}),
    defineField({name: 'items', title: 'Metric Items', type: 'array', description: 'Each item represents one metric card.', of: [{type: 'object', fields: [{name: 'value', title: 'Value', type: 'string', validation: (rule) => rule.required()}, {name: 'unit', title: 'Unit', type: 'string'}, {name: 'label', title: 'Label', type: 'string', validation: (rule) => rule.required()}, {name: 'icon', title: 'Icon Class', type: 'string', description: 'Example: fas fa-users'}], preview: {select: {value: 'value', label: 'label', unit: 'unit'}, prepare({value, label, unit}) { return {title: `${value}${unit || ''} - ${label}`} }}}]}),
  ],
  preview: {select: {title: 'title', items: 'items'}, prepare({title, items}) { return {title: title || 'Metrics Block', subtitle: `${itemCount(items)} metric items`} }},
})