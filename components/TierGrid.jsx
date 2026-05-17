'use client'

import { motion } from 'framer-motion'
import { scaleUp, stagger, viewport } from './animations'

function CheckIcon({ size = 10 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

const RocketIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
)

const TrendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
)

const CrownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 18h20" />
    <path d="M2 8l5 5 5-8 5 8 5-5v10H2V8z" />
  </svg>
)

const TIERS = [
  {
    id: 'launch',
    name: 'Launch',
    glyph: <RocketIcon />,
    desc: 'For pre-launch firms and teams under $100K MRR finding their first 100 funded traders.',
    priceMonthly: 3500,
    priceQuarterly: 2975,
    cta: 'Choose Launch',
    feats: [
      ['SEO foundations', '+ 8 articles / mo'],
      ['1 social channel managed', '— pick one: X, IG, TikTok, or YouTube'],
      ['30 AI UGC videos / mo'],
      ['Paid social setup', '— ad accounts, pixel, audiences'],
      ['Weekly reports + Slack support'],
    ],
  },
  {
    id: 'scale',
    name: 'Scale',
    glyph: <TrendIcon />,
    desc: 'For firms doing $100K–$1M MRR ready to dominate their category.',
    priceMonthly: 8500,
    priceQuarterly: 7225,
    featured: true,
    cta: 'Choose Scale',
    feats: [
      ['Programmatic SEO', '— 500+ pages, comparison + review hubs'],
      ['3 social channels fully managed', '— posts, replies, DMs'],
      ['120 AI UGC videos / mo', '— 50+ hooks tested weekly'],
      ['Paid social creative ops', '— daily iteration, no monthly limit'],
      ['Founder-led strategy', '— bi-weekly war room'],
      ['Compliance review on every asset'],
    ],
  },
  {
    id: 'dominate',
    name: 'Dominate',
    glyph: <CrownIcon />,
    desc: 'For market leaders at $1M+ MRR who treat marketing as infrastructure.',
    priceMonthly: 'Custom',
    priceQuarterly: 'Custom',
    cta: 'Talk to sales',
    feats: [
      ['Unlimited SEO + editorial output'],
      ['All channels, full-coverage social ops'],
      ['500+ AI UGC videos / mo', '— multi-language, multi-region'],
      ['Dedicated growth pod', '— strategist, editor, paid lead, PM'],
      ['Custom data + attribution stack'],
      ['Quarterly on-sites', '— anywhere you are'],
    ],
  },
]

export { TIERS }

function TierCard({ tier, billing }) {
  const price = billing === 'quarterly' ? tier.priceQuarterly : tier.priceMonthly
  const showStrike = billing === 'quarterly' && typeof tier.priceMonthly === 'number'
  const isFeatured = tier.featured

  return (
    <motion.div
      className={'tier-card' + (isFeatured ? ' featured' : '')}
      variants={scaleUp}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
    >
      {isFeatured && (
        <span className="badge"><span className="pip" /> Most popular</span>
      )}
      <div className="tier-head">
        <span className="tier-glyph">{tier.glyph}</span>
        <span className="tier-name">{tier.name}</span>
      </div>
      <p className="tier-desc">{tier.desc}</p>

      <div className="tier-price">
        {typeof price === 'number' && <span className="currency">$</span>}
        <span className="amount">
          {typeof price === 'number'
            ? (price / 1000).toFixed(price % 1000 === 0 ? 1 : 2) + 'k'
            : price}
        </span>
        {typeof price === 'number' && <span className="per">/ month</span>}
        {showStrike && (
          <span className="strikethrough">${(tier.priceMonthly / 1000).toFixed(1)}k</span>
        )}
      </div>
      <p className="tier-bill-note">
        {typeof price === 'number'
          ? (billing === 'quarterly' ? 'Billed quarterly · 15% saved' : 'Billed monthly · cancel anytime')
          : 'Custom scope · billed quarterly'}
      </p>

      <hr className="div" />

      <p className="tier-feat-head">What&apos;s included</p>
      <ul className="tier-feats">
        {tier.feats.map((f, i) => (
          <li key={i}>
            <span className="ck"><CheckIcon /></span>
            <span>
              <b>{f[0]}</b>
              {f[1] && <> <span className="k">{f[1]}</span></>}
            </span>
          </li>
        ))}
      </ul>

      <a href="#cta" className={'btn ' + (isFeatured ? 'btn-primary' : 'btn-ghost')}>
        {tier.cta} {isFeatured && <span className="arrow">→</span>}
      </a>
    </motion.div>
  )
}

export function TierGrid({ billing }) {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="shell">
        <motion.div
          className="price-grid"
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -60px 0px' }}
        >
          {TIERS.map((t) => (
            <TierCard key={t.id} tier={t} billing={billing} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
