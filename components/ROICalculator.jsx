'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, stagger, viewport } from './animations'
import { TIERS } from './TierGrid'

function fmt(n) {
  return '$' + Math.round(n).toLocaleString()
}

export function ROICalculator({ billing }) {
  const [traders, setTraders] = useState(400)
  const [aov, setAov] = useState(149)
  const [lift, setLift] = useState(35)
  const [tier, setTier] = useState('scale')

  const tierCost = useMemo(() => {
    const t = TIERS.find((x) => x.id === tier)
    if (typeof t.priceMonthly !== 'number') return 18000
    return billing === 'quarterly' ? t.priceQuarterly : t.priceMonthly
  }, [tier, billing])

  const currentMRR = traders * aov
  const liftedMRR = currentMRR * (1 + lift / 100)
  const addedMRR = liftedMRR - currentMRR
  const netMRR = addedMRR - tierCost
  const roiX = addedMRR / tierCost
  const paybackDays = Math.max(1, Math.round((tierCost / addedMRR) * 30))

  return (
    <section className="section">
      <div className="shell">
        <motion.div
          className="section-head"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <motion.span className="eyebrow" variants={fadeUp}><span className="dot" />ROI model</motion.span>
          <motion.h2 variants={fadeUp}>The math, for<br />your numbers.</motion.h2>
          <motion.p className="desc" variants={fadeUp}>Drop in your funded-trader pipeline. We&apos;ll model what a typical 6-month Contego engagement returns.</motion.p>
        </motion.div>

        <motion.div
          className="roi-grid"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={viewport}
        >
          <div className="roi-controls">
            <h3>Your inputs</h3>
            <p className="sub">All assumptions you can change. Outputs update live.</p>

            <div className="roi-field">
              <div className="label-row">
                <label>New funded traders / mo</label>
                <span className="val">{traders}</span>
              </div>
              <input
                type="range" min="50" max="2000" step="25" value={traders}
                onChange={(e) => setTraders(+e.target.value)}
                className="roi-slider"
              />
            </div>

            <div className="roi-field">
              <div className="label-row">
                <label>Avg challenge fee</label>
                <span className="val">${aov}</span>
              </div>
              <input
                type="range" min="49" max="599" step="10" value={aov}
                onChange={(e) => setAov(+e.target.value)}
                className="roi-slider"
              />
            </div>

            <div className="roi-field">
              <div className="label-row">
                <label>6-month pipeline lift</label>
                <span className="val">+{lift}%</span>
              </div>
              <input
                type="range" min="10" max="120" step="5" value={lift}
                onChange={(e) => setLift(+e.target.value)}
                className="roi-slider"
              />
            </div>

            <div className="roi-field">
              <div className="label-row">
                <label>Tier</label>
                <span className="val">{TIERS.find((t) => t.id === tier).name}</span>
              </div>
              <div className="roi-tier-buttons">
                {TIERS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTier(t.id)}
                    className={'roi-tier-btn' + (tier === t.id ? ' active' : '')}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="roi-readout">
            <span className="label-tiny">Projected added MRR</span>
            <div className="big-num">
              <span className="accent">+{fmt(addedMRR)}</span>
            </div>
            <p className="big-sub">per month, by month 6 of engagement</p>

            <div className="roi-breakdown">
              <div className="roi-row">
                <span className="k">Current MRR</span>
                <span className="v">{fmt(currentMRR)}</span>
              </div>
              <div className="roi-row">
                <span className="k">Projected MRR</span>
                <span className="v">{fmt(liftedMRR)}</span>
              </div>
              <div className="roi-row">
                <span className="k">Contego retainer</span>
                <span className="v">– {fmt(tierCost)}</span>
              </div>
              <div className="roi-row total">
                <span className="k">Net new MRR after fees</span>
                <span className="v">{fmt(netMRR)}</span>
              </div>
              <div className="roi-row">
                <span className="k">ROI multiple</span>
                <span className="v">{roiX.toFixed(1)}×</span>
              </div>
              <div className="roi-row">
                <span className="k">Payback period</span>
                <span className="v">{paybackDays} days</span>
              </div>
            </div>

            <p className="roi-disclaimer">
              Model based on median 6-month results across 14 prop firms scaled in 2024–2026.
              Past performance does not guarantee future results. We back this with month-to-month terms.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
