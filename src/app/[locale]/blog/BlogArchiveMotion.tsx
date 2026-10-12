'use client'

import { useEffect } from 'react'

export function BlogArchiveMotion() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotion.matches || !('IntersectionObserver' in window) || !('animate' in Element.prototype)) return

    const rows = Array.from(document.querySelectorAll<HTMLElement>('[data-blog-reveal]'))
    const observer = new IntersectionObserver((entries, currentObserver) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        currentObserver.unobserve(entry.target)
        if (reducedMotion.matches) continue
        entry.target.animate(
          [{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0)' }],
          { duration: 460, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
        )
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -4% 0px' })

    // The lead publication is handled by CSS; restored positions stay visible.
    for (const row of rows) {
      const rect = row.getBoundingClientRect()
      if (rect.bottom > 0 && rect.top < window.innerHeight) continue
      observer.observe(row)
    }

    return () => observer.disconnect()
  }, [])

  return null
}
