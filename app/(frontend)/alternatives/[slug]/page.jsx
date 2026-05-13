import { notFound } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { FAQAccordion } from '@/components/FAQAccordion'
import { client } from '@/sanity/lib/client'
import { ALTERNATIVE_SLUGS_QUERY, ALTERNATIVE_QUERY } from '@/sanity/lib/queries'
import { FEATURE_SCHEMA, CONTEGO, COMPETITORS } from './data'

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://contego.agency'

const FEATURE_IDS = FEATURE_SCHEMA.flatMap((s) => s.rows.map((r) => r.id))

function sanityToCompetitor(doc) {
  if (!doc) return null
  const values = {}
  for (const id of FEATURE_IDS) {
    const f = doc[`f_${id}`]
    values[id] = f ? { v: f.v || 'partial' } : { v: 'partial' }
  }
  return {
    slug: doc.slug,
    name: doc.competitorName,
    short: doc.competitorShort || doc.competitorName,
    initials: doc.competitorInitials || doc.competitorName?.[0] || '?',
    values,
    verdictIntro: doc.verdictIntro || '',
    pickContego: doc.pickContego || [],
    pickThem: doc.pickThem || [],
    faqItems: (doc.faqItems || []).map((f) => ({ q: f.q, a: f.a })),
  }
}

async function getCompetitor(slug) {
  try {
    const doc = await client.fetch(ALTERNATIVE_QUERY, { slug })
    if (doc) return sanityToCompetitor(doc)
  } catch (_) { /* fall through */ }
  return COMPETITORS[slug] || null
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

// ── Icons ──

function IconCheck() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5"><polyline points="20 6 9 17 4 12" /></svg>
}
function IconX() {
  return <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5"><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></svg>
}
function IconMinus() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5"><line x1="5" y1="12" x2="19" y2="12" /></svg>
}

function ValOrTick({ value }) {
  if (value.v === 'yes') return <span className="tick yes"><IconCheck /></span>
  if (value.v === 'no') return <span className="tick no"><IconX /></span>
  if (value.v === 'partial') return <span className="tick partial"><IconMinus /></span>
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
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 36px', padding: '0 28px' }}>
            <span className="eyebrow"><span className="dot" />The Contego difference</span>
            <h2 style={{ marginTop: 14 }}>Built differently for<br />prop firm growth.</h2>
            <p style={{ color: 'var(--text-2)', marginTop: 16, fontSize: 16 }}>Four reasons prop firms choose Contego when they need sharper content, stronger trust, and a clearer system for trader acquisition.</p>
          </div>
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
        <section className="compare-section">
          <div className="shell">
            <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 36px' }}>
              <span className="eyebrow"><span className="dot" />Full comparison</span>
              <h2 style={{ marginTop: 14 }}>Compare the things that<br />actually affect growth.</h2>
              <p style={{ color: 'var(--text-2)', marginTop: 16, fontSize: 16 }}>A practical look at how Contego and {c.name} compare across strategy, content, SEO, video, trust, and fit for different prop firm stages.</p>
            </div>
            <table className="simple-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th className="us-col">
                    <span className="brand-cell">
                      <span className="brand-logo us">C</span>
                      <span className="brand-text">Contego</span>
                    </span>
                  </th>
                  <th>
                    <span className="brand-cell">
                      <span className="brand-logo">{c.initials}</span>
                      <span className="brand-text">{c.name}</span>
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {FEATURE_SCHEMA.flatMap((section, si) => [
                  <tr key={`s${si}`} className="sect-row">
                    <td colSpan={3}>{section.section}</td>
                  </tr>,
                  ...section.rows.map((row) => {
                    const us = CONTEGO.values[row.id]
                    const them = c.values[row.id]
                    return (
                      <tr key={row.id} className="feat-row">
                        <td>{row.label}</td>
                        <td className="val-cell us"><ValOrTick value={us} /></td>
                        <td className="val-cell"><ValOrTick value={them} /></td>
                      </tr>
                    )
                  }),
                ])}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Why Contego (reusable) ── */}
        <section className="section-tight">
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 36px', padding: '0 28px' }}>
            <span className="eyebrow"><span className="dot" />Why Contego</span>
            <h2 style={{ marginTop: 14 }}>A prop firm marketing agency that turns<br />buyer questions into growth assets.</h2>
            <p style={{ color: 'var(--text-2)', marginTop: 16, fontSize: 16 }}>Your market already has doubts before they buy. Contego turns those doubts into clear SEO pages, social content, AI UGC videos, and landing pages that make your offer easier to understand and choose.</p>
          </div>
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
              <IllReport />
            </div>
          </div>
        </section>

        {/* ── Final verdict ── */}
        <section className="section-tight">
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 36px', padding: '0 28px' }}>
            <span className="eyebrow"><span className="dot" />The bottom line</span>
            <h2 style={{ marginTop: 14 }}>Final verdict.</h2>
          </div>
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
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 24px', padding: '0 28px' }}>
            <span className="eyebrow"><span className="dot" />Why prop firms choose Contego</span>
            <h2 style={{ marginTop: 14 }}>Why prop firms<br />choose Contego.</h2>
          </div>
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

        {/* ── CTA (reusable) ── */}
        <section className="section">
          <div className="shell">
            <div className="cta">
              <span className="pill"><span className="dot" />Ready to switch?</span>
              <h2 style={{ marginTop: 24 }}>Choose a prop firm marketing agency<br />that makes your offer easier to trust.</h2>
              <p>Contego helps prop firms create SEO pages, social content, AI UGC videos, and landing page copy that answer buyer questions before they hesitate.</p>
              <div className="hero-ctas">
                <a href="/#cta" className="btn btn-primary">Start with Contego <span className="arrow">→</span></a>
                <a href="/#services" className="btn btn-ghost">See services</a>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}

// ── Illustrations (reusable) ──

function IllSEO() {
  return (
    <div className="dd-visual">
      <div className="ill-seo-dash">
        <div className="frame panel-main">
          <div className="head">
            <div className="ttl">SEO Rankings</div>
            <div className="badge">+312%</div>
          </div>
          <div className="kw-row"><span className="kw">best prop firm 2026</span><span className="rank">#1</span><span className="delta up">↑ 4</span></div>
          <div className="kw-row"><span className="kw">funded trader review</span><span className="rank">#2</span><span className="delta up">↑ 7</span></div>
          <div className="kw-row"><span className="kw">prop firm vs broker</span><span className="rank">#3</span><span className="delta up">↑ 12</span></div>
          <div className="kw-row"><span className="kw">prop firm payout proof</span><span className="rank">#5</span><span className="delta up">↑ 9</span></div>
        </div>
        <div className="frame panel-floating">
          <div className="ttl">Organic visits</div>
          <div className="big">94.2k</div>
          <div className="sub">vs 22.8k six months ago</div>
        </div>
      </div>
    </div>
  )
}

function IllSocial() {
  return (
    <div className="dd-visual">
      <div className="ill-social">
        <div className="phone side">
          <div className="ph-header"><div className="av" /><div className="meta">@maverick.fx</div></div>
          <div className="ph-img b" />
          <div className="ph-stats"><span className="heart">♥ 8.2k</span><span>↻ 412</span></div>
        </div>
        <div className="phone center">
          <div className="ph-header"><div className="av" /><div className="meta">@propinsider</div></div>
          <div className="ph-img" />
          <div className="ph-stats"><span className="heart">♥ 24k</span><span>↻ 1.1k</span></div>
        </div>
        <div className="phone side right">
          <div className="ph-header"><div className="av" /><div className="meta">@funded.live</div></div>
          <div className="ph-img c" />
          <div className="ph-stats"><span className="heart">♥ 5.7k</span><span>↻ 248</span></div>
        </div>
      </div>
    </div>
  )
}

function IllUGC() {
  return (
    <div className="dd-visual">
      <div className="ill-ugc-pipe">
        <div className="frame board">
          <div className="board-head">
            <div className="ttl">AI UGC pipeline</div>
            <div className="cnt">62 / 120</div>
          </div>
          <div className="lanes">
            <div className="lane">
              <div className="lane-h">Drafting<span className="n">18</span></div>
              <div className="card" /><div className="card" /><div className="card" />
            </div>
            <div className="lane">
              <div className="lane-h">Editing<span className="n">14</span></div>
              <div className="card" /><div className="card" /><div className="card" />
            </div>
            <div className="lane">
              <div className="lane-h">Shipped<span className="n">30</span></div>
              <div className="card done" /><div className="card done" /><div className="card done" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function IllReport() {
  return (
    <div className="dd-visual">
      <div className="ill-report">
        <div className="frame panel">
          <div className="ttl">Landing page</div>
          <h4>Conversion flow</h4>
          <div className="chart">
            <svg viewBox="0 0 280 80" preserveAspectRatio="none">
              <defs>
                <linearGradient id="rg1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--green)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="var(--green)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,60 L20,55 L40,58 L60,48 L80,50 L100,40 L120,42 L140,32 L160,30 L180,22 L200,28 L220,18 L240,14 L260,8 L280,4 L280,80 L0,80 Z" fill="url(#rg1)" />
              <path d="M0,60 L20,55 L40,58 L60,48 L80,50 L100,40 L120,42 L140,32 L160,30 L180,22 L200,28 L220,18 L240,14 L260,8 L280,4" stroke="var(--green)" strokeWidth="2" fill="none" />
            </svg>
          </div>
          <div className="grid-3">
            <div className="stat"><div className="v">4.2%<span className="pos">↑18%</span></div><div className="l">CVR</div></div>
            <div className="stat"><div className="v">184<span className="pos">↑24%</span></div><div className="l">Signups</div></div>
            <div className="stat"><div className="v">2.1s<span className="pos">↓12%</span></div><div className="l">Bounce</div></div>
          </div>
        </div>
      </div>
    </div>
  )
}
