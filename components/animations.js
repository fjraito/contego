export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export const scaleUp = {
  hidden: { opacity: 0, scale: 0.94, y: 20 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

export const stagger = (delay = 0.08) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: delay,
      delayChildren: 0.05,
    },
  },
})

export const viewport = { once: true, margin: '0px 0px -60px 0px' }
