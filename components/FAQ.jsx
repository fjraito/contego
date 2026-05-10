'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUp, stagger, viewport } from './animations'

const items = [
  {
    q: 'What does Contego do?',
    a: 'Contego is a prop firm marketing agency that helps funded trader brands grow through SEO, social media management, and AI UGC video systems.',
  },
  {
    q: 'Who is Contego best for?',
    a: 'Contego is best for prop firms that need better visibility, clearer messaging, consistent content, and stronger trader trust before the buying decision.',
  },
  {
    q: 'Do you only work with prop firms?',
    a: 'Contego is built around prop firms and trading related brands. That focus helps us understand trader psychology, evaluation rules, payouts, drawdown concerns, and the trust issues in this market.',
  },
  {
    q: 'What makes Contego different from a general marketing agency?',
    a: 'Most general agencies need time to understand prop firm offers. Contego already works around the problems that matter in this space: trader acquisition, offer clarity, content trust, SEO intent, and scalable video creative.',
  },
  {
    q: 'Can you help if our prop firm is still new?',
    a: 'Yes. The Essential plan is designed for early stage prop firms that need a stronger marketing base, clearer positioning, SEO direction, and consistent content.',
  },
  {
    q: 'Do you create AI UGC videos?',
    a: 'Yes. Contego creates AI UGC video systems for offer explainers, rule breakdowns, educational clips, and hook testing. We do not use AI to create fake trader testimonials or misleading success stories.',
  },
  {
    q: 'How long does it take to see results?',
    a: 'Social and video testing can create early signals within the first month. SEO usually takes longer, since rankings and organic traffic build over time. The goal is to create a content system that improves month by month.',
  },
  {
    q: 'Can you manage our social media channels?',
    a: 'Yes. Contego can help with content planning, post writing, short form video scripts, carousel direction, founder content prompts, and social media reporting.',
  },
  {
    q: 'Do you handle paid ads?',
    a: "Contego's core focus is SEO, social, and AI UGC video. Paid social creative support can be included in Growth or Custom plans, especially for hooks, scripts, and creative testing.",
  },
  {
    q: 'Who owns the content you create?',
    a: 'You own the final approved assets created for your prop firm brand, including articles, posts, scripts, and video files.',
  },
  {
    q: 'Do you guarantee sales or funded trader signups?',
    a: 'No. Contego does not guarantee sales, trader results, or funded account outcomes. We build marketing systems designed to improve visibility, content quality, trust, and qualified demand.',
  },
]

function FAQItem({ q, a, open, onClick }) {
  return (
    <motion.div className="faq-item" variants={fadeUp}>
      <button
        className="faq-summary"
        onClick={onClick}
        aria-expanded={open}
      >
        <span>{q}</span>
        <motion.span
          className="plus"
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
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
    </motion.div>
  )
}

export function FAQ() {
  const [openIdx, setOpenIdx] = useState(0)

  return (
    <section className="section" id="faq">
      <div className="shell">
        <motion.div
          className="section-head"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <motion.span className="eyebrow" variants={fadeUp}><span className="dot" />FAQ</motion.span>
          <motion.h2 variants={fadeUp}>Questions prop firm teams ask<br />before working with Contego.</motion.h2>
        </motion.div>

        <motion.div
          className="faq-grid"
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {items.map((it, i) => (
            <FAQItem
              key={i}
              q={it.q}
              a={it.a}
              open={openIdx === i}
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
