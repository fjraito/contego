import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { CTA } from '@/components/CTA'
import { FAQAccordion } from '@/components/FAQAccordion'
import { IconCheck, IconX, IconMinus, SectionHeader } from '@/components/Icons'
import { IllSEO, IllSocial, IllUGC, IllLanding } from '@/components/AlternativeIllustrations'
import { client } from '@/sanity/lib/client'
import { ALTERNATIVE_SLUGS_QUERY, ALTERNATIVE_QUERY } from '@/sanity/lib/queries'
import { COMPETITORS } from './data'

export const dynamicParams = true
export const revalidate = 60

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://contego.agency'

function sanityToCompetitor(doc) {
  if (!doc) return null
  return {
    slug: doc.slug,
    name: doc.competitorName,
    short: doc.competitorShort || doc.competitorName,
    initials: doc.competitorInitials || doc.competitorName?.[0] || '?',
    logo: doc.competitorLogo || null,
    url: doc.competitorUrl || null,
    featureTable: doc.featureTable || [],
    verdictIntro: doc.verdictIntro || '',
    pickContego: doc.pickContego || [],
    pickThem: doc.pickThem || [],
    faqItems: (doc.faqItems || []).map((f) => ({ q: f.q, a: f.a })),
  }
}

async function getCompetitor(slug) {
  const staticData = COMPETITORS[slug] || null
  let sanityData = null
  try {
    const doc = await client.fetch(ALTERNATIVE_QUERY, { slug }, { next: { revalidate: 60 } })
    if (doc) sanityData = sanityToCompetitor(doc)
  } catch (_) { /* fall through */ }

  if (!sanityData && !staticData) return null
  if (!sanityData) return staticData
  if (!staticData) return sanityData

  return {
    ...staticData,
    ...sanityData,
    logo: sanityData.logo || staticData.logo,
    featureTable: sanityData.featureTable?.length ? sanityData.featureTable : staticData.featureTable,
    verdictIntro: sanityData.verdictIntro || staticData.verdictIntro,
    pickContego: sanityData.pickContego?.length ? sanityData.pickContego : staticData.pickContego,
    pickThem: sanityData.pickThem?.length ? sanityData.pickThem : staticData.pickThem,
    faqItems: sanityData.faqItems?.length ? sanityData.faqItems : staticData.faqItems,
  }
}

export async function generateStaticParams() {
  let slugs = []
  try {
    const sanitySlugs = await client.fetch(ALTERNATIVE_SLUGS_QUERY)
    slugs = (sanitySlugs || []).map((s) => s.slug).filter(Boolean)
  } catch (_) {}
  const all = new Set([...slugs, ...Object.keys(COMPETITORS)])
  return Array.from(all).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const c = await getCompetitor(slug)
  if (!c) return {}
  return {
    title: `Contego vs ${c.name}`,
    description: `A clear side-by-side look at Contego vs ${c.name} for prop firm marketing — services, content, SEO, AI UGC, and which is the right fit.`,
    alternates: { canonical: `/alternatives/${slug}` },
    openGraph: { title: `Contego vs ${c.name}`, url: `/alternatives/${slug}` },
  }
}


function ValOrTick({ value }) {
  if (value === 'yes') return <span className="tick yes"><IconCheck /></span>
  if (value === 'no') return <span className="tick no"><IconX /></span>
  if (value === 'partial') return <span className="tick partial"><IconMinus /></span>
  return null
}

// ── Page ──

export default async function AlternativePage({ params }) {
  const { slug } = await params
  const c = await getCompetitor(slug)
  if (!c) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Contego vs ${c.name}`,
    url: `${SITE_URL}/alternatives/${slug}`,
    description: `Contego vs ${c.name} — prop firm marketing comparison.`,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="compare-page">

        {/* ── Hero ── */}
        <section className="compare-hero">
          <div className="compare-hero__bg" aria-hidden="true" />
          <div className="shell">
            <span className="eyebrow"><span className="dot" />Alternatives</span>
            <h1 className="compare-hero__title">
              <span className="hero-name">Contego</span>
              <span className="vs">vs</span>
              <span className="hero-name">{c.name}</span>
            </h1>
            <p className="lead">
              A clear side-by-side look at two prop firm marketing agency options, so you can choose the right partner for your goals, budget, and growth stage.
            </p>
          </div>
        </section>

        {/* ── Pillars (reusable) ── */}
        <section className="section-tight">
          <SectionHeader
            eyebrow="The Contego difference"
            heading="Built differently for<br />prop firm growth."
            description="Four reasons prop firms choose Contego when they need sharper content, stronger trust, and a clearer system for trader acquisition."
          />
          <div className="pillars">
            <div className="pillar">
              <span className="pillar-num">01</span>
              <div className="pillar-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
              </div>
              <h3>One connected strategy</h3>
              <p>SEO, social media, and AI UGC video are planned under one system, so every channel works toward the same growth goal.</p>
            </div>
            <div className="pillar">
              <span className="pillar-num">02</span>
              <div className="pillar-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="12" cy="12" r="3" /><path d="M12 1v6m0 10v6M4.22 4.22l4.24 4.24m7.07 7.07 4.24 4.24M1 12h6m10 0h6M4.22 19.78l4.24-4.24m7.07-7.07 4.24-4.24" /></svg>
              </div>
              <h3>Built for prop firms</h3>
              <p>Contego understands trader psychology, evaluation rules, payout concerns, drawdown limits, and the trust gap in the prop firm market.</p>
            </div>
            <div className="pillar">
              <span className="pillar-num">03</span>
              <div className="pillar-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              </div>
              <h3>Trust-aware content</h3>
              <p>Every asset is created to attract qualified traders without fake proof, exaggerated claims, or hype-heavy messaging.</p>
            </div>
            <div className="pillar">
              <span className="pillar-num">04</span>
              <div className="pillar-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
              </div>
              <h3>Consistent execution</h3>
              <p>Your content moves with a clear rhythm across search, social, and video, so the system keeps building demand over time.</p>
            </div>
          </div>
        </section>

        {/* ── Full comparison table ── */}
        {c.featureTable && c.featureTable.length > 0 && (
          <section className="compare-section">
            <div className="shell">
              <SectionHeader
                eyebrow="Full comparison"
                heading={`Compare the things that<br />actually affect growth.`}
                description={`A practical look at how Contego and ${c.name} compare across strategy, content, SEO, video, trust, and fit for different prop firm stages.`}
              />
              <table className="simple-table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th className="us-col">
                      <span className="brand-cell">
                        <Image src="/assets/contego-logo.png" alt="Contego" width={100} height={32} className="brand-logo-img" />
                      </span>
                    </th>
                    <th>
                      <span className="brand-cell">
                        {c.logo ? (
                          <img src={c.logo} alt={c.name} className="brand-logo-img competitor-logo" />
                        ) : (
                          <>
                            <span className="brand-logo">{c.initials}</span>
                            <span className="brand-text">{c.name}</span>
                          </>
                        )}
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {c.featureTable.flatMap((section, si) => [
                    <tr key={`s${si}`} className="sect-row">
                      <td colSpan={3}>{section.sectionName}</td>
                    </tr>,
                    ...(section.rows || []).map((row, ri) => (
                      <tr key={`r${si}-${ri}`} className="feat-row">
                        <td>{row.label}</td>
                        <td className="val-cell us"><ValOrTick value={row.contego} /></td>
                        <td className="val-cell"><ValOrTick value={row.competitor} /></td>
                      </tr>
                    )),
                  ])}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ── Why Contego (reusable) ── */}
        <section className="section-tight">
          <SectionHeader
            eyebrow="Why Contego"
            heading="A prop firm marketing agency that turns<br />buyer questions into growth assets."
            description="Your market already has doubts before they buy. Contego turns those doubts into clear SEO pages, social content, AI UGC videos, and landing pages that make your offer easier to understand and choose."
          />
          <div className="deep-dive">
            <div className="dd-row">
              <div className="dd-text">
                <h3>SEO <span className="accent">content</span></h3>
                <p>Traders search before they trust. They compare rules, payouts, platforms, reviews, alternatives, and proof.</p>
                <p>Contego turns those searches into pages that answer real buying questions and bring better visitors to your site.</p>
                <div className="in-short"><strong>In short:</strong> Get found for the topics that shape buying decisions.</div>
              </div>
              <IllSEO />
            </div>
            <div className="dd-row reverse">
              <div className="dd-text">
                <h3>Social media <span className="accent">content</span></h3>
                <p>Your social feed should not feel like a discount board.</p>
                <p>Contego creates posts that explain your offer, handle common objections, and keep your brand visible with content people can actually understand.</p>
                <div className="in-short"><strong>In short:</strong> Stay active without sounding like every other prop firm.</div>
              </div>
              <IllSocial />
            </div>
            <div className="dd-row">
              <div className="dd-text">
                <h3>AI UGC <span className="accent">video</span></h3>
                <p>Video helps people understand your offer faster.</p>
                <p>Contego creates AI UGC-style videos for hooks, explainers, rule breakdowns, and offer walkthroughs without fake testimonials or unrealistic claims.</p>
                <div className="in-short"><strong>In short:</strong> Create more video angles while keeping the message controlled.</div>
              </div>
              <IllUGC />
            </div>
            <div className="dd-row reverse">
              <div className="dd-text">
                <h3>Landing page <span className="accent">copy</span></h3>
                <p>A good landing page should answer questions before visitors hesitate.</p>
                <p>Contego shapes your offer, rules, proof, pricing, and CTA into copy that is easy to scan and easier to act on.</p>
                <div className="in-short"><strong>In short:</strong> Make your page clearer before asking people to convert.</div>
              </div>
              <IllLanding />
            </div>
          </div>
        </section>

        {/* ── Final verdict ── */}
        <section className="section-tight">
          <SectionHeader eyebrow="The bottom line" heading="Final verdict." />
          <div className="verdict">
            <div className="verdict-card">
              <div className="verdict-head">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1.5l2.3 2.1 3.1-.3.4 3.1 2.6 1.8-1.3 2.8 1.3 2.8-2.6 1.8-.4 3.1-3.1-.3L12 20.5 9.7 18.4l-3.1.3-.4-3.1-2.6-1.8L4.9 11l-1.3-2.8 2.6-1.8.4-3.1 3.1.3L12 1.5z" /></svg>
                Final verdict
              </div>
              {c.verdictIntro && c.verdictIntro.split(/\n\s*\n/).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <div className="verdict-summary">
                <div className="verdict-col us">
                  <h4>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 6.5L21 9l-5 4.5L17.5 21 12 17l-5.5 4L8 13.5 3 9l6.6-.5L12 2z" /></svg>
                    Pick Contego if you want...
                  </h4>
                  <ul>
                    {(c.pickContego || []).map((item, i) => (
                      <li key={i}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="verdict-col them">
                  <h4>Pick {c.short} if you want...</h4>
                  <ul>
                    {(c.pickThem || []).map((item, i) => (
                      <li key={i}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Why prop firms choose Contego (reusable) ── */}
        <section className="section-tight">
          <SectionHeader eyebrow="Why prop firms choose Contego" heading="Why prop firms<br />choose Contego." style={{ marginBottom: 24 }} />
          <div className="switch-grid">
            {[
              { ic: '⚡', t: 'Contego AI UGC Engine', d: 'No other prop firm marketing agency brings AI UGC into the core system like Contego. We turn your offers, rules, FAQs, objections, and proof points into short-form videos built for social, ads, and landing pages.' },
              { ic: '◎', t: 'Search intent comes first', d: 'Contego starts with what traders already search before buying, then turns those questions into SEO pages, social angles, video scripts, and landing page copy.' },
              { ic: '◇', t: 'Content sounds clearer', d: 'Your offer should be easy to understand without hype. Contego turns rules, payouts, challenges, and proof into simple content that helps people decide.' },
              { ic: '✦', t: 'One message across channels', d: 'SEO, social, video, and landing pages all follow the same positioning, so your brand feels consistent wherever people find you.' },
            ].map((it, i) => (
              <div key={i} className="switch-card">
                <div className="ic" style={{ fontSize: 20 }}>{it.ic}</div>
                <div><h4>{it.t}</h4><p>{it.d}</p></div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        {c.faqItems && c.faqItems.length > 0 && (
          <section className="section">
            <div className="shell">
              <div className="section-head">
                <span className="eyebrow"><span className="dot" />FAQ</span>
                <h2 style={{ marginTop: 14 }}>Questions about choosing Contego<br />as your prop firm marketing agency.</h2>
              </div>
              <FAQAccordion items={c.faqItems} />
            </div>
          </section>
        )}

        <CTA
          pill="Ready to switch?"
          heading="Choose a prop firm marketing agency<br />that makes your offer easier to trust."
          description="Contego helps prop firms create SEO pages, social content, AI UGC videos, and landing page copy that answer buyer questions before they hesitate."
          primaryLabel="Start with Contego"
          primaryHref="/#cta"
          secondaryLabel="See services"
          secondaryHref="/#services"
        />

      </main>
      <Footer />
    </>
  )
}
