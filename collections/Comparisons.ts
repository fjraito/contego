import type { CollectionConfig } from 'payload'

export const Comparisons: CollectionConfig = {
  slug: 'comparisons',
  access: { read: () => true },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'status'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'e.g. Contego vs TopStep or Best FTMO Alternatives' },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'e.g. contego-vs-topstep or ftmo-alternatives' },
    },
    {
      name: 'type',
      type: 'select',
      options: ['vs', 'alternatives'],
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: ['draft', 'published'],
      defaultValue: 'draft',
      required: true,
    },
    {
      name: 'intro',
      type: 'textarea',
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'competitors',
      type: 'array',
      label: 'Competitors',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'logo', type: 'upload', relationTo: 'media' },
        { name: 'summary', type: 'textarea' },
        {
          name: 'pros',
          type: 'array',
          fields: [{ name: 'point', type: 'text' }],
        },
        {
          name: 'cons',
          type: 'array',
          fields: [{ name: 'point', type: 'text' }],
        },
        { name: 'verdict', type: 'text' },
        { name: 'url', type: 'text' },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        { name: 'metaTitle', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
        { name: 'canonicalUrl', type: 'text' },
        { name: 'noIndex', type: 'checkbox', defaultValue: false },
      ],
    },
  ],
}
