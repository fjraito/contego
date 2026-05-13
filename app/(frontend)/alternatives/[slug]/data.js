export const FEATURE_SCHEMA = [
  {
    section: 'Strategic Fit',
    rows: [
      { id: 'specialization', label: 'Prop firm specialization' },
      { id: 'trust',          label: 'Trust-led positioning' },
      { id: 'content_acq',    label: 'Content-led acquisition focus' },
    ],
  },
  {
    section: 'Service Scope',
    rows: [
      { id: 'seo',     label: 'SEO strategy' },
      { id: 'smm',     label: 'Social media management' },
      { id: 'ugc',     label: 'AI UGC video system' },
      { id: 'paid',    label: 'Paid ads support' },
      { id: 'landing', label: 'Landing page messaging' },
    ],
  },
  {
    section: 'Content & Creative',
    rows: [
      { id: 'scripts',    label: 'Short-form video scripts' },
      { id: 'hooks',      label: 'Hook testing system' },
      { id: 'guardrails', label: 'AI content guardrails' },
      { id: 'voice',      label: 'Brand voice control' },
    ],
  },
  {
    section: 'Best Fit',
    rows: [
      { id: 'fit_trust',      label: 'Best for trust-aware content growth' },
      { id: 'fit_integrated', label: 'Best for SEO, social, and AI UGC together' },
      { id: 'fit_broader',    label: 'Best for broader digital marketing support' },
    ],
  },
]

export const CONTEGO = {
  name: 'Contego',
  initials: 'C',
  values: {
    specialization: { v: 'yes' },
    trust:          { v: 'yes' },
    content_acq:    { v: 'yes' },
    seo:            { v: 'yes' },
    smm:            { v: 'yes' },
    ugc:            { v: 'yes' },
    paid:           { v: 'partial' },
    landing:        { v: 'yes' },
    scripts:        { v: 'yes' },
    hooks:          { v: 'yes' },
    guardrails:     { v: 'yes' },
    voice:          { v: 'yes' },
    fit_trust:      { v: 'yes' },
    fit_integrated: { v: 'yes' },
    fit_broader:    { v: 'partial' },
  },
}

// Static fallback — kept empty now that all competitors live in Sanity.
export const COMPETITORS = {}
