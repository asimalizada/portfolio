'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Briefcase, MapPin, Download, ArrowUpRight, Calendar } from 'lucide-react'
import { cvData } from '@/content/data/cv'

const FEATURED_INDICES = [0, 1, 2, 3] // top 4 experiences

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

function TypeBadge({ type }: { type: 'remote' | 'hybrid' | 'onsite' }) {
  const map = {
    remote: { label: 'Remote', color: '#22c55e' },
    hybrid: { label: 'Hybrid', color: '#f59e0b' },
    onsite: { label: 'On-site', color: '#6366f1' },
  }
  const { label, color } = map[type]
  return (
    <span
      className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
      style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}
    >
      {label}
    </span>
  )
}

function TechBadge({ name }: { name: string }) {
  return (
    <span
      className="text-[10px] font-medium px-2 py-0.5 rounded-md"
      style={{
        background: 'rgba(var(--accent-rgb), 0.08)',
        color: 'var(--accent-hex)',
        border: '1px solid rgba(var(--accent-rgb), 0.15)',
      }}
    >
      {name}
    </span>
  )
}

export function ExperienceTimeline() {
  const featured = FEATURED_INDICES.map(i => cvData.experience[i]).filter(Boolean)

  return (
    <section className="w-full flex justify-center pb-24">
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
            className="text-xs font-bold uppercase tracking-[0.2em] mb-3"
            style={{ color: 'var(--accent-hex)' }}
          >
            Career
          </div>
          <h2
            className="text-3xl sm:text-4xl font-black tracking-tight mb-4"
            style={{ color: 'rgb(var(--text-primary))' }}
          >
            Work Experience
          </h2>
          <p className="text-base max-w-xl" style={{ color: 'rgb(var(--text-secondary))' }}>
            5+ years across fintech, cybersecurity, and energy building systems that scale.
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="relative"
        >
          {/* Vertical rail hidden on mobile */}
          <div
            className="absolute left-[19px] top-3 bottom-3 w-px hidden md:block"
            style={{ background: 'linear-gradient(to bottom, var(--accent-hex), transparent)' }}
          />

          <div className="space-y-6">
            {featured.map((exp, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="relative flex gap-5 md:gap-8 group"
              >
                {/* Timeline dot desktop only */}
                <div className="hidden md:flex flex-col items-center flex-shrink-0">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 group-hover:scale-110 z-10"
                    style={{
                      borderColor: exp.current ? 'var(--accent-hex)' : 'var(--border-color)',
                      background: exp.current
                        ? 'rgba(var(--accent-rgb), 0.15)'
                        : 'rgba(var(--bg-card), 1)',
                      color: exp.current ? 'var(--accent-hex)' : 'rgb(var(--text-secondary))',
                    }}
                  >
                    <Briefcase size={15} />
                  </div>
                </div>

                {/* Card */}
                <div
                  className="flex-1 rounded-2xl p-5 sm:p-6 border transition-all duration-300 group-hover:border-[var(--accent-hex)]/30 group-hover:shadow-lg"
                  style={{
                    background: 'rgba(var(--bg-card), 0.6)',
                    borderColor: 'var(--border-color)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  {/* Top row */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3
                          className="text-base sm:text-lg font-bold"
                          style={{ color: 'rgb(var(--text-primary))' }}
                        >
                          {exp.role}
                        </h3>
                        {exp.current && (
                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1"
                            style={{
                              background: 'rgba(var(--accent-rgb), 0.12)',
                              color: 'var(--accent-hex)',
                            }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                            Current
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className="text-sm font-semibold"
                          style={{ color: 'var(--accent-hex)' }}
                        >
                          {exp.company}
                        </span>
                        <TypeBadge type={exp.type} />
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs flex-shrink-0" style={{ color: 'rgb(var(--text-secondary))' }}>
                      <Calendar size={12} />
                      {exp.period}
                    </div>
                  </div>

                  {/* Location */}
                  <div
                    className="flex items-center gap-1 text-xs mb-4"
                    style={{ color: 'rgb(var(--text-secondary))' }}
                  >
                    <MapPin size={11} />
                    {exp.location}
                  </div>

                  {/* Bullets top 3 */}
                  <ul className="space-y-1.5 mb-4">
                    {exp.bullets.slice(0, 3).map((b, bi) => (
                      <li key={bi} className="flex gap-2 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                        <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'var(--accent-hex)' }} />
                        {b}
                      </li>
                    ))}
                  </ul>

                  {/* Tech badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {exp.tech.map((t) => (
                      <TechBadge key={t} name={t} />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Download CV CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 pt-8 border-t"
            style={{ borderColor: 'var(--border-color)' }}
          >
            <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
              Want the full picture?
            </p>
            <div className="flex gap-3">
              <a
                href={cvData.cvPath}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary h-10 px-5 rounded-xl text-sm"
              >
                <Download size={15} />
                Download CV
              </a>
              <Link
                href="/projects"
                className="btn btn-secondary h-10 px-5 rounded-xl text-sm"
              >
                View Projects
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
