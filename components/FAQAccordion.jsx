'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUp, stagger, viewport } from './animations'

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

export function FAQAccordion({ items, defaultOpen = 0 }) {
  const [openIdx, setOpenIdx] = useState(defaultOpen)

  return (
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
  )
}
