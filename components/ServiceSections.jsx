'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUp, stagger, scaleUp, viewport } from './animations'
import { ServiceViz } from './ServiceViz'

/* ── Icon map ── */
const ICONS = {
  pages: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>,
  kw: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>,
  link: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>,
  tech: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
  edit: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>,
  rep: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" /></svg>,
  cal: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>,
  design: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><circle cx="8" cy="8" r="2" /></svg>,
  comm: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
  cre: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
  data: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83" /><path d="M22 12A10 10 0 0 0 12 2v10z" /></svg>,
  cris: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>,
  script: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>,
  gen: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
  comp: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
  feed: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>,
}

function getIcon(key) {
  return ICONS[key] || ICONS.rep
}

/* ══════════════════════════════════════════════
   ServiceHero
   ══════════════════════════════════════════════ */
export function ServiceHero({ d }) {
  return (
    <section className="svc-hero">
      <div className="shell">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
          <span className="page-eyebrow">{d.eyebrow}</span>
        </motion.div>

        <motion.h1 variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
          {d.h1Pre} <span className="italic-accent">{d.h1Accent}</span>
        </motion.h1>

        <motion.p className="lead" variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
          {d.lead}
        </motion.p>

        <motion.div className="hero-ctas" variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
          <a href="#cta" className="btn btn-primary">{d.cta.primary} <span className="arrow">&rarr;</span></a>
          <a href="/pricing" className="btn btn-ghost">{d.cta.secondary}</a>
        </motion.div>

        <motion.div className="micro-stats" variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
          {d.stats.map((s, i) => (
            <span key={i}><b>{s.n}</b> {s.l}</span>
          ))}
        </motion.div>

        <motion.div variants={scaleUp} initial="hidden" whileInView="show" viewport={viewport}>
          <ServiceViz slug={d.slug} />
        </motion.div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   ServiceIncludes
   ══════════════════════════════════════════════ */
export function ServiceIncludes({ d }) {
  return (
    <section className="section" id="includes">
      <div className="shell">
        <motion.div style={{ textAlign: 'center', marginBottom: 56 }} variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
          <span className="eyebrow"><span className="dot" />What&apos;s included</span>
          <h2 style={{ marginTop: 16 }}>Everything you need, nothing you don&apos;t.</h2>
        </motion.div>
        <motion.div className="svc-includes" variants={stagger(0.06)} initial="hidden" whileInView="show" viewport={viewport}>
          {d.includes.map((item) => (
            <motion.div className="inc-card" key={item.i} variants={fadeUp}>
              <div className="ic-icon">{getIcon(item.i)}</div>
              <h3>{item.t}</h3>
              <p>{item.d}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   ServiceHow
   ══════════════════════════════════════════════ */
export function ServiceHow({ d }) {
  return (
    <section className="section" id="how">
      <div className="shell">
        <motion.div style={{ textAlign: 'center', marginBottom: 56 }} variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
          <span className="eyebrow"><span className="dot" />How it works</span>
          <h2 style={{ marginTop: 16 }}>From kickoff to compound growth.</h2>
        </motion.div>
        <motion.div className="how-grid" variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={viewport}>
          {d.process.map((step, i) => (
            <motion.div className="how-step" key={i} variants={fadeUp}>
              <span className="big-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="week">{step.week}</span>
              <h3>{step.t}</h3>
              <p>{step.d}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   ServiceCompare
   ══════════════════════════════════════════════ */
export function ServiceCompare({ d }) {
  const c = d.compare
  return (
    <section className="section" id="compare">
      <div className="shell">
        <motion.div style={{ textAlign: 'center', marginBottom: 56 }} variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
          <span className="eyebrow"><span className="dot" />Compare</span>
          <h2 style={{ marginTop: 16 }}>vs. doing it in-house</h2>
        </motion.div>
        <motion.div className="svc-compare-wrap" variants={scaleUp} initial="hidden" whileInView="show" viewport={viewport}>
          <div className="svc-compare-table">
            <div className="svc-compare-head">
              <div>Capability</div>
              <div>{c.themLabel}</div>
              <div className="col-us">{c.usLabel}</div>
            </div>
            {c.rows.map((row, i) => (
              <div className="svc-compare-row" key={i}>
                <div className="axis">{row.axis}</div>
                <div className="col-them">
                  <span className="svc-compare-cell">
                    <span className="x">
                      <svg width="8" height="8" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 2l8 8M10 2l-8 8" /></svg>
                    </span>
                    {row.them}
                  </span>
                </div>
                <div className="col-us">
                  <span className="svc-compare-cell">
                    <span className="ck">
                      <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6l3 3 5-6" /></svg>
                    </span>
                    {row.us}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   ServiceStartsAt (Pricing)
   ══════════════════════════════════════════════ */
export function ServiceStartsAt({ d }) {
  const s = d.startsAt
  return (
    <section className="section" id="pricing">
      <div className="shell">
        <motion.div style={{ textAlign: 'center', marginBottom: 48 }} variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
          <span className="eyebrow"><span className="dot" />Pricing</span>
          <h2 style={{ marginTop: 16 }}>Simple, transparent pricing.</h2>
          <p className="muted" style={{ marginTop: 16, maxWidth: 520, marginLeft: 'auto', marginRight: 'auto', fontSize: 'clamp(15px, 1.3vw, 18px)', lineHeight: 1.55 }}>
            One retainer, no surprises. Cancel anytime — we earn your business every month.
          </p>
        </motion.div>

        <motion.div className="svc-pricing" variants={scaleUp} initial="hidden" whileInView="show" viewport={viewport}>
          <div className="svc-pricing-card">
            <p className="svc-pricing-label">{s.title}</p>
            <div className="price-row">
              <span className="price">{s.price}</span>
              <span className="per">{s.per}</span>
            </div>
            <p className="svc-pricing-desc">{s.desc}</p>
            <div className="svc-pricing-ctas">
              <a href="#cta" className="btn btn-primary">{d.cta.primary} <span className="arrow">&rarr;</span></a>
              <a href="/pricing" className="btn btn-ghost">Compare all plans</a>
            </div>
          </div>

          <div className="svc-pricing-trust">
            <span>
              <span className="check-icon">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8l3.5 3.5L13 5" /></svg>
              </span>
              No long-term contracts
            </span>
            <span>
              <span className="check-icon">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8l3.5 3.5L13 5" /></svg>
              </span>
              Cancel anytime
            </span>
            <span>
              <span className="check-icon">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8l3.5 3.5L13 5" /></svg>
              </span>
              Setup in week one
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   ServiceFAQ
   ══════════════════════════════════════════════ */
function FAQItem({ q, a, open, onClick }) {
  return (
    <div className="faq-item">
      <button className="faq-summary" onClick={onClick} aria-expanded={open}>
        <span>{q}</span>
        <motion.span className="plus" animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="answer"
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ paddingBottom: 16 }}>{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function ServiceFAQ({ d }) {
  const [openIdx, setOpenIdx] = useState(0)
  return (
    <section className="section" id="faq">
      <div className="shell">
        <motion.div style={{ textAlign: 'center', marginBottom: 56 }} variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
          <span className="eyebrow"><span className="dot" />FAQ</span>
          <h2 style={{ marginTop: 16 }}>Common questions</h2>
        </motion.div>
        <motion.div className="svc-faq" variants={stagger(0.06)} initial="hidden" whileInView="show" viewport={viewport}>
          {d.faq.map((item, i) => (
            <motion.div key={i} variants={fadeUp}>
              <FAQItem
                q={item.q}
                a={item.a}
                open={openIdx === i}
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
