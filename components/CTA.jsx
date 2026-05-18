'use client'

import { motion } from 'framer-motion'
import { fadeUp, scaleUp, viewport } from './animations'

export function CTA({
  pill = 'Limited onboarding slots available',
  heading = 'Build a prop firm marketing system<br />traders can trust.',
  description = 'Get a clear growth audit for your SEO, social content, AI UGC video, and trader acquisition strategy.',
  primaryLabel = 'Book a Call',
  primaryHref = '#',
  secondaryLabel = 'Email Contego',
  secondaryHref = '#',
}) {
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
            <span className="dot" />{pill}
          </motion.span>

          <motion.h2 style={{ marginTop: 24 }} variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport} dangerouslySetInnerHTML={{ __html: heading }} />

          <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
            {description}
          </motion.p>

          <motion.div className="hero-ctas" variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
            <a href={primaryHref} className="btn btn-primary">{primaryLabel} <span className="arrow">→</span></a>
            <a href={secondaryHref} className="btn btn-ghost">{secondaryLabel}</a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
