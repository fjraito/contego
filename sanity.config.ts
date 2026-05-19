import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://contego.vercel.app'

function resolveProductionUrl(doc: Record<string, any>): string | undefined {
  if (doc._type === 'blogPost' && doc.slug?.current) {
    return `${siteUrl}/blog/${doc.slug.current}`
  }
  if (doc._type === 'alternative' && doc.slug?.current) {
    return `${siteUrl}/alternatives/${doc.slug.current}`
  }
  return undefined
}

export default defineConfig({
  name: 'contego',
  title: 'Contego CMS',
  basePath: '/studio',
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

  document: {
    productionUrl: async (prev, context) => {
      const { document: doc } = context
      return resolveProductionUrl(doc) || prev
    },
  },
})
