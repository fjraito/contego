'use client'

/* ── SEO Visualization ── */
function VizSEO() {
  const pts = [10, 22, 18, 34, 30, 48, 55, 62, 70, 80, 95, 118, 140, 168, 200]
  const max = Math.max(...pts)
  const w = 400
  const h = 200
  const pad = 4
  const coords = pts.map((v, i) => {
    const x = pad + (i / (pts.length - 1)) * (w - pad * 2)
    const y = h - pad - (v / max) * (h - pad * 2)
    return [x, y]
  })
  const line = coords.map((c, i) => `${i === 0 ? 'M' : 'L'}${c[0]},${c[1]}`).join(' ')
  const area = `${line} L${coords[coords.length - 1][0]},${h} L${coords[0][0]},${h} Z`

  const kws = [
    { kw: 'best prop firm 2026', rank: 3, delta: 18 },
    { kw: 'apex trader funding review', rank: 1, delta: 42 },
    { kw: 'ftmo vs myfundedfx', rank: 4, delta: 12 },
    { kw: '$200k evaluation challenge', rank: 7, delta: 5 },
    { kw: 'prop firm payout proof', rank: 2, delta: 24 },
  ]

  return (
    <div className="viz-seo">
      <div className="panel">
        <div className="panel-title">
          <span>Organic traffic (last 12 mo)</span>
          <span className="pip">+1,840%</span>
        </div>
        <div className="chart">
          <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
            <defs>
              <linearGradient id="seo-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--green)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="var(--green)" stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <path d={area} fill="url(#seo-fill)" />
            <path d={line} fill="none" stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="axis">
            <span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span>
          </div>
        </div>
      </div>
      <div className="panel">
        <div className="panel-title">
          <span>Rank tracker</span>
          <span className="pip">Live</span>
        </div>
        {kws.map((k) => (
          <div className="kw-row" key={k.kw}>
            <span className="kw">{k.kw}</span>
            <span className="rank">#{k.rank}</span>
            <span className="delta">+{k.delta}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Social Visualization ── */
function VizSocial() {
  const posts = [
    { cls: 'a', plat: 'IG', views: '12.4k' },
    { cls: 'b', plat: 'X', views: '8.1k' },
    { cls: 'c', plat: 'TT', views: '34.2k' },
    { cls: 'd', plat: 'YT', views: '5.6k' },
    { cls: 'e', plat: 'IG', views: '19.8k' },
    { cls: 'f', plat: 'TT', views: '41.0k' },
  ]
  const queue = [
    { live: true, t: 'Payout proof carousel', when: 'Live' },
    { live: true, t: 'Challenge breakdown reel', when: '2h ago' },
    { live: false, t: 'Founder Q&A thread', when: '3:00 PM' },
    { live: false, t: 'Weekly performance recap', when: '5:00 PM' },
    { live: false, t: 'New evaluation rules post', when: 'Tomorrow' },
  ]

  return (
    <div className="viz-social">
      <div className="feed">
        {posts.map((p, i) => (
          <div className="post" key={i}>
            <div className={`post-img ${p.cls}`} />
            <div className="post-meta">
              <span className="plat">{p.plat}</span>
              <span>{p.views}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="queue">
        <h4>Today&apos;s queue</h4>
        {queue.map((q, i) => (
          <div className="qrow" key={i}>
            <span className={`qdot ${q.live ? 'live' : 'scheduled'}`} />
            <span className="t">{q.t}</span>
            <span className="when">{q.when}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── UGC Visualization ── */
function VizUGC() {
  const retired = [
    { cls: 'v1', hook: 'Hook #12', cap: 'I failed 3 challenges before this one worked' },
    { cls: 'v2', hook: 'Hook #08', cap: 'The payout rule nobody talks about' },
  ]
  const scaling = [
    { cls: 'v3', hook: 'Hook #34', cap: 'How I passed a $200k challenge in 4 days' },
  ]
  const testing = [
    { cls: 'v4', hook: 'Hook #41', cap: 'This prop firm just changed everything' },
    { cls: 'v5', hook: 'Hook #45', cap: 'Stop buying challenges until you read this' },
  ]

  return (
    <div className="viz-ugc">
      <div className="v-col">
        {retired.map((v, i) => (
          <div className={`vid dim ${v.cls}`} key={i}>
            <span className="hook-tag">{v.hook}</span>
            <span className="caption">{v.cap}</span>
          </div>
        ))}
        <span className="label">Retired</span>
      </div>
      <div className="v-col">
        {scaling.map((v, i) => (
          <div className={`vid featured ${v.cls}`} key={i}>
            <span className="hook-tag">{v.hook}</span>
            <span className="caption">{v.cap}</span>
          </div>
        ))}
        <span className="label">Scaling</span>
      </div>
      <div className="v-col">
        {testing.map((v, i) => (
          <div className={`vid dim ${v.cls}`} key={i}>
            <span className="hook-tag">{v.hook}</span>
            <span className="caption">{v.cap}</span>
          </div>
        ))}
        <span className="label">Testing</span>
      </div>
    </div>
  )
}

/* ── Wrapper ── */
const vizMap = { seo: VizSEO, social: VizSocial, ugc: VizUGC }

export function ServiceViz({ slug }) {
  const Comp = vizMap[slug]
  if (!Comp) return null
  return (
    <div className="svc-viz">
      <div className="svc-viz-inner">
        <Comp />
      </div>
    </div>
  )
}
