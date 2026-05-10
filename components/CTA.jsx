'use client'

import { motion } from 'framer-motion'
import { fadeUp, scaleUp, viewport } from './animations'

export function CTA() {
  return (
    <section className="section" id="cta">
      <div className="shell">
        <motion.div
          className="cta"
          variants={scaleUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <motion.span className="pill" variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
            <span className="dot" />Limited onboarding slots available
          </motion.span>

          <motion.h2 style={{ marginTop: 24 }} variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
            Build a prop firm marketing system<br />traders can trust.
          </motion.h2>

          <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
            Get a clear growth audit for your SEO, social content, AI UGC video, and trader acquisition strategy.
          </motion.p>

          <motion.div className="hero-ctas" variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
            <a href="#" className="btn btn-primary">Book a Call <span className="arrow">→</span></a>
            <a href="#" className="btn btn-ghost">Email Contego</a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
