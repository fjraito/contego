'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { fadeUp, scaleUp, stagger, viewport } from './animations'

function useTilt() {
  const ref = useRef(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const rotateX = useSpring(useTransform(rawY, [-1, 1], [5, -5]), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useTransform(rawX, [-1, 1], [-5, 5]), { stiffness: 150, damping: 20 })

  function onMove(e) {
    const rect = ref.current.getBoundingClientRect()
    rawX.set((e.clientX - rect.left) / rect.width * 2 - 1)
    rawY.set((e.clientY - rect.top) / rect.height * 2 - 1)
  }

  function onLeave() {
    rawX.set(0)
    rawY.set(0)
  }

  return { ref, rotateX, rotateY, onMove, onLeave }
}

export function Services() {
  const t1 = useTilt()
  const t2 = useTilt()
  const t3 = useTilt()

  return (
    <section className="section" id="services">
      <div className="shell">
        <motion.div
          className="section-head"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <motion.span className="eyebrow" variants={fadeUp}><span className="dot" />Services</motion.span>
          <motion.h2 variants={fadeUp}>Marketing content built around how traders decide.</motion.h2>
          <motion.p className="desc" variants={fadeUp}>Traders compare rules, payouts, platforms, proof, and brand credibility before they buy. Contego turns those decision points into SEO pages, social content, and short-form video.</motion.p>
        </motion.div>

        <motion.div
          className="services"
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <motion.div
            ref={t1.ref}
            className="svc-card"
            variants={scaleUp}
            style={{ rotateX: t1.rotateX, rotateY: t1.rotateY, transformPerspective: 800 }}
            onMouseMove={t1.onMove}
            onMouseLeave={t1.onLeave}
            whileHover={{ scale: 1.02 }}
          >
            <div className="num">01 / SEO</div>
            <div className="icon-frame">
              <div className="ill-seo">
                <div className="lbl-row"><span>KEYWORD</span><span>RANK</span></div>
                <div className="bar b1" /><div className="bar b2" /><div className="bar b3" /><div className="bar b4" />
              </div>
            </div>
            <h3>Turn trader questions into search traffic.</h3>
            <p>We build SEO content around the topics traders already research before joining a prop firm.</p>
            <ul>
              <li>Search intent strategy</li>
              <li>Comparison page planning</li>
              <li>Content briefs and optimization</li>
            </ul>
          </motion.div>

          <motion.div
            ref={t2.ref}
            className="svc-card"
            variants={scaleUp}
            style={{ rotateX: t2.rotateX, rotateY: t2.rotateY, transformPerspective: 800 }}
            onMouseMove={t2.onMove}
            onMouseLeave={t2.onLeave}
            whileHover={{ scale: 1.02 }}
          >
            <div className="num">02 / Social Media Management</div>
            <div className="icon-frame">
              <div className="ill-smm">
                <div className="post"><div className="post-img" /><div className="line" /><div className="line short" /></div>
                <div className="post"><div className="post-img alt" /><div className="line" /><div className="line short" /></div>
                <div className="post"><div className="post-img alt2" /><div className="line" /><div className="line short" /></div>
              </div>
            </div>
            <h3>Turn your offer into daily content.</h3>
            <p>We help your prop firm publish content that explains your edge, builds familiarity, and keeps traders engaged.</p>
            <ul>
              <li>Social content pillars</li>
              <li>Post and carousel copy</li>
              <li>High Quality Image Design</li>
            </ul>
          </motion.div>

          <motion.div
            ref={t3.ref}
            className="svc-card"
            variants={scaleUp}
            style={{ rotateX: t3.rotateX, rotateY: t3.rotateY, transformPerspective: 800 }}
            onMouseMove={t3.onMove}
            onMouseLeave={t3.onLeave}
            whileHover={{ scale: 1.02 }}
          >
            <div className="num">03 / AI UGC</div>
            <div className="icon-frame">
              <div className="ill-ugc">
                <div className="vid side" /><div className="vid center" /><div className="vid side" />
              </div>
            </div>
            <h3>Turn key messages into short-form videos.</h3>
            <p>We create AI UGC-style video scripts and systems that help your prop firm test more ideas faster.</p>
            <ul>
              <li>Video angle strategy</li>
              <li>Short-form scripts</li>
              <li>Creative testing matrix</li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
