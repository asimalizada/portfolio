'use client'

import { useEffect } from 'react'

const revealDuration = 440
const revealEasing = 'cubic-bezier(0.22, 1, 0.36, 1)'

export function HomeMotion() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotion.matches || !('IntersectionObserver' in window) || !('animate' in Element.prototype)) return

    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-home-reveal]'))
    const extraDelays = new WeakMap<HTMLElement, number>()
    const contact = document.getElementById('contact')
    const contactIntro = contact?.querySelector('#contact-title')?.parentElement
    const contactChannels = contact?.querySelector('#footer-email')?.parentElement?.parentElement
    if (contactIntro instanceof HTMLElement) targets.push(contactIntro)
    if (contactChannels instanceof HTMLElement) {
      extraDelays.set(contactChannels, 90)
      targets.push(contactChannels)
    }

    const animations = new Set<Animation>()
    const observer = new IntersectionObserver((entries, currentObserver) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        currentObserver.unobserve(entry.target)
        if (reducedMotion.matches) continue

        const target = entry.target as HTMLElement
        const delay = extraDelays.get(target) ?? (Number(target.dataset.homeDelay) || 0)
        const animation = target.animate(
          [{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0)' }],
          { duration: revealDuration, delay, easing: revealEasing, fill: 'backwards' }
        )
        animations.add(animation)
        animation.onfinish = () => animations.delete(animation)
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -4% 0px' })

    // Keep content already on screen visible after load or scroll restoration.
    for (const target of targets) {
      const rect = target.getBoundingClientRect()
      if (rect.bottom > 0 && rect.top < window.innerHeight) continue
      observer.observe(target)
    }

    const onMotionPreferenceChange = () => {
      if (!reducedMotion.matches) return
      observer.disconnect()
      for (const animation of animations) animation.cancel()
      animations.clear()
    }
    reducedMotion.addEventListener('change', onMotionPreferenceChange)

    return () => {
      observer.disconnect()
      reducedMotion.removeEventListener('change', onMotionPreferenceChange)
      for (const animation of animations) animation.cancel()
    }
  }, [])

  return null
}
