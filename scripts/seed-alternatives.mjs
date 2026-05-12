// One-off seed script: pushes the 4 static alternatives from data.js into Sanity as drafts.
// Run: node scripts/seed-alternatives.mjs
import { createClient } from '@sanity/client'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Read .env.local manually (dotenv default is .env)
const envPath = resolve(__dirname, '..', '.env.local')
const envText = readFileSync(envPath, 'utf8')
envText.split('\n').forEach((line) => {
  const m = line.match(/^([^=#]+)=(.*)$/)
  if (m) process.env[m[1].trim()] = m[2].trim()
})

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Dynamic import of data.js (ESM-compatible)
const dataModule = await import('../app/(frontend)/compare/[slug]/data.js')
const { COMPETITORS } = dataModule

function toFeatureValues(values) {
  return Object.entries(values).map(([rowId, val]) => ({
    _key: rowId,
    rowId,
    v: val.v,
    text: val.text || '',
  }))
}

function toDifferentiators(diffs) {
  return diffs.map((d, i) => ({
    _key: `diff-${i}`,
    major: !!d.major,
    badge: d.badge,
    title: d.title,
    desc: d.desc,
    usLabel: d.us?.label || 'Contego',
    usValue: d.us?.value || '',
    themLabel: d.them?.label || '',
    themValue: d.them?.value || '',
  }))
}

function toDeepDive(dd) {
  return {
    seo: { paras: dd.seo.paras, inShort: dd.seo.inShort },
    social: { paras: dd.social.paras, inShort: dd.social.inShort },
    ugc: { paras: dd.ugc.paras, inShort: dd.ugc.inShort },
    reporting: { paras: dd.reporting.paras, inShort: dd.reporting.inShort },
  }
}

const docs = Object.entries(COMPETITORS).map(([slug, c]) => ({
  _id: `drafts.alternative-${slug}`,
  _type: 'alternative',
  title: `Contego vs ${c.name}`,
  slug: { _type: 'slug', current: slug },
  status: 'draft',
  competitorName: c.name,
  competitorShort: c.short,
  competitorInitials: c.initials,
  featureValues: toFeatureValues(c.values),
  differentiators: toDifferentiators(c.differentiators),
  deepDive: toDeepDive(c.deepDive),
  testimonial: {
    quote: c.testimonial.quote,
    who: c.testimonial.who,
    initials: c.testimonial.initials,
  },
  seo: {
    metaTitle: `Contego vs ${c.name}`,
    metaDescription: `An honest side-by-side comparison of Contego vs ${c.name} — services, pricing, UGC volume, and which is the right call for your prop firm.`,
    noIndex: false,
  },
}))

console.log(`Seeding ${docs.length} alternatives to Sanity (project ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID})…`)

for (const doc of docs) {
  try {
    const res = await client.createOrReplace(doc)
    console.log(`  ✓ ${doc._id} (${res._id})`)
  } catch (err) {
    console.error(`  ✗ ${doc._id}: ${err.message}`)
    process.exitCode = 1
  }
}

console.log('Done.')
