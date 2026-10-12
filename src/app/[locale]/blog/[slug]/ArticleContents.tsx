'use client'

import { useCallback, useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react'
import articleStyles from './article.module.css'
import styles from './ArticleContents.module.css'

type Heading = { id: string; title: string; level: 2 | 3 }
const READING_OFFSET = 96

export function ArticleContents({ children, expectedHeadingCount }: { children: ReactNode; expectedHeadingCount: number }) {
  const columnRef = useRef<HTMLDivElement>(null)
  const pendingTargetRef = useRef<string | null>(null)
  const pendingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const updateActiveRef = useRef<() => void>(() => {})
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState('')
  const [ready, setReady] = useState(false)
  const showContents = ready ? headings.length >= 4 : expectedHeadingCount >= 4

  const holdActive = useCallback((id: string) => {
    pendingTargetRef.current = id
    setActiveId(id)
    if (pendingTimerRef.current) clearTimeout(pendingTimerRef.current)
    // scrollend covers normal navigation; this releases the hold if scrolling is interrupted.
    pendingTimerRef.current = setTimeout(() => {
      pendingTargetRef.current = null
      updateActiveRef.current()
    }, 1800)
  }, [])

  useEffect(() => {
    const elements = Array.from(columnRef.current?.querySelectorAll<HTMLElement>(
      '[data-article-prose] h2[id], [data-article-prose] h3[id]'
    ) ?? [])
    const extracted = elements.map((element): Heading => ({
      id: element.id,
      title: element.textContent?.trim() ?? '',
      level: element.tagName === 'H2' ? 2 : 3,
    }))
    const dataFrame = requestAnimationFrame(() => {
      setHeadings(extracted)
      setReady(true)
    })

    if (elements.length < 4) return () => cancelAnimationFrame(dataFrame)

    const navbar = document.querySelector<HTMLElement>('.header-blur')
    const updateActive = () => {
      if (pendingTargetRef.current) return
      const activationLine = (navbar?.offsetHeight ?? 64) + READING_OFFSET
      let current = elements[0]
      for (const element of elements) {
        if (element.getBoundingClientRect().top > activationLine) break
        current = element
      }
      setActiveId((previous) => previous === current.id ? previous : current.id)
    }
    updateActiveRef.current = updateActive
    let scrollFrame = 0
    const scheduleUpdate = () => {
      if (scrollFrame) return
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0
        updateActive()
      })
    }
    const finishNavigation = () => {
      if (pendingTimerRef.current) clearTimeout(pendingTimerRef.current)
      pendingTimerRef.current = null
      pendingTargetRef.current = null
      scheduleUpdate()
    }
    const syncLocation = () => {
      let hashId = window.location.hash.slice(1)
      try { hashId = decodeURIComponent(hashId) } catch { /* Keep malformed fragments inert. */ }
      const target = elements.find((element) => element.id === hashId)
      if (target) holdActive(target.id)
      else scheduleUpdate()
    }
    const initialFrame = requestAnimationFrame(syncLocation)
    const onHistoryChange = () => requestAnimationFrame(syncLocation)
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    window.addEventListener('hashchange', onHistoryChange)
    window.addEventListener('popstate', onHistoryChange)
    document.addEventListener('scrollend', finishNavigation)

    return () => {
      cancelAnimationFrame(dataFrame)
      cancelAnimationFrame(initialFrame)
      cancelAnimationFrame(scrollFrame)
      if (pendingTimerRef.current) clearTimeout(pendingTimerRef.current)
      pendingTimerRef.current = null
      pendingTargetRef.current = null
      updateActiveRef.current = () => {}
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      window.removeEventListener('hashchange', onHistoryChange)
      window.removeEventListener('popstate', onHistoryChange)
      document.removeEventListener('scrollend', finishNavigation)
    }
  }, [expectedHeadingCount, holdActive])

  function navigate(event: MouseEvent<HTMLAnchorElement>, id: string) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    const target = document.getElementById(id)
    if (!target) return
    event.preventDefault()
    const hash = `#${encodeURIComponent(id)}`
    if (window.location.hash !== hash) window.history.pushState(null, '', hash)
    holdActive(id)
    target.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  const links = (
    <ol className={styles.list}>
      {headings.map((heading) => (
        <li key={heading.id}>
          <a
            href={`#${encodeURIComponent(heading.id)}`}
            className={`${styles.link} ${heading.level === 3 ? styles.nested : ''}`}
            aria-current={activeId === heading.id ? 'location' : undefined}
            onClick={(event) => navigate(event, heading.id)}
          >
            {heading.title}
          </a>
        </li>
      ))}
    </ol>
  )

  return (
    <div className={articleStyles.readingGrid}>
      <div className={articleStyles.readingColumn} ref={columnRef}>
        {showContents && (
          <details className={styles.mobile}>
            <summary>Contents</summary>
            <nav aria-label="Article contents">{links}</nav>
          </details>
        )}
        {children}
      </div>
      {showContents && (
        <aside className={styles.sidebar}>
          <nav aria-label="On this page">
            <p className={styles.label}>On this page</p>
            {links}
          </nav>
        </aside>
      )}
    </div>
  )
}
