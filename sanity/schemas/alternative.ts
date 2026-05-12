import { defineField, defineType } from 'sanity'

export const alternative = defineType({
  name: 'alternative',
  title: 'Alternative',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'competitor', title: 'Competitor' },
    { name: 'features', title: 'Feature matrix' },
    { name: 'deepDive', title: 'Deep dive' },
    { name: 'testimonial', title: 'Testimonial' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      description: 'e.g. Contego vs In-house team',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 96 },
      description: 'e.g. in-house-team',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'content',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      validation: (R) => R.required(),
    }),

    // Competitor identity
    defineField({
      name: 'competitorName',
      title: 'Competitor name',
      type: 'string',
      group: 'competitor',
      description: 'Full name, e.g. "In-house team"',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'competitorShort',
      title: 'Short name',
      type: 'string',
      group: 'competitor',
      description: 'For inline references, e.g. "an in-house team"',
    }),
    defineField({
      name: 'competitorInitials',
      title: 'Initials',
      type: 'string',
      group: 'competitor',
      description: 'Logo initials, e.g. "IH"',
    }),

    // Feature matrix
    defineField({
      name: 'featureValues',
      title: 'Feature comparison values',
      type: 'array',
      group: 'features',
      description: 'One entry per feature row (id matches FEATURE_SCHEMA)',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'rowId', type: 'string', title: 'Row ID', description: 'e.g. seo, smm, ugc, paid, articles, videos…' },
            {
              name: 'v',
              type: 'string',
              title: 'Type',
              options: {
                list: [
                  { title: 'Yes (green check)', value: 'yes' },
                  { title: 'No (dash)', value: 'no' },
                  { title: 'Partial (tilde)', value: 'partial' },
                  { title: 'Value (text)', value: 'val' },
                ],
              },
            },
            { name: 'text', type: 'string', title: 'Text/value' },
          ],
          preview: {
            select: { title: 'rowId', subtitle: 'text' },
          },
        },
      ],
    }),

    // Differentiators
    defineField({
      name: 'differentiators',
      title: 'Differentiators (used by /compare static page section)',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'major', type: 'boolean', title: 'Major differentiator' },
            { name: 'badge', type: 'string', title: 'Badge label' },
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'desc', type: 'text', title: 'Description', rows: 3 },
            { name: 'usLabel', type: 'string', title: 'Contego label' },
            { name: 'usValue', type: 'string', title: 'Contego value' },
            { name: 'themLabel', type: 'string', title: 'Competitor label' },
            { name: 'themValue', type: 'string', title: 'Competitor value' },
          ],
          preview: { select: { title: 'title', subtitle: 'desc' } },
        },
      ],
    }),

    // Deep dive
    defineField({
      name: 'deepDive',
      title: 'Deep dive sections',
      type: 'object',
      group: 'deepDive',
      fields: [
        deepDiveSection('seo', 'SEO & content'),
        deepDiveSection('social', 'Social media'),
        deepDiveSection('ugc', 'AI UGC video'),
        deepDiveSection('reporting', 'Reporting'),
      ],
    }),

    // Testimonial
    defineField({
      name: 'testimonial',
      title: 'Testimonial',
      type: 'object',
      group: 'testimonial',
      fields: [
        { name: 'quote', type: 'text', title: 'Quote', rows: 4 },
        { name: 'who', type: 'string', title: 'Attribution (Name, Title)' },
        { name: 'initials', type: 'string', title: 'Avatar initials' },
      ],
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'seo',
      fields: [
        { name: 'metaTitle', type: 'string', title: 'Meta Title' },
        { name: 'metaDescription', type: 'text', title: 'Meta Description', rows: 3 },
        { name: 'noIndex', type: 'boolean', title: 'No Index', initialValue: false },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', status: 'status', name: 'competitorName' },
    prepare: ({ title, status, name }) => ({
      title: title || `Contego vs ${name}`,
      subtitle: status,
    }),
  },
})

function deepDiveSection(name: string, title: string) {
  return defineField({
    name,
    title,
    type: 'object',
    fields: [
      {
        name: 'paras',
        type: 'array',
        title: 'Paragraphs',
        of: [{ type: 'text', rows: 3 }],
      },
      { name: 'inShort', type: 'text', title: '"In short" summary', rows: 2 },
    ],
  })
}
