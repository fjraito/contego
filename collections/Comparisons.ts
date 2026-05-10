import type { CollectionConfig } from 'payload'

export const Comparisons: CollectionConfig = {
  slug: 'comparisons',
  access: { read: () => true },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'status'],
    preview: (doc) =>
      doc?.slug ? `${process.env.NEXT_PUBLIC_SERVER_URL}/compare/${doc.slug}` : null,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: { description: 'e.g. Contego vs TopStep or Best FTMO Alternatives' },
            },
            {
              name: 'intro',
              type: 'textarea',
            },
            {
              name: 'content',
              type: 'richText',
            },
          ],
        },
        {
          label: 'Competitors',
          fields: [
            {
              name: 'competitors',
              type: 'array',
              label: false,
              admin: {
                initCollapsed: true,
                components: { RowLabel: undefined },
              },
              fields: [
                { name: 'name', type: 'text', required: true },
                {
                  type: 'row',
                  fields: [
                    { name: 'logo', type: 'upload', relationTo: 'media', admin: { width: '50%' } },
                    { name: 'url', type: 'text', admin: { width: '50%' } },
                  ],
                },
                { name: 'summary', type: 'textarea' },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'pros',
                      type: 'array',
                      admin: { width: '50%' },
                      fields: [{ name: 'point', type: 'text' }],
                    },
                    {
                      name: 'cons',
                      type: 'array',
                      admin: { width: '50%' },
                      fields: [{ name: 'point', type: 'text' }],
                    },
                  ],
                },
                { name: 'verdict', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'seo',
              type: 'group',
              label: false,
              fields: [
                { name: 'metaTitle', type: 'text' },
                { name: 'metaDescription', type: 'textarea' },
                { name: 'canonicalUrl', type: 'text' },
                { name: 'noIndex', type: 'checkbox', defaultValue: false },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'e.g. contego-vs-topstep',
      },
    },
    {
      name: 'type',
      type: 'select',
      options: ['vs', 'alternatives'],
      required: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'status',
      type: 'select',
      options: ['draft', 'published'],
      defaultValue: 'draft',
      required: true,
      admin: { position: 'sidebar' },
    },
  ],
}
