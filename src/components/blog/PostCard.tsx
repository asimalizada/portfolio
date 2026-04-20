import { Link } from '@/i18n/navigation'
import { ArrowUpRight, Calendar, Clock, Tag } from 'lucide-react'
import { format } from 'date-fns'

interface PostCardProps {
  title: string
  excerpt: string
  slug: string
  date: string
  tags: string[]
  readingTime: number
}

export function PostCard({ title, excerpt, slug, date, tags, readingTime }: PostCardProps) {
  return (
    <Link href={`/blog/${slug}`} id={`post-card-${slug}`} className="group h-full block">
      <article
        className="card p-8 h-full flex flex-col gap-5 cursor-pointer transition-all duration-300 group-hover:border-[var(--accent-hex)] group-hover:shadow-[0_0_30px_rgba(var(--accent-rgb),0.15)] relative overflow-hidden"
        style={{ minHeight: '260px' }}
      >
        {/* Glow effect on hover */}
        <div 
          className="absolute -inset-px opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br from-accent to-transparent pointer-events-none"
          style={{ background: 'var(--accent-hex)' }}
        />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 relative z-10">
          {tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border"
              style={{ 
                background: 'rgba(var(--accent-rgb), 0.1)', 
                borderColor: 'rgba(var(--accent-rgb), 0.2)',
                color: 'var(--accent-hex)'
              }}
            >
              {tag}
            </span>
          ))}
        </div>
 
        <div className="flex flex-col gap-3 relative z-10 flex-1">
          {/* Title */}
          <h2
            className="font-bold text-xl leading-snug group-hover:text-accent transition-colors duration-300"
            style={{ color: 'rgb(var(--text-primary))' }}
          >
            {title}
          </h2>

          {/* Excerpt */}
          <p
            className="text-sm leading-relaxed line-clamp-3"
            style={{ color: 'rgb(var(--text-secondary))' }}
          >
            {excerpt}
          </p>
        </div>

        {/* Meta */}
        <div className="flex items-center justify-between pt-6 border-t relative z-10" style={{ borderColor: 'var(--border-color)' }}>
          <div className="flex items-center gap-4 text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>
            <span className="flex items-center gap-1.5">
              <Calendar size={13} className="opacity-70" />
              {format(new Date(date), 'MMM d, yyyy')}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} className="opacity-70" />
              {readingTime} min read
            </span>
          </div>
          
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-card border border-border group-hover:bg-accent group-hover:text-white transition-all duration-300 shadow-sm" style={{ borderColor: 'var(--border-color)' }}>
             <ArrowUpRight size={14} />
          </div>
        </div>
      </article>
    </Link>
  )
}
