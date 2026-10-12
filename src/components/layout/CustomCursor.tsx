'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const cursorMediaQuery = '(pointer: coarse), (prefers-reduced-motion: reduce)'

function subscribeToCursorPreference(onChange: () => void) {
  const media = window.matchMedia(cursorMediaQuery)
  media.addEventListener('change', onChange)
  return () => media.removeEventListener('change', onChange)
}

const cursorEnabled = () => !window.matchMedia(cursorMediaQuery).matches
const cursorDisabledOnServer = () => false

export function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const showCursor = useSyncExternalStore(subscribeToCursorPreference, cursorEnabled, cursorDisabledOnServer)
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const dotX = useSpring(mouseX, { stiffness: 600, damping: 28, mass: 0.5 })
  const dotY = useSpring(mouseY, { stiffness: 600, damping: 28, mass: 0.5 })
  const ringX = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 0.8 })
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 20, mass: 0.8 })
  const hasPosition = useRef(false)
  const pointerState = useRef(false)

  useEffect(() => {
    if (!showCursor) return

    const move = (e: MouseEvent) => {
      if (!hasPosition.current) {
        mouseX.jump(e.clientX)
        mouseY.jump(e.clientY)
        dotX.jump(e.clientX)
        dotY.jump(e.clientY)
        ringX.jump(e.clientX)
        ringY.jump(e.clientY)
        hasPosition.current = true
      } else {
        mouseX.set(e.clientX)
        mouseY.set(e.clientY)
      }
      const target = e.target
      if (target instanceof Element) {
        const nextIsPointer = window.getComputedStyle(target).cursor === 'pointer'
        if (nextIsPointer !== pointerState.current) {
          pointerState.current = nextIsPointer
          setIsPointer(nextIsPointer)
        }
      }
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
      hasPosition.current = false
    }
  }, [showCursor, mouseX, mouseY, dotX, dotY, ringX, ringY])

  if (!showCursor) return null

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full"
        animate={{
          scale: isHidden ? 0 : 1,
          opacity: isHidden ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 600, damping: 28, mass: 0.5 }}
        style={{
          top: -4,
          left: -4,
          x: dotX,
          y: dotY,
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
          scale: isPointer ? 1.4 : 1,
          opacity: isHidden ? 0 : 0.4,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 20, mass: 0.8 }}
        style={{
          top: -18,
          left: -18,
          x: ringX,
          y: ringY,
          width: 36,
          height: 36,
          borderColor: 'var(--accent-hex)',
        }}
      />
    </>
  )
}
