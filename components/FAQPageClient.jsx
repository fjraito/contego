'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'

const FAQ_CATEGORIES = [
  {
    id: 'general',
    label: 'General',
    title: 'General Questions',
    items: [
      {
        q: 'What is Contego?',
        a: 'Contego is a specialist marketing agency for prop trading firms. We handle SEO, social media content, AI UGC video, and landing page copy — everything a prop firm needs to rank higher, build trust, and convert more traders.',
      },
      {
        q: 'Who is Contego for?',
        a: 'We work exclusively with prop trading firms and forex/CFD brokers. If you run a prop firm — whether you\'re pre-launch, growing, or scaling past 10,000 funded traders — we\'re built for you.',
      },
      {
        q: 'Why should a prop firm use a specialist agency instead of a general marketing agency?',
        a: 'General agencies don\'t understand challenge structures, drawdown rules, payout mechanics, or the compliance landscape. We do. That means faster onboarding, zero education overhead, and content that actually resonates with traders instead of embarrassing you in front of your audience.',
      },
      {
        q: 'What makes Contego different from other marketing agencies?',
        a: 'Three things: deep industry knowledge, content that\'s written for traders (not by people guessing what traders care about), and a focused service stack — SEO, social, AI UGC video, and copy. We don\'t try to do everything. We do the four things that move the needle for prop firms and we do them well.',
      },
      {
        q: 'Where is Contego based?',
        a: 'We\'re a remote-first team. Our clients are global — Europe, Southeast Asia, the Middle East, and North America. Time zones have never been an issue.',
      },
      {
        q: 'Do you work with brokers or only prop firms?',
        a: 'We work with forex and CFD brokers too, particularly those with prop-adjacent products or funded account offerings. If you\'re in that space, get in touch and we\'ll tell you whether we\'re a good fit.',
      },
      {
        q: 'How do I get started?',
        a: 'Book a 30-minute call. No deck. We\'ll ask about your firm, your current marketing, your goals, and your budget. From there we\'ll tell you exactly what we\'d recommend and whether it makes sense to work together.',
      },
    ],
  },
  {
    id: 'services',
    label: 'Services',
    title: 'Services',
    items: [
      {
        q: 'What services does Contego offer?',
        a: 'We offer four core services:\n• SEO and content (programmatic and editorial)\n• Social media content (copy, creative strategy, scheduling)\n• AI UGC video (trader-facing testimonial and explainer videos at scale)\n• Landing page copy (challenge pages, funded account pages, and conversion-focused product pages)',
      },
      {
        q: 'Do I need to use all four services?',
        a: 'No. Some clients come in for SEO only. Others want social media content and AI UGC video. The services work well together but they also stand alone. We\'ll tell you honestly which ones will give you the most leverage at your current stage.',
      },
      {
        q: 'Can you manage our paid ads?',
        a: 'Not as a core service, but paid social media buying is available as an add-on on our Growth and Dominate plans. We manage the creative strategy and execution. Minimum ad spend applies.',
      },
      {
        q: 'Do you handle influencer or creator partnerships?',
        a: 'Yes, as an add-on. We source, vet, and manage trading creators and influencers who have genuine audiences. We don\'t just send DMs to anyone with a chart in their bio.',
      },
      {
        q: 'Can you build our landing pages, not just write the copy?',
        a: 'The landing page system add-on includes design and build, not just copy. If you want a full page built from scratch — challenge page, funded account page, comparison page — that\'s covered.',
      },
      {
        q: 'Do you do PR or media coverage?',
        a: 'Yes, as an add-on. We have relationships with trading publications and finance media. We pitch, place, and manage coverage for firms that want earned media as part of their trust-building strategy.',
      },
      {
        q: 'Can you run an affiliate program for our prop firm?',
        a: 'Affiliate program operations is available as an add-on. We handle recruitment, onboarding, tracking setup, communication, and ongoing management. We don\'t just hand you a spreadsheet.',
      },
      {
        q: 'Do you work on one-off projects or retainers only?',
        a: 'Primarily retainers, because marketing compounds over time and one-off projects rarely move metrics. That said, we do take on defined-scope projects like a full landing page build or a content audit if it\'s the right fit.',
      },
      {
        q: 'What does a typical engagement look like in the first 90 days?',
        a: 'Month one: audit, strategy, and foundation (technical SEO fixes, content calendar, social framework, AI UGC script templates). Month two: production begins — articles go live, social posts publish, first video batch delivered. Month three: data review, iteration, and scaling what\'s working.',
      },
    ],
  },
  {
    id: 'seo',
    label: 'SEO',
    title: 'SEO for Prop Firms',
    items: [
      {
        q: 'What does SEO for a prop firm actually involve?',
        a: 'It involves three things: ranking your own site for high-intent queries (challenge comparisons, prop firm reviews, "best funded account" searches), building topical authority so Google treats you as a trusted source in the space, and making sure your technical foundation — speed, structure, internal links — doesn\'t hold your content back.',
      },
      {
        q: 'How do you compete with review sites and affiliates that dominate prop firm search results?',
        a: 'By building more comprehensive, more accurate, and more helpful content than they do — and by targeting queries they ignore or underserve. Affiliates optimise for commissions. We optimise for your brand. Those are different editorial strategies and they produce different results.',
      },
      {
        q: 'How long does SEO take to show results?',
        a: 'Honest answer: three to six months before you see meaningful organic traffic movement, six to twelve months before it becomes a real acquisition channel. Anyone promising rankings in 30 days is lying. We set targets based on keyword difficulty, your domain authority, and how competitive your specific niche is.',
      },
      {
        q: 'Do you do programmatic SEO?',
        a: 'Yes. For prop firms with multiple challenge tiers, account sizes, or country-specific offerings, programmatic SEO can generate hundreds of targeted landing pages from a structured data model. We\'ve done this for firms in highly competitive markets and it works when it\'s done right.',
      },
      {
        q: 'Do you handle technical SEO as well as content?',
        a: 'Yes. Content without a solid technical foundation is a wasted effort. We audit and fix core web vitals, site architecture, crawlability, schema markup, and internal linking as part of the SEO engagement.',
      },
    ],
  },
  {
    id: 'social',
    label: 'Social Media',
    title: 'Social Media Content',
    items: [
      {
        q: 'What platforms do you create content for?',
        a: 'Instagram, X (Twitter), TikTok, LinkedIn, and YouTube Shorts. We recommend prioritising based on where your target traders actually spend time and what aligns with your content format strengths.',
      },
      {
        q: 'Do you manage our social accounts or just create the content?',
        a: 'Both options are available depending on your plan. On the Growth plan, we produce and schedule. On the Dominate plan, we handle full community management including comment responses and DM monitoring.',
      },
      {
        q: 'What kind of social content do you produce for prop firms?',
        a: 'Educational content (explaining concepts, breaking down rules), social proof content (payout callouts, trader stories), product-focused content (challenge launches, new account tiers), and engagement-driven content (polls, opinions, market takes). We write all copy and brief the creatives.',
      },
      {
        q: 'Can you help us grow our following, not just post content?',
        a: 'Follower growth is a byproduct of consistent, relevant content — and we focus on the inputs that drive it. We don\'t run engagement pods or use growth hacks. Genuine audience growth takes time and it starts with content that traders actually want to see.',
      },
    ],
  },
  {
    id: 'ugc',
    label: 'AI UGC Video',
    title: 'AI UGC Video',
    items: [
      {
        q: 'What is AI UGC video and why does it matter for prop firms?',
        a: 'AI UGC (user-generated content) video uses synthetic or AI-assisted personas to produce trader testimonials, explainers, and social proof videos at scale — without scheduling real people, managing talent, or running production shoots. For prop firms, it\'s a way to build trust and demonstrate social proof faster and cheaper than traditional video.',
      },
      {
        q: 'Is AI UGC video compliant with advertising regulations?',
        a: 'We build compliance into the brief and script. All videos are clearly positioned as AI-generated where required by applicable regulations. We work with your compliance team or flag specific requirements if you\'re targeting regulated markets.',
      },
      {
        q: 'How many videos can you produce per month?',
        a: 'Volume depends on your plan. Essential includes up to 8 videos per month. Growth includes up to 20. Dominate is custom-scoped based on your campaign needs. We batch produce and deliver in weekly drops.',
      },
      {
        q: 'What languages can AI UGC videos be produced in?',
        a: 'English is standard. We can produce in Spanish, Arabic, Indonesian, Portuguese, and German with a lead time adjustment. If you\'re targeting a specific non-English market, let us know during onboarding.',
      },
      {
        q: 'Can we use the videos on paid social as well as organic?',
        a: 'Yes. We format each video for both organic and paid placement. Aspect ratios, hooks, and duration are optimised per platform. If you\'re running paid ads, coordinate with your media buyer on the brief so we align on the right call-to-action.',
      },
      {
        q: 'Do you write the scripts or do we supply them?',
        a: 'We write the scripts. You review and approve before production. If you have specific messages, offers, or claims you want included, tell us in the brief and we work them in.',
      },
    ],
  },
  {
    id: 'copy',
    label: 'Landing Page Copy',
    title: 'Landing Page Copy',
    items: [
      {
        q: 'What types of landing pages do you write copy for?',
        a: 'Challenge pages, funded account pages, comparison pages ("us vs competitor"), pricing pages, and lead capture pages. We also write homepage copy and service-specific pages if you\'re repositioning or launching a new product.',
      },
      {
        q: 'How do you approach conversion copy for prop firms?',
        a: 'We write for traders, not for a general audience. That means understanding what objections a trader has before buying a challenge, what they compare when they\'re deciding between firms, and what specific language — payout terms, drawdown rules, scaling structures — moves them to act.',
      },
      {
        q: 'Do you A/B test the copy you write?',
        a: 'We can advise on testing strategy and write multiple variants, but running the actual A/B tests requires your dev team or CRO tooling. We brief the test, write both variants, and help you interpret results.',
      },
      {
        q: 'How many rounds of revisions are included?',
        a: 'Two rounds of revisions are included with all copy deliverables. Additional rounds are available at our standard hourly rate. In practice, most copy lands close to final in the first draft because we front-load the brief.',
      },
    ],
  },
  {
    id: 'pricing',
    label: 'Pricing & Plans',
    title: 'Pricing and Plans',
    items: [
      {
        q: 'What are your pricing tiers?',
        a: 'We have three retainer tiers: Launch ($3,500/month), Scale ($8,500/month), and Dominate (custom pricing for high-volume or multi-brand firms). A quarterly billing option is available on all tiers at a 15% discount.',
      },
      {
        q: 'What\'s included in each tier?',
        a: 'Launch covers SEO foundations and basic content. Scale adds social media management, AI UGC video production, and landing page copy. Dominate covers everything in Scale plus priority support, expanded video volume, and custom strategy sessions. See the full comparison on the pricing page.',
      },
      {
        q: 'Are there any setup fees?',
        a: 'No setup fees. Your first invoice is your retainer. Onboarding (audit, strategy, account setup) is included in month one.',
      },
      {
        q: 'Can I upgrade or downgrade my plan?',
        a: 'Yes. You can move between tiers with 30 days\' notice. Upgrades take effect the following billing cycle. Downgrades take effect the cycle after the notice period ends.',
      },
      {
        q: 'What\'s your contract length?',
        a: 'Month-to-month with a 30-day cancellation notice. No lock-in. We keep clients because the results are there, not because of contract clauses. Quarterly billing requires a 90-day commitment.',
      },
    ],
  },
  {
    id: 'working',
    label: 'Working With Us',
    title: 'Working With Contego',
    items: [
      {
        q: 'What does the onboarding process look like?',
        a: 'After signing: a 90-minute strategy session, a full audit of your current SEO/social/site, and delivery of a 90-day roadmap within two weeks. We don\'t spend month one doing nothing. Production starts in week three at the latest.',
      },
      {
        q: 'Who will be working on our account?',
        a: 'A dedicated account lead who is your main point of contact, plus a specialist team covering SEO, copy, social, and video. You\'ll know who\'s on your account. You\'ll have their direct contact. No account manager roulette.',
      },
      {
        q: 'How do you communicate with clients?',
        a: 'Slack for day-to-day. Monthly video calls for strategy reviews. You\'ll get a shared dashboard showing content output, rankings, and engagement metrics updated weekly.',
      },
      {
        q: 'What do you need from us to get started?',
        a: 'Access to your website (read-only at minimum), your brand guidelines if they exist, access to your Google Search Console and Analytics, a brief on your current challenge products and pricing, and a clear picture of who your target trader is. The rest we can fill in from the audit.',
      },
      {
        q: 'How do approvals work for content?',
        a: 'All content goes through a review link before publishing. You have 48 hours to approve or request changes. If we don\'t hear back, we hold the content rather than publish without sign-off. You stay in control.',
      },
    ],
  },
  {
    id: 'results',
    label: 'Results',
    title: 'Results and Guarantees',
    items: [
      {
        q: 'Can you guarantee rankings or traffic numbers?',
        a: 'No. Anyone who guarantees specific Google rankings is either lying or planning to do something that will hurt your site long-term. We set realistic projections based on your domain authority, competition level, and content volume — and we show you exactly how we\'re tracking against them.',
      },
      {
        q: 'What results have other prop firms seen working with Contego?',
        a: 'Across our client base: average organic traffic increases of 3-5x in twelve months, measurable improvement in branded search volume, and landing pages that convert 30-60% better after copy rewrites. We can share specific case studies during the sales call.',
      },
      {
        q: 'How do you measure success?',
        a: 'For SEO: organic sessions, keyword rankings, and share of search in your target queries. For social: reach, engagement rate, and follower growth. For video: view rate, completion rate, and traffic from video. For copy: conversion rate changes on target pages. We agree on KPIs at the start of every engagement.',
      },
      {
        q: 'What happens if we\'re not seeing results after six months?',
        a: 'We have an honest conversation. We dig into what\'s working and what isn\'t, adjust the strategy, and set a new 90-day plan. If we genuinely can\'t identify a path to results in your specific situation, we\'ll say so rather than keep taking your money.',
      },
      {
        q: 'Do you have a performance-based pricing option?',
        a: 'Not as a standard offering. Performance-based arrangements introduce misaligned incentives (optimising for what\'s trackable rather than what\'s best for your brand). We prefer clear retainers with transparent KPIs and regular accountability reviews.',
      },
    ],
  },
  {
    id: 'trust',
    label: 'Trust & Compliance',
    title: 'Trust and Compliance',
    items: [
      {
        q: 'How do you handle compliance in your content?',
        a: 'Every piece of content we produce is reviewed against your jurisdiction\'s advertising standards before delivery. We flag anything that requires a disclaimer, avoid unsubstantiated profit claims, and brief AI UGC video scripts with compliance built in from the start. You review and approve before anything goes live.',
      },
      {
        q: 'Can you work with prop firms in regulated markets?',
        a: 'Yes. We have experience producing content for firms operating under FCA, ASIC, CySEC, and other regulatory frameworks. Our content team understands what claims require qualification and what\'s off-limits entirely. We\'re not compliance lawyers — we recommend you run final checks with your legal team.',
      },
      {
        q: 'How do you handle client data and confidentiality?',
        a: 'Everything shared during the engagement — your product data, financials, internal metrics, strategy documents — is treated as confidential. We sign NDAs on request. We don\'t reference clients publicly without explicit permission.',
      },
      {
        q: 'Have you worked with firms that were later found to be fraudulent or operating illegally?',
        a: 'We vet every client before onboarding. If a firm shows signs of operating as a scam or misrepresenting its products, we don\'t take them on. We\'ve turned down clients for this reason. Our reputation is tied to the firms we work with.',
      },
    ],
  },
  {
    id: 'competitors',
    label: 'Alternatives',
    title: 'Competitor and Alternative Questions',
    items: [
      {
        q: 'How does Contego compare to hiring an in-house marketing team?',
        a: 'An in-house team for SEO, social, video, and copy would cost $180,000-$280,000 per year in salaries alone — before tools, benefits, or management overhead. Contego gives you a specialist team at a fraction of that cost, with no hiring risk and no ramp-up time. The trade-off is that we\'re not embedded full-time in your organisation.',
      },
      {
        q: 'What about using freelancers instead of an agency?',
        a: 'Freelancers can work well for specific deliverables. The problem is coordination: four freelancers (SEO, copy, social, video) with no shared strategy and no accountability layer usually produces inconsistent output and slow execution. We function as a coordinated team with a single point of accountability.',
      },
      {
        q: 'Are there other agencies that do what Contego does?',
        a: 'There are general marketing agencies that work with financial services clients, and there are a small number of agencies that specialise in trading-adjacent industries. We\'re not aware of another agency focused specifically on prop firm marketing across SEO, social, AI UGC video, and copy with the depth of industry knowledge we have. If you find one, compare outputs — not decks.',
      },
    ],
  },
  {
    id: 'final',
    label: 'Final Questions',
    title: 'Final Questions',
    items: [
      {
        q: 'What if I\'m not ready to start yet but want to stay in touch?',
        a: 'That\'s fine. Follow us on LinkedIn or X, or subscribe to our newsletter. When you\'re ready to grow, we\'ll be here. There\'s no pressure to book a call before you\'re in a position to act on it.',
      },
      {
        q: 'What\'s the fastest way to see if Contego is right for us?',
        a: 'Book the 30-minute call. It\'s free, there\'s no sales pressure, and at the end of it you\'ll have a clear picture of what we\'d recommend and what it would cost. If it\'s not the right fit, we\'ll tell you honestly.',
      },
      {
        q: 'Can you sign an NDA before we discuss our business in more detail?',
        a: 'Yes. Send us your NDA before the call or use our standard template. We sign them routinely. Confidentiality is the default, not an exception.',
      },
    ],
  },
]

function highlight(text, query) {
  if (!query || query.length < 2) return text
  const safe = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const re = new RegExp(`(${safe})`, 'ig')
  const parts = String(text).split(re)
  return parts.map((p, i) =>
    re.test(p) ? <mark className="faq-hl" key={i}>{p}</mark> : <span key={i}>{p}</span>
  )
}

function renderAnswer(text, query) {
  const lines = text.split('\n')
  const out = []
  let bulletBuf = []
  const flushBullets = (key) => {
    if (bulletBuf.length) {
      out.push(
        <ul key={`u${key}`}>
          {bulletBuf.map((b, bi) => (
            <li key={bi}>{highlight(b.replace(/^•\s*/, ''), query)}</li>
          ))}
        </ul>
      )
      bulletBuf = []
    }
  }
  lines.forEach((ln, i) => {
    if (/^•\s/.test(ln)) {
      bulletBuf.push(ln)
    } else if (ln.trim() === '') {
      flushBullets(i)
    } else {
      flushBullets(i)
      out.push(
        <p key={`p${i}`} style={{ margin: i === 0 ? '0' : '10px 0 0' }}>
          {highlight(ln, query)}
        </p>
      )
    }
  })
  flushBullets('end')
  return <>{out}</>
}

function FaqHero({ query, setQuery, matchCount, totalCount }) {
  return (
    <section className="faq-hero">
      <div className="shell">
        <div className="crumbs">
          <a href="/">Home</a>
          <span className="sep">/</span>
          <span>FAQ</span>
        </div>
        <span className="pill">
          <span className="dot" />
          {totalCount} questions, answered
        </span>
        <h1 style={{ marginTop: 22 }}>
          Frequently asked<br />
          <span className="italic-accent">questions.</span>
        </h1>
        <p className="lead">
          Everything you need to know about Contego — a prop firm marketing agency focused on SEO,
          social media, AI UGC video, and landing page copy.
        </p>

        <div className="faq-search">
          <span className="faq-search-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search rules, payouts, AI UGC, pricing…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button className="faq-search-clear" onClick={() => setQuery('')} aria-label="Clear search">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {query && (
          <div className="faq-result-count">
            {matchCount > 0 ? (
              <>Showing <strong>{matchCount}</strong> of {totalCount} questions matching &ldquo;{query}&rdquo;</>
            ) : (
              <>No matches for &ldquo;<strong>{query}</strong>&rdquo; — try a different keyword.</>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

function FaqSidebar({ categories, activeId, onJump }) {
  return (
    <aside className="faq-side">
      <div className="faq-side-label">Categories</div>
      <ul className="faq-nav">
        {categories.map((cat) => (
          <li key={cat.id}>
            <a
              href={`#fcat-${cat.id}`}
              className={activeId === cat.id ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); onJump(cat.id) }}
            >
              <span>{cat.label}</span>
              <span className="count">{cat._visibleCount ?? cat.items.length}</span>
            </a>
          </li>
        ))}
      </ul>
      <div className="faq-side-foot">
        <h4>Still curious?</h4>
        <p>If your question isn&rsquo;t here, ask the team directly — we usually reply same-day.</p>
        <a href="#cta">Email us <span style={{ marginLeft: 2 }}>→</span></a>
      </div>
    </aside>
  )
}

function FaqContent({ filteredCats, query }) {
  if (filteredCats.length === 0) {
    return (
      <div className="faq-content">
        <div className="faq-empty">
          <div className="faq-empty-big">No questions match that yet.</div>
          <p>Try a broader keyword like &ldquo;SEO&rdquo;, &ldquo;AI UGC&rdquo;, &ldquo;payouts&rdquo;, or &ldquo;pricing&rdquo; — or ask us directly.</p>
          <a href="#cta" className="btn btn-ghost">Ask the team <span className="arrow">→</span></a>
        </div>
      </div>
    )
  }
  return (
    <div className="faq-content">
      {filteredCats.map((cat, ci) => (
        <section key={cat.id} id={`fcat-${cat.id}`} className="faq-cat">
          <div className="faq-cat-head">
            <div className="faq-cat-head-left">
              <span className="faq-ix">{String(ci + 1).padStart(2, '0')}</span>
              <h2>{cat.title}</h2>
            </div>
            <span className="faq-total">{cat.items.length} question{cat.items.length === 1 ? '' : 's'}</span>
          </div>
          <div className="faq-list">
            {cat.items.map((it, ii) => (
              <details key={ii} className="faq-q" open={!!(query && query.length >= 2)}>
                <summary>
                  <span>{highlight(it.q, query)}</span>
                  <span className="faq-plus">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <div className="faq-answer">{renderAnswer(it.a, query)}</div>
              </details>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

function FaqHelper() {
  const cards = [
    {
      tag: 'Services',
      title: 'See what we actually ship.',
      desc: 'A breakdown of SEO, social, AI UGC video, and landing page copy.',
      href: '/#services',
    },
    {
      tag: 'Pricing',
      title: 'Pick the right plan.',
      desc: 'Essential, Growth, and Custom — compare what each tier includes.',
      href: '/pricing',
    },
    {
      tag: 'Talk to us',
      title: 'Got a question we missed?',
      desc: 'A 30-minute call. No deck. We\'ll tell you what we\'d do in your seat.',
      href: '#cta',
    },
  ]
  return (
    <div className="faq-helper">
      {cards.map((c, i) => (
        <a key={i} href={c.href} className="faq-helper-card">
          <span className="faq-helper-tag">{c.tag}</span>
          <h3>{c.title}</h3>
          <p>{c.desc}</p>
          <span>Open</span>
        </a>
      ))}
    </div>
  )
}

export function FAQPageClient() {
  const [query, setQuery] = useState('')
  const [activeId, setActiveId] = useState(FAQ_CATEGORIES[0].id)

  const { filteredCats, matchCount, totalCount } = useMemo(() => {
    const total = FAQ_CATEGORIES.reduce((n, c) => n + c.items.length, 0)
    const q = query.trim().toLowerCase()
    if (!q || q.length < 2) {
      return {
        filteredCats: FAQ_CATEGORIES.map((c) => ({ ...c, _visibleCount: c.items.length })),
        matchCount: total,
        totalCount: total,
      }
    }
    let count = 0
    const fc = FAQ_CATEGORIES.map((c) => {
      const items = c.items.filter(
        (it) => it.q.toLowerCase().includes(q) || it.a.toLowerCase().includes(q)
      )
      count += items.length
      return { ...c, items, _visibleCount: items.length }
    }).filter((c) => c.items.length > 0)
    return { filteredCats: fc, matchCount: count, totalCount: total }
  }, [query])

  useEffect(() => {
    const handler = () => {
      const ids = filteredCats.map((c) => c.id)
      let current = ids[0]
      const offset = 140
      for (const id of ids) {
        const el = document.getElementById(`fcat-${id}`)
        if (!el) continue
        if (el.getBoundingClientRect().top - offset <= 0) current = id
      }
      setActiveId(current)
    }
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [filteredCats])

  const handleJump = useCallback((id) => {
    const el = document.getElementById(`fcat-${id}`)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - 100
    window.scrollTo({ top: y, behavior: 'smooth' })
    setActiveId(id)
  }, [])

  const activeQuery = query.trim().length >= 2 ? query.trim() : ''

  return (
    <>
      <FaqHero
        query={query}
        setQuery={setQuery}
        matchCount={matchCount}
        totalCount={totalCount}
      />
      <section className="shell faq-body">
        <div className="faq-layout">
          <FaqSidebar
            categories={filteredCats}
            activeId={activeId}
            onJump={handleJump}
          />
          <FaqContent filteredCats={filteredCats} query={activeQuery} />
        </div>
        <FaqHelper />
      </section>
    </>
  )
}
