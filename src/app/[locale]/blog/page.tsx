import type { Metadata } from 'next'
import { posts } from '@/.velite'
import { BlogClient } from '@/components/blog/BlogClient'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts on software engineering, architecture, and the craft of building great software.',
}

export default function BlogPage() {
  const publishedPosts = posts
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const allTags = [...new Set(publishedPosts.flatMap((p) => p.tags))].sort()

  return (
    <div className="w-full flex flex-col items-center py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-10 blur-[120px] pointer-events-none"
        style={{ background: 'var(--accent-hex)' }}
      />

      {/* Header container with explicit max-width and centering */}
      <div className="max-w-6xl w-full px-4 flex flex-col items-center text-center relative z-10 mb-5">
        <h1
          className="text-5xl md:text-6xl font-black tracking-tight mb-4"
          style={{ color: 'rgb(var(--text-primary))' }}
        >
          <span className="gradient-text">Blog</span>
        </h1>
        <p className="text-lg md:text-xl max-w-2xl" style={{ color: 'rgb(var(--text-secondary))' }}>
          Thoughts on software engineering, architecture, and the craft of building scalable systems.
        </p>
        
        <div className="flex items-center gap-4 mt-8">
          <div className="badge badge-accent px-4 py-1.5 text-sm">
            {publishedPosts.length} posts
          </div>
          <div className="badge px-4 py-1.5 text-sm" style={{ borderColor: 'var(--border-color)' }}>
            {allTags.length} topics
          </div>
        </div>
      </div>

      {/* Main content area forced to center */}
      <div className="max-w-6xl w-full px-4 flex flex-col items-center">
        <BlogClient posts={publishedPosts} allTags={allTags} />
      </div>
    </div>
  )
}
