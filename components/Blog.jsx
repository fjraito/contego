'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { fadeUp, scaleUp, stagger, viewport } from './animations'

const FALLBACK_POSTS = [
  {
    slug: 'best-prop-firm-marketing-companies',
    category: 'Marketing Strategy',
    publishedAt: '2026-05-15T00:00:00.000Z',
    featuredImage: { url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=720&q=80&fit=crop&h=405', alt: '' },
    title: 'Why programmatic SEO is the unfair advantage in prop trading.',
    excerpt: 'A teardown of how the top 3 prop firms scaled from 0 to 90k organic visits in 11 months.',
  },
  {
    slug: 'best-prop-firms-for-forex-eas',
    category: 'Prop Firm News',
    publishedAt: '2026-05-10T00:00:00.000Z',
    featuredImage: { url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=720&q=80&fit=crop&h=405', alt: '' },
    title: 'The 50-hook framework: testing creative at scale without 50 creators.',
    excerpt: 'Our exact prompt-and-review system for AI-generated UGC that passes ad approval.',
  },
  {
    slug: 'the-2026-prop-firm-seo-playbook',
    category: 'SEO',
    publishedAt: '2026-04-28T00:00:00.000Z',
    featuredImage: { url: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=720&q=80&fit=crop&h=405', alt: '' },
    title: 'TikTok vs YouTube Shorts for funded-trader acquisition in 2026.',
    excerpt: 'Channel benchmarks, watch-time data, and where the cheapest prop firm signups actually come from.',
  },
]

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export function Blog({ posts }) {
  const items = posts?.length ? posts.slice(0, 3) : FALLBACK_POSTS

  return (
    <section className="section" id="blog">
      <div className="shell">
        <motion.div
          className="section-head"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <motion.span className="eyebrow" variants={fadeUp}><span className="dot" />Blog</motion.span>
          <motion.h2 variants={fadeUp}>Practical insights for growing a prop firm with trust.</motion.h2>
          <motion.p className="desc" variants={fadeUp}>Explore ideas that help prop firms improve visibility, explain their offer better, and build more credibility with serious traders.</motion.p>
        </motion.div>

        <motion.div
          className="blog"
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {items.map((p, i) => (
            <motion.div key={p.slug || i} variants={scaleUp}>
              <Link
                href={`/blog/${p.slug}`}
                className="blog-card"
              >
                <motion.div
                  whileHover={{ y: -5, transition: { duration: 0.22 } }}
                >
                  <div className="blog-thumb">
                    <img src={p.featuredImage?.url || ''} alt={p.featuredImage?.alt || p.title} />
                  </div>
                  <div className="blog-body">
                    <div className="blog-meta">
                      <span className="tag">{p.category}</span>
                      <span>{formatDate(p.publishedAt)}</span>
                    </div>
                    <h3>{p.title}</h3>
                    <p>{p.excerpt}</p>
                    <span className="read">Read article</span>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
