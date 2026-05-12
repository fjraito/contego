import { notFound } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { FAQAccordion } from '@/components/FAQAccordion'
import { FEATURE_SCHEMA, CONTEGO, COMPETITORS } from './data'

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://contego.agency'

export async function generateStaticParams() {
  return Object.keys(COMPETITORS).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const c = COMPETITORS[slug]
  if (!c) return {}
  return {
    title: `Contego vs ${c.name}`,
    description: `An honest side-by-side comparison of Contego vs ${c.name} — services, pricing, UGC volume, and which is the right call for your prop firm.`,
    alternates: { canonical: `/compare/${slug}` },
    openGraph: { title: `Contego vs ${c.name}`, url: `/compare/${slug}` },
  }
}

// ── Icons ──────────────────────────────────────────────────────────────────

function IconCheck() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5"><polyline points="20 6 9 17 4 12" /></svg>
}
function IconX() {
  return <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5"><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></svg>
}
function IconMinus() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5"><line x1="5" y1="12" x2="19" y2="12" /></svg>
}

function CellIcon({ v }) {
  if (v === 'yes') return <span className="cell-icon yes"><IconCheck /></span>
  if (v === 'no') return <span className="cell-icon no"><IconX /></span>
  if (v === 'partial') return <span className="cell-icon partial"><IconMinus /></span>
  return null
}

function ValOrTick({ value }) {
  if (value.v === 'val') return <span>{value.text}</span>
  if (value.v === 'yes') return <span className="tick yes" title={value.text}><IconCheck /></span>
  if (value.v === 'no') return <span className="tick no" title={value.text}>–</span>
  if (value.v === 'partial') return <span className="tick partial" title={value.text}>~</span>
  return <span>{value.text}</span>
}

// ── Illustrations ──────────────────────────────────────────────────────────

function IllSEO() {
  return (
    <div className="dd-visual">
      <div className="ill-seo-dash">
        <div className="frame panel-main">
          <div className="head">
            <div className="ttl">SEO Rankings · Last 30 days</div>
            <div className="badge">+312%</div>
          </div>
          <div className="kw-row"><span className="kw">best prop firm 2026</span><span className="rank">#1</span><span className="delta up">↑ 4</span></div>
          <div className="kw-row"><span className="kw">funded trader programs review</span><span className="rank">#2</span><span className="delta up">↑ 7</span></div>
          <div className="kw-row"><span className="kw">prop firm vs broker</span><span className="rank">#3</span><span className="delta up">↑ 12</span></div>
          <div className="kw-row"><span className="kw">cheap prop firm challenge</span><span className="rank">#3</span><span className="delta up">↑ 5</span></div>
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
            <div className="ttl">AI UGC pipeline · This week</div>
            <div className="cnt">62 / 120</div>
          </div>
          <div className="lanes">
            <div className="lane">
              <div className="lane-h">Drafting<span className="n">18</span></div>
              <div className="card" /><div className="card" /><div className="card" /><div className="card" /><div className="card" />
            </div>
            <div className="lane">
              <div className="lane-h">Editing<span className="n">14</span></div>
              <div className="card" /><div className="card" /><div className="card" /><div className="card" />
            </div>
            <div className="lane">
              <div className="lane-h">Shipped<span className="n">30</span></div>
              <div className="card done" /><div className="card done" /><div className="card done" /><div className="card done" /><div className="card done" />
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
          <div className="ttl">Weekly snapshot · W18</div>
          <h4>Funnel performance</h4>
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
            <div className="stat"><div className="v">$11.20<span className="pos">↓38%</span></div><div className="l">CPC</div></div>
            <div className="stat"><div className="v">184<span className="pos">↑24%</span></div><div className="l">Signups</div></div>
            <div className="stat"><div className="v">2.4k<span className="pos">↑18%</span></div><div className="l">Sessions</div></div>
          </div>
        </div>
        <div className="floating-pill"><span className="pip" />Report sent · 9:00 AM Friday</div>
      </div>
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────

export default async function ComparePage({ params }) {
  const { slug } = await params
  const c = COMPETITORS[slug]
  if (!c) notFound()

  const dd = c.deepDive

  const faqItems = [
    { q: `Is Contego really cheaper than ${c.short}?`, a: `On entry pricing, sometimes yes, sometimes no — they're roughly comparable. The real difference is volume per dollar: Contego ships 5–10× the UGC video output at the same monthly spend. That's where the ROI gap opens up.` },
    { q: `Can I switch from ${c.short} mid-contract?`, a: `If you're locked in, we can plan around the transition window so you don't pay double. Most clients run a 30-day parallel pilot to compare output before moving fully across. Bring your contract — we'll map out the cleanest path.` },
    { q: `Does ${c.short} do anything Contego doesn't?`, a: `Honestly — yes, in specific cases. If your priority is, say, traditional creator partnerships at celebrity tier, that's not our wheelhouse. Our edge is volume, velocity, and prop firm specialization. We'll tell you upfront if you're not a fit.` },
    { q: 'How long until I see results after switching?', a: 'Week 1: pipeline live. Week 2: first UGC batch shipping. Month 1: leading indicators (CPC, CTR) move. Month 3: organic compounding kicks in. Month 6: typically dominant rankings on commercial keywords.' },
    { q: 'What happens to my existing content if I switch?', a: "You own it — and we audit it. Anything still working we keep and reinforce. Anything underperforming we either rework or retire. No scorched-earth migrations." },
    { q: 'Do you take on direct competitors of your existing clients?', a: "No. We keep one prop firm per regional/regulatory category — so when you sign with us, you have a moat against any competitor coming to us next." },
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Contego vs ${c.name}`,
    url: `${SITE_URL}/compare/${slug}`,
    description: `Contego vs ${c.name} — full feature comparison for prop firm marketing.`,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main>

        {/* ── Hero ── */}
        <section className="compare-hero">
          <div className="compare-hero__bg" aria-hidden="true" />
          <div className="shell">
            <span className="eyebrow"><span className="dot" />Alternatives</span>
            <h1 className="compare-hero__title">Contego<span className="vs">vs</span>{c.name}</h1>
            <p className="lead">
              An honest, side-by-side teardown of how Contego stacks up against {c.name.toLowerCase()} —
              what&apos;s the same, what&apos;s different, and when each one is the right call for your prop firm.
            </p>
          </div>
        </section>

        {/* ── Evergreen pillars ── */}
        <section className="section-tight">
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 36px', padding: '0 28px' }}>
            <span className="eyebrow"><span className="dot" />The Contego difference</span>
            <h2 style={{ marginTop: 14 }}>Built differently<br />for prop firms.</h2>
            <p style={{ color: 'var(--text-2)', marginTop: 16, fontSize: 16 }}>Four things every prop firm gets with Contego — regardless of who you&apos;re comparing against.</p>
          </div>
          <div className="pillars">
            <div className="pillar">
              <div className="pillar-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
              </div>
              <div className="pillar-stat">500<span className="unit">+ /mo</span></div>
              <h3>AI UGC at unmatched volume</h3>
              <p>A purpose-built pipeline for native-feeling UGC. The volume is the moat — nothing else lets you test 50 hooks a week.</p>
              <div className="pillar-foot"><span className="dot" />Pipeline live, week one</div>
            </div>
            <div className="pillar">
              <div className="pillar-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="12" cy="12" r="3" /><path d="M12 1v6m0 10v6M4.22 4.22l4.24 4.24m7.07 7.07 4.24 4.24M1 12h6m10 0h6M4.22 19.78l4.24-4.24m7.07-7.07 4.24-4.24" /></svg>
              </div>
              <div className="pillar-stat">100<span className="unit">%</span></div>
              <h3>Prop firm specialization</h3>
              <p>We only work with prop firms. No education tax, no ramp-up. We know your funnel, your keywords, and your compliance landscape on day one.</p>
              <div className="pillar-foot"><span className="dot" />14+ prop firms shipped</div>
            </div>
            <div className="pillar">
              <div className="pillar-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
              </div>
              <div className="pillar-stat">M2M</div>
              <h3>Month-to-month, never locked in</h3>
              <p>You stay because the engine works. Every month is earned, every month. No 6 or 12-month commitments to start.</p>
              <div className="pillar-foot"><span className="dot" />Cancel anytime</div>
            </div>
            <div className="pillar">
              <div className="pillar-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="3 17 9 11 13 15 21 7" /><polyline points="14 7 21 7 21 14" /></svg>
              </div>
              <div className="pillar-stat">Fri<span className="unit"> 9AM</span></div>
              <h3>Weekly reporting, founder-led</h3>
              <p>A single weekly snapshot every Friday — keyword movement, UGC performance, CAC, what we&apos;re testing next. No account-manager-only filter.</p>
              <div className="pillar-foot"><span className="dot" />Direct founder access</div>
            </div>
          </div>
        </section>

        {/* ── Full comparison table ── */}
        <section className="compare-section">
          <div className="shell">
            <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 36px' }}>
              <span className="eyebrow"><span className="dot" />Full feature comparison</span>
              <h2 style={{ marginTop: 14 }}>Every feature,<br />head-to-head.</h2>
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

        {/* ── Deep dive: service by service ── */}
        <section className="section-tight">
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 36px', padding: '0 28px' }}>
            <span className="eyebrow"><span className="dot" />Service-by-service</span>
            <h2 style={{ marginTop: 14 }}>The full breakdown,<br />service by service.</h2>
          </div>
          <div className="deep-dive">
            <div className="dd-row">
              <div className="dd-text">
                <h3>SEO & <span className="accent">programmatic content</span></h3>
                {dd.seo.paras.map((p, i) => <p key={i} dangerouslySetInnerHTML={{ __html: p }} />)}
                <div className="in-short"><strong>In short:</strong> {dd.seo.inShort}</div>
              </div>
              <IllSEO />
            </div>
            <div className="dd-row reverse">
              <div className="dd-text">
                <h3>Social media <span className="accent">management</span></h3>
                {dd.social.paras.map((p, i) => <p key={i} dangerouslySetInnerHTML={{ __html: p }} />)}
                <div className="in-short"><strong>In short:</strong> {dd.social.inShort}</div>
              </div>
              <IllSocial />
            </div>
            <div className="dd-row">
              <div className="dd-text">
                <h3>AI UGC video <span className="accent">at scale</span></h3>
                {dd.ugc.paras.map((p, i) => <p key={i} dangerouslySetInnerHTML={{ __html: p }} />)}
                <div className="in-short"><strong>In short:</strong> {dd.ugc.inShort}</div>
              </div>
              <IllUGC />
            </div>
            <div className="dd-row reverse">
              <div className="dd-text">
                <h3>Reporting & <span className="accent">weekly cadence</span></h3>
                {dd.reporting.paras.map((p, i) => <p key={i} dangerouslySetInnerHTML={{ __html: p }} />)}
                <div className="in-short"><strong>In short:</strong> {dd.reporting.inShort}</div>
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
              <h3>If you sell prop firm challenges and want a marketing partner that compounds — pick Contego.</h3>
              <p>{c.name} is a reasonable choice if you only need posts on a calendar and a quarterly content drop. But the prop firm category rewards velocity: more landing pages, more video hooks tested, faster ranking compounds. That&apos;s where Contego is built differently — and where {c.short} simply isn&apos;t structured to compete.</p>
              <p>You can still hire {c.short}. But you&apos;ll spend month one teaching them what we already know.</p>
              <div className="verdict-summary">
                <div className="verdict-col us">
                  <h4>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 6.5L21 9l-5 4.5L17.5 21 12 17l-5.5 4L8 13.5 3 9l6.6-.5L12 2z" /></svg>
                    Pick Contego if you…
                  </h4>
                  <ul>
                    {["Need a partner who's already shipped for 14+ prop firms", "Want AI UGC volume that no creator pipeline can match", "Prefer month-to-month accountability over annual lock-ins", "Care about compliance review on every asset"].map((item, i) => (
                      <li key={i}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="verdict-col them">
                  <h4>Pick {c.short} if you…</h4>
                  <ul>
                    {['Only need basic posting and quarterly content', "Don't care about UGC video at scale", 'Are comfortable with longer commitments', 'Want a generalist team rather than prop firm specialists'].map((item, i) => (
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

        {/* ── Testimonial ── */}
        <section className="section-tight">
          <div className="shell">
            <div className="testify">
              <div className="mark">&ldquo;</div>
              <blockquote>{c.testimonial.quote}</blockquote>
              <div className="who">
                <div className="who-avatar">{c.testimonial.initials}</div>
                <span><strong>{c.testimonial.who.split(',')[0]}</strong>{c.testimonial.who.includes(',') ? ',' + c.testimonial.who.split(',').slice(1).join(',') : ''}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Why teams switch ── */}
        <section className="section-tight">
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 24px', padding: '0 28px' }}>
            <span className="eyebrow"><span className="dot" />Why teams switch</span>
            <h2 style={{ marginTop: 14 }}>Four reasons prop firms<br />move to Contego.</h2>
          </div>
          <div className="switch-grid">
            {[
              { ic: '⚡', t: 'Day-one velocity', d: `No 60-day ramp. Day one we're shipping while ${c.short} is still scheduling onboarding calls.` },
              { ic: '◎', t: 'One owner, one report', d: 'Every workstream is owned by us. You get a single weekly review — not five Slack threads.' },
              { ic: '◇', t: 'AI-native, by default', d: `We were built around the AI UGC pipeline. ${c.short} bolted it on (or skipped it).` },
              { ic: '✦', t: 'Prop-firm playbook', d: `Every page, post, and video is informed by what we've shipped for 14+ prop firms. ${c.short} is starting from your brief.` },
            ].map((it, i) => (
              <div key={i} className="switch-card">
                <div className="ic" style={{ fontSize: 20 }}>{it.ic}</div>
                <div><h4>{it.t}</h4><p>{it.d}</p></div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="section">
          <div className="shell">
            <div className="section-head">
              <span className="eyebrow"><span className="dot" />FAQ</span>
              <h2 style={{ marginTop: 14 }}>Questions when<br />switching from {c.short}.</h2>
            </div>
            <FAQAccordion items={faqItems} />
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="section">
          <div className="shell">
            <div className="cta">
              <span className="pill"><span className="dot" />Free comparison call</span>
              <h2 style={{ marginTop: 24 }}>See exactly what we&apos;d do<br />that {c.short} isn&apos;t.</h2>
              <p>30-minute call. We&apos;ll teardown your current setup and show you the gaps — whether you switch or not.</p>
              <div className="hero-ctas">
                <a href="/#cta" className="btn btn-primary">Book a teardown call <span className="arrow">→</span></a>
                <a href="mailto:hello@contego.co" className="btn btn-ghost">See services</a>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
