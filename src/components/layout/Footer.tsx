'use client'

import Link from 'next/link'
import { Mail, ArrowUpRight } from 'lucide-react'

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

import { cvData } from '@/content/data/cv'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-16 relative overflow-hidden w-full flex justify-center">
      {/* Background glow for footer */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-10 blur-[100px] pointer-events-none"
        style={{ background: 'var(--accent-hex)' }}
      />
      
      <div className="max-w-6xl w-full px-4 py-16 relative z-10 border-t" style={{ borderColor: 'var(--border-color)' }}>
        
        {/* Large Typography CTA */}
        <div className="flex flex-col items-center text-center gap-8 pb-20">
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4" style={{ color: 'rgb(var(--text-primary))' }}>
              Let's build something <br className="hidden md:block"/> 
              <span className="gradient-text">extraordinary.</span>
            </h2>
            <p className="text-lg" style={{ color: 'rgb(var(--text-secondary))' }}>
              Open for new opportunities and collaborations.
            </p>
          </div>
          <a
            href={`mailto:${cvData.email}`}
            className="btn btn-primary h-14 px-8 text-base rounded-2xl w-max"
          >
            Get in touch
            <ArrowUpRight size={18} />
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-center gap-6 pt-10 border-t" style={{ borderColor: 'var(--border-color)' }}>
          {/* Brand */}
          <div className="flex flex-col items-center gap-1 text-center">
            <span className="font-bold text-sm" style={{ color: 'rgb(var(--text-primary))' }}>
              {cvData.name}
            </span>
            <span className="text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>
              {cvData.title} · {cvData.location}
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-3">
            <SocialLink href={cvData.github ?? '#'} label="GitHub" icon={<GithubIcon size={16} />} id="footer-github" />
            <SocialLink href={cvData.linkedin ?? '#'} label="LinkedIn" icon={<LinkedinIcon size={16} />} id="footer-linkedin" />
            <SocialLink href={`mailto:${cvData.email}`} label="Email" icon={<Mail size={16} />} id="footer-email" />
          </div>

          {/* Meta */}
          <div className="flex flex-col items-center md:items-end gap-1">
            <span className="text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>
              © {year} {cvData.name}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialLink({
  href,
  label,
  icon,
  id,
}: {
  href: string
  label: string
  icon: React.ReactNode
  id: string
}) {
  return (
    <a
      href={href}
      id={id}
      aria-label={label}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--accent-hex)] hover:border-[var(--accent-hex)]/40"
      style={{
        background: 'var(--border-color)',
      }}
    >
      {icon}
    </a>
  )
}
