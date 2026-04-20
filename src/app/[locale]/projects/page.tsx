'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '@/content/data/projects'
import { ProjectCard } from '@/components/projects/ProjectCard'

const ALL_FILTER = 'All'

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState(ALL_FILTER)

  // Extract unique tech tags for filters
  const allTech = useMemo(() => {
    const techSet = new Set<string>()
    projects.forEach(p => p.tech.forEach(t => techSet.add(t)))
    // Simplify filters to main categories
    return [ALL_FILTER, 'C#', 'Next.js', 'Docker', 'Cloud', 'Open Source']
  }, [])

  const filteredProjects = useMemo(() => {
    if (activeFilter === ALL_FILTER) return projects
    return projects.filter(p => {
      if (activeFilter === 'Cloud') return p.tech.some(t => ['AWS', 'Azure', 'Docker'].includes(t))
      if (activeFilter === 'Open Source') return p.tags.includes('Open Source')
      return p.tech.includes(activeFilter)
    })
  }, [activeFilter])

  const featured = filteredProjects.filter((p) => p.featured)
  const rest = filteredProjects.filter((p) => !p.featured)

  return (
    <div className="relative min-h-screen">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-[var(--accent-hex)] opacity-[0.07] blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 py-24 relative">
        {/* Header */}
        <div className="flex flex-col items-center text-center pb-5">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-[var(--text-primary)] to-[var(--text-secondary)]"
          >
            Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl max-w-2xl text-center"
            style={{ color: 'rgb(var(--text-secondary))' }}
          >
            A collection of things I&apos;ve built, from production SaaS platforms to internal tools and open-source experiments.
          </motion.p>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 pb-5"
        >
          {allTech.map((tech) => (
            <button
              key={tech}
              onClick={() => setActiveFilter(tech)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeFilter === tech
                  ? 'bg-[var(--accent-hex)] text-white border-[var(--accent-hex)]'
                  : 'bg-[var(--border-color)]/30 text-[var(--text-secondary)] border-transparent hover:border-[var(--accent-hex)]/50'
              }`}
            >
              {tech}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-16"
            >
              {/* Featured Section */}
              {featured.length > 0 && (
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--accent-hex)]">Featured Spotlight</h2>
                    <div className="h-px flex-1 bg-gradient-to-r from-[var(--accent-hex)]/30 to-transparent" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featured.map((project, idx) => (
                      <div key={project.id} className={idx === 0 && activeFilter === ALL_FILTER ? 'md:col-span-2 lg:col-span-2' : ''}>
                        <ProjectCard project={project} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Other Projects */}
              {rest.length > 0 && (
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em]" style={{ color: 'rgb(var(--text-secondary))' }}>Discovery</h2>
                    <div className="h-px flex-1 bg-gradient-to-r from-[var(--border-color)] to-transparent" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rest.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
