import {defineConfig} from 'sanity'
import {structureTool, type StructureBuilder} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'spiller',

  projectId: '68r5ov2e',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S: StructureBuilder) => {
        const existingItems = S.documentTypeListItems().filter(
          (item) => item.getId() !== 'submission',
        )
        const submissions = S.listItem()
          .id('submissions')
          .title('Submissions')
          .child(
            S.documentTypeList('submission')
              .title('Submissions')
              .filter('_type == "submission" && _id in path("submissions.*")')
              .initialValueTemplates([])
              .canHandleIntent(
                (intentName: string, params: {type?: string; id?: string}) =>
                  intentName === 'edit' &&
                  params.type === 'submission' &&
                  typeof params.id === 'string' &&
                  params.id.startsWith('submissions.'),
              ),
          )

        return S.list()
          .title('Content')
          .items([...existingItems, submissions])
      },
    }),
    visionTool(),
  ],

  document: {
    // Submission records are inspected only. Keep the standard actions for every other type.
    actions: (previous, context) => (context.schemaType === 'submission' ? [] : previous),
    // Remove every generated/template-based creation route for submissions.
    newDocumentOptions: (previous) => previous.filter((item) => item.templateId !== 'submission'),
  },

  schema: {
    types: schemaTypes,
  },
})
