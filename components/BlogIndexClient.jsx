'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { fadeUp, stagger, viewport } from './animations'

const BLOG_CATS = ['All', 'SEO', 'AI UGC', 'Social', 'Conversion', 'Strategy', 'Marketing Strategy', 'Prop Firm News']
const PAGE_SIZE = 9

// Thumbnail pattern variants cycling by index
const PATTERNS = ['pat-a', 'pat-b', 'pat-c', 'pat-d', 'pat-e', 'pat-f', 'pat-g', 'pat-h', 'pat-i']

function formatDate(dateStr) {
  if (!dateStr) return ''
  try {
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  } catch {
    return dateStr
  }
}

function FeaturedPost({ post, index }) {
  const pat = PATTERNS[index % PATTERNS.length]
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
    >
      <Link href={`/blog/${post.slug}`} className="blog-featured">
        <div className="featured-thumb">
          <span className="featured-badge"><span className="dot" />Featured</span>
          {post.featuredImage?.url ? (
            <img src={post.featuredImage.url} alt={post.featuredImage.alt || post.title} />
          ) : (
            <div className={`pat ${pat}`} />
          )}
        </div>
        <div className="featured-body">
          <div className="featured-meta">
            {post.category && <span className="tag">{post.category}</span>}
            {post.category && post.publishedAt && <span className="sep" />}
            {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
          </div>
          <h2>{post.title}</h2>
          {post.excerpt && <p>{post.excerpt}</p>}
          <div className="featured-author">
            <div className="av" />
            <div className="who">
              <b>{post.author || 'Contego Team'}</b>
            </div>
            <span className="arrow">Read article</span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function IndexCard({ post, patIndex }) {
  const pat = PATTERNS[patIndex % PATTERNS.length]
  return (
    <Link href={`/blog/${post.slug}`} className="idx-card">
      <div className="idx-thumb">
        <span className="tag-pill">{post.category || 'Article'}</span>
        {post.featuredImage?.url ? (
          <img src={post.featuredImage.url} alt={post.featuredImage.alt || post.title} />
        ) : (
          <div className={`pat ${pat}`} />
        )}
      </div>
      <div className="idx-body">
        <div className="idx-meta">
          {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
        </div>
        <h3>{post.title}</h3>
        {post.excerpt && <p>{post.excerpt}</p>}
        <div className="idx-foot">
          <div className="av" />
          <div className="who"><b>{post.author || 'Contego Team'}</b></div>
          <span className="read">Read</span>
        </div>
      </div>
    </Link>
  )
}

function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <section className="section section-tight">
      <div className="shell">
        <motion.div
          className="newsletter"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <div>
            <span className="eyebrow"><span className="dot" />Weekly dispatch</span>
            <h2 style={{ marginTop: 16 }}>
              The growth memo, in your inbox <span className="italic-accent">every Tuesday.</span>
            </h2>
            <p>One short briefing on what&apos;s working in prop-firm marketing — no fluff, no recycled threads, unsubscribe anytime.</p>
          </div>
          <div>
            {submitted ? (
              <p style={{ color: 'var(--green)', fontWeight: 600, fontSize: 15 }}>You&apos;re in. See you Tuesday.</p>
            ) : (
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="you@firm.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit">Subscribe →</button>
              </form>
            )}
            <div className="nl-meta">
              <span className="pip" />
              <span>11,240 operators read it. No spam, ever.</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function BlogIndexClient({ allPosts }) {
  const [active, setActive] = useState('All')
  const [query, setQuery] = useState('')
  const [visible, setVisible] = useState(PAGE_SIZE)

  // Only show categories that have posts
  const availableCats = useMemo(() => {
    const cats = new Set(allPosts.map((p) => p.category).filter(Boolean))
    return ['All', ...BLOG_CATS.slice(1).filter((c) => cats.has(c)), ...Array.from(cats).filter((c) => !BLOG_CATS.includes(c))]
  }, [allPosts])

  const counts = useMemo(() => {
    const c = { All: allPosts.length }
    for (const p of allPosts) if (p.category) c[p.category] = (c[p.category] || 0) + 1
    return c
  }, [allPosts])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return allPosts.filter((p) => {
      const catOk = active === 'All' || p.category === active
      if (!catOk) return false
      if (!q) return true
      return (
        p.title?.toLowerCase().includes(q) ||
        p.excerpt?.toLowerCase().includes(q) ||
        p.author?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
      )
    })
  }, [allPosts, active, query])

  const featured = allPosts[0]
  const isDefaultView = active === 'All' && !query.trim()
  const restPool = isDefaultView ? filtered.filter((p) => p._id !== featured?._id) : filtered
  const shown = restPool.slice(0, visible)
  const hasMore = shown.length < restPool.length

  useEffect(() => { setVisible(PAGE_SIZE) }, [active, query])

  return (
    <>
      {/* Hero */}
      <section className="blog-hero">
        <div className="shell">
          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <motion.span className="eyebrow" variants={fadeUp}><span className="dot" />Field notes</motion.span>
            <motion.h1 variants={fadeUp}>
              Playbooks from <span className="italic-accent">the front lines.</span>
            </motion.h1>
            <motion.p className="lead" variants={fadeUp}>
              Tactical writing on SEO, paid social, AI UGC, and landing-page copy — every piece written by an operator who shipped it.
            </motion.p>
            <motion.div className="blog-hero-stats" variants={fadeUp}>
              <span><b>{allPosts.length}</b> articles published</span>
              <span><b>4</b> active series</span>
              <span><b>11k</b> subscribers</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main index */}
      <section className="section" id="blog-index">
        <div className="shell">
          {/* Toolbar */}
          <div className="blog-toolbar">
            <div className="blog-cats">
              {availableCats.map((c) => (
                <button
                  key={c}
                  className={`blog-cat${active === c ? ' active' : ''}`}
                  onClick={() => setActive(c)}
                >
                  {c}
                  <span className="count">{counts[c] ?? 0}</span>
                </button>
              ))}
            </div>
            <div className="blog-search">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" />
              </svg>
              <input
                type="text"
                placeholder="Search articles…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Featured */}
          {isDefaultView && featured && <FeaturedPost post={featured} index={0} />}

          {/* Grid */}
          {shown.length === 0 ? (
            <div className="blog-empty">
              <div className="e-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" />
                </svg>
              </div>
              <h3>Nothing matches &ldquo;{query}&rdquo;.</h3>
              <p>Try a broader term, or clear the category filter.</p>
            </div>
          ) : (
            <motion.div
              className="blog-index"
              variants={stagger(0.07)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {shown.map((p, i) => (
                <motion.div key={p._id} variants={fadeUp}>
                  <IndexCard post={p} patIndex={i + 1} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {hasMore && (
            <div className="load-more-row">
              <button className="btn btn-ghost" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                Load more articles <span className="arrow">↓</span>
              </button>
            </div>
          )}
        </div>
      </section>

      <Newsletter />
    </>
  )
}
