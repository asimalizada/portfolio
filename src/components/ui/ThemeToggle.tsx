'use client'

import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { SunMedium, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-xl" style={{ background: 'var(--border-color)' }} />
    )
  }

  const isDark = theme === 'dark'

  return (
    <motion.button
      id="theme-toggle"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer"
      style={{
        background: 'var(--border-color)',
        border: '1px solid var(--border-color)',
        color: 'rgb(var(--text-secondary))',
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
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
