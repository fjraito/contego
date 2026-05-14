import { defineField, defineType } from 'sanity'

function featureField(name: string, title: string) {
  return defineField({
    name,
    title,
    type: 'object',
    hidden: true,
    fields: [
      {
        name: 'v',
        type: 'string',
        title: 'Rating',
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
  })
}

function ratingField(name: string, title: string) {
  return defineField({
    name,
    title,
    type: 'string',
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
    validation: (R) => R.required(),
  })
}

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
    // ── Competitor info ──
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
      description: 'Short fallback text for the logo badge when no image is available',
      validation: (R) => R.max(8),
    }),
    defineField({
      name: 'competitorLogoUrl',
      title: 'Competitor logo URL',
      type: 'string',
      group: 'info',
      description: 'Use a local public path such as /assets/alternative-logos/yourpropfirm.svg or a full image URL.',
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
    defineField({
      name: 'heroDescription',
      title: 'Hero description',
      type: 'text',
      group: 'info',
      rows: 3,
      description: 'Competitor-specific intro below the Contego vs competitor headline.',
    }),

    // ── Feature comparison ──
    defineField({
      name: 'comparisonDescription',
      title: 'Comparison intro',
      type: 'text',
      group: 'features',
      rows: 3,
      description: 'Short intro above the feature comparison table.',
    }),
    defineField({
      name: 'featureSections',
      title: 'Feature table sections',
      type: 'array',
      group: 'features',
      description: 'Flexible comparison table grouped by section. Use yes, partial, and no ratings for each row.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'section',
              title: 'Section title',
              type: 'string',
              validation: (R) => R.required(),
            }),
            defineField({
              name: 'rows',
              title: 'Rows',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'label',
                      title: 'Feature label',
                      type: 'string',
                      validation: (R) => R.required(),
                    }),
                    ratingField('contego', 'Contego'),
                    ratingField('competitor', 'Competitor'),
                  ],
                  preview: {
                    select: { title: 'label', contego: 'contego', competitor: 'competitor' },
                    prepare: ({ title, contego, competitor }) => ({
                      title,
                      subtitle: `Contego: ${contego || 'partial'} • Competitor: ${competitor || 'partial'}`,
                    }),
                  },
                },
              ],
              validation: (R) => R.required().min(1),
            }),
          ],
          preview: {
            select: { title: 'section', rows: 'rows' },
            prepare: ({ title, rows }) => ({
              title: title || 'Untitled section',
              subtitle: `${rows?.length || 0} rows`,
            }),
          },
        },
      ],
    }),

    // Legacy flat fields kept hidden so old Sanity docs still render.
    // Strategic Fit
    featureField('f_specialization', 'Prop firm specialization'),
    featureField('f_trust', 'Trust-led positioning'),
    featureField('f_content_acq', 'Content-led acquisition focus'),
    // Service Scope
    featureField('f_seo', 'SEO strategy'),
    featureField('f_smm', 'Social media management'),
    featureField('f_ugc', 'AI UGC video system'),
    featureField('f_paid', 'Paid ads support'),
    featureField('f_landing', 'Landing page messaging'),
    // Content & Creative
    featureField('f_scripts', 'Short-form video scripts'),
    featureField('f_hooks', 'Hook testing system'),
    featureField('f_guardrails', 'AI content guardrails'),
    featureField('f_voice', 'Brand voice control'),
    // Best Fit
    featureField('f_fit_trust', 'Best for trust-aware content growth'),
    featureField('f_fit_integrated', 'Best for SEO, social, and AI UGC together'),
    featureField('f_fit_broader', 'Best for broader digital marketing support'),

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
      name: 'metaTitle',
      title: 'Meta title override',
      type: 'string',
      group: 'seo',
      description: 'Leave blank to use "Contego vs [Competitor name]"',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description override',
      type: 'text',
      group: 'seo',
      rows: 3,
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
