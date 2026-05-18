'use client'

import { useState, useEffect } from 'react'

export default function FirmReviewClient({ items }) {
  const [active, setActive] = useState(items[0]?.id)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-120px 0px -70% 0px', threshold: [0, 1] }
    )
    items.forEach(it => {
      const el = document.getElementById(it.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [items])

  const scrollTo = (e, id) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
  }

  return (
    <nav className="fr-anchor">
      <div className="shell">
        <div className="fr-anchor-inner">
          {items.map(it => (
            <a
              key={it.id}
              href={`#${it.id}`}
              className={active === it.id ? 'active' : ''}
              onClick={(e) => scrollTo(e, it.id)}
            >
              {it.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
