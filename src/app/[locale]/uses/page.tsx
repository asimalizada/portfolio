import type { Metadata } from 'next'
import { usesData } from '@/content/data/uses'
import { Link } from '@/i18n/navigation'
import { 
  ExternalLink, 
  Terminal, 
  Code2, 
  Database, 
  Cloud, 
  Layers, 
  Monitor,
  Cpu
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Uses',
  description: 'Hardware, software, and tools I use daily.',
}

const CATEGORY_ICONS: Record<string, any> = {
  'Editor & Terminal': Terminal,
  'Languages & Frameworks': Code2,
  'Databases & Storage': Database,
  'Cloud & DevOps': Cloud,
  'Productivity': Layers,
  'Hardware': Monitor,
}

export default function UsesPage() {
  return (
    <div className="relative min-h-screen">
      {/* Background Glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] opacity-[0.07] blur-[120px] pointer-events-none"
        style={{ background: 'var(--accent-hex)' }}
      />

      <div className="max-w-4xl mx-auto px-4 py-24 relative">
        {/* Header */}
        <div className="flex flex-col items-center text-center pb-10">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-[var(--text-primary)] to-[var(--text-secondary)]">
            Uses
          </h1>
          <p className="text-xl max-w-2xl text-center" style={{ color: 'rgb(var(--text-secondary))' }}>
            A curated list of the professional gear, software, and tools I rely on to build resilient systems and beautiful experiences.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-24">
          {usesData.map((category) => {
            const Icon = CATEGORY_ICONS[category.name] || Cpu
            return (
              <section key={category.name} className="relative">
                {/* Category Header */}
                <div className="flex items-center gap-4 pb-5 group">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[var(--accent-hex)]/10 text-[var(--accent-hex)] border border-[var(--accent-hex)]/20 transition-all duration-300 group-hover:scale-110">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--accent-hex)' }}>
                      {category.name}
                    </h2>
                    <div className="h-0.5 w-12 bg-[var(--accent-hex)]/30 mt-1 rounded-full transition-all duration-500 group-hover:w-full" />
                  </div>
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.items.map((item) => (
                    <div 
                      key={item.name} 
                      className="group p-6 rounded-3xl border border-[var(--border-color)] transition-all duration-300 hover:border-[var(--accent-hex)]/40 hover:bg-[var(--accent-hex)]/[0.02] hover:shadow-[0_0_30px_rgba(var(--accent-rgb),0.05)]"
                      style={{ background: 'rgba(var(--bg-card-rgb), 0.4)', backdropFilter: 'blur(10px)' }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-2 group-hover:text-[var(--accent-hex)] transition-colors" style={{ color: 'rgb(var(--text-primary))' }}>
                            {item.name}
                          </h3>
                          <p className="text-sm leading-relaxed" style={{ color: 'rgb(var(--text-secondary))' }}>
                            {item.description}
                          </p>
                        </div>
                        {item.link && (
                          <Link
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--accent-hex)] hover:text-white transition-all shrink-0"
                          >
                            <ExternalLink size={14} />
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </div>
    </div>
  )
}
