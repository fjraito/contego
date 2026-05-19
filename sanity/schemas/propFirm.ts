import { defineField, defineType } from 'sanity'

const FIRM_CATEGORIES = [
  'Futures + Forex prop firm',
  'Forex + CFD prop firm',
  'Crypto prop firm',
  'Multi-asset prop firm',
  'Futures prop firm',
  'Forex prop firm',
]

export const propFirm = defineType({
  name: 'propFirm',
  title: 'Prop Firm',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'details', title: 'Details' },
    { name: 'evaluation', title: 'Evaluation & Tiers' },
    { name: 'trading', title: 'Trading' },
    { name: 'faq', title: 'FAQ' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // ── Content ──
    defineField({
      name: 'name',
      title: 'Firm name',
      type: 'string',
      group: 'content',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: { source: 'name', maxLength: 96 },
      description: 'URL path — /prop-firms/[slug]',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'initials',
      title: 'Initials',
      type: 'string',
      group: 'content',
      description: '1-3 letters for the logo badge',
      validation: (R) => R.required().max(3),
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
        direction: 'horizontal',
      },
      initialValue: 'draft',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'rank',
      title: 'Rank',
      type: 'number',
      group: 'content',
      description: 'Display order on the listing page (1 = top)',
      validation: (R) => R.required().min(1),
    }),
    defineField({
      name: 'editorPick',
      title: "Editor's pick",
      type: 'boolean',
      group: 'content',
      initialValue: false,
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'text',
      rows: 2,
      group: 'content',
      description: 'One-liner shown on the listing card.',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'oneLine',
      title: 'One-line summary',
      type: 'string',
      group: 'content',
      description: 'Short verdict shown at the top of the detail page.',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
      description: 'e.g. Futures, 90% split, Instant payouts',
    }),
    defineField({
      name: 'pros',
      title: 'Pros',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'cons',
      title: 'Cons',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'promo',
      title: 'Promo',
      type: 'object',
      group: 'content',
      fields: [
        { name: 'text', type: 'string', title: 'Promo text' },
        { name: 'code', type: 'string', title: 'Promo code' },
        { name: 'expiry', type: 'string', title: 'Expiry label', description: 'e.g. "Ends Jun 30, 2026"' },
      ],
    }),

    // ── Details ──
    defineField({
      name: 'domain',
      title: 'Domain',
      type: 'string',
      group: 'details',
      description: 'e.g. "apexedge.example"',
    }),
    defineField({
      name: 'url',
      title: 'Website URL',
      type: 'url',
      group: 'details',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'details',
      options: { list: FIRM_CATEGORIES.map((c) => ({ title: c, value: c })) },
    }),
    defineField({
      name: 'founded',
      title: 'Founded',
      type: 'number',
      group: 'details',
    }),
    defineField({
      name: 'hq',
      title: 'Headquarters',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      group: 'details',
      validation: (R) => R.min(0).max(5).precision(1),
    }),
    defineField({
      name: 'reviews',
      title: 'Review count',
      type: 'number',
      group: 'details',
    }),
    defineField({
      name: 'trustScore',
      title: 'Trust score',
      type: 'number',
      group: 'details',
      validation: (R) => R.min(0).max(100),
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      group: 'details',
      description: 'Key stats shown in the hero area.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label', validation: (R: any) => R.required() },
            { name: 'value', type: 'string', title: 'Value', validation: (R: any) => R.required() },
            { name: 'accent', type: 'boolean', title: 'Accent?', initialValue: false },
          ],
          preview: {
            select: { title: 'label', subtitle: 'value' },
          },
        },
      ],
    }),
    defineField({
      name: 'scoreBreakdown',
      title: 'Score breakdown',
      type: 'array',
      group: 'details',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label', validation: (R: any) => R.required() },
            { name: 'value', type: 'number', title: 'Score (0-5)', validation: (R: any) => R.required().min(0).max(5).precision(1) },
          ],
          preview: {
            select: { title: 'label', subtitle: 'value' },
            prepare: ({ title, subtitle }: any) => ({ title, subtitle: `${subtitle}/5` }),
          },
        },
      ],
    }),
    defineField({
      name: 'stats',
      title: 'Quick stats',
      type: 'object',
      group: 'details',
      description: 'Four key metrics shown on listing cards.',
      fields: [
        { name: 'funding', type: 'string', title: 'Max funding' },
        { name: 'split', type: 'string', title: 'Profit split' },
        { name: 'fee', type: 'string', title: 'Eval fee' },
        { name: 'payout', type: 'string', title: 'Payout speed' },
      ],
    }),

    // ── Evaluation & Tiers ──
    defineField({
      name: 'tiers',
      title: 'Account tiers',
      type: 'array',
      group: 'evaluation',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'size', type: 'string', title: 'Account size', validation: (R: any) => R.required() },
            { name: 'fee', type: 'string', title: 'Fee' },
            { name: 'target', type: 'string', title: 'Profit target' },
            { name: 'drawdown', type: 'string', title: 'Drawdown limit' },
            { name: 'payout', type: 'string', title: 'Payout split' },
          ],
          preview: {
            select: { title: 'size', subtitle: 'fee' },
            prepare: ({ title, subtitle }: any) => ({ title, subtitle: subtitle ? `Fee: ${subtitle}` : '' }),
          },
        },
      ],
    }),
    defineField({
      name: 'rules',
      title: 'Trading rules',
      type: 'array',
      group: 'evaluation',
      of: [
        {
          type: 'object',
          fields: [
            { name: 't', type: 'string', title: 'Rule name', validation: (R: any) => R.required() },
            { name: 'v', type: 'text', title: 'Details', rows: 2 },
          ],
          preview: { select: { title: 't', subtitle: 'v' } },
        },
      ],
    }),

    // ── Trading ──
    defineField({
      name: 'platforms',
      title: 'Platforms',
      type: 'array',
      group: 'trading',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'instruments',
      title: 'Instruments',
      type: 'array',
      group: 'trading',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'payoutMethods',
      title: 'Payout methods',
      type: 'array',
      group: 'trading',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'payoutDetails',
      title: 'Payout details',
      type: 'object',
      group: 'trading',
      fields: [
        { name: 'first', type: 'string', title: 'First payout timing' },
        { name: 'cycle', type: 'string', title: 'Payout cycle' },
        { name: 'median', type: 'string', title: 'Median payout time' },
        { name: 'minimum', type: 'string', title: 'Minimum withdrawal' },
      ],
    }),

    // ── FAQ ──
    defineField({
      name: 'faq',
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
        { name: 'metaTitle', type: 'string', title: 'Meta Title', description: 'Defaults to firm name if empty.' },
        { name: 'metaDescription', type: 'text', title: 'Meta Description', rows: 3, description: 'Recommended: 140-160 chars.' },
        { name: 'noIndex', type: 'boolean', title: 'No Index', initialValue: false },
      ],
    }),
  ],
  orderings: [
    { title: 'Rank', name: 'rank', by: [{ field: 'rank', direction: 'asc' }] },
    { title: 'Rating', name: 'rating', by: [{ field: 'rating', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'name', rank: 'rank', rating: 'rating', status: 'status' },
    prepare: ({ title, rank, rating, status }) => ({
      title: `${rank ? `#${rank} ` : ''}${title || 'Untitled'}`,
      subtitle: [rating ? `${rating}/5` : null, status].filter(Boolean).join(' · '),
    }),
  },
})
