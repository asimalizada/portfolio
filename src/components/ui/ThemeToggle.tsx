'use client'

import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { SunMedium, Moon } from 'lucide-react'
import { useSyncExternalStore } from 'react'
import utilityStyles from '@/components/layout/HeaderUtilities.module.css'

const subscribe = () => () => {}
const clientSnapshot = () => true
const serverSnapshot = () => false

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot)

  if (!mounted) {
    return (
      <div className={utilityStyles.control} aria-hidden="true" />
    )
  }

  const isDark = theme === 'dark'

  return (
    <motion.button
      id="theme-toggle"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`relative flex ${utilityStyles.control}`}
    >
      <motion.span
        key={isDark ? 'moon' : 'sun'}
        initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
        transition={{ duration: 0.2 }}
      >
        {isDark ? <Moon size={16} /> : <SunMedium size={16} />}
      </motion.span>
    </motion.button>
  )
}
