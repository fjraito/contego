// Seed script: pushes alternatives from data.js into Sanity using the flat schema.
// Run: node scripts/seed-alternatives.mjs
import { createClient } from '@sanity/client'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

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

const dataModule = await import('../app/(frontend)/alternatives/[slug]/data.js')
const { COMPETITORS } = dataModule

// Convert deep dive object { paras: string[], inShort: string } to a single text block
function deepDiveToText(dd) {
  if (!dd || !dd.paras) return ''
  const parts = [...dd.paras]
  if (dd.inShort) parts.push(`In short: ${dd.inShort}`)
  return parts.join('\n\n')
}

const docs = Object.entries(COMPETITORS).map(([slug, c]) => {
  const doc = {
    _id: `alternative-${slug}`,
    _type: 'alternative',
    competitorName: c.name,
    competitorShort: c.short,
    competitorInitials: c.initials,
    slug: { _type: 'slug', current: slug },
    status: 'published',
    // Testimonial
    testimonialQuote: c.testimonial?.quote || '',
    testimonialAttribution: c.testimonial?.who || '',
    testimonialInitials: c.testimonial?.initials || '',
    // Deep dive (flat text fields)
    deepDiveSeo: deepDiveToText(c.deepDive?.seo),
    deepDiveSocial: deepDiveToText(c.deepDive?.social),
    deepDiveUgc: deepDiveToText(c.deepDive?.ugc),
    deepDiveReporting: deepDiveToText(c.deepDive?.reporting),
  }

  // Feature values as flat f_ fields
  for (const [id, val] of Object.entries(c.values)) {
    doc[`f_${id}`] = { v: val.v, text: val.text || '' }
  }

  return doc
})

console.log(`Seeding ${docs.length} alternatives to Sanity (project ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID})…`)

for (const doc of docs) {
  try {
    const res = await client.createOrReplace(doc)
    console.log(`  ✓ ${res._id} — ${doc.competitorName}`)
  } catch (err) {
    console.error(`  ✗ ${doc._id}: ${err.message}`)
    process.exitCode = 1
  }
}

console.log('Done.')
