'use client'

import { useEffect } from 'react'

const ease = 'cubic-bezier(0.22, 1, 0.36, 1)'

export function ProjectMotion() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const records = Array.from(document.querySelectorAll<HTMLElement>('[data-project-reveal]'))
    const disclosures = Array.from(document.querySelectorAll<HTMLDetailsElement>('[data-technical-record]'))
    const activeAnimations = new Map<HTMLDetailsElement, { animation: Animation; closing: boolean }>()
    const cleanupListeners: Array<() => void> = []

    const observer = !reducedMotion.matches && 'IntersectionObserver' in window && 'animate' in Element.prototype
      ? new IntersectionObserver((entries, currentObserver) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue
            currentObserver.unobserve(entry.target)
            if (reducedMotion.matches) continue
            entry.target.animate(
              [{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'translateY(0)' }],
              { duration: 520, easing: ease }
            )
          }
        }, { threshold: 0.08, rootMargin: '0px 0px -4% 0px' })
      : null

    // Already visible records remain still on initial load and on direct project links.
    for (const record of records) {
      if (record.getBoundingClientRect().top >= window.innerHeight) observer?.observe(record)
    }

    for (const details of disclosures) {
      const summary = details.querySelector('summary')
      if (!summary) continue

      const onClick = (event: MouseEvent) => {
        if (reducedMotion.matches || !('animate' in details)) return
        event.preventDefault()

        const running = activeAnimations.get(details)
        const shouldOpen = running ? running.closing : !details.open
        const startHeight = details.getBoundingClientRect().height
        if (running) {
          running.animation.onfinish = null
          running.animation.cancel()
          activeAnimations.delete(details)
        }

        let endHeight: number
        if (shouldOpen) {
          details.open = true
          details.style.height = 'auto'
          endHeight = details.getBoundingClientRect().height
        } else {
          const border = Number.parseFloat(getComputedStyle(details).borderTopWidth) || 0
          endHeight = summary.getBoundingClientRect().height + border
        }

        details.style.height = `${startHeight}px`
        details.style.overflow = 'hidden'
        const animation = details.animate(
          [{ height: `${startHeight}px` }, { height: `${endHeight}px` }],
          { duration: 300, easing: ease }
        )
        activeAnimations.set(details, { animation, closing: !shouldOpen })
        animation.onfinish = () => {
          if (!shouldOpen) details.open = false
          details.style.height = ''
          details.style.overflow = ''
          activeAnimations.delete(details)
        }
      }

      summary.addEventListener('click', onClick)
      cleanupListeners.push(() => summary.removeEventListener('click', onClick))
    }

    return () => {
      observer?.disconnect()
      cleanupListeners.forEach((cleanup) => cleanup())
      for (const [details, { animation }] of activeAnimations) {
        animation.onfinish = null
        animation.cancel()
        details.style.height = ''
        details.style.overflow = ''
      }
    }
  }, [])

  return null
}
