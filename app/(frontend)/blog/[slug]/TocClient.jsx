'use client'
import { useState, useEffect } from 'react'

export function TocClient({ headings }) {
  const [active, setActive] = useState(headings[0]?.id ?? '')

  useEffect(() => {
    if (!headings.length) return
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-100px 0px -65% 0px', threshold: [0, 1] }
    )
    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [headings])

  return (
    <nav>
      <ol className="toc-list">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={[active === h.id ? 'active' : '', h.tag === 'h3' ? 'indent' : 'h2-link'].filter(Boolean).join(' ') || undefined}
              onClick={(e) => {
                e.preventDefault()
                const el = document.getElementById(h.id)
                if (el) window.scrollTo({ top: el.offsetTop - 90, behavior: 'smooth' })
              }}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
