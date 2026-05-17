'use client'

import { motion } from 'framer-motion'
import { fadeUp, scaleUp, stagger, viewport } from './animations'

const ADDONS = [
  {
    tag: 'Sprint',
    title: 'Brand strategy sprint',
    desc: 'Two-week intensive to nail positioning, messaging, and visual system before we ship at scale.',
    price: '$12k',
    unit: 'one-time',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><line x1="12" y1="2" x2="12" y2="22"/><path d="M2 12h20"/></svg>
    ),
  },
  {
    tag: 'Bolt-on',
    title: 'Paid social media buying',
    desc: 'Dedicated media buyer + daily optimization. Required if your monthly spend is over $50k.',
    price: '$4.5k',
    unit: '+ 8% of spend / mo',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 6-6"/></svg>
    ),
  },
  {
    tag: 'Bolt-on',
    title: 'Influencer & creator network',
    desc: 'We source, vet, and manage 10–40 real creators per month for organic and whitelisted UGC.',
    price: '$6k',
    unit: '/ mo',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="9" cy="7" r="3"/><circle cx="17" cy="7" r="3"/><path d="M2 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2"/><path d="M16 21v-2a4 4 0 0 0-3-3.87"/></svg>
    ),
  },
  {
    tag: 'Sprint',
    title: 'Landing page system',
    desc: 'Conversion-tested landing page templates for every funnel — challenge, payouts, comparison.',
    price: '$8k',
    unit: 'one-time',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/></svg>
    ),
  },
  {
    tag: 'Ongoing',
    title: 'PR & earned media',
    desc: 'Pitches, profile placements, and journalist relationships in fintech and finance verticals.',
    price: '$5k',
    unit: '/ mo',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
    ),
  },
  {
    tag: 'Ongoing',
    title: 'Affiliate program ops',
    desc: 'Build and manage your affiliate funnel — partner sourcing, payouts, fraud detection.',
    price: '$3.5k',
    unit: '/ mo',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
    ),
  },
]

export function AddOns() {
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
          <motion.span className="eyebrow" variants={fadeUp}><span className="dot" />Add-ons</motion.span>
          <motion.h2 variants={fadeUp}>Bolt on what<br />you need.</motion.h2>
          <motion.p className="desc" variants={fadeUp}>Mix and match these onto any tier. Sprints are one-time engagements; bolt-ons are monthly retainers.</motion.p>
        </motion.div>

        <motion.div
          className="addons"
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {ADDONS.map((a, i) => (
            <motion.div
              className="addon-card"
              key={i}
              variants={scaleUp}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
            >
              <div className="addon-head">
                <span className="addon-glyph">{a.icon}</span>
                <span className="addon-tag">{a.tag}</span>
              </div>
              <h3>{a.title}</h3>
              <p>{a.desc}</p>
              <div className="addon-foot">
                <span className="ap">{a.price}</span>
                <span className="au">{a.unit}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
