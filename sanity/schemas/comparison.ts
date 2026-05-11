import { defineField, defineType } from 'sanity'

export const comparison = defineType({
  name: 'comparison',
  title: 'Comparison',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'competitors', title: 'Competitors' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      description: 'e.g. Contego vs TopStep or Best FTMO Alternatives',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 96 },
      validation: (R) => R.required(),
      description: 'e.g. contego-vs-topstep',
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      group: 'content',
      options: {
        list: [
          { title: 'Head-to-head (vs)', value: 'vs' },
          { title: 'Alternatives list', value: 'alternatives' },
        ],
        layout: 'radio',
      },
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
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'text',
      rows: 3,
      group: 'content',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [{ name: 'href', type: 'url', title: 'URL' }],
              },
            ],
          },
        },
      ],
    }),

    defineField({
      name: 'competitors',
      title: 'Competitors',
      type: 'array',
      group: 'competitors',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Name', validation: (R) => R.required() },
            { name: 'url', type: 'url', title: 'Website URL' },
            {
              name: 'logo',
              type: 'image',
              title: 'Logo',
              options: { hotspot: true },
              fields: [{ name: 'alt', type: 'string', title: 'Alt text' }],
            },
            { name: 'summary', type: 'text', title: 'Summary', rows: 3 },
            {
              name: 'pros',
              type: 'array',
              title: 'Pros',
              of: [{ type: 'string' }],
            },
            {
              name: 'cons',
              type: 'array',
              title: 'Cons',
              of: [{ type: 'string' }],
            },
            { name: 'verdict', type: 'string', title: 'Verdict' },
          ],
          preview: {
            select: { title: 'name', subtitle: 'verdict' },
          },
        },
      ],
    }),

    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'seo',
      fields: [
        { name: 'metaTitle', type: 'string', title: 'Meta Title' },
        { name: 'metaDescription', type: 'text', title: 'Meta Description', rows: 3, description: 'Recommended: 140–160 chars.' },
        { name: 'noIndex', type: 'boolean', title: 'No Index', initialValue: false },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', type: 'type', status: 'status' },
    prepare: ({ title, type, status }) => ({
      title,
      subtitle: [type, status].filter(Boolean).join(' · '),
    }),
  },
})
