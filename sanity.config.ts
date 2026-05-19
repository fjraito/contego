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
  if (doc._type === 'propFirm' && doc.slug?.current) {
    return `${siteUrl}/prop-firms/${doc.slug.current}`
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
                S.list()
                  .title('Blog Posts')
                  .items([
                    S.listItem()
                      .title('All Posts')
                      .child(
                        S.documentList()
                          .title('All Posts')
                          .schemaType('blogPost')
                          .filter('_type == "blogPost"')
                          .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                      ),
                    S.listItem()
                      .title('Published')
                      .icon(() => '✅')
                      .child(
                        S.documentList()
                          .title('Published')
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
                  ])
              ),
            S.listItem()
              .title('Prop Firms')
              .icon(() => '🏢')
              .child(
                S.list()
                  .title('Prop Firms')
                  .items([
                    S.listItem()
                      .title('All Firms')
                      .child(
                        S.documentList()
                          .title('All Firms')
                          .schemaType('propFirm')
                          .filter('_type == "propFirm"')
                          .defaultOrdering([{ field: 'rank', direction: 'asc' }])
                      ),
                    S.listItem()
                      .title('Published')
                      .icon(() => '✅')
                      .child(
                        S.documentList()
                          .title('Published')
                          .schemaType('propFirm')
                          .filter('_type == "propFirm" && status == "published"')
                          .defaultOrdering([{ field: 'rank', direction: 'asc' }])
                      ),
                    S.listItem()
                      .title('Drafts')
                      .icon(() => '📝')
                      .child(
                        S.documentList()
                          .title('Drafts')
                          .schemaType('propFirm')
                          .filter('_type == "propFirm" && status == "draft"')
                      ),
                  ])
              ),
            S.listItem()
              .title('Alternatives')
              .icon(() => '⚖️')
              .child(
                S.list()
                  .title('Alternatives')
                  .items([
                    S.listItem()
                      .title('All Alternatives')
                      .child(
                        S.documentList()
                          .title('All Alternatives')
                          .schemaType('alternative')
                          .filter('_type == "alternative"')
                      ),
                    S.listItem()
                      .title('Published')
                      .icon(() => '✅')
                      .child(
                        S.documentList()
                          .title('Published')
                          .schemaType('alternative')
                          .filter('_type == "alternative" && status == "published"')
                      ),
                    S.listItem()
                      .title('Drafts')
                      .icon(() => '📝')
                      .child(
                        S.documentList()
                          .title('Drafts')
                          .schemaType('alternative')
                          .filter('_type == "alternative" && status == "draft"')
                      ),
                  ])
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
