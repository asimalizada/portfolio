'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import type { Project } from '@/content/data/projects'
import { ExternalLink, Archive } from 'lucide-react'

function GithubIcon({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.17A5.8 5.8 0 0 0 19 4.39a5.8 5.8 0 0 0-.5-3.39S17 1 14 3.26a12 12 0 0 0-4 0C7 1 5 1 5 1a5.8 5.8 0 0 0-.5 3.39A5.8 5.8 0 0 0 3 7.8c0 5.76 3.35 6.79 6.5 7.17A4.8 4.8 0 0 0 8.5 18v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      id={`project-${project.id}`}
      className="group relative h-full"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="card p-6 h-full flex flex-col gap-4 cursor-default transition-all duration-300 group-hover:border-[var(--accent-hex)] group-hover:shadow-[0_0_30px_rgba(var(--accent-rgb),0.1)] relative overflow-hidden"
        style={{ background: 'rgba(var(--bg-card-rgb), 0.5)', backdropFilter: 'blur(10px)' }}
      >
        {/* Subtle background glow on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-hex)] to-transparent opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500" />

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="badge badge-accent bg-[var(--accent-hex)]/10 text-[var(--accent-hex)] border-[var(--accent-hex)]/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                {tag}
              </span>
            ))}
            {project.status === 'archived' && (
              <span className="badge flex items-center gap-1 opacity-50 text-[10px]">
                <Archive size={10} /> Archived
              </span>
            )}
          </div>

          {/* Links */}
          <div className="flex gap-2 shrink-0">
            {project.github && (
              <Link
                href={project.github}
                id={`project-${project.id}-github`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all bg-[var(--border-color)] hover:bg-[var(--accent-hex)] hover:text-white"
                style={{ color: 'rgb(var(--text-secondary))' }}
              >
                <GithubIcon size={14} />
              </Link>
            )}
            {project.demo && (
              <Link
                href={project.demo}
                id={`project-${project.id}-demo`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all bg-[var(--border-color)] hover:bg-[var(--accent-hex)] hover:text-white"
                style={{ color: 'rgb(var(--text-secondary))' }}
              >
                <ExternalLink size={14} />
              </Link>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="font-bold text-xl mb-2 group-hover:text-[var(--accent-hex)] transition-colors" style={{ color: 'rgb(var(--text-primary))' }}>
            {project.title}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: 'rgb(var(--text-secondary))' }}>
            {project.description}
          </p>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-[var(--border-color)]/30">
          {project.tech.map((t) => (
            <span key={t} className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[var(--border-color)]/50" style={{ color: 'rgb(var(--text-secondary))' }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
