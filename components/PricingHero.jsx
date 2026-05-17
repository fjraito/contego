'use client'

import { motion } from 'framer-motion'
import { fadeUp, stagger, viewport } from './animations'
import { BillingToggle } from './BillingToggle'

export function PricingHero({ billing, setBilling }) {
  return (
    <section className="pricing-hero">
      <div className="shell">
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <motion.span className="page-eyebrow" variants={fadeUp}>Pricing</motion.span>
          <motion.h1 style={{ marginTop: 22 }} variants={fadeUp}>
            Pricing built to<br />
            <span className="italic-accent">compound</span>, not bloat.
          </motion.h1>
          <motion.p className="lead" variants={fadeUp}>
            Three retainers. One growth engine. Month-to-month, with everything you need to scale
            from launch to category leader — no hidden ladders, no per-seat tax.
          </motion.p>
          <motion.div variants={fadeUp}>
            <BillingToggle billing={billing} setBilling={setBilling} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
