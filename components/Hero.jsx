'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { fadeUp, fadeIn, stagger } from './animations'

export function Hero() {
  return <HeroFloating />
}

function HeroFloating() {
  const containerRef = useRef(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const x = useSpring(rawX, { stiffness: 60, damping: 20 })
  const y = useSpring(rawY, { stiffness: 60, damping: 20 })

  const x1 = useTransform(x, v => v * 0.035)
  const y1 = useTransform(y, v => v * 0.025)
  const x2 = useTransform(x, v => v * -0.02)
  const y2 = useTransform(y, v => v * 0.02)
  const x3 = useTransform(x, v => v * 0.015)
  const y3 = useTransform(y, v => v * -0.03)
  const x4 = useTransform(x, v => v * -0.03)
  const y4 = useTransform(y, v => v * -0.02)

  function handleMouseMove(e) {
    const rect = containerRef.current.getBoundingClientRect()
    rawX.set(e.clientX - rect.left - rect.width / 2)
    rawY.set(e.clientY - rect.top - rect.height / 2)
  }

  function handleMouseLeave() {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <section
      className="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="shell">
        <motion.div
          className="hero-inner hero-floats"
          variants={stagger(0.1)}
          initial="hidden"
          animate="show"
        >
          <motion.div className="float-card fc-1" style={{ x: x1, y: y1 }}>
            <div className="fc-row">
              <div className="avatar" />
              <div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>@maverick.fx</div>
                <div className="meta">UGC · 1.2M views</div>
              </div>
            </div>
          </motion.div>

          <motion.div className="float-card fc-2" style={{ x: x2, y: y2 }}>
            <div className="lab">Keyword rank</div>
            <div className="big">#3 ↑</div>
            <div className="meta" style={{ marginTop: 4 }}>"best prop firm 2026"</div>
          </motion.div>

          <motion.div className="float-card fc-3" style={{ x: x3, y: y3 }}>
            <div className="lab">Signups today</div>
            <div className="big">+184</div>
          </motion.div>

          <motion.div className="float-card fc-4" style={{ x: x4, y: y4 }}>
            <div className="lab">Cost per challenge</div>
            <div className="big">$11.20</div>
            <div className="meta" style={{ marginTop: 4 }}>↓ 38% vs Q1</div>
          </motion.div>

          <motion.span className="version-pill" variants={fadeIn}>
            <span className="v-tag">Available</span>
            <span className="v-text">Limited onboarding slots open</span>
          </motion.span>

          <motion.h1 variants={fadeUp}>
            Prop firm marketing built for{' '}
            <span className="italic-accent">trust-led growth.</span>
          </motion.h1>

          <motion.p className="lead" variants={fadeUp}>
            Contego helps prop firms grow through SEO, social media, and AI UGC video
            systems built to attract traders, explain your offer clearly, and protect
            brand trust.
          </motion.p>

          <motion.div className="hero-ctas" variants={fadeUp}>
            <motion.a
              href="#cta"
              className="btn btn-primary"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Book a call <span className="arrow">→</span>
            </motion.a>
            <motion.a
              href="#pricing"
              className="btn btn-ghost"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              See pricing
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
