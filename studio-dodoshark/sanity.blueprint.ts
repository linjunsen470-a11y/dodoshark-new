import {defineBlueprint, defineDocumentFunction} from '@sanity/blueprints'

export default defineBlueprint({
  resources: [
    defineDocumentFunction({
      name: 'render-solution-template',
      event: {
        on: ['create', 'update'],
        filter: '_type == "solution" && detailRenderMode == "htmlTemplate"',
        projection: '{_id, _type, title, slug, detailRenderMode, htmlTemplate}',
        resource: {
          type: 'dataset',
          id: 'nljl95h9.production',
        },
      },
    }),
  ],
})
