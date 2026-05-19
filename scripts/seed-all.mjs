import { createClient } from 'next-sanity'
import { STATIC_BLOG_POSTS } from '../app/(frontend)/blog/data.js'
import { COMPETITORS } from '../app/(frontend)/alternatives/[slug]/data.js'
import { PROP_FIRMS } from '../app/(frontend)/prop-firms/data.js'

const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!projectId) throw new Error('Missing SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_PROJECT_ID')
if (!token) throw new Error('Missing SANITY_API_TOKEN — generate a write token at manage.sanity.io > API > Tokens')

const client = createClient({ projectId, dataset, token, apiVersion: '2024-01-01', useCdn: false })

function keyFrom(value, index = 0) {
  return String(value || `item-${index}`).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 48) || `item-${index}`
}

// ── Blog Posts ──

async function seedBlogPosts() {
  console.log(`\nSeeding ${STATIC_BLOG_POSTS.length} blog posts…`)

  for (const post of STATIC_BLOG_POSTS) {
    const existingId = await client.fetch(
      '*[_type == "blogPost" && slug.current == $slug][0]._id',
      { slug: post.slug },
    )
    const doc = {
      _id: existingId || `blogPost.${keyFrom(post.slug)}`,
      _type: 'blogPost',
      title: post.title,
      slug: { _type: 'slug', current: post.slug },
      excerpt: post.excerpt,
      content: post.content,
      status: 'published',
      category: post.category,
      publishedAt: post.publishedAt,
      author: post.author || 'Contego Team',
      editedBy: post.editedBy || 'Contego Editorial',
      factCheckedBy: post.factCheckedBy || 'Contego Editorial',
      featuredImageUrl: post.featuredImage?.url || null,
      seo: post.seo || {},
    }

    await client.createOrReplace(doc)
    console.log(`  ✓ ${post.title}`)
  }
}

// ── Alternatives ──

async function seedAlternatives() {
  console.log(`\nSeeding ${Object.keys(COMPETITORS).length} alternatives…`)

  for (const comp of Object.values(COMPETITORS)) {
    const existingId = await client.fetch(
      '*[_type == "alternative" && slug.current == $slug][0]._id',
      { slug: comp.slug },
    )
    const doc = {
      _id: existingId || `alternative.${keyFrom(comp.slug)}`,
      _type: 'alternative',
      status: 'published',
      competitorName: comp.name,
      competitorShort: comp.short,
      competitorInitials: comp.initials,
      competitorLogo: comp.logo,
      competitorUrl: comp.url,
      slug: { _type: 'slug', current: comp.slug },
      featureTable: (comp.featureTable || []).map((section, si) => ({
        _key: keyFrom(section.sectionName, si),
        _type: 'featureSection',
        sectionName: section.sectionName,
        rows: (section.rows || []).map((row, ri) => ({
          _key: keyFrom(row.label, ri),
          _type: 'featureRow',
          label: row.label,
          contego: row.contego,
          competitor: row.competitor,
        })),
      })),
      verdictIntro: comp.verdictIntro,
      pickContego: comp.pickContego,
      pickThem: comp.pickThem,
      faqItems: (comp.faqItems || []).map((item, i) => ({
        _key: keyFrom(item.q, i),
        q: item.q,
        a: item.a,
      })),
      seo: {
        metaTitle: `Contego vs ${comp.name}`,
        metaDescription: comp.verdictIntro?.split('\n')[0]?.slice(0, 160) || '',
      },
    }

    await client.createOrReplace(doc)
    console.log(`  ✓ Contego vs ${comp.name}`)
  }
}

// ── Prop Firms ──

async function seedPropFirms() {
  console.log(`\nSeeding ${PROP_FIRMS.length} prop firms…`)

  for (const firm of PROP_FIRMS) {
    const existingId = await client.fetch(
      '*[_type == "propFirm" && slug.current == $slug][0]._id',
      { slug: firm.slug },
    )
    const doc = {
      _id: existingId || `propFirm.${keyFrom(firm.slug)}`,
      _type: 'propFirm',
      status: 'published',
      name: firm.name,
      slug: { _type: 'slug', current: firm.slug },
      initials: firm.initials,
      rank: firm.rank,
      editorPick: firm.editorPick || false,
      tagline: firm.tagline,
      rating: firm.rating,
      reviews: firm.reviews,
      tags: firm.tags,
      stats: firm.stats || {},
      promo: firm.promo || null,
      seo: {
        metaTitle: `${firm.name} Review (2026)`,
        metaDescription: firm.tagline?.slice(0, 160) || '',
      },
    }

    await client.createOrReplace(doc)
    console.log(`  ✓ ${firm.name}`)
  }
}

// ── Run ──

const target = process.argv[2]

if (!target || target === 'all') {
  await seedBlogPosts()
  await seedAlternatives()
  await seedPropFirms()
} else if (target === 'blog') {
  await seedBlogPosts()
} else if (target === 'alternatives') {
  await seedAlternatives()
} else if (target === 'prop-firms') {
  await seedPropFirms()
} else {
  console.error(`Unknown target: ${target}. Use: all, blog, alternatives, prop-firms`)
  process.exit(1)
}

console.log('\nDone.')
