'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Command } from 'cmdk'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import {
  Home,
  BookOpen,
  FolderGit2,
  Wrench,
  Moon,
  SunMedium,
  Search,
  Download,
  Terminal,
} from 'lucide-react'
import { cvData } from '@/content/data/cv'

const navActions = [
  { id: 'go-home',     label: 'Home',     icon: <Home size={15} />,       href: '/',         group: 'Navigation' },
  { id: 'go-blog',     label: 'Blog',     icon: <BookOpen size={15} />,   href: '/blog',     group: 'Navigation' },
  { id: 'go-projects', label: 'Projects', icon: <FolderGit2 size={15} />, href: '/projects', group: 'Navigation' },
  { id: 'go-uses',     label: 'Uses',     icon: <Wrench size={15} />,    href: '/uses',     group: 'Navigation' },
]

export function CommandPaletteToggle() {
  return (
    <CMDKTrigger />
  )
}

function CMDKTrigger() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      {/* Mobile: icon only */}
      <motion.button
        id="command-palette-trigger-mobile"
        aria-label="Open search"
        onClick={() => setOpen(true)}
        className="flex sm:hidden w-9 h-9 items-center justify-center rounded-xl cursor-pointer"
        style={{
          background: 'var(--border-color)',
          border: '1px solid var(--border-color)',
          color: 'rgb(var(--text-secondary))',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Search size={15} />
      </motion.button>

      {/* Desktop: full search bar */}
      <motion.button
        id="command-palette-trigger"
        aria-label="Open command palette (Ctrl+K)"
        onClick={() => setOpen(true)}
        className="hidden sm:flex items-center gap-2 px-3 h-9 rounded-xl text-xs cursor-pointer"
        style={{
          background: 'var(--border-color)',
          border: '1px solid var(--border-color)',
          color: 'rgb(var(--text-secondary))',
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Search size={13} />
        <span>Search</span>
        <kbd
          className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-xs font-mono"
          style={{ background: 'rgba(255,255,255,0.06)', color: 'rgb(var(--text-secondary))' }}
        >
          ⌘K
        </kbd>
      </motion.button>

      <CommandPaletteDialog open={open} setOpen={setOpen} />
    </>
  )
}

function CommandPaletteDialog({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (v: boolean) => void
}) {
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  const runAction = useCallback(
    (fn: () => void) => {
      fn()
      setOpen(false)
    },
    [setOpen]
  )

  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
      }
      // Prevent arrow keys from scrolling the page behind
      if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
        e.preventDefault()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, setOpen])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[998]"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />

          {/* Dialog */}
          <motion.div
            className="fixed top-[28%] left-1/2 z-[999] w-full"
            style={{ maxWidth: '580px' }}
            initial={{ opacity: 0, x: '-50%', y: '-4px' }}
            animate={{ opacity: 1, x: '-50%', y: '0px' }}
            exit={{ opacity: 0, x: '-50%', y: '-4px' }}
            transition={{ duration: 0.15 }}
          >
            <Command
              className="rounded-2xl overflow-hidden"
              style={{
                background: 'rgb(var(--bg-card))',
                border: '1px solid var(--border-hover)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              }}
            >
              <div
                className="flex items-center gap-3 px-4 border-b"
                style={{ borderColor: 'var(--border-color)' }}
              >
                <Search size={16} style={{ color: 'rgb(var(--text-secondary))' }} />
                <Command.Input
                  placeholder="Search or jump to..."
                  className="flex-1 h-12 bg-transparent outline-none text-sm"
                  style={{ color: 'rgb(var(--text-primary))' }}
                  autoFocus
                />
                <kbd
                  className="text-xs px-1.5 py-0.5 rounded cursor-pointer"
                  style={{ background: 'rgba(255,255,255,0.06)', color: 'rgb(var(--text-secondary))' }}
                  onClick={() => setOpen(false)}
                >
                  ESC
                </kbd>
              </div>

              <Command.List className="p-2 max-h-80 overflow-y-auto">
                <Command.Empty
                  className="py-8 text-center text-sm"
                  style={{ color: 'rgb(var(--text-secondary))' }}
                >
                  No results found.
                </Command.Empty>

                <Command.Group heading="Navigation" className="cmdk-group">
                  {navActions.map((action) => (
                    <Command.Item
                      key={action.id}
                      id={action.id}
                      onSelect={() => runAction(() => router.push(action.href))}
                      className="cmdk-item"
                    >
                      <span style={{ color: 'var(--accent-hex)' }}>{action.icon}</span>
                      {action.label}
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Group heading="Actions" className="cmdk-group">
                  <Command.Item
                    id="cmd-toggle-theme"
                    onSelect={() => runAction(() => setTheme(theme === 'dark' ? 'light' : 'dark'))}
                    className="cmdk-item"
                  >
                    <span style={{ color: 'var(--accent-hex)' }}>
                      {theme === 'dark' ? <SunMedium size={15} /> : <Moon size={15} />}
                    </span>
                    Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode
                  </Command.Item>
                  <Command.Item
                    id="cmd-download-cv"
                    onSelect={() => runAction(() => window.open(cvData.cvPath, '_blank'))}
                    className="cmdk-item"
                  >
                    <span style={{ color: 'var(--accent-hex)' }}><Download size={15} /></span>
                    Download CV
                  </Command.Item>
                  <Command.Item
                    id="cmd-contact"
                    onSelect={() => runAction(() => window.open(`mailto:${cvData.email}`))}
                    className="cmdk-item"
                  >
                    <span style={{ color: 'var(--accent-hex)' }}><Terminal size={15} /></span>
                    Send Email
                  </Command.Item>
                </Command.Group>
              </Command.List>

              <div
                className="px-4 py-2 border-t flex items-center gap-3 text-xs"
                style={{ borderColor: 'var(--border-color)', color: 'rgb(var(--text-secondary))' }}
              >
                <span>↑↓ navigate</span>
                <span>↵ select</span>
                <span>ESC close</span>
              </div>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
