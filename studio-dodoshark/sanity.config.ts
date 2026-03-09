import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {table} from '@sanity/table'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'Dodoshark',

  projectId: 'nljl95h9',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool(), table()],

  schema: {
    types: schemaTypes,
  },
})
