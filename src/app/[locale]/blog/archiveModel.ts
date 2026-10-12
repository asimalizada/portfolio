export type PublicationFormat = 'article' | 'video' | 'article-video'

export type ArchiveEntry = {
  slug: string
  title: string
  excerpt: string
  date: string
  tags: string[]
  category?: string
  format: PublicationFormat
  minutes: number
  videoUrl?: string
  videoDuration?: string
  relatedArticleSlug?: string
}

export type ArchiveQuery = {
  q?: string
  topic?: string
  sort?: string
  page?: string
}

export const DISCOVERY_THRESHOLD = 8
export const PAGE_SIZE = 12

export function formatLabel(format: PublicationFormat) {
  if (format === 'article-video') return 'Article + video'
  return format === 'video' ? 'Video' : 'Article'
}

export function publicationTopics(entry: ArchiveEntry) {
  return [...new Set([entry.category, ...entry.tags].filter((value): value is string => Boolean(value)))]
}

export function archiveView(entries: ArchiveEntry[], query: ArchiveQuery) {
  const chronological = [...entries].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime() || a.slug.localeCompare(b.slug)
  )
  const latest = chronological[0]
  const topics = [...new Set(chronological.flatMap(publicationTopics))].sort((a, b) => a.localeCompare(b))
  const search = (query.q ?? '').trim()
  const topic = topics.includes(query.topic ?? '') ? query.topic ?? '' : ''
  const sort = query.sort === 'oldest' ? 'oldest' : 'latest'
  const isMatch = (entry: ArchiveEntry) => {
    const matchesTopic = !topic || publicationTopics(entry).includes(topic)
    const text = [entry.title, entry.excerpt, entry.category, ...entry.tags].filter(Boolean).join(' ').toLocaleLowerCase()
    return matchesTopic && (!search || text.includes(search.toLocaleLowerCase()))
  }
  const featured = latest && isMatch(latest) ? latest : undefined
  const matchedArchive = chronological.slice(1).filter(isMatch)
  if (sort === 'oldest') matchedArchive.reverse()

  const pageCount = Math.max(1, Math.ceil(matchedArchive.length / PAGE_SIZE))
  const requestedPage = Number(query.page)
  const page = Number.isSafeInteger(requestedPage) && requestedPage > 0
    ? Math.min(requestedPage, pageCount)
    : 1
  const visibleArchive = matchedArchive.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return {
    latest,
    featured,
    topics,
    search,
    topic,
    sort,
    page,
    pageCount,
    visibleArchive,
    archiveCount: matchedArchive.length,
    discoveryEnabled: entries.length >= DISCOVERY_THRESHOLD,
    hasResults: Boolean(featured) || matchedArchive.length > 0,
  }
}
