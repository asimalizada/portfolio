'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { useAccent, accentColors } from '@/components/providers/AccentProvider'
import { Palette } from 'lucide-react'

export function AccentPicker() {
  const { accent, setAccent } = useAccent()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative">
      <motion.button
        id="accent-picker-toggle"
        aria-label="Choose accent color"
        onClick={() => setOpen((o) => !o)}
        className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer"
        style={{
          background: 'var(--border-color)',
          border: '1px solid var(--border-color)',
          color: 'var(--accent-hex)',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Palette size={16} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-12 p-3 rounded-2xl z-50"
            style={{
              background: 'rgb(var(--bg-card))',
              border: '1px solid var(--border-color)',
              boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
              minWidth: '160px',
            }}
          >
            <p className="text-xs font-medium mb-2 px-1" style={{ color: 'rgb(var(--text-secondary))' }}>
              Accent Color
            </p>
            <div className="flex flex-col gap-1">
              {accentColors.map((color) => (
                <motion.button
                  key={color.id}
                  id={`accent-${color.id}`}
                  onClick={() => { setAccent(color.id); setOpen(false) }}
                  className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg w-full text-left cursor-pointer"
                  style={{
                    background: accent === color.id ? 'rgba(var(--accent-rgb), 0.1)' : 'transparent',
                    border: accent === color.id ? '1px solid rgba(var(--accent-rgb), 0.25)' : '1px solid transparent',
                  }}
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                >
                  <span
                    className="w-4 h-4 rounded-full flex-shrink-0"
                    style={{
                      background: color.hex,
                      boxShadow: accent === color.id ? `0 0 8px ${color.hex}80` : 'none',
                    }}
                  />
                  <span className="text-xs font-medium" style={{ color: 'rgb(var(--text-primary))' }}>
                    {color.label}
                  </span>
                  {accent === color.id && (
                    <span className="ml-auto text-xs" style={{ color: 'var(--accent-hex)' }}>✓</span>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
