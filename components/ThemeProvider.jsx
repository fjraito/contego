'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext({
  theme: 'dark',
  setTheme: () => {},
  accent: '#4ade80',
  setAccent: () => {},
})

export function useTheme() {
  return useContext(ThemeContext)
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark')
  const [accent, setAccent] = useState('#4ade80')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.style.setProperty('--green', accent)
    document.documentElement.style.setProperty('--green-glow', accent)
  }, [accent])

  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })

    const observe = () => {
      document.querySelectorAll('[data-anim]').forEach((el) => observer.observe(el))
    }
    observe()
    const tid = setTimeout(observe, 300)
    return () => { clearTimeout(tid); observer.disconnect() }
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, accent, setAccent }}>
      {children}
    </ThemeContext.Provider>
  )
}
