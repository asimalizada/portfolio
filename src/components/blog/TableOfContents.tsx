'use client'

import { useEffect, useState, useRef } from 'react'

interface TocEntry {
  title: string
  url: string
  depth: number
  items?: TocEntry[]
}

interface TableOfContentsProps {
  toc: TocEntry[]
}

export function TableOfContents({ toc }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const headings = document.querySelectorAll('h2, h3, h4')
    if (!headings.length) return

    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '0px 0px -70% 0px', threshold: 0 }
    )

    headings.forEach((h) => observer.current?.observe(h))
    return () => observer.current?.disconnect()
  }, [])

  if (!toc.length) return null

  const flatToc = flattenToc(toc)

  return (
    <nav aria-label="Table of contents" className="hidden xl:block sticky top-24 self-start">
      <p
        className="text-xs font-semibold uppercase tracking-widest mb-3"
        style={{ color: 'rgb(var(--text-secondary))' }}
      >
        On this page
      </p>
      <ul className="space-y-1.5 max-h-[60vh] overflow-y-auto pr-2">
        {flatToc.map((item) => {
          const id = item.url.replace('#', '')
          const isActive = activeId === id
          return (
            <li key={item.url}>
              <a
                href={item.url}
                className="block text-xs leading-relaxed transition-all duration-150"
                style={{
                  color: isActive ? 'var(--accent-hex)' : 'rgb(var(--text-secondary))',
                  fontWeight: isActive ? '600' : '400',
                  borderLeft: isActive ? '2px solid var(--accent-hex)' : '2px solid transparent',
                  paddingLeft: `${(item.depth - 2) * 12 + 8}px`,
                }}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                {item.title}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

function flattenToc(items: TocEntry[], depth = 2): (TocEntry & { depth: number })[] {
  return items.flatMap((item) => [
    { ...item, depth },
    ...(item.items ? flattenToc(item.items, depth + 1) : []),
  ])
}
