import { createClient } from 'next-sanity'
import { COMPETITORS } from '../app/(frontend)/alternatives/[slug]/data.js'

const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!projectId) {
  throw new Error('Missing SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_PROJECT_ID')
}

if (!token) {
  throw new Error('Missing SANITY_API_TOKEN')
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
})

function keyFrom(value, index = 0) {
  const key = String(value || `item-${index}`)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48)

  return key || `item-${index}`
}

function toSanityDoc(competitor) {
  return {
    _type: 'alternative',
    status: 'published',
    competitorName: competitor.name,
    competitorShort: competitor.short,
    competitorInitials: competitor.initials,
    competitorLogoUrl: competitor.logoUrl,
    slug: {
      _type: 'slug',
      current: competitor.slug,
    },
    heroDescription: competitor.heroDescription,
    comparisonDescription: competitor.comparisonDescription,
    featureSections: competitor.featureSections.map((section, sectionIndex) => ({
      _key: keyFrom(section.section, sectionIndex),
      section: section.section,
      rows: section.rows.map((row, rowIndex) => ({
        _key: keyFrom(row.label, rowIndex),
        label: row.label,
        contego: row.contego,
        competitor: row.competitor,
      })),
    })),
    verdictIntro: competitor.verdictIntro,
    pickContego: competitor.pickContego,
    pickThem: competitor.pickThem,
    faqItems: competitor.faqItems.map((item, itemIndex) => ({
      _key: keyFrom(item.q, itemIndex),
      q: item.q,
      a: item.a,
    })),
    metaTitle: `Contego vs ${competitor.name}`,
    metaDescription: competitor.heroDescription,
  }
}

for (const competitor of Object.values(COMPETITORS)) {
  const existingId = await client.fetch(
    '*[_type == "alternative" && slug.current == $slug][0]._id',
    { slug: competitor.slug },
  )
  const doc = {
    _id: existingId || `alternative.${competitor.slug}`,
    ...toSanityDoc(competitor),
  }

  await client.createOrReplace(doc)
  console.log(`Upserted ${competitor.name} at /alternatives/${competitor.slug}`)
}
