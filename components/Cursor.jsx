'use client'
import { useEffect, useRef } from 'react'

export function Cursor() {
  const dotRef = useRef(null)

  useEffect(() => {
    let x = 0, y = 0, cx = 0, cy = 0, raf

    const move = (e) => { x = e.clientX; y = e.clientY }

    const tick = () => {
      cx += (x - cx) * 0.14
      cy += (y - cy) * 0.14
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${cx}px, ${cy}px)`
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', move)
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <div className="cur-dot" ref={dotRef} />
}
