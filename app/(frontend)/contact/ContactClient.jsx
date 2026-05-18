'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, viewport } from '@/components/animations'

const INQUIRY_TYPES = ['SEO', 'Social', 'AI UGC', 'Multi-service', 'Partnership', 'Other']
const BUDGETS = [
  '< $5k / mo',
  '$5k – $10k / mo',
  '$10k – $25k / mo',
  '$25k – $50k / mo',
  '$50k+ / mo',
  'Not sure yet',
]
const ROLES = ['Founder / CEO', 'Head of Marketing', 'Head of Growth', 'Operator', 'Agency / Partner', 'Other']

function ContactForm() {
  const [inquiry, setInquiry] = useState('SEO')
  const [done, setDone] = useState(false)

  if (done) {
    return (
      <div className="form-card">
        <div className="form-success">
          <div className="check-circle">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2>You&apos;re in the inbox.</h2>
          <p>
            We&apos;ve got your note and you&apos;ll hear from a real human within 12 business
            hours. Keep an eye on your spam folder — we sometimes land there on the first reply.
          </p>
          <button className="btn btn-ghost" onClick={() => setDone(false)}>Send another message</button>
        </div>
      </div>
    )
  }

  return (
    <form
      className="form-card"
      onSubmit={(e) => { e.preventDefault(); setDone(true) }}
    >
      <h2>Send us a brief.</h2>
      <p className="form-sub">The more context, the sharper our reply. None of it is shared outside our team.</p>

      <div className="form-grid">
        <div className="field">
          <label htmlFor="f-name">Name</label>
          <input id="f-name" type="text" placeholder="Jordan Kim" required />
        </div>
        <div className="field">
          <label htmlFor="f-email">Work email</label>
          <input id="f-email" type="email" placeholder="jordan@firm.com" required />
        </div>
        <div className="field">
          <label htmlFor="f-co">Company</label>
          <input id="f-co" type="text" placeholder="Maven Capital" />
        </div>
        <div className="field">
          <label htmlFor="f-role">Role</label>
          <select id="f-role" defaultValue="">
            <option value="" disabled>Select your role</option>
            {ROLES.map((r) => <option key={r}>{r}</option>)}
          </select>
        </div>

        <div className="field full">
          <label>What&apos;s the inquiry?</label>
          <div className="ct-chips">
            {INQUIRY_TYPES.map((t) => (
              <button
                key={t}
                type="button"
                className={`ct-chip ${inquiry === t ? 'active' : ''}`}
                onClick={() => setInquiry(t)}
              >
                <span className="ck">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="field full">
          <label htmlFor="f-budget">Monthly marketing budget</label>
          <select id="f-budget" defaultValue="">
            <option value="" disabled>Pick a range</option>
            {BUDGETS.map((b) => <option key={b}>{b}</option>)}
          </select>
        </div>

        <div className="field full">
          <label htmlFor="f-msg">What are you trying to do?</label>
          <textarea
            id="f-msg"
            placeholder="e.g. we just launched our second funded program and want to 4x organic traffic before Q4. Currently doing X, Y, Z..."
            required
          />
        </div>
      </div>

      <div className="form-actions">
        <button className="btn btn-primary" type="submit">
          Send the brief <span className="arrow">&rarr;</span>
        </button>
        <span className="form-foot"><span className="pip" /> Replies from a human operator, not a bot.</span>
      </div>
    </form>
  )
}

function ContactSidebar() {
  return (
    <aside className="ct-sidebar">
      <div className="sla-badge">
        <div className="ring">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
          </svg>
        </div>
        <div className="txt">
          <b>Replying within 12 hours</b>
          <span>Mon&ndash;Fri</span>
        </div>
      </div>

      <div className="ct-side-card">
        <h3>Or reach us directly</h3>
        <a className="contact-row" href="mailto:hello@contego.agency" rel="nofollow noopener noreferrer">
          <span className="ic">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
          </span>
          <span className="who">
            <span className="lbl">Email</span>
            <span className="val">hello@contego.agency</span>
          </span>
          <span className="arrow">&rarr;</span>
        </a>
        <a className="contact-row" href="#" rel="nofollow noopener noreferrer">
          <span className="ic">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v4M16 3v4" /></svg>
          </span>
          <span className="who">
            <span className="lbl">Book a call</span>
            <span className="val">30-min strategy session</span>
          </span>
          <span className="arrow">&rarr;</span>
        </a>
        <a className="contact-row" href="#" rel="nofollow noopener noreferrer">
          <span className="ic">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </span>
          <span className="who">
            <span className="lbl">X / Twitter</span>
            <span className="val">@contego</span>
          </span>
          <span className="arrow">&rarr;</span>
        </a>
        <a className="contact-row" href="#" rel="nofollow noopener noreferrer">
          <span className="ic">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.1c.5-1 1.9-2 3.9-2 4.2 0 5 2.7 5 6.3V21h-4v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4z" /></svg>
          </span>
          <span className="who">
            <span className="lbl">LinkedIn</span>
            <span className="val">/company/contego</span>
          </span>
          <span className="arrow">&rarr;</span>
        </a>
      </div>

      <div className="ct-side-card">
        <h3>What happens next</h3>
        <div className="timeline">
          <div className="tl-step done">
            <span className="dot">&#10003;</span>
            <div className="body">
              <b>You send the brief</b>
              <span>One short form, no spam, no lock-in.</span>
            </div>
          </div>
          <div className="tl-step">
            <span className="dot">2</span>
            <div className="body">
              <b>Operator review &middot; within 12h</b>
              <span>An operator (not a sales rep) reads your note and decides if there&apos;s a fit.</span>
            </div>
          </div>
          <div className="tl-step">
            <span className="dot">3</span>
            <div className="body">
              <b>30-min strategy call</b>
              <span>We share what we&apos;d do in your seat. No deck, no upsell theater.</span>
            </div>
          </div>
          <div className="tl-step">
            <span className="dot">4</span>
            <div className="body">
              <b>Tailored proposal</b>
              <span>If we both want to work together, you get a one-page scope within 48 hours.</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default function ContactClient() {
  return (
    <section className="section">
      <div className="shell">
        <motion.div
          className="contact-split"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <ContactForm />
          <ContactSidebar />
        </motion.div>
      </div>
    </section>
  )
}
