import Link from 'next/link'
import Image from 'next/image'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { CTA } from '@/components/CTA'
import { ArrowIcon } from '@/components/Icons'
import { COMPETITORS } from './[slug]/data'
import { client } from '@/sanity/lib/client'
import { ALTERNATIVES_LIST_QUERY } from '@/sanity/lib/queries'

export const revalidate = 60

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://contego.agency'

async function getAlternatives() {
  let sanityAlts = []
  try {
    sanityAlts = await client.fetch(ALTERNATIVES_LIST_QUERY, {}, { next: { revalidate: 60 } })
  } catch (_) { /* fall through */ }

  const merged = sanityAlts.map((a) => {
    const s = Object.values(COMPETITORS).find((c) => c.slug === a.slug)
    if (!s) return a
    return {
      ...a,
      competitorLogo: a.competitorLogo || s.logo,
      competitorInitials: a.competitorInitials || s.initials,
    }
  })

  const sanitySlugs = new Set(sanityAlts.map((a) => a.slug))
  const staticAlts = Object.values(COMPETITORS)
    .filter((c) => !sanitySlugs.has(c.slug))
    .map((c) => ({
      _id: c.slug,
      slug: c.slug,
      competitorName: c.name,
      competitorInitials: c.initials,
      competitorLogo: c.logo,
    }))

  return [...merged, ...staticAlts].sort((a, b) => a.competitorName.localeCompare(b.competitorName))
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
                      <span className="alt-card__logo us">
                        <Image src="/assets/contego-logo.png" alt="Contego" width={120} height={36} style={{ objectFit: 'contain' }} />
                      </span>
                      <span className="alt-card__vs-label">vs</span>
                      <span className="alt-card__logo them">
                        {alt.competitorLogo ? (
                          <img src={alt.competitorLogo} alt={alt.competitorName} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                        ) : (
                          alt.competitorInitials || alt.competitorName?.[0] || '?'
                        )}
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
