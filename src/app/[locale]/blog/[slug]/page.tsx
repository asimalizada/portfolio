import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { posts } from '@/.velite'
import { MDXContent } from '@/components/blog/MDXContent'
import { TableOfContents } from '@/components/blog/TableOfContents'
import { GiscusComments } from '@/components/blog/GiscusComments'
import { ReadingProgress } from '@/components/blog/ReadingProgress'
import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-react'
import { format } from 'date-fns'
import { Link } from '@/i18n/navigation'
import readingTime from 'reading-time'

interface PageProps {
  params: Promise<{ slug: string; locale: string }>
}

export async function generateStaticParams() {
  return posts
    .filter((p) => p.published)
    .map((p) => ({ slug: p.slugAsParams }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = posts.find((p) => p.slugAsParams === slug)
  if (!post) return { title: 'Post Not Found' }
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = posts.find((p) => p.slugAsParams === slug)
  if (!post || !post.published) notFound()

  const rt = readingTime(JSON.stringify(post.body))
  const mins = Math.ceil(rt.minutes)

  return (
    <>
      <ReadingProgress />

      <div className="max-w-4xl mx-auto px-4 py-20 flex flex-col items-center">
        {/* Article */}
        <article className="w-full min-w-0">
          {/* Back link */}
          <div className="flex justify-start mb-10">
            <Link
              href="/blog"
              id="back-to-blog"
              className="inline-flex items-center gap-1.5 text-sm transition-colors hover:text-[var(--accent-hex)]"
              style={{ color: 'rgb(var(--text-secondary))' }}
            >
              <ArrowLeft size={14} />
              Back to Blog
            </Link>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span key={tag} className="badge badge-accent">
                <Tag size={10} />
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1
            className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-6"
            style={{ color: 'rgb(var(--text-primary))' }}
          >
            {post.title}
          </h1>

          {/* Meta */}
          <div
            className="flex flex-wrap items-center gap-4 text-sm mb-12 pb-8 border-b"
            style={{ color: 'rgb(var(--text-secondary))', borderColor: 'var(--border-color)' }}
          >
            <span className="flex items-center gap-1.5">
              <Calendar size={13} />
              {format(new Date(post.date), 'MMMM d, yyyy')}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} />
              {mins} min read
            </span>
          </div>

          {/* Layout with Content + ToC inside the centered container */}
          <div className="flex flex-col lg:flex-row gap-12 relative">
            <div className="flex-1 min-w-0">
              {/* MDX body */}
              <div className="prose prose-lg">
                <MDXContent code={post.body?.code || (post.body as any)} />
              </div>

              <div className="mt-16 pt-8 border-t" style={{ borderColor: 'var(--border-color)' }}>
                {/* Comments */}
                <GiscusComments />
              </div>
            </div>

            {/* ToC Sidebar - Only on desktop, sticky */}
            {post.body.toc && post.body.toc.length > 0 && (
              <aside className="hidden xl:block w-64 shrink-0">
                <div className="sticky top-24">
                  <TableOfContents toc={post.body.toc} />
                </div>
              </aside>
            )}
          </div>
        </article>
      </div>
    </>
  )
}
