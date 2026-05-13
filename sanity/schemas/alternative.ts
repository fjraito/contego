import { defineField, defineType } from 'sanity'

// Helper for feature value fields — keeps the schema flat and readable in the Studio.
function featureField(name: string, title: string, description: string) {
  return defineField({
    name,
    title,
    type: 'object',
    description,
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
            { title: 'Custom value', value: 'val' },
          ],
          layout: 'radio',
          direction: 'horizontal',
        },
        initialValue: 'val',
      },
      {
        name: 'text',
        type: 'string',
        title: 'Detail',
        description: 'Short description or value, e.g. "Content only", "4 / mo", "Not offered"',
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
    { name: 'content', title: 'Page content' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // ── Competitor info ──
    defineField({
      name: 'competitorName',
      title: 'Competitor name',
      type: 'string',
      group: 'info',
      description: 'e.g. "In-house team", "PropMarket Co.", "Freelance roster"',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'competitorShort',
      title: 'Short name',
      type: 'string',
      group: 'info',
      description: 'Used inline in sentences, e.g. "In-house", "PropMarket", "Freelancers"',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'competitorInitials',
      title: 'Initials',
      type: 'string',
      group: 'info',
      description: '1-2 letters for the logo badge, e.g. "IH", "PM", "FR"',
      validation: (R) => R.max(3),
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      group: 'info',
      options: { source: 'competitorName', maxLength: 96 },
      description: 'Auto-generated from competitor name. Shows as /alternatives/[slug]',
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

    // ── Feature comparison (their column) ──
    // Service scope
    defineField({ name: 'featuresHeading1', title: 'Service scope', type: 'string', group: 'features', readOnly: true, initialValue: '── Service scope ──', hidden: false }),
    featureField('f_seo', 'SEO (programmatic + content)', 'Do they offer SEO services?'),
    featureField('f_smm', 'Social media management', 'Do they manage social channels?'),
    featureField('f_ugc', 'AI UGC video at scale', 'Do they produce AI UGC?'),
    featureField('f_paid', 'Paid social creative ops', 'Paid ad creative support?'),
    featureField('f_compliance', 'Built-in compliance review', 'Do they review content for compliance?'),

    // Output cadence
    defineField({ name: 'featuresHeading2', title: 'Output cadence', type: 'string', group: 'features', readOnly: true, initialValue: '── Output cadence ──', hidden: false }),
    featureField('f_articles', 'Articles per month', 'How many articles do they ship?'),
    featureField('f_videos', 'UGC videos per month', 'Monthly video output'),
    featureField('f_channels', 'Social channels managed', 'How many channels?'),
    featureField('f_reports', 'Reporting cadence', 'How often do they report?'),

    // Engagement model
    defineField({ name: 'featuresHeading3', title: 'Engagement model', type: 'string', group: 'features', readOnly: true, initialValue: '── Engagement model ──', hidden: false }),
    featureField('f_lockin', 'Contract length', 'Month-to-month or lock-in?'),
    featureField('f_pricing', 'Starting price', 'Their entry price point'),
    featureField('f_focus', 'Prop firm specialization', 'Are they prop-firm focused?'),
    featureField('f_ownership', 'You own the content', 'Content ownership terms'),
    featureField('f_strategy', 'Founder-led strategy', 'Who leads the strategy?'),

    // ── Page content ──
    defineField({
      name: 'testimonialQuote',
      title: 'Testimonial quote',
      type: 'text',
      group: 'content',
      rows: 3,
      description: 'A quote from a client who switched from this competitor to Contego.',
    }),
    defineField({
      name: 'testimonialAttribution',
      title: 'Testimonial attribution',
      type: 'string',
      group: 'content',
      description: 'e.g. "Lukas R., Marketing Lead at a $3M/mo prop firm"',
    }),
    defineField({
      name: 'testimonialInitials',
      title: 'Testimonial initials',
      type: 'string',
      group: 'content',
      description: 'Avatar initials, e.g. "LR"',
    }),

    defineField({
      name: 'deepDiveSeo',
      title: 'Deep dive: SEO',
      type: 'text',
      group: 'content',
      rows: 8,
      description: 'Write 2-3 paragraphs comparing their SEO approach to ours. Separate paragraphs with a blank line. Use <strong> for emphasis. End with "In short: [one-line summary]" on its own line.',
    }),
    defineField({
      name: 'deepDiveSocial',
      title: 'Deep dive: Social media',
      type: 'text',
      group: 'content',
      rows: 8,
      description: 'Same format as above. Compare their social media management to ours.',
    }),
    defineField({
      name: 'deepDiveUgc',
      title: 'Deep dive: AI UGC',
      type: 'text',
      group: 'content',
      rows: 8,
      description: 'Same format. Compare their UGC video capability to ours.',
    }),
    defineField({
      name: 'deepDiveReporting',
      title: 'Deep dive: Reporting',
      type: 'text',
      group: 'content',
      rows: 8,
      description: 'Same format. Compare their reporting cadence to ours.',
    }),

    // ── SEO overrides ──
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
      description: 'Leave blank to auto-generate',
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
