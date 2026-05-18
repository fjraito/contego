'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { fadeUp, viewport } from '@/components/animations'
import { PROP_FIRMS, CATEGORIES, SORT_OPTIONS } from './data'

function fundingNumeric(s) {
  const m = (s || '').match(/([\d.]+)\s*([KM])/i)
  if (!m) return 0
  const n = parseFloat(m[1])
  return m[2].toUpperCase() === 'M' ? n * 1000 : n
}

function FullStar() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.9 6.95L22 9.99l-5.5 4.78L18.2 22 12 18.27 5.8 22l1.7-7.23L2 9.99l7.1-1.04L12 2z" />
    </svg>
  )
}

const MEDAL_META = {
  1: { cls: 'gold', label: 'Gold medal — ranked #1' },
  2: { cls: 'silver', label: 'Silver medal — ranked #2' },
  3: { cls: 'bronze', label: 'Bronze medal — ranked #3' },
}

function Medal({ rank }) {
  const m = MEDAL_META[rank]
  if (!m) return null
  return (
    <span className={`pf-medal ${m.cls}`} title={m.label} aria-label={m.label}>
      <svg width="34" height="44" viewBox="0 0 34 44" fill="none" aria-hidden="true">
        <path className="ribbon-l" d="M8 1 L1 22 L10 22 L17 8 Z" />
        <path className="ribbon-r" d="M26 1 L33 22 L24 22 L17 8 Z" />
        <circle className="disc-outer" cx="17" cy="30" r="12" />
        <circle className="disc-inner" cx="17" cy="30" r="9" />
        <text className="rank-num" x="17" y="30" textAnchor="middle" dominantBaseline="central">{rank}</text>
      </svg>
    </span>
  )
}

function FirmCard({ firm, showPromo }) {
  const isTop3 = firm.rank <= 3
  return (
    <article className={`pf-card ${firm.editorPick ? 'editor-pick' : ''} r-${firm.rank}`}>
      <div className="pf-rank">
        {isTop3 ? <Medal rank={firm.rank} /> : firm.rank}
      </div>

      <div className="pf-logo"><span className="mono">{firm.initials}</span></div>

      <div className="pf-info">
        <div className="name-row">
          <h3>{firm.name}</h3>
          <span className="rating-inline">
            <span className="star"><FullStar /></span>
            {firm.rating.toFixed(1)}
            <span className="reviews">({firm.reviews.toLocaleString()})</span>
          </span>
        </div>
        <div className="tags">
          {firm.tags.slice(0, 4).map(t => <span className="tag-pill" key={t}>{t}</span>)}
        </div>
      </div>

      <div className="pf-stats">
        <div className="pf-stat">
          <div className="l">Funding</div>
          <div className="v"><span className="accent">{firm.stats.funding}</span></div>
        </div>
        <div className="pf-stat">
          <div className="l">Split</div>
          <div className="v">{firm.stats.split}</div>
        </div>
        <div className="pf-stat">
          <div className="l">Fee</div>
          <div className="v">{firm.stats.fee}</div>
        </div>
        <div className="pf-stat">
          <div className="l">Payout</div>
          <div className="v">{firm.stats.payout}</div>
        </div>
      </div>

      <div className="pf-actions">
        <Link href={`/prop-firms/${firm.slug}`} className="btn btn-ghost">Read review</Link>
        <a href="#" className="btn btn-primary" target="_blank" rel="nofollow noopener noreferrer">
          Visit site <span className="arrow">↗</span>
        </a>
      </div>

      {showPromo && firm.promo && (
        <div className="pf-promo">
          <span className="badge">Offer</span>
          <span>{firm.promo.text}</span>
          <span className="code">{firm.promo.code}</span>
        </div>
      )}
    </article>
  )
}

function SearchBar({ value, onChange }) {
  const inputRef = useRef(null)
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  return (
    <div className="pf-search">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search prop firms — by name, asset class, or feature..."
        aria-label="Search prop firms"
      />
      <span className="ic-search">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </span>
      {value ? (
        <button className="clear" onClick={() => onChange('')} aria-label="Clear search">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        </button>
      ) : (
        <span className="kbd">&#8984;K</span>
      )}
    </div>
  )
}

function Toolbar({ category, setCategory, sort, setSort }) {
  const counts = useMemo(() => {
    const c = { all: PROP_FIRMS.length }
    CATEGORIES.filter(x => x.id !== 'all').forEach(cat => {
      c[cat.id] = PROP_FIRMS.filter(f => f.tags.some(t => t.toLowerCase().includes(cat.id.toLowerCase()))).length
    })
    return c
  }, [])

  return (
    <div className="pf-toolbar">
      <div className="pf-chips">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={`pf-chip ${category === cat.id ? 'active' : ''}`}
            onClick={() => setCategory(cat.id)}
          >
            {cat.label}
            <span className="count">{counts[cat.id] || 0}</span>
          </button>
        ))}
      </div>
      <div className="pf-sort">
        <span>Sort by</span>
        <select value={sort} onChange={e => setSort(e.target.value)}>
          {SORT_OPTIONS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
        </select>
      </div>
    </div>
  )
}

function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null
  const pages = []
  pages.push(1)
  if (page > 3) pages.push('...')
  for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i)
  if (page < totalPages - 2) pages.push('...')
  if (totalPages > 1) pages.push(totalPages)

  return (
    <nav className="pf-pagination" aria-label="Pagination">
      <button className="pf-pg-btn" onClick={() => onChange(page - 1)} disabled={page === 1} aria-label="Previous page">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        Prev
      </button>
      <ul>
        {pages.map((p, i) => (
          <li key={i}>
            {p === '...' ? (
              <span className="pf-pg-ell">…</span>
            ) : (
              <button
                className={`pf-pg-num ${p === page ? 'active' : ''}`}
                onClick={() => onChange(p)}
                aria-current={p === page ? 'page' : undefined}
              >
                {p}
              </button>
            )}
          </li>
        ))}
      </ul>
      <button className="pf-pg-btn" onClick={() => onChange(page + 1)} disabled={page === totalPages} aria-label="Next page">
        Next
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
      </button>
    </nav>
  )
}

function Methodology() {
  const criteria = [
    { t: 'Capital terms', d: 'Max funding, profit split, scaling plan, and total firm-side risk capital.' },
    { t: 'Trader rules', d: 'Drawdown limits, consistency rules, time limits, EA + news-trading permissions.' },
    { t: 'Payout reliability', d: 'On-time payout history, dispute volume, and time-to-first-payout from pass.' },
    { t: 'Operational maturity', d: 'Years operating, regulatory posture, support response time, dashboard quality.' },
    { t: 'Cost to start', d: 'Lowest eval fee, free-retry policy, and effective cost-per-funded-trader.' },
    { t: 'Trader sentiment', d: 'Aggregated review score weighted by volume and verified-payout proof.' },
  ]
  return (
    <div className="pf-method">
      <div>
        <div className="label">Methodology</div>
        <h3>How we rank.</h3>
        <p>
          Rankings combine six weighted criteria, refreshed quarterly. We don&apos;t take payment to move
          a firm up the list — affiliate links may appear on outbound visits, but they don&apos;t influence order.
        </p>
        <p style={{ fontSize: 13, color: 'var(--text-3)' }}>
          Last updated <strong style={{ color: 'var(--text-2)' }}>May 2026</strong> · Reviewed by 3 editors
        </p>
      </div>
      <div className="crit">
        {criteria.map((c, i) => (
          <div className="crit-item" key={i}>
            <span className="ic">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <strong>{c.t}</strong>
              {c.d}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PropFirmsClient() {
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('rank')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 10

  const filtered = useMemo(() => {
    let list = PROP_FIRMS
    if (category !== 'all') {
      list = list.filter(f => f.tags.some(tag => tag.toLowerCase().includes(category.toLowerCase())))
    }
    const q = query.trim().toLowerCase()
    if (q) {
      list = list.filter(f =>
        f.name.toLowerCase().includes(q) ||
        f.tagline.toLowerCase().includes(q) ||
        f.tags.some(tag => tag.toLowerCase().includes(q)) ||
        f.domain.toLowerCase().includes(q)
      )
    }
    const sorted = [...list]
    if (sort === 'rank') sorted.sort((a, b) => a.rank - b.rank)
    if (sort === 'rating') sorted.sort((a, b) => b.rating - a.rating)
    if (sort === 'reviews') sorted.sort((a, b) => b.reviews - a.reviews)
    if (sort === 'funding') sorted.sort((a, b) => fundingNumeric(b.stats.funding) - fundingNumeric(a.stats.funding))
    return sorted
  }, [category, sort, query])

  useEffect(() => { setPage(1) }, [category, sort, query])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const startIdx = (safePage - 1) * PAGE_SIZE
  const pageItems = filtered.slice(startIdx, startIdx + PAGE_SIZE)

  return (
    <section className="section-tight" style={{ paddingTop: 0 }}>
      <div className="shell">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
          <SearchBar value={query} onChange={setQuery} />
          <Toolbar category={category} setCategory={setCategory} sort={sort} setSort={setSort} />

          <div className="pf-result-meta">
            <span>
              Showing <strong>{filtered.length === 0 ? 0 : startIdx + 1}–{Math.min(filtered.length, startIdx + PAGE_SIZE)}</strong> of <strong>{filtered.length}</strong> firms
              {query ? <> matching {'“'}<strong>{query}</strong>{'"'}</> : null}
              {category !== 'all' ? <> · <strong>{CATEGORIES.find(c => c.id === category)?.label}</strong></> : null}
            </span>
            <span>Updated May 2026</span>
          </div>

          <div className="pf-list">
            {pageItems.map(f => (
              <FirmCard key={f.id} firm={f} showPromo />
            ))}
            {filtered.length === 0 && (
              <div style={{ padding: '60px 24px', textAlign: 'center', color: 'var(--text-3)', border: '1px dashed var(--border)', borderRadius: 14 }}>
                No firms match this filter. Try a different category.
              </div>
            )}
          </div>

          <Pagination page={safePage} totalPages={totalPages} onChange={setPage} />
          <Methodology />
        </motion.div>
      </div>
    </section>
  )
}
