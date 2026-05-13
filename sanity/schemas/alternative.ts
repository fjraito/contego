import { defineField, defineType } from 'sanity'

function featureField(name: string, title: string) {
  return defineField({
    name,
    title,
    type: 'object',
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
      description: '1-3 letters for the logo badge',
      validation: (R) => R.max(3),
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

    // ── Feature comparison ──
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
