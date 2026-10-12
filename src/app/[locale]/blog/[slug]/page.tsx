import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { posts } from '@/.velite'
import { MDXContent } from '@/components/blog/MDXContent'
import { GiscusComments } from '@/components/blog/GiscusComments'
import { ReadingProgress } from '@/components/blog/ReadingProgress'
import { Link } from '@/i18n/navigation'
import readingTime from 'reading-time'
import { ArticleContents } from './ArticleContents'
import styles from './article.module.css'

interface PageProps {
  params: Promise<{ slug: string; locale: string }>
}

const publicationDate = new Intl.DateTimeFormat('en', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})

function beginsWithMatchingTitle(raw: string, title: string) {
  const firstHeading = raw.match(/^\s*#\s+(.+?)\s*(?:\r?\n|$)/)
  return firstHeading?.[1].replace(/\s+#+\s*$/, '').trim() === title.trim()
}

function headingCount(raw: string) {
  let fence: { marker: string; length: number } | null = null
  let count = 0
  for (const line of raw.split(/\r?\n/)) {
    const match = line.match(/^ {0,3}(`{3,}|~{3,})/)
    if (match) {
      const marker = match[1][0]
      if (!fence) fence = { marker, length: match[1].length }
      else if (fence.marker === marker && match[1].length >= fence.length) fence = null
      continue
    }
    if (!fence && /^ {0,3}#{2,3}(?:\s+|$)/.test(line)) count++
  }
  return count
}

export async function generateStaticParams() {
  return posts
    .filter((p) => p.published)
    .map((p) => ({
      locale: 'en',
      slug: p.slugAsParams,
    }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = posts.find((p) => p.slugAsParams === slug)
  if (!post || !post.published) return { title: 'Post Not Found', robots: { index: false } }
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slugAsParams}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slugAsParams}`,
      type: 'article',
      siteName: 'Asim Alizada',
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: 'summary',
      title: post.title,
      description: post.excerpt,
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = posts.find((p) => p.slugAsParams === slug)
  if (!post || !post.published) notFound()

  const minutes = Math.ceil(readingTime(post.raw).minutes)
  const topics = post.category ? [post.category, ...post.tags.filter((tag) => tag !== post.category)] : post.tags
  const body = post.body as string & { code?: string }
  const code = body.code || body
  const firstBodyHeadingId = beginsWithMatchingTitle(post.raw, post.title)
    ? code.match(/\.h1,\{id:"([^"]+)"/)?.[1]
    : undefined

  return (
    <>
      <ReadingProgress />
      <article className={styles.article}>
        <header className={styles.header}>
          <Link href="/blog" id="back-to-blog" className={styles.backLink}>
            <span aria-hidden="true">←</span> Back to Field Notes
          </Link>

          <div className={styles.headerGrid}>
            <p className={styles.headerLabel}>Field Notes / Article</p>
            <h1>{post.title}</h1>
            <div className={styles.metadata} aria-label="Article information">
              <div>
                <span>Published</span>
                <time dateTime={post.date}>{publicationDate.format(new Date(post.date))}</time>
              </div>
              <div>
                <span>Reading time</span>
                <span>{minutes} min read</span>
              </div>
              {topics.length > 0 && (
                <div>
                  <span>Topics</span>
                  <span>{topics.join(' / ')}</span>
                </div>
              )}
            </div>
          </div>
        </header>

        <ArticleContents key={post.slugAsParams} expectedHeadingCount={headingCount(post.raw)}>
          <div className={styles.prose} data-article-prose>
            <MDXContent code={code} omitHeading={firstBodyHeadingId ? { title: post.title, id: firstBodyHeadingId } : undefined} />
          </div>
          <div className={styles.comments}>
            <GiscusComments />
          </div>
        </ArticleContents>
      </article>
    </>
  )
}
