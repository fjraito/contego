'use client'

import { motion } from 'framer-motion'
import { fadeUp, scaleUp, stagger, viewport } from './animations'

function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

export function Pricing() {
  return (
    <section className="section" id="pricing">
      <div className="shell">
        <motion.div
          className="section-head"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <motion.span className="eyebrow" variants={fadeUp}><span className="dot" />Pricing</motion.span>
          <motion.h2 variants={fadeUp}>Start with the package that matches<br />your acquisition goal.</motion.h2>
          <motion.p className="desc" variants={fadeUp}>Each package is designed to help your prop firm create better content output without losing message quality or brand trust.</motion.p>
        </motion.div>

        <motion.div
          className="pricing"
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <motion.div
            className="price-card"
            variants={scaleUp}
            whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.25 } }}
          >
            <div className="tier-name">Essential</div>
            <div className="tier-desc">For early-stage prop firms that need the right marketing foundation.</div>
            <div className="price-row"><span className="price">$3,000</span><span className="per">/ month</span></div>
            <hr className="divider" />
            <ul className="feat-list">
              <li><Check /> 1 strategy call per month</li>
              <li><Check /> 1 SEO audit and action plan</li>
              <li><Check /> 2 SEO content briefs or page updates per month</li>
              <li><Check /> 12 social posts per month</li>
              <li><Check /> 4 AI UGC-style videos per month</li>
              <li><Check /> 1 monthly performance report</li>
            </ul>
            <motion.a
              href="#cta"
              className="btn btn-ghost"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Choose Essential
            </motion.a>
          </motion.div>

          <motion.div
            className="price-card featured"
            variants={scaleUp}
            whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.25 } }}
          >
            <span className="badge">Most popular</span>
            <div className="tier-name">Growth</div>
            <div className="tier-desc">For prop firms ready to scale visibility, content output, and trader acquisition.</div>
            <div className="price-row"><span className="price">$6,500</span><span className="per">/ month</span></div>
            <hr className="divider" />
            <ul className="feat-list">
              <li><Check /> 2 strategy calls per month</li>
              <li><Check /> Monthly SEO roadmap</li>
              <li><Check /> 4 SEO articles or landing pages per month</li>
              <li><Check /> 24 social posts per month</li>
              <li><Check /> 10 AI UGC-style videos per month</li>
              <li><Check /> Hook testing and content angle planning</li>
              <li><Check /> Monthly performance review</li>
            </ul>
            <motion.a
              href="#cta"
              className="btn btn-primary"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Choose Growth <span className="arrow">→</span>
            </motion.a>
          </motion.div>

          <motion.div
            className="price-card"
            variants={scaleUp}
            whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.25 } }}
          >
            <div className="tier-name">Custom</div>
            <div className="tier-desc">For established prop firms that need a tailored content engine and wider channel support.</div>
            <div className="price-row"><span className="price">$10,000+</span><span className="per">/ month</span></div>
            <hr className="divider" />
            <ul className="feat-list">
              <li><Check /> Custom SEO and content roadmap</li>
              <li><Check /> 6 to 10 SEO assets per month</li>
              <li><Check /> 40 to 60 social posts per month</li>
              <li><Check /> 20 to 30 AI UGC-style videos per month</li>
              <li><Check /> Multi-channel content support</li>
              <li><Check /> Founder content and campaign support</li>
              <li><Check /> Advanced reporting and strategic review</li>
            </ul>
            <motion.a
              href="#cta"
              className="btn btn-ghost"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Build a Custom Plan
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
