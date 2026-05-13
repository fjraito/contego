'use client'

import { useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useTransform, useSpring, animate } from 'framer-motion'

// ── SEO Illustration: Animated ranking dashboard ──
export function IllSEO() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [hovered, setHovered] = useState(null)

  const keywords = [
    { kw: 'best prop firm 2026', rank: 1, delta: 4 },
    { kw: 'funded trader review', rank: 2, delta: 7 },
    { kw: 'prop firm vs broker', rank: 3, delta: 12 },
    { kw: 'prop firm payout proof', rank: 5, delta: 9 },
    { kw: 'cheap prop firm', rank: 4, delta: 6 },
  ]

  return (
    <div className="dd-visual" ref={ref}>
      <motion.div
        className="ill-seo-dash"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="frame panel-main">
          <div className="head">
            <div className="ttl">SEO Rankings</div>
            <motion.div
              className="badge"
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: 0.6, type: 'spring', stiffness: 300 }}
            >
              +312%
            </motion.div>
          </div>
          {keywords.map((k, i) => (
            <motion.div
              className={`kw-row ${hovered === i ? 'active' : ''}`}
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              whileHover={{ x: 4, backgroundColor: 'rgba(74,222,128,0.06)' }}
              style={{ cursor: 'default', borderRadius: 6, padding: '6px 8px', margin: '0 -8px' }}
            >
              <span className="kw">{k.kw}</span>
              <motion.span
                className="rank"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 + i * 0.1 }}
              >
                #{k.rank}
              </motion.span>
              <motion.span
                className="delta up"
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 + i * 0.1, type: 'spring' }}
              >
                ↑ {k.delta}
              </motion.span>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="frame panel-floating"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5, type: 'spring' }}
          whileHover={{ scale: 1.05, y: -4 }}
        >
          <div className="ttl">Organic visits</div>
          <div className="big">
            {inView ? <AnimatedCounter from={22800} to={94200} duration={1.5} delay={1} /> : '22.8k'}
          </div>
          <div className="sub">vs 22.8k six months ago</div>
        </motion.div>
      </motion.div>
    </div>
  )
}

// ── Social Illustration: Animated phone feed ──
export function IllSocial() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const phones = [
    { handle: '@maverick.fx', likes: '8.2k', shares: '412', cls: 'b', delay: 0.2 },
    { handle: '@propinsider', likes: '24k', shares: '1.1k', cls: '', delay: 0 },
    { handle: '@funded.live', likes: '5.7k', shares: '248', cls: 'c', delay: 0.3 },
  ]

  return (
    <div className="dd-visual" ref={ref}>
      <div className="ill-social">
        {phones.map((p, i) => (
          <motion.div
            key={i}
            className={`phone ${i === 1 ? 'center' : 'side'}${i === 2 ? ' right' : ''}`}
            initial={{ opacity: 0, y: 40, rotateY: i === 0 ? 15 : i === 2 ? -15 : 0 }}
            animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
            transition={{ delay: p.delay, duration: 0.6, type: 'spring', stiffness: 100 }}
            whileHover={{ y: -12, scale: 1.04, transition: { duration: 0.25 } }}
          >
            <div className="ph-header">
              <motion.div
                className="av"
                animate={inView ? { scale: [0, 1.2, 1] } : {}}
                transition={{ delay: p.delay + 0.4, duration: 0.4 }}
              />
              <div className="meta">{p.handle}</div>
            </div>
            <div className={`ph-img ${p.cls}`} />
            <div className="ph-stats">
              <motion.span
                className="heart"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: p.delay + 0.8 }}
              >
                ♥ {p.likes}
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: p.delay + 0.9 }}
              >
                ↻ {p.shares}
              </motion.span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ── UGC Illustration: Animated pipeline board ──
export function IllUGC() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [activeCard, setActiveCard] = useState(null)

  const lanes = [
    { name: 'Drafting', count: 18, cards: 5, done: false },
    { name: 'Editing', count: 14, cards: 4, done: false },
    { name: 'Shipped', count: 30, cards: 5, done: true },
  ]

  return (
    <div className="dd-visual" ref={ref}>
      <motion.div
        className="ill-ugc-pipe"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="frame board">
          <div className="board-head">
            <div className="ttl">AI UGC pipeline</div>
            <motion.div
              className="cnt"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
            >
              {inView ? <AnimatedCounter from={0} to={62} duration={1} delay={0.5} suffix=" / 120" /> : '0 / 120'}
            </motion.div>
          </div>
          <div className="lanes">
            {lanes.map((lane, li) => (
              <motion.div
                key={li}
                className="lane"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + li * 0.15 }}
              >
                <div className="lane-h">
                  {lane.name}
                  <motion.span
                    className="n"
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: 0.6 + li * 0.15, type: 'spring' }}
                  >
                    {lane.count}
                  </motion.span>
                </div>
                {Array.from({ length: lane.cards }).map((_, ci) => (
                  <motion.div
                    key={ci}
                    className={`card ${lane.done ? 'done' : ''}`}
                    initial={{ opacity: 0, scale: 0.5, x: -10 }}
                    animate={inView ? { opacity: 1, scale: 1, x: 0 } : {}}
                    transition={{
                      delay: 0.5 + li * 0.15 + ci * 0.06,
                      type: 'spring',
                      stiffness: 200,
                    }}
                    whileHover={{
                      scale: 1.08,
                      y: -2,
                      boxShadow: lane.done
                        ? '0 4px 16px rgba(74,222,128,0.25)'
                        : '0 4px 16px rgba(255,255,255,0.08)',
                    }}
                    style={{ cursor: 'default' }}
                  />
                ))}
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="ugc-progress"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2 }}
          style={{
            marginTop: 12,
            background: 'rgba(255,255,255,0.04)',
            borderRadius: 8,
            padding: '8px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontSize: 12,
            color: 'var(--text-3)',
          }}
        >
          <motion.div
            style={{
              width: 8, height: 8, borderRadius: '50%',
              background: 'var(--green)',
            }}
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
          <span>Pipeline active — 12 videos shipping today</span>
        </motion.div>
      </motion.div>
    </div>
  )
}

// ── Landing Page Illustration: Animated conversion dashboard ──
export function IllLanding() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const barHeights = [35, 48, 42, 58, 52, 68, 62, 78, 72, 85]

  return (
    <div className="dd-visual" ref={ref}>
      <motion.div
        className="ill-report"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="frame panel">
          <div className="ttl">Landing page performance</div>
          <h4>Conversion trend</h4>
          <div className="ill-bar-chart" style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 80, marginTop: 12 }}>
            {barHeights.map((h, i) => (
              <motion.div
                key={i}
                style={{
                  flex: 1,
                  background: `linear-gradient(to top, var(--green), rgba(74,222,128,0.3))`,
                  borderRadius: '3px 3px 0 0',
                  minWidth: 0,
                }}
                initial={{ height: 0 }}
                animate={inView ? { height: `${h}%` } : {}}
                transition={{ delay: 0.4 + i * 0.08, duration: 0.5, ease: 'easeOut' }}
                whileHover={{ scaleY: 1.15, originY: 1, filter: 'brightness(1.3)' }}
              />
            ))}
          </div>
          <div className="grid-3" style={{ marginTop: 16 }}>
            <motion.div
              className="stat"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="v">
                {inView ? <AnimatedDecimal from={1.2} to={4.2} duration={1.2} delay={1} suffix="%" /> : '1.2%'}
                <span className="pos">↑18%</span>
              </div>
              <div className="l">CVR</div>
            </motion.div>
            <motion.div
              className="stat"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="v">
                {inView ? <AnimatedCounter from={0} to={184} duration={1.2} delay={1.1} /> : '0'}
                <span className="pos">↑24%</span>
              </div>
              <div className="l">Signups</div>
            </motion.div>
            <motion.div
              className="stat"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="v">
                {inView ? <AnimatedDecimal from={4.8} to={2.1} duration={1.2} delay={1.2} suffix="s" /> : '4.8s'}
                <span className="pos">↓12%</span>
              </div>
              <div className="l">Bounce</div>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="floating-pill"
          initial={{ opacity: 0, x: 20, scale: 0.9 }}
          animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
          transition={{ delay: 1.4, type: 'spring' }}
          whileHover={{ scale: 1.05, y: -2 }}
        >
          <motion.span
            className="pip"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
          />
          Page live — CVR trending up
        </motion.div>
      </motion.div>
    </div>
  )
}

// ── Helper: Animated number counter ──
function AnimatedCounter({ from, to, duration = 1, delay = 0, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [value, setValue] = useState(from)

  useState(() => {
    if (typeof window === 'undefined') return
    const timeout = setTimeout(() => {
      const controls = animate(from, to, {
        duration,
        ease: 'easeOut',
        onUpdate: (v) => setValue(Math.round(v)),
      })
      return () => controls.stop()
    }, delay * 1000)
    return () => clearTimeout(timeout)
  })

  const display = to >= 10000
    ? `${(value / 1000).toFixed(1)}k`
    : value.toLocaleString()

  return <span ref={ref}>{display}{suffix}</span>
}

function AnimatedDecimal({ from, to, duration = 1, delay = 0, suffix = '' }) {
  const [value, setValue] = useState(from)

  useState(() => {
    if (typeof window === 'undefined') return
    const timeout = setTimeout(() => {
      animate(from, to, {
        duration,
        ease: 'easeOut',
        onUpdate: (v) => setValue(v),
      })
    }, delay * 1000)
    return () => clearTimeout(timeout)
  })

  return <span>{value.toFixed(1)}{suffix}</span>
}
