'use client'

import { motion } from 'framer-motion'
import { fadeUp, stagger, viewport } from './animations'
import { FAQAccordion } from './FAQAccordion'

const items = [
  { q: 'Are these prices final, or are there hidden add-ons?', a: 'The tier price is what you pay every month, full stop. The only extras are the optional add-ons (paid media management, influencer network, etc.) — and we tell you up front if you need any.' },
  { q: 'How does the quarterly discount work?', a: 'Pre-pay one quarter and you get 15% off the monthly rate, billed at the start of each three-month cycle. You can switch back to monthly at the end of any quarter.' },
  { q: 'Can I change tiers mid-engagement?', a: 'Yes, anytime. Most clients start on Scale and graduate to Dominate around month 6 once organic + paid are compounding. We pro-rate the change to your next billing cycle.' },
  { q: "What if I only need one service — just SEO, or just UGC?", a: "We deliberately don't unbundle. The compounding only works because SEO feeds social, social feeds UGC, and UGC feeds paid. If you only want one channel, you'll get more value from a specialist." },
  { q: 'Is there a setup fee?', a: 'No setup fee for Launch and Scale. Dominate engagements often include a Brand Strategy Sprint (one-time, $12k) which we usually recommend for full-bleed positioning work.' },
  { q: 'How does paid media spend work?', a: "You keep your ad accounts and pay platforms directly — we never touch your card. Scale includes creative ops on your spend; if you're running over $50k/mo in media, you'll want the Paid Social bolt-on for dedicated buyer attention." },
  { q: 'What happens if I want to cancel?', a: 'Email us before the 25th and we wind down the next month — no questions, no clawbacks. We hand over every asset, login, and document. Most clients stay because the math works.' },
]

export function PricingFAQ() {
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
          <motion.span className="eyebrow" variants={fadeUp}><span className="dot" />Pricing FAQ</motion.span>
          <motion.h2 variants={fadeUp}>Money questions,<br />answered.</motion.h2>
        </motion.div>

        <FAQAccordion items={items} />
      </div>
    </section>
  )
}
