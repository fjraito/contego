import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { CTA } from '@/components/CTA'
import { VerifiedIcon, Avatar } from '@/components/Icons'
import { FAQAccordion } from '@/components/FAQAccordion'
import { FIRMS, TOC_ITEMS } from './data'
import FirmReviewClient from './FirmReviewClient'

export function generateStaticParams() {
  return Object.keys(FIRMS).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const firm = FIRMS[slug]
  if (!firm) return {}
  return {
    title: `${firm.name} Review`,
    description: `Independent 2026 review of ${firm.name} — payouts, profit split, evaluation rules, and trader sentiment. Reviewed by the Contego editorial team.`,
    alternates: { canonical: `/prop-firms/${slug}` },
    openGraph: {
      type: 'article',
      title: `${firm.name} Review — Contego`,
      description: `Independent 2026 review of ${firm.name} — payouts, profit split, evaluation rules, and trader sentiment.`,
      url: `/prop-firms/${slug}`,
    },
  }
}

export default async function FirmReviewPage({ params }) {
  const { slug } = await params
  const firm = FIRMS[slug]
  if (!firm) notFound()

  return (
    <>
      <Navbar />
      <main>
        <div className="shell">
          <nav className="fr-crumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/prop-firms">Prop firms</Link>
            <span className="sep">/</span>
            <span className="here">{firm.name}</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="fr-hero">
          <div className="shell">
            <div className="fr-hero-grid">
              <div>
                <span className="cat"><span className="dot" />{firm.category}</span>
                <h1>{firm.name}</h1>
                <p className="lead">{firm.tagline}</p>

                <div className="rating-row">
                  <span className="score-big">{firm.rating.toFixed(1)}</span>
                  <span className="rsep" />
                  <span className="stars-block">
                    <Stars value={firm.rating} />
                    <span className="reviews">Based on {firm.reviews.toLocaleString()} trader reviews</span>
                  </span>
                </div>

                <div className="actions">
                  <a href={firm.url} className="btn btn-primary" target="_blank" rel="nofollow noopener noreferrer">
                    Visit {firm.name.split(' ')[0]} <span className="arrow">↗</span>
                  </a>
                  <a href="#promo" className="btn btn-ghost">Get 25% off → {firm.promo.code}</a>
                </div>

                <div className="meta-row">
                  <span><span className="dot" />Updated {firm.publisher.date}</span>
                  <span><span className="dot" />Reviewed by 3 editors</span>
                  <span><span className="dot" />Independent rating</span>
                </div>
              </div>

              <div className="fr-card">
                <div className="firm-logo"><span>{firm.initials}</span></div>
                <div className="firm-name">
                  {firm.name}
                  <span className="tld">{firm.domain}</span>
                </div>
                <div className="stat-grid">
                  {firm.highlights.map((h, i) => (
                    <div className="stat" key={i}>
                      <div className="l">{h.label}</div>
                      <div className={`v ${h.accent ? 'accent' : ''}`}>{h.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Anchor nav (client-side) */}
        <FirmReviewClient items={TOC_ITEMS} />

        {/* Body grid */}
        <div className="fr-body">
          {/* Sidebar */}
          <aside className="fr-side">
            <div className="fr-verdict-side">
              <div className="label">Editorial score</div>
              <div className="score-big">
                <span className="num">{firm.rating.toFixed(1)}</span>
                <span className="out">/ 5.0</span>
              </div>
              <p className="one-line">{firm.oneLine}</p>
              <div className="breakdown">
                {firm.scoreBreakdown.map((b, i) => (
                  <div className="br-row" key={i}>
                    <span className="br-label">{b.label}</span>
                    <span className="br-val">{b.value.toFixed(1)}</span>
                    <div className="br-bar"><div style={{ width: `${(b.value / 5) * 100}%` }} /></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="fr-side-card">
              <h4>On this page</h4>
              <nav>
                <ul className="toc-list">
                  {TOC_ITEMS.map(it => (
                    <li key={it.id}><a href={`#${it.id}`}>{it.label}</a></li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="fr-side-card pub-card">
              <h4>Published by</h4>
              <div className="pub-author">
                <div className="pub-avatar">
                  <Avatar name={firm.publisher.name} size={38} />
                </div>
                <div>
                  <div className="pub-name">{firm.publisher.name}<VerifiedIcon /></div>
                  <div className="pub-role">{firm.publisher.role}</div>
                </div>
              </div>
              <div className="pub-date">
                <span className="lbl">Published</span>
                {firm.publisher.date}
              </div>
            </div>

            <div className="fr-side-card credit-card">
              <h4>Review credits</h4>
              {firm.credits.map((c, i) => (
                <div className="credit" key={i}>
                  <div className="avatar"><Avatar name={c.name} size={36} /></div>
                  <div>
                    <div className="role">{c.role}</div>
                    <span className="name">{c.name}<VerifiedIcon /></span>
                  </div>
                </div>
              ))}
            </div>

            <div className="fr-updated">
              <strong>Reviewed quarterly</strong>
              Next refresh: Jul 2026 · 6-criterion methodology · No pay-to-rank
            </div>
          </aside>

          {/* Main content */}
          <div className="fr-main">
            <section id="verdict">
              <h2>Editorial verdict</h2>
              <VerdictBlock firm={firm} />
            </section>

            <section id="overview">
              <h2>Overview</h2>
              {firm.overviewBody.map((p, i) => (
                <p className="section-intro" key={i}>{p}</p>
              ))}
            </section>

            <section id="pros-cons">
              <h2>Pros &amp; cons</h2>
              <ProsCons pros={firm.pros} cons={firm.cons} />
            </section>

            <section id="tiers">
              <h2>Account tiers</h2>
              <p className="section-intro">
                Six evaluation sizes from $25K up to $400K. Every tier shares the same rule set — the
                only thing that changes is the dollar value of the drawdown buffer and the price of entry.
              </p>
              <TiersTable tiers={firm.tiers} />
            </section>

            <section id="rules">
              <h2>Trading rules</h2>
              <p className="section-intro">
                We weight rule fairness as the second-heaviest factor in our methodology. {firm.name} ranks
                in our top decile here — no daily loss cap on funded accounts, EAs and news trading allowed,
                and a consistency rule that only kicks in at payout.
              </p>
              <Rules rules={firm.rules} />
            </section>

            <section id="payouts">
              <h2>Profit split &amp; payouts</h2>
              <p className="section-intro">
                Flat 90/10 split from day one — no scaling milestones. Same-week first payout, then a
                bi-weekly cycle with optional on-demand requests for $10.
              </p>
              <Payouts firm={firm} />
            </section>

            <section id="platforms">
              <h2>Platforms &amp; instruments</h2>
              <p className="section-intro">
                {firm.name} is bring-your-own-platform on the futures side, with first-class support for
                the major retail brokers.
              </p>
              <PlatformsBlock firm={firm} />
            </section>

            <section id="promo">
              <h2>Discount &amp; promos</h2>
              <p className="section-intro">
                We negotiated an exclusive discount that runs on every account size, on every challenge
                attempt — including resets. No restrictions.
              </p>
              <PromoBlock promo={firm.promo} />
            </section>

            <section id="sentiment">
              <h2>Trader sentiment</h2>
              <p className="section-intro">
                Aggregated from {firm.reviews.toLocaleString()} verified trader reviews collected
                between Jan 2025 and Apr 2026 — weighted by payout proof.
              </p>
              <SentimentBar sentiment={firm.sentiment} />
              <SentimentQuotes quotes={firm.sentiment.sample} />
            </section>

            <section id="faq">
              <h2>Frequently asked</h2>
              <FAQAccordion items={firm.faq} />
            </section>

            <section id="related">
              <h2>Related firms</h2>
              <p className="section-intro">
                Three other firms we&apos;d consider alongside {firm.name} — each with a distinct trade-off
                profile worth comparing before you commit a challenge fee.
              </p>
              <RelatedFirms items={firm.related} />
            </section>
          </div>
        </div>

        <CTA />
      </main>
      <Footer />
    </>
  )
}

/* ── Sub-components (server) ── */

function Stars({ value }) {
  const full = Math.floor(value)
  const hasHalf = value - full >= 0.25 && value - full < 0.75
  const empties = 5 - full - (hasHalf ? 1 : 0)
  return (
    <span className="pf-stars" aria-label={`${value} of 5`}>
      {[...Array(full)].map((_, i) => (
        <svg key={`f${i}`} width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l2.9 6.95L22 9.99l-5.5 4.78L18.2 22 12 18.27 5.8 22l1.7-7.23L2 9.99l7.1-1.04L12 2z" />
        </svg>
      ))}
      {hasHalf && (
        <svg width="13" height="13" viewBox="0 0 24 24">
          <defs><linearGradient id="halfg2"><stop offset="50%" stopColor="currentColor" /><stop offset="50%" stopColor="transparent" /></linearGradient></defs>
          <path d="M12 2l2.9 6.95L22 9.99l-5.5 4.78L18.2 22 12 18.27 5.8 22l1.7-7.23L2 9.99l7.1-1.04L12 2z" fill="url(#halfg2)" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      )}
      {[...Array(empties)].map((_, i) => (
        <span key={`e${i}`} className="empty">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2l2.9 6.95L22 9.99l-5.5 4.78L18.2 22 12 18.27 5.8 22l1.7-7.23L2 9.99l7.1-1.04L12 2z" />
          </svg>
        </span>
      ))}
    </span>
  )
}

function VerdictBlock({ firm }) {
  const circ = 2 * Math.PI * 70
  const dash = circ - (firm.trustScore / 100) * circ
  return (
    <div className="fr-verdict">
      <div className="v-grid">
        <div className="score-ring">
          <svg viewBox="0 0 160 160">
            <circle cx="80" cy="80" r="70" className="ring-bg" />
            <circle cx="80" cy="80" r="70" className="ring-fg" strokeDasharray={circ} strokeDashoffset={dash} />
          </svg>
          <div className="inner">
            <span className="n">{firm.trustScore}</span>
            <span className="o">Trust score</span>
          </div>
        </div>
        <div className="v-text">
          <div className="v-title">{firm.verdictTitle}</div>
          <p>{firm.verdictBody}</p>
          <div className="v-quote">{'“'}{firm.verdictQuote}{'"'}</div>
        </div>
      </div>
    </div>
  )
}

function CheckIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12l5 5L20 6" /></svg>
}
function DashIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M5 12h14" /></svg>
}

function ProsCons({ pros, cons }) {
  return (
    <div className="fr-pc">
      <div className="fr-pc-col pros">
        <h4><CheckIcon /> What we like</h4>
        <ul>{pros.map((p, i) => <li key={i}><CheckIcon />{p}</li>)}</ul>
      </div>
      <div className="fr-pc-col cons">
        <h4><DashIcon /> Watch-outs</h4>
        <ul>{cons.map((c, i) => <li key={i}><DashIcon />{c}</li>)}</ul>
      </div>
    </div>
  )
}

function TiersTable({ tiers }) {
  return (
    <div className="fr-tiers">
      <table>
        <thead>
          <tr>
            <th>Account size</th>
            <th>Eval fee</th>
            <th>Profit target</th>
            <th>Trailing drawdown</th>
            <th>Profit split</th>
          </tr>
        </thead>
        <tbody>
          {tiers.map((t, i) => (
            <tr key={i}>
              <td className="size">{t.size}</td>
              <td className="fee">{t.fee}</td>
              <td>{t.target}</td>
              <td>{t.drawdown}</td>
              <td>{t.payout}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Rules({ rules }) {
  return (
    <div className="fr-rules">
      {rules.map((r, i) => (
        <div className="fr-rule" key={i}>
          <div className="t">{r.t}</div>
          <div className="v">{r.v}</div>
        </div>
      ))}
    </div>
  )
}

function Payouts({ firm }) {
  return (
    <div className="fr-payouts">
      <div className="fr-payout-card">
        <h4>Payout schedule</h4>
        <div className="row"><span className="k">First payout</span><span className="v">{firm.payoutDetails.first}</span></div>
        <div className="row"><span className="k">Recurring cycle</span><span className="v">{firm.payoutDetails.cycle}</span></div>
        <div className="row"><span className="k">Median speed</span><span className="v">{firm.payoutDetails.median}</span></div>
        <div className="row"><span className="k">Minimum payout</span><span className="v">{firm.payoutDetails.minimum}</span></div>
      </div>
      <div className="fr-payout-card">
        <h4>Payout methods</h4>
        <div className="methods">
          {firm.payoutMethods.map(m => <span key={m}>{m}</span>)}
        </div>
        <div className="row" style={{ marginTop: 18 }}><span className="k">Profit split</span><span className="v">{firm.highlights[1].value}</span></div>
        <div className="row"><span className="k">Refund on pass</span><span className="v">Eval fee rebated with 1st split</span></div>
      </div>
    </div>
  )
}

function PlatformsBlock({ firm }) {
  return (
    <div className="fr-plats">
      <div className="fr-plat-col">
        <h4>Trading platforms</h4>
        <div className="chips">{firm.platforms.map(p => <span key={p}>{p}</span>)}</div>
      </div>
      <div className="fr-plat-col">
        <h4>Instruments</h4>
        <div className="chips">{firm.instruments.map(p => <span key={p}>{p}</span>)}</div>
      </div>
    </div>
  )
}

function PromoBlock({ promo }) {
  return (
    <div className="fr-promo">
      <span className="badge">Exclusive · Contego</span>
      <div className="text">
        <div className="h">{promo.text}</div>
        <div className="e">{promo.expiry}</div>
      </div>
      <div className="code-cell">
        <span className="code">{promo.code}</span>
      </div>
    </div>
  )
}

function SentimentBar({ sentiment }) {
  return (
    <>
      <div className="fr-sent-bar">
        <div className="seg-pos" style={{ width: `${sentiment.positive}%` }} />
        <div className="seg-neu" style={{ width: `${sentiment.neutral}%` }} />
        <div className="seg-neg" style={{ width: `${sentiment.negative}%` }} />
      </div>
      <div className="fr-sent-legend">
        <span><span className="dot p" />{sentiment.positive}% positive</span>
        <span><span className="dot n" />{sentiment.neutral}% neutral</span>
        <span><span className="dot x" />{sentiment.negative}% negative</span>
      </div>
    </>
  )
}

function SentimentQuotes({ quotes }) {
  return (
    <div className="fr-quotes">
      {quotes.map((s, i) => (
        <div className="fr-quote" key={i}>
          <p className="q">{s.quote}</p>
          <div className="a"><strong>{s.author}</strong>{s.tag}</div>
        </div>
      ))}
    </div>
  )
}

function RelatedFirms({ items }) {
  return (
    <div className="fr-related">
      {items.map(f => (
        <Link className="fr-related-card" href={`/prop-firms/${f.id}`} key={f.id}>
          <div className="head">
            <span className="mini">{f.initials}</span>
            <div>
              <div className="rk">#{f.rank} in our ranking</div>
              <div className="name">{f.name}</div>
            </div>
          </div>
          <p className="tagline">{f.tagline}</p>
          <div className="foot">
            <span className="fund">{f.funding} max</span>
            <span className="rate">★ {f.rating.toFixed(1)}</span>
          </div>
        </Link>
      ))}
    </div>
  )
}
