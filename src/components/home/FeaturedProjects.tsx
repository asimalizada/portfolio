'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ExternalLink, ArrowUpRight, Zap } from 'lucide-react'

function GithubIcon({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.17A5.8 5.8 0 0 0 19 4.39a5.8 5.8 0 0 0-.5-3.39S17 1 14 3.26a12 12 0 0 0-4 0C7 1 5 1 5 1a5.8 5.8 0 0 0-.5 3.39A5.8 5.8 0 0 0 3 7.8c0 5.76 3.35 6.79 6.5 7.17A4.8 4.8 0 0 0 8.5 18v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}
import { projects } from '@/content/data/projects'

// Code snippets per project gives a non-text visual element
const CODE_PANELS: Record<string, { lines: { color: string; text: string }[][] }> = {
  'fitxlink': {
    lines: [
      [{ color: '#8b949e', text: '// Node.js API: Distributed Caching' }],
      [{ color: '#ff7b72', text: 'export async function ' }, { color: '#d2a8ff', text: 'getGymProfile' }, { color: '#c9d1d9', text: '(gymId: string) {' }],
      [{ color: '#8b949e', text: '  // 1. Fast Path: Check Redis Cache' }],
      [{ color: '#c9d1d9', text: '  const cached = await redis.' }, { color: '#d2a8ff', text: 'get' }, { color: '#c9d1d9', text: '(`gym:${gymId}:profile`);' }],
      [{ color: '#79c0ff', text: '  if' }, { color: '#c9d1d9', text: ' (cached) ' }, { color: '#ff7b72', text: 'return ' }, { color: '#79c0ff', text: 'JSON' }, { color: '#c9d1d9', text: '.parse(cached);' }],
      [],
      [{ color: '#8b949e', text: '  // 2. Slow Path: Read from Primary DB' }],
      [{ color: '#c9d1d9', text: '  const profile = await db.gyms.' }, { color: '#d2a8ff', text: 'findUnique' }, { color: '#c9d1d9', text: '({ where: { id: gymId } });' }],
      [{ color: '#c9d1d9', text: '  await redis.' }, { color: '#d2a8ff', text: 'setex' }, { color: '#c9d1d9', text: '(`gym:${gymId}`, 3600, ' }, { color: '#79c0ff', text: 'JSON' }, { color: '#c9d1d9', text: '.stringify(profile));' }],
      [],
      [{ color: '#ff7b72', text: '  return ' }, { color: '#c9d1d9', text: 'profile;' }],
      [{ color: '#c9d1d9', text: '}' }],
    ],
  },
}

const STATUS_MAP = {
  active: { label: 'Active', color: '#22c55e' },
  wip: { label: 'In Progress', color: '#f59e0b' },
  archived: { label: 'Archived', color: '#6b7280' },
}

// 3D tilt card
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 20 })
  const springY = useSpring(y, { stiffness: 150, damping: 20 })
  const rotateX = useTransform(springY, [-0.5, 0.5], [4, -4])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-4, 4])

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function CodePanel({ projectId }: { projectId: string }) {
  const panel = CODE_PANELS[projectId]
  if (!panel) return null

  return (
    <div
      className="rounded-xl p-4 font-mono text-[11px] leading-relaxed h-full overflow-hidden relative"
      style={{ background: '#0d1117', border: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Fake window bar */}
      <div className="flex items-center gap-1.5 mb-3">
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff5f57' }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#febc2e' }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#28c840' }} />
      </div>
      <div className="space-y-[2px]">
        {panel.lines.map((lineTokens, i) => (
          <p key={i} className="min-h-[16px] whitespace-pre-wrap">
            {lineTokens.map((token, j) => (
              <span key={j} style={{ color: token.color }}>{token.text}</span>
            ))}
          </p>
        ))}
      </div>
      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-8 rounded-b-xl"
        style={{ background: 'linear-gradient(to bottom, transparent, #0d1117)' }}
      />
    </div>
  )
}

function ProjectCard({ project, isFirst }: { project: typeof projects[number]; isFirst?: boolean }) {
  const status = STATUS_MAP[project.status]
  const hasCode = !!CODE_PANELS[project.id]

  return (
    <TiltCard className="h-full">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="h-full rounded-2xl border overflow-hidden transition-all duration-300 hover:border-[var(--accent-hex)]/40 hover:shadow-2xl"
        style={{
          background: 'rgba(var(--bg-card), 0.7)',
          borderColor: 'var(--border-color)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className={`flex flex-col h-full ${isFirst && hasCode ? 'lg:flex-row' : ''}`}>
          {/* Left / Top: content */}
          <div className={`flex flex-col justify-between p-6 sm:p-7 ${isFirst && hasCode ? 'lg:w-2/5' : 'flex-1'}`}>
            <div>
              {/* Status + tags row */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span
                  className="text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5"
                  style={{ background: `${status.color}18`, color: status.color, border: `1px solid ${status.color}30` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {status.label}
                </span>
                {project.tags.slice(0, 2).map(tag => (
                  <span
                    key={tag}
                    className="text-[10px] font-medium px-2.5 py-1 rounded-full"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      color: 'rgb(var(--text-secondary))',
                      border: '1px solid var(--border-color)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3
                className="text-xl sm:text-2xl font-bold mb-1 tracking-tight"
                style={{ color: 'rgb(var(--text-primary))' }}
              >
                {project.title}
              </h3>
              {project.role && (
                <p 
                  className="text-xs font-semibold mb-3 tracking-wide uppercase" 
                  style={{ color: 'var(--accent-hex)' }}
                >
                  {project.role}
                </p>
              )}
              <p
                className="text-sm leading-relaxed mb-5"
                style={{ color: 'rgb(var(--text-secondary))' }}
              >
                {project.longDescription ?? project.description}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.tech.map(t => (
                  <span
                    key={t}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-md"
                    style={{
                      background: 'rgba(var(--accent-rgb), 0.08)',
                      color: 'var(--accent-hex)',
                      border: '1px solid rgba(var(--accent-rgb), 0.15)',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex items-center gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-medium transition-all duration-200 hover:scale-105 px-3 py-2 rounded-lg border"
                  style={{
                    borderColor: 'var(--border-color)',
                    color: 'rgb(var(--text-secondary))',
                    background: 'rgba(255,255,255,0.03)',
                  }}
                >
                  <GithubIcon size={13} />
                  GitHub
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-medium transition-all duration-200 hover:scale-105 px-3 py-2 rounded-lg"
                  style={{
                    background: 'rgba(var(--accent-rgb), 0.12)',
                    color: 'var(--accent-hex)',
                  }}
                >
                  <ExternalLink size={13} />
                  Live Demo
                </a>
              )}
              {!project.github && !project.demo && (
                <span
                  className="text-xs px-3 py-2 rounded-lg"
                  style={{ color: 'rgb(var(--text-secondary))', background: 'rgba(255,255,255,0.03)' }}
                >
                  Private / Production
                </span>
              )}
            </div>
          </div>

          {/* Right / Bottom: code panel (only first card on desktop) */}
          {isFirst && hasCode && (
            <div className="lg:w-3/5 p-4 sm:p-5 lg:p-6 flex items-stretch">
              <CodePanel projectId={project.id} />
            </div>
          )}

          {/* For non-first cards: small accent bottom bar */}
          {!isFirst && (
            <div
              className="h-0.5 w-full"
              style={{
                background: `linear-gradient(to right, var(--accent-hex), transparent)`,
                opacity: 0.3,
              }}
            />
          )}
        </div>
      </motion.div>
    </TiltCard>
  )
}

export function FeaturedProjects() {
  const featured = projects.filter(p => p.featured)
  const [first, ...rest] = featured

  return (
    <section className="w-full flex justify-center pb-32">
      <div className="max-w-6xl w-full px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-14"
        >
          <div
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] mb-3"
            style={{ color: 'var(--accent-hex)' }}
          >
            <Zap size={12} />
            Selected Work
          </div>
          <h2
            className="text-3xl sm:text-4xl font-black tracking-tight mb-4"
            style={{ color: 'rgb(var(--text-primary))' }}
          >
            Featured Projects
          </h2>
          <p className="text-base max-w-xl" style={{ color: 'rgb(var(--text-secondary))' }}>
            From production SaaS platforms to open-source experiments things I've built and shipped.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="space-y-5">
          {/* Featured hero card full width */}
          {first && <ProjectCard project={first} isFirst />}

          {/* Remaining 2 column grid */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {rest.map(p => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          )}
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mt-10"
        >
          <Link
            href="/projects"
            className="btn btn-secondary h-11 px-6 rounded-xl text-sm"
          >
            View All Projects
            <ArrowUpRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
