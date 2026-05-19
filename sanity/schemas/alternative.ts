import { defineField, defineType } from 'sanity'

export const alternative = defineType({
  name: 'alternative',
  title: 'Alternative',
  type: 'document',
  groups: [
    { name: 'info', title: 'Competitor info', default: true },
    { name: 'features', title: 'Feature comparison' },
    { name: 'verdict', title: 'Verdict' },
    { name: 'faq', title: 'FAQ' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'competitorName',
      title: 'Competitor name',
      type: 'string',
      group: 'info',
      description: 'e.g. "GrowYourPropFirm"',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'competitorShort',
      title: 'Short name',
      type: 'string',
      group: 'info',
      description: 'Used inline, e.g. "GYPF"',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'competitorInitials',
      title: 'Initials',
      type: 'string',
      group: 'info',
      description: '1-3 letters for the logo badge',
      validation: (R) => R.max(3),
    }),
    defineField({
      name: 'competitorLogo',
      title: 'Competitor logo URL',
      type: 'url',
      group: 'info',
      description: 'Full URL to the competitor logo image (stored in /public/assets/competitors/)',
    }),
    defineField({
      name: 'competitorUrl',
      title: 'Competitor website',
      type: 'url',
      group: 'info',
      description: 'e.g. "https://growyourpropfirm.com"',
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      group: 'info',
      options: { source: 'competitorName', maxLength: 96 },
      description: 'Shows as /alternatives/[slug]',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'info',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'draft',
      validation: (R) => R.required(),
    }),

    // ── Feature comparison (dynamic per competitor) ──
    defineField({
      name: 'featureTable',
      title: 'Feature comparison table',
      type: 'array',
      group: 'features',
      description: 'Each section has a name and rows comparing Contego vs the competitor.',
      of: [
        {
          type: 'object',
          name: 'featureSection',
          title: 'Section',
          fields: [
            {
              name: 'sectionName',
              type: 'string',
              title: 'Section name',
              description: 'e.g. "Strategic Fit", "Service Scope"',
              validation: (R: any) => R.required(),
            },
            {
              name: 'rows',
              type: 'array',
              title: 'Rows',
              of: [
                {
                  type: 'object',
                  name: 'featureRow',
                  fields: [
                    { name: 'label', type: 'string', title: 'Feature label', validation: (R: any) => R.required() },
                    {
                      name: 'contego',
                      type: 'string',
                      title: 'Contego',
                      options: {
                        list: [
                          { title: 'Yes', value: 'yes' },
                          { title: 'No', value: 'no' },
                          { title: 'Partial', value: 'partial' },
                        ],
                        layout: 'radio',
                        direction: 'horizontal',
                      },
                      initialValue: 'yes',
                    },
                    {
                      name: 'competitor',
                      type: 'string',
                      title: 'Competitor',
                      options: {
                        list: [
                          { title: 'Yes', value: 'yes' },
                          { title: 'No', value: 'no' },
                          { title: 'Partial', value: 'partial' },
                        ],
                        layout: 'radio',
                        direction: 'horizontal',
                      },
                      initialValue: 'partial',
                    },
                  ],
                  preview: {
                    select: { title: 'label', contego: 'contego', competitor: 'competitor' },
                    prepare: ({ title, contego, competitor }: any) => ({
                      title: title || 'Untitled',
                      subtitle: `Contego: ${contego || '?'} | Competitor: ${competitor || '?'}`,
                    }),
                  },
                },
              ],
            },
          ],
          preview: {
            select: { title: 'sectionName', rows: 'rows' },
            prepare: ({ title, rows }: any) => ({
              title: title || 'Untitled section',
              subtitle: `${rows?.length || 0} rows`,
            }),
          },
        },
      ],
    }),

    // ── Verdict ──
    defineField({
      name: 'verdictIntro',
      title: 'Verdict intro',
      type: 'text',
      group: 'verdict',
      rows: 4,
      description: 'The main verdict paragraph(s). Separate paragraphs with blank lines.',
    }),
    defineField({
      name: 'pickContego',
      title: 'Pick Contego if you want...',
      type: 'array',
      group: 'verdict',
      of: [{ type: 'string' }],
      description: 'List of reasons to pick Contego',
    }),
    defineField({
      name: 'pickThem',
      title: 'Pick [competitor] if you want...',
      type: 'array',
      group: 'verdict',
      of: [{ type: 'string' }],
      description: 'List of reasons to pick the competitor',
    }),

    // ── FAQ ──
    defineField({
      name: 'faqItems',
      title: 'FAQ items',
      type: 'array',
      group: 'faq',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'q', type: 'string', title: 'Question' },
            { name: 'a', type: 'text', title: 'Answer', rows: 3 },
          ],
          preview: { select: { title: 'q' } },
        },
      ],
    }),

    // ── SEO ──
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'seo',
      fields: [
        { name: 'metaTitle', type: 'string', title: 'Meta Title', description: 'Defaults to "Contego vs [Competitor]" if empty.' },
        { name: 'metaDescription', type: 'text', title: 'Meta Description', rows: 3, description: 'Recommended: 140-160 chars.' },
        { name: 'noIndex', type: 'boolean', title: 'No Index', initialValue: false },
      ],
    }),
  ],
  preview: {
    select: { name: 'competitorName', status: 'status' },
    prepare: ({ name, status }) => ({
      title: `Contego vs ${name || 'Untitled'}`,
      subtitle: status === 'published' ? 'Published' : 'Draft',
    }),
  },
})
