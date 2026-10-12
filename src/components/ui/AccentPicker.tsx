'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { useAccent, accentColors } from '@/components/providers/AccentProvider'
import { Palette } from 'lucide-react'
import utilityStyles from '@/components/layout/HeaderUtilities.module.css'
import styles from './AccentPicker.module.css'

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
        className={`flex ${utilityStyles.control}`}
      >
        <Palette size={16} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className={styles.popover}
          >
            <p className={styles.heading}>
              Accent Color
            </p>
            <div className={styles.options}>
              {accentColors.map((color) => (
                <motion.button
                  key={color.id}
                  id={`accent-${color.id}`}
                  onClick={() => { setAccent(color.id); setOpen(false) }}
                  aria-pressed={accent === color.id}
                  className={`${styles.option} ${accent === color.id ? styles.optionSelected : ''}`}
                >
                  <span
                    className={styles.swatch}
                    style={{ background: color.hex }}
                  />
                  <span>{color.label}</span>
                  {accent === color.id && (
                    <span className={styles.selectionMark} aria-hidden="true">✓</span>
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
