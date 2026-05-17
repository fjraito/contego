'use client'

import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, stagger, viewport } from './animations'
import { TIERS } from './TierGrid'

function CheckIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M5 12h14" />
    </svg>
  )
}

function formatPrice(p) {
  if (typeof p === 'string') return p
  return '$' + (p / 1000).toFixed(p % 1000 === 0 ? 1 : 2) + 'k'
}

const COMPARE_SECTIONS = [
  {
    name: 'SEO & content',
    rows: [
      { f: 'Articles per month', sub: 'Long-form, expert-reviewed', v: ['8', '24', 'Unlimited'] },
      { f: 'Programmatic SEO pages', sub: 'Comparison hubs, review pages, location pages', v: ['—', '500+', 'Unlimited'] },
      { f: 'Backlink campaigns', sub: 'Finance + trading media outreach', v: ['—', '20 / quarter', '60 / quarter'] },
      { f: 'Schema + technical audit', v: ['Setup', 'Monthly', 'Continuous'] },
    ],
  },
  {
    name: 'Social & community',
    rows: [
      { f: 'Channels managed', sub: 'X · Instagram · TikTok · YouTube · LinkedIn', v: ['1', '3', 'All 5'] },
      { f: 'Posts per channel / month', v: ['20', '30+', '60+'] },
      { f: 'Replies + DM management', v: ['—', true, true] },
      { f: 'Community / Discord ops', v: ['—', 'Setup', 'Full ops'] },
    ],
  },
  {
    name: 'AI UGC video',
    rows: [
      { f: 'Videos per month', v: ['30', '120', '500+'] },
      { f: 'Hooks tested per week', v: ['10', '50', '150'] },
      { f: 'Languages supported', v: ['English', 'EN · ES · PT', 'Any 10'] },
      { f: 'Custom AI avatar', sub: 'Cloned from founder or talent', v: ['—', '1 included', 'Up to 5'] },
    ],
  },
  {
    name: 'Paid social',
    rows: [
      { f: 'Ad account setup + tracking', v: [true, true, true] },
      { f: 'Daily creative iteration', v: ['—', true, true] },
      { f: 'Spend management', sub: 'We manage spend; you keep the ad accounts', v: ['—', 'Up to $50k / mo', 'Unlimited'] },
    ],
  },
  {
    name: 'Strategy & support',
    rows: [
      { f: 'Strategy cadence', v: ['Monthly', 'Bi-weekly', 'Weekly'] },
      { f: 'Founder-led sessions', v: ['—', true, true] },
      { f: 'Slack channel', v: ['Async', 'Live', 'Dedicated pod'] },
      { f: 'Compliance review', v: ['—', true, true] },
      { f: 'Quarterly on-site visits', v: ['—', '—', true] },
    ],
  },
]

function CellValue({ v }) {
  if (v === true) return <span className="cell-check" style={{ color: 'var(--green)' }}><CheckIcon size={14} /></span>
  if (v === '—' || v === false) return <span className="cell-dash"><XIcon /></span>
  return <span>{v}</span>
}

export function CompareTable() {
  return (
    <section className="section">
      <div className="shell">
        <motion.div
          className="section-head"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <motion.span className="eyebrow" variants={fadeUp}><span className="dot" />Compare plans</motion.span>
          <motion.h2 variants={fadeUp}>Every feature,<br />side by side.</motion.h2>
          <motion.p className="desc" variants={fadeUp}>Everything we ship — across SEO, social, AI UGC, paid, and strategy — broken down per plan.</motion.p>
        </motion.div>

        <motion.div
          className="compare-wrap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={viewport}
        >
          <table className="compare-table">
            <thead>
              <tr>
                <th style={{ width: '40%' }}>Feature</th>
                {TIERS.map((t) => (
                  <th key={t.id} className={'col-tier' + (t.featured ? ' featured' : '')}>
                    <span className="tn">{t.name}</span>
                    <span className="tp">
                      {typeof t.priceMonthly === 'number'
                        ? formatPrice(t.priceMonthly) + ' / mo'
                        : 'Custom'}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE_SECTIONS.map((sec, si) => (
                <Fragment key={si}>
                  <tr className="section-row">
                    <td colSpan={4}><span className="si">{sec.name}</span></td>
                  </tr>
                  {sec.rows.map((row, ri) => (
                    <tr key={ri}>
                      <td className="feat-name">
                        {row.f}
                        {row.sub && <span className="sub">{row.sub}</span>}
                      </td>
                      {row.v.map((v, vi) => (
                        <td key={vi} className={'feat-val' + (TIERS[vi].featured ? ' featured-col' : '')}>
                          <CellValue v={v} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  )
}
