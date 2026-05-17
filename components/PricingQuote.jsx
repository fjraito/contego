'use client'

import { motion } from 'framer-motion'
import { fadeUp, viewport } from './animations'

export function PricingQuote() {
  return (
    <section className="section">
      <div className="shell">
        <motion.div
          className="quote-block"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={viewport}
        >
          <blockquote>
            We replaced three agencies and two contractors with one Contego retainer.
            Six months in, our funded-trader pipeline is up <em>3.2×</em> — and we ship
            more in a week than our old stack did in a quarter.
          </blockquote>
          <div className="quote-attrib">
            <div className="a-avatar" />
            <div className="a-text">
              <div className="a-name">Marcus Lin</div>
              <div className="a-title">Co-founder · Apex Quant</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
