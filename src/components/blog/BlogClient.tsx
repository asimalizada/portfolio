'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search } from 'lucide-react'
import { PostCard } from '@/components/blog/PostCard'
import type { Post } from '@/.velite'
import readingTime from 'reading-time'

interface BlogClientProps {
  posts: Post[]
  allTags: string[]
}

export function BlogClient({ posts, allTags }: BlogClientProps) {
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState('All')

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchesTag = activeTag === 'All' || p.tags.includes(activeTag)
      const matchesQuery =
        !query ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(query.toLowerCase())
      return matchesTag && matchesQuery
    })
  }, [posts, query, activeTag])

  return (
    <>
      {/* Search + Tags container */}
      <div className="flex flex-col items-center gap-5 relative z-10 w-full max-w-4xl px-4">
        {/* Search Bar Wrapper */}
        <div className="relative w-full group mt-2">
          <div 
            className="absolute -inset-1 blur-lg opacity-10 group-hover:opacity-20 transition-opacity rounded-full pointer-events-none"
            style={{ background: 'var(--accent-hex)' }}
          />
          <Search
            size={18}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-10"
            style={{ color: 'var(--accent-hex)' }}
          />
          <input
            id="blog-search"
            type="text"
            placeholder="Search articles by title, tags, or content..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-16 pr-8 h-14 rounded-full text-base outline-none transition-all duration-300 header-blur border shadow-md text-center"
            style={{ 
              borderColor: 'var(--border-color)', 
              color: 'rgb(var(--text-primary))',
              background: 'rgba(var(--bg-card), 0.4)'
            }}
          />
        </div>

        {/* Tags Wrapper */}
        <div className="flex gap-4 flex-wrap justify-center w-full mt-4">
          {['All', ...allTags].map((tag) => (
            <button
              key={tag}
              id={`tag-filter-${tag.toLowerCase()}`}
              onClick={() => setActiveTag(tag)}
              className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border cursor-pointer
                ${activeTag === tag 
                  ? 'bg-accent text-white border-accent shadow-lg shadow-accent/20 scale-105' 
                  : 'bg-card text-secondary border-transparent hover:border-border hover:bg-card-hover'
                }`}
              style={{
                backgroundColor: activeTag === tag ? 'var(--accent-hex)' : 'rgba(var(--bg-card), 0.6)',
                borderColor: activeTag === tag ? 'var(--accent-hex)' : 'var(--border-color)',
                color: activeTag === tag ? 'white' : 'rgb(var(--text-secondary))'
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Posts grid */}
      <AnimatePresence mode="popLayout">
        {filtered.length === 0 ? (
          <motion.p
            key="no-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-16 text-sm"
            style={{ color: 'rgb(var(--text-secondary))' }}
          >
            No posts found. Try a different search or tag.
          </motion.p>
        ) : (
          <div className="w-full flex justify-center pb-10 pt-5">
            <motion.div
              key="grid"
              className="flex flex-wrap justify-center gap-10 w-full max-w-6xl mt-5"
              layout
            >
              {filtered.map((post, i) => {
                const rt = readingTime(post.body)
                return (
                  <motion.div
                    key={post.slugAsParams}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ delay: i * 0.05, duration: 0.35 }}
                    className="w-full md:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-1.7rem)] max-w-md lg:max-w-none"
                  >
                    <PostCard
                      title={post.title}
                      excerpt={post.excerpt}
                      slug={post.slugAsParams}
                      date={post.date}
                      tags={post.tags}
                      readingTime={Math.ceil(rt.minutes)}
                    />
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
