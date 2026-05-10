const LOGOS = [
  { name: 'FundedNext', icon: 'rect' },
  { name: 'Maven Capital', icon: 'tri' },
  { name: 'PropElite', icon: 'circle' },
  { name: 'Apex Quant', icon: 'path' },
  { name: 'Forge Markets', icon: 'bars' },
  { name: 'Atlas Trading', icon: 'wave' },
  { name: 'Northwind FX', icon: 'n' },
  { name: 'Ember Prop', icon: 'flame' },
]

function LogoIcon({ icon }) {
  const s = { stroke: 'currentColor', strokeWidth: '2.5', strokeLinecap: 'round', fill: 'none' }
  if (icon === 'rect') return <svg viewBox="0 0 28 28" width="22" height="22"><rect x="3" y="3" width="22" height="22" rx="5" fill="currentColor" opacity=".9"/><rect x="9" y="9" width="10" height="10" rx="2" fill="var(--bg)"/></svg>
  if (icon === 'tri') return <svg viewBox="0 0 28 28" width="22" height="22"><polygon points="14,3 25,25 3,25" fill="currentColor" opacity=".9"/><polygon points="14,10 21,25 7,25" fill="var(--bg)"/></svg>
  if (icon === 'circle') return <svg viewBox="0 0 28 28" width="22" height="22"><circle cx="14" cy="14" r="11" fill="currentColor" opacity=".9"/><circle cx="14" cy="14" r="5.5" fill="var(--bg)"/></svg>
  if (icon === 'path') return <svg viewBox="0 0 28 28" width="22" height="22"><path d="M4 24 L14 4 L24 24 M7 18 H21" {...s}/></svg>
  if (icon === 'bars') return <svg viewBox="0 0 28 28" width="22" height="22"><rect x="4" y="5" width="20" height="4" rx="2" fill="currentColor"/><rect x="4" y="12" width="14" height="4" rx="2" fill="currentColor" opacity=".7"/><rect x="4" y="19" width="18" height="4" rx="2" fill="currentColor" opacity=".5"/></svg>
  if (icon === 'wave') return <svg viewBox="0 0 28 28" width="22" height="22"><path d="M4 22 C4 22 8 6 14 6 C20 6 24 22 24 22" {...s}/></svg>
  if (icon === 'n') return <svg viewBox="0 0 28 28" width="22" height="22"><path d="M5 24 L5 4 L23 24 L23 4" {...s}/></svg>
  if (icon === 'flame') return <svg viewBox="0 0 28 28" width="22" height="22"><path d="M14 4 C14 4 22 10 22 17 C22 21.4 18.4 25 14 25 C9.6 25 6 21.4 6 17 C6 14 8 12 10 14 C12 16 12 19 14 19" {...s}/></svg>
  return null
}

export function ClientMarquee() {
  const list = [...LOGOS, ...LOGOS]
  return (
    <section className="logos-section" data-anim>
      <p className="logos-label">Trusted by 14+ prop firms scaling worldwide</p>
      <div className="logos-marquee">
        <div className="logos-track">
          {list.map((l, i) => (
            <span className="logo-item" key={i} aria-label={l.name}>
              <LogoIcon icon={l.icon} />
              <span className="logo-name">{l.name}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
