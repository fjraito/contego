import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { CTA } from '@/components/CTA'
import { client } from '@/sanity/lib/client'
import { ALTERNATIVES_LIST_QUERY } from '@/sanity/lib/queries'
import { COMPETITORS } from './[slug]/data'

export const revalidate = 60

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://contego.agency'

async function getAlternatives() {
  let sanityAlts = []
  try {
    sanityAlts = await client.fetch(ALTERNATIVES_LIST_QUERY, {}, { next: { revalidate: 60 } })
  } catch (_) { /* fall through */ }

  // Merge with static fallback data
  const seen = new Set(sanityAlts.map((a) => a.slug))
  const staticAlts = Object.values(COMPETITORS)
    .filter((c) => !seen.has(c.slug))
    .map((c) => ({
      _id: `static-${c.slug}`,
      title: `Contego vs ${c.name}`,
      slug: c.slug,
      competitorName: c.name,
      competitorShort: c.short,
      competitorInitials: c.initials,
    }))

  return [...sanityAlts, ...staticAlts].sort((a, b) =>
    a.competitorName.localeCompare(b.competitorName)
  )
}

export const metadata = {
  title: 'Alternatives',
  description:
    'See how Contego stacks up against other prop firm marketing options. Honest, side-by-side comparisons on SEO, social media, AI UGC, pricing, and more.',
  alternates: { canonical: '/alternatives' },
  openGraph: {
    type: 'website',
    title: 'Contego Alternatives — Prop Firm Marketing Comparisons',
    description:
      'See how Contego stacks up against other prop firm marketing options. Honest, side-by-side comparisons on SEO, social media, AI UGC, pricing, and more.',
    url: '/alternatives',
  },
}

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

export default async function AlternativesIndex() {
  const alternatives = await getAlternatives()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Contego Alternatives',
    url: `${SITE_URL}/alternatives`,
    description: 'Side-by-side comparisons of Contego vs other prop firm marketing options.',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="compare-page">
        <section className="compare-hero">
          <div className="compare-hero__bg" aria-hidden="true" />
          <div className="shell">
            <span className="eyebrow">
              <span className="dot" />
              Alternatives
            </span>
            <h1 className="alt-index__title">
              How Contego compares to every other option.
            </h1>
            <p className="lead">
              Honest, side-by-side breakdowns of Contego vs the other ways prop firms
              handle marketing. Pick a comparison and see exactly where the
              differences are.
            </p>
          </div>
        </section>

        <section className="section-tight">
          <div className="shell">
            <div className="alt-grid">
              {alternatives.map((alt) => (
                <Link
                  key={alt._id}
                  href={`/alternatives/${alt.slug}`}
                  className="alt-card"
                >
                  <div className="alt-card__top">
                    <div className="alt-card__vs">
                      <span className="alt-card__logo us">C</span>
                      <span className="alt-card__vs-label">vs</span>
                      <span className="alt-card__logo them">
                        {alt.competitorInitials || alt.competitorName?.[0] || '?'}
                      </span>
                    </div>
                    <h2 className="alt-card__name">
                      Contego vs {alt.competitorName}
                    </h2>
                    <p className="alt-card__desc">
                      A full comparison of services, pricing, UGC output, and which
                      is the right fit for your prop firm.
                    </p>
                  </div>
                  <span className="alt-card__link">
                    Read comparison <ArrowIcon />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  )
}
