'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { AccentPicker } from '@/components/ui/AccentPicker'
import { CommandPaletteToggle } from '@/components/layout/CommandPalette'
import { cvData } from '@/content/data/cv'

function GithubIcon({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.17A5.8 5.8 0 0 0 19 4.39a5.8 5.8 0 0 0-.5-3.39S17 1 14 3.26a12 12 0 0 0-4 0C7 1 5 1 5 1a5.8 5.8 0 0 0-.5 3.39A5.8 5.8 0 0 0 3 7.8c0 5.76 3.35 6.79 6.5 7.17A4.8 4.8 0 0 0 8.5 18v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

function LinkedinIcon({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

const navLinks = [
  { href: '/',         label: 'Home'     },
  { href: '/blog',     label: 'Blog'     },
  { href: '/projects', label: 'Projects' },
  { href: '/uses',     label: 'Uses'     },
]

export function Header() {
  const pathname = usePathname()

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl">
      <motion.header
        className="header-blur h-14 rounded-full border shadow-lg"
        style={{ borderColor: 'var(--border-color)', background: 'rgba(var(--bg-card), 0.6)' }}
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as any }}
      >
        <div className="px-5 h-full flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="font-bold text-base tracking-tight flex items-center gap-2 shrink-0"
          style={{ color: 'rgb(var(--text-primary))' }}
        >
          <span
            className="w-7 h-7 rounded-lg text-[11px] font-black flex items-center justify-center text-white"
            style={{ background: 'var(--accent-hex)', fontFamily: 'var(--font-mono)', letterSpacing: '-0.05em' }}
          >
            &gt;_
          </span>
          <span className="hidden sm:inline">
            {cvData.name.split(' ')[0]}
            <span style={{ color: 'var(--accent-hex)' }}>.</span>
          </span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = link.href === '/'
              ? pathname === '/'
              : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                id={`nav-${link.label.toLowerCase()}`}
                className="relative px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-200"
                style={{
                  color: isActive ? 'rgb(var(--text-primary))' : 'rgb(var(--text-secondary))',
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-highlight"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: 'rgba(var(--accent-rgb), 0.1)' }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Social icons desktop only */}
          <a
            href={cvData.github ?? '#'}
            id="header-github"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex w-8 h-8 rounded-lg items-center justify-center transition-all duration-200 hover:scale-110"
            style={{ color: 'rgb(var(--text-secondary))' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--accent-hex)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgb(var(--text-secondary))' }}
          >
            <GithubIcon size={16} />
          </a>
          <a
            href={cvData.linkedin ?? '#'}
            id="header-linkedin"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex w-8 h-8 rounded-lg items-center justify-center transition-all duration-200 hover:scale-110"
            style={{ color: 'rgb(var(--text-secondary))' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--accent-hex)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgb(var(--text-secondary))' }}
          >
            <LinkedinIcon size={16} />
          </a>
          <div className="hidden md:block w-px h-4 mx-1" style={{ background: 'var(--border-color)' }} />
          <CommandPaletteToggle />
          <ThemeToggle />
          <AccentPicker />
        </div>
      </div>
      </motion.header>
    </div>
  )
}
