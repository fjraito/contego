import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

export default defineConfig({
  name: 'contego',
  title: 'Contego CMS',
  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contego')
          .items([
            S.listItem()
              .title('Blog Posts')
              .icon(() => '✍️')
              .child(
                S.documentList()
                  .title('Blog Posts')
                  .schemaType('blogPost')
                  .filter('_type == "blogPost"')
                  .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
              ),
            S.listItem()
              .title('Alternatives')
              .icon(() => '⚖️')
              .child(
                S.documentList()
                  .title('Alternatives')
                  .schemaType('alternative')
                  .filter('_type == "alternative"')
              ),
            S.divider(),
            S.listItem()
              .title('Published Posts')
              .icon(() => '✅')
              .child(
                S.documentList()
                  .title('Published Posts')
                  .schemaType('blogPost')
                  .filter('_type == "blogPost" && status == "published"')
                  .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
              ),
            S.listItem()
              .title('Drafts')
              .icon(() => '📝')
              .child(
                S.documentList()
                  .title('Drafts')
                  .schemaType('blogPost')
                  .filter('_type == "blogPost" && status == "draft"')
              ),
          ]),
    }),
    visionTool({ defaultApiVersion: '2024-01-01' }),
  ],

  schema: {
    types: schemaTypes,
  },
})
