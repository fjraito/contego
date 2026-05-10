'use client'

import { motion } from 'framer-motion'
import { fadeUp, scaleUp, stagger, viewport } from './animations'

const posts = [
  {
    num: '01',
    tag: 'SEO',
    date: 'Apr 2026',
    img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=720&q=80&fit=crop&h=405',
    t: 'Why programmatic SEO is the unfair advantage in prop trading.',
    d: 'A teardown of how the top 3 prop firms scaled from 0 to 90k organic visits in 11 months.',
  },
  {
    num: '02',
    tag: 'AI UGC',
    date: 'Apr 2026',
    img: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=720&q=80&fit=crop&h=405',
    t: 'The 50-hook framework: testing creative at scale without 50 creators.',
    d: 'Our exact prompt-and-review system for AI-generated UGC that passes ad approval.',
  },
  {
    num: '03',
    tag: 'Social',
    date: 'Mar 2026',
    img: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=720&q=80&fit=crop&h=405',
    t: 'TikTok vs YouTube Shorts for funded-trader acquisition in 2026.',
    d: 'Channel benchmarks, watch-time data, and where the cheapest prop firm signups actually come from.',
  },
]

export function Blog() {
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
          <motion.h2 variants={fadeUp}>Practical insights for growing<br />a prop firm with trust.</motion.h2>
          <motion.p className="desc" variants={fadeUp}>Explore ideas that help prop firms improve visibility, explain their offer better, and build more credibility with serious traders.</motion.p>
        </motion.div>

        <motion.div
          className="blog"
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {posts.map((p, i) => (
            <motion.a
              href="#"
              className="blog-card"
              key={i}
              variants={scaleUp}
              whileHover={{ y: -5, transition: { duration: 0.22 } }}
            >
              <div className="blog-thumb">
                <img src={p.img} alt={p.t} />
              </div>
              <div className="blog-body">
                <div className="blog-meta">
                  <span className="tag">{p.tag}</span>
                  <span>{p.date}</span>
                </div>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
                <span className="read">Read article</span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
