'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [isPointer, setIsPointer] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsMobile(true)
      return
    }

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      const target = e.target as HTMLElement
      const cursor = window.getComputedStyle(target).cursor
      setIsPointer(cursor === 'pointer')
    }
    const hide = () => setIsHidden(true)
    const show = () => setIsHidden(false)

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseleave', hide)
    document.addEventListener('mouseenter', show)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', hide)
      document.removeEventListener('mouseenter', show)
    }
  }, [])

  // Avoid hydration mismatch by waiting for mount
  if (!mounted || isMobile) return null

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full"
        animate={{
          x: pos.x - 4,
          y: pos.y - 4,
          scale: isHidden ? 0 : 1,
          opacity: isHidden ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 600, damping: 28, mass: 0.5 }}
        style={{
          width: isPointer ? 12 : 8,
          height: isPointer ? 12 : 8,
          background: 'var(--accent-hex)',
          mixBlendMode: 'difference',
        }}
      />
      {/* Ring */}
      <motion.div
        className="fixed pointer-events-none z-[9998] rounded-full border"
        animate={{
          x: pos.x - 18,
          y: pos.y - 18,
          scale: isPointer ? 1.4 : 1,
          opacity: isHidden ? 0 : 0.4,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 20, mass: 0.8 }}
        style={{
          width: 36,
          height: 36,
          borderColor: 'var(--accent-hex)',
        }}
      />
    </>
  )
}
