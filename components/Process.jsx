'use client'

import { motion } from 'framer-motion'
import { fadeUp, stagger, viewport } from './animations'

const steps = [
  {
    n: '01',
    t: 'Audit the current system',
    d: 'We review your website, offer, SEO structure, social presence, content quality, and trust signals to see what is helping or hurting trader acquisition.',
  },
  {
    n: '02',
    t: 'Map the growth plan',
    d: 'We define your key trader segments, search opportunities, content pillars, video angles, and messaging priorities.',
  },
  {
    n: '03',
    t: 'Build the content engine',
    d: 'We create the pages, posts, scripts, workflows, and review process needed to publish consistently across search, social, and video.',
  },
  {
    n: '04',
    t: 'Optimize the system',
    d: 'We track what gets attention, what builds trust, and what moves traders closer to buying, then sharpen the system every month.',
  },
]

export function Process() {
  return (
    <section className="section" id="process">
      <div className="shell">
        <motion.div
          className="section-head"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <motion.span className="eyebrow" variants={fadeUp}><span className="dot" />How we work</motion.span>
          <motion.h2 variants={fadeUp}>A controlled system for<br />building trader demand.</motion.h2>
          <motion.p className="desc" variants={fadeUp}>Contego starts by finding the gaps in your current marketing, then builds the SEO, social, and AI UGC workflow your prop firm needs to grow with clarity.</motion.p>
        </motion.div>

        <motion.div
          className="process-grid"
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {steps.map((s, i) => (
            <motion.div className="process-card" key={i} variants={fadeUp}>
              <span className="process-bg-num">{s.n}</span>
              <div className="process-label">{s.n}</div>
              <h3 className="process-title">{s.t}</h3>
              <p className="process-desc">{s.d}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
