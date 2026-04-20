'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  MapPin, Briefcase, GraduationCap, Globe, ExternalLink,
  Code2, Server, Database, GitBranch, Zap, Star
} from 'lucide-react'
import { cvData } from '@/content/data/cv'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

function BentoCard({
  className = '',
  children,
  style = {},
  id,
}: {
  className?: string
  children: React.ReactNode
  style?: React.CSSProperties
  id?: string
}) {
  return (
    <motion.div
      id={id}
      variants={cardVariants}
      className={`card p-5 lg:p-6 ${className}`}
      style={style}
    >
      {children}
    </motion.div>
  )
}

// ── 1. About Me (Dynamic Info) ───────────────
function AboutCard() {
  return (
    <BentoCard id="bento-about" className="col-span-12 md:col-span-8 flex flex-col justify-center items-center text-center overflow-hidden relative">
      <div className="absolute right-0 top-0 w-64 h-64 bg-gradient-to-bl from-[var(--glow)] to-transparent opacity-40 blur-2xl pointer-events-none" />
      <div className="z-10">
        <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight" style={{ color: 'rgb(var(--text-primary))' }}>
          Who am I?
        </h3>
        <p className="text-sm md:text-base leading-relaxed max-w-xl mx-auto" style={{ color: 'rgb(var(--text-secondary))' }}>
          {cvData.summary}
        </p>
      </div>
      <div className="flex gap-2 flex-wrap mt-6 justify-center z-10">
        <span className="badge border-none" style={{ background: 'rgba(255,255,255,0.05)' }}>
          <Globe size={12} className="mr-1"/> Remote Global
        </span>
        <span className="badge border-none" style={{ background: 'rgba(255,255,255,0.05)' }}>
          Problem Solver
        </span>
      </div>
    </BentoCard>
  )
}

// ── 3. Tech Stack Marquee ────────────────────
const techList = [
  { name: '.NET', icon: <Code2 size={16}/> },
  { name: 'Node.js', icon: <Server size={16}/> },
  { name: 'React', icon: <Zap size={16}/> },
  { name: 'Azure', icon: <Globe size={16}/> },
  { name: 'Docker', icon: <GitBranch size={16}/> },
  { name: 'PostgreSQL', icon: <Database size={16}/> },
]

function TechMarqueeCard() {
  // We duplicate the list to make the CSS infinite marquee smooth
  const repeated = [...techList, ...techList, ...techList]

  return (
    <BentoCard id="bento-tech" className="col-span-12 overflow-hidden py-6 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest mb-6 px-1" style={{ color: 'rgb(var(--text-secondary))' }}>
        Core Technologies
      </p>
      
      <div className="relative w-full mask-edges overflow-hidden">
        <div className="marquee-container gap-4">
          {repeated.map((tech, i) => (
            <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-xl flex-shrink-0"
                 style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)' }}>
              <span style={{ color: 'var(--accent-hex)' }}>{tech.icon}</span>
              <span className="text-xs font-medium" style={{ color: 'rgb(var(--text-secondary))' }}>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </BentoCard>
  )
}

// ── 3. Stats & Mock Activity Graph ───────────
function StatsGraphCard() {
  // Use deterministic height values for the mock chart to avoid SSR hydration mismatch
  const bars = [35, 42, 40, 52, 45, 65, 55, 75, 65, 80, 70, 85, 75, 95, 85, 80, 90, 85, 100, 85, 75, 85, 70, 90]
  
  return (
    <BentoCard id="bento-stats" className="col-span-12 md:col-span-4 flex flex-col text-center">
      <div className="flex flex-col justify-center items-center mb-6 gap-6">
        <div>
          <p className="text-4xl font-black" style={{ color: 'rgb(var(--text-primary))' }}>
            {cvData.stats.projectsShipped}+
          </p>
          <p className="text-[10px] font-semibold uppercase tracking-widest mt-1" style={{ color: 'rgb(var(--text-secondary))' }}>
            Projects Shipped
          </p>
        </div>
        <div>
          <p className="text-4xl font-black" style={{ color: 'var(--accent-hex)' }}>
            {cvData.stats.yearsOfExperience}+
          </p>
          <p className="text-[10px] font-semibold uppercase tracking-widest mt-1" style={{ color: 'rgb(var(--text-secondary))' }}>Years Exp.</p>
        </div>
      </div>

      {/* Mock Activity Chart */}
      <div className="mt-auto h-20 w-full flex items-end justify-between gap-1">
        {bars.map((h, i) => (
          <div key={i} className="w-full rounded-t-sm transition-all duration-300 hover:opacity-100"
               style={{ 
                 height: `${h}%`, 
                 background: 'var(--accent-hex)', 
                 opacity: i % 3 === 0 ? 0.8 : 0.3 
               }} 
          />
        ))}
      </div>
    </BentoCard>
  )
}

// ── 4. Currently Building (Live Terminal) ────
function LiveBuildCard() {
  return (
    <BentoCard id="bento-live" className="col-span-12 md:col-span-7 flex flex-col justify-between items-center text-center relative overflow-hidden group">
      {/* Abstract dark mode pulse background */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[var(--glow)] opacity-20 pointer-events-none" />
      
      <div className="flex items-center justify-center gap-2 mb-4 relative z-10">
        <span className="pulse-dot" />
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--accent-hex)' }}>
          Currently Building
        </span>
      </div>

      <div className="mb-6 relative z-10 flex flex-col items-center">
        <h4 className="text-xl font-bold mb-2" style={{ color: 'rgb(var(--text-primary))' }}>
          Cloud Fitness Platform
        </h4>
        <p className="text-sm max-w-md" style={{ color: 'rgb(var(--text-secondary))' }}>
          Leading backend architecture at Webidea - microservices, Railway deployments, Cloudflare, and scalable API design.
        </p>
      </div>

      {/* Code snippet mock */}
      <div className="rounded-lg p-4 text-[10px] font-mono leading-relaxed mt-auto w-full max-w-md text-left z-10 shadow-lg" style={{ background: '#0d1117', border: '1px solid rgba(255,255,255,0.05)' }}>
        <p style={{ color: '#8b949e' }}>// Deploying to Railway via CI/CD pipeline</p>
        <p style={{ color: '#c9d1d9' }}>
          <span style={{ color: '#ff7b72' }}>await</span> deployment.<span style={{ color: '#d2a8ff' }}>PushAsync</span>(<span style={{ color: '#a5f3a5' }}>&quot;production&quot;</span>);
        </p>
      </div>
    </BentoCard>
  )
}

// ── 5. Experience & Education ────────────────
function ExpEduCard() {
  const latest = cvData.experience[0]
  return (
    <BentoCard id="bento-exp" className="col-span-12 md:col-span-5 flex flex-col justify-between text-center">
      <div className="mb-6 flex flex-col items-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Briefcase size={14} style={{ color: 'var(--accent-hex)' }} />
          <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'rgb(var(--text-secondary))' }}>Latest Role</p>
        </div>
        <p className="font-bold text-base" style={{ color: 'rgb(var(--text-primary))' }}>{latest.role}</p>
        <p className="text-sm font-medium mt-1" style={{ color: 'var(--accent-hex)' }}>{latest.company}</p>
        <p className="text-xs mt-1" style={{ color: 'rgb(var(--text-secondary))' }}>{latest.period}</p>
      </div>
      
      <div className="pt-4 border-t flex flex-col items-center" style={{ borderColor: 'var(--border-color)' }}>
        <div className="flex items-center justify-center gap-2 mb-2">
          <GraduationCap size={14} style={{ color: 'var(--accent-hex)' }} />
          <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'rgb(var(--text-secondary))' }}>Education</p>
        </div>
        <p className="font-bold text-sm" style={{ color: 'rgb(var(--text-primary))' }}>{cvData.education[0].degree}</p>
        <p className="text-xs mt-1" style={{ color: 'rgb(var(--text-secondary))' }}>{cvData.education[0].institution}</p>
      </div>
    </BentoCard>
  )
}

// ── 6. Blog Callout ──────────────────────────
function BlogCard() {
  return (
    <BentoCard id="bento-blog" className="col-span-12 md:col-span-12 relative overflow-hidden group hover:!border-accent transition-colors cursor-pointer text-center">
      <Link href="/blog" className="absolute inset-0 z-20" aria-label="Go to blog" />
      <div className="flex flex-col md:flex-row h-full items-center justify-between relative z-10 p-4 gap-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-6" style={{ background: 'var(--glow)', color: 'var(--accent-hex)' }}>
            <Star size={24} />
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-1" style={{ color: 'rgb(var(--text-primary))' }}>
              Writings & Thoughts
            </h3>
            <p className="text-sm max-w-md" style={{ color: 'rgb(var(--text-secondary))' }}>
              Deep dives into .NET architecture, Node.js performance, and the intricacies of building digital products.
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mt-4 md:mt-0 px-6 py-3 rounded-full text-sm font-semibold transition-colors bg-[rgba(var(--accent-rgb),0.1)] text-[var(--accent-hex)] group-hover:bg-[var(--accent-hex)] group-hover:text-white">
          Explore the Blog <ExternalLink size={16} />
        </div>
      </div>
    </BentoCard>
  )
}

export function BentoGrid() {
  return (
    <section className="w-full flex justify-center pb-32">
      <div className="max-w-6xl w-full px-4">
        <motion.div
          className="grid grid-cols-12 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
        >
          <AboutCard />
          <StatsGraphCard />
          <TechMarqueeCard />
          <LiveBuildCard />
          <ExpEduCard />
          <BlogCard />
        </motion.div>
      </div>
    </section>
  )
}
