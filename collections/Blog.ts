import type { CollectionConfig } from 'payload'

export const Blog: CollectionConfig = {
  slug: 'blog',
  access: { read: () => true },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'publishedAt'],
    preview: (doc) =>
      doc?.slug ? `${process.env.NEXT_PUBLIC_SERVER_URL}/blog/${doc.slug}` : null,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'URL-friendly version of the title. e.g. best-prop-firms-2026' },
    },
    {
      name: 'category',
      type: 'select',
      options: ['SEO', 'AI UGC', 'Social Media', 'Prop Firm News', 'Marketing Strategy'],
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
      name: 'publishedAt',
      type: 'date',
      admin: { date: { pickerAppearance: 'dayAndTime' } },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'excerpt',
      type: 'textarea',
      admin: { description: 'Short summary shown in blog listings and SEO description.' },
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        { name: 'metaTitle', type: 'text', admin: { description: 'Defaults to post title if empty.' } },
        { name: 'metaDescription', type: 'textarea', admin: { description: 'Recommended: 140–160 chars.' } },
        { name: 'canonicalUrl', type: 'text' },
        { name: 'noIndex', type: 'checkbox', defaultValue: false },
      ],
    },
  ],
}
