import type { Metadata } from 'next'
import { posts } from '@/.velite'
import readingTime from 'reading-time'
import { Link } from '@/i18n/navigation'
import { BlogArchiveMotion } from './BlogArchiveMotion'
import { archiveView, formatLabel, type ArchiveEntry, type ArchiveQuery } from './archiveModel'
import styles from './blog.module.css'

export const metadata: Metadata = {
  title: 'Field Notes',
  description: 'Articles, technical breakdowns, and engineering stories.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Field Notes | Asim Alizada',
    description: 'Articles, technical breakdowns, and engineering stories.',
    url: '/blog',
    type: 'website',
    siteName: 'Asim Alizada',
  },
  twitter: {
    card: 'summary',
    title: 'Field Notes | Asim Alizada',
    description: 'Articles, technical breakdowns, and engineering stories.',
  },
}

const publicationDate = new Intl.DateTimeFormat('en', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

function ArticleActions({ entry, relatedHref }: { entry: ArchiveEntry; relatedHref?: string }) {
  const videoOnly = entry.format === 'video' && Boolean(entry.videoUrl)

  return (
    <div className={styles.articleActions}>
      {videoOnly ? (
        <a href={entry.videoUrl} target="_blank" rel="noopener noreferrer">
          Watch video <span aria-hidden="true">↗</span>
        </a>
      ) : (
        <Link href={`/blog/${entry.slug}`} id={`post-card-${entry.slug}`}>
          Read article <span aria-hidden="true">↗</span>
        </Link>
      )}
      {entry.videoUrl && !videoOnly && (
        <a href={entry.videoUrl} target="_blank" rel="noopener noreferrer">
          Watch video <span aria-hidden="true">↗</span>
        </a>
      )}
      {relatedHref && (
        <Link href={relatedHref}>Read companion <span aria-hidden="true">↗</span></Link>
      )}
    </div>
  )
}

function LatestPublication({ entry, relatedHref }: { entry: ArchiveEntry; relatedHref?: string }) {
  return (
    <section className={styles.latest} aria-labelledby="latest-title" data-blog-latest>
      <div className={styles.latestMeta}>
        <p>Latest publication</p>
        <time dateTime={entry.date}>{publicationDate.format(new Date(entry.date))}</time>
        {entry.category || entry.tags[0] ? <span>{entry.category ?? entry.tags[0]}</span> : null}
        {entry.format !== 'video' && <span>{entry.minutes} min read</span>}
        {entry.videoUrl && entry.videoDuration && <span>{entry.videoDuration} video</span>}
      </div>
      <div className={styles.latestContent}>
        <p className={styles.formatLabel}>{formatLabel(entry.format)}</p>
        <h2 id="latest-title">{entry.title}</h2>
        <p className={styles.latestSummary}>{entry.excerpt}</p>
        <ArticleActions entry={entry} relatedHref={relatedHref} />
      </div>
    </section>
  )
}

function DiscoveryToolbar({ view }: { view: ReturnType<typeof archiveView> }) {
  return (
    <form className={styles.discovery} method="get" role="search" aria-label="Find articles">
      <label className={styles.searchField}>
        <span>Search articles</span>
        <input key={view.search} type="search" name="q" defaultValue={view.search} placeholder="Title, topic, or keyword" />
      </label>
      <label className={styles.selectField}>
        <span>Topic</span>
        <select key={view.topic} name="topic" defaultValue={view.topic}>
          <option value="">All topics</option>
          {view.topics.map((topic) => <option key={topic} value={topic}>{topic}</option>)}
        </select>
      </label>
      <label className={styles.selectField}>
        <span>Order</span>
        <select key={view.sort} name="sort" defaultValue={view.sort}>
          <option value="latest">Latest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </label>
      <button type="submit">Apply <span aria-hidden="true">↗</span></button>
    </form>
  )
}

function pageHref(view: ReturnType<typeof archiveView>, page: number) {
  const params = new URLSearchParams()
  if (view.search) params.set('q', view.search)
  if (view.topic) params.set('topic', view.topic)
  if (view.sort === 'oldest') params.set('sort', 'oldest')
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return `/blog${query ? `?${query}` : ''}#publication-index`
}

export default async function BlogPage({ searchParams }: PageProps) {
  const publishedPosts = posts.filter((post) => post.published)
  const publishedSlugs = new Set(publishedPosts.flatMap((post) => [post.slug, post.slugAsParams]))
  const entries: ArchiveEntry[] = publishedPosts.map((post) => ({
      slug: post.slugAsParams,
      title: post.title,
      excerpt: post.excerpt,
      date: post.date,
      tags: post.tags,
      category: post.category,
      format: post.videoUrl ? (post.contentType === 'video' ? 'video' : 'article-video') : 'article',
      minutes: Math.ceil(readingTime(post.body).minutes),
      videoUrl: post.videoUrl,
      videoDuration: post.videoDuration,
      relatedArticleSlug: post.relatedArticleSlug,
  }))
  const raw = await searchParams
  const query: ArchiveQuery = entries.length >= 8
    ? { q: first(raw.q), topic: first(raw.topic), sort: first(raw.sort), page: first(raw.page) }
    : {}
  const view = archiveView(entries, query)
  const relatedHref = (entry: ArchiveEntry) =>
    entry.relatedArticleSlug && publishedSlugs.has(entry.relatedArticleSlug)
      ? `/blog/${entry.relatedArticleSlug.replace(/^blog\//, '')}`
      : undefined

  return (
    <div className={styles.page}>
      <BlogArchiveMotion />
      <div className="site-container">
        <header className={styles.introduction}>
          <p className={styles.eyebrow}>Writing archive</p>
          <div className={styles.introGrid}>
            <div>
              <h1>Field Notes.</h1>
              <p className={styles.publicationScope}>Underbyte / independent writing</p>
            </div>
            <p className={styles.introDescription}>Articles, technical breakdowns, and engineering stories.</p>
          </div>
        </header>

        {view.featured && <LatestPublication entry={view.featured} relatedHref={relatedHref(view.featured)} />}

        {(view.latest && (entries.length > 1 || view.discoveryEnabled)) && (
          <section id="publication-index" className={styles.index} aria-labelledby="index-title">
            <div className={styles.indexHeading}>
              <h2 id="index-title">Publication index</h2>
              <p>Older entries, in order</p>
            </div>
            {view.discoveryEnabled && <DiscoveryToolbar view={view} />}
            {view.visibleArchive.length > 0 ? (
              <ol className={styles.indexList} data-blog-reveal>
                {view.visibleArchive.map((entry) => {
                  const videoOnly = entry.format === 'video' && Boolean(entry.videoUrl)
                  return (
                    <li key={entry.slug} className={styles.indexRow}>
                      <time dateTime={entry.date}>{publicationDate.format(new Date(entry.date))}</time>
                      <span className={styles.indexTopic}>{entry.category ?? entry.tags[0] ?? ''}</span>
                      {videoOnly ? (
                        <a className={styles.indexTitle} href={entry.videoUrl} target="_blank" rel="noopener noreferrer">
                          {entry.title}<span className={styles.indexArrow} aria-hidden="true">↗</span>
                        </a>
                      ) : (
                        <Link className={styles.indexTitle} href={`/blog/${entry.slug}`} id={`post-card-${entry.slug}`}>
                          {entry.title}<span className={styles.indexArrow} aria-hidden="true">↗</span>
                        </Link>
                      )}
                      <span className={styles.indexFormat}>{formatLabel(entry.format)}</span>
                      <span className={styles.indexTime}>
                        {entry.format === 'video' ? (entry.videoDuration ? `${entry.videoDuration} video` : '') : `${entry.minutes} min read`}
                      </span>
                    </li>
                  )
                })}
              </ol>
            ) : (
              <p className={styles.emptyState}>{view.hasResults ? 'No older articles match these filters.' : 'No articles match these filters.'}</p>
            )}
            {view.pageCount > 1 && (
              <nav className={styles.pagination} aria-label="Article pages">
                {view.page > 1 && <Link href={pageHref(view, view.page - 1)}>← Previous</Link>}
                <div>
                  {Array.from({ length: view.pageCount }, (_, index) => index + 1).map((page) => (
                    <Link key={page} href={pageHref(view, page)} aria-current={page === view.page ? 'page' : undefined}>
                      {String(page).padStart(2, '0')}
                    </Link>
                  ))}
                </div>
                {view.page < view.pageCount && <Link href={pageHref(view, view.page + 1)}>Next →</Link>}
              </nav>
            )}
          </section>
        )}

        {!view.latest && <p className={styles.emptyState}>No articles published yet.</p>}
      </div>
    </div>
  )
}
