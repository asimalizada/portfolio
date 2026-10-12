import type { MetadataRoute } from 'next'
import { posts } from '@/.velite'
import { SITE_URL } from '@/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ['/', '/projects', '/blog', '/uses']

  return [
    ...staticPaths.map((path) => ({ url: new URL(path, SITE_URL).toString() })),
    ...posts
      .filter((post) => post.published)
      .map((post) => ({
        url: new URL(`/blog/${post.slugAsParams}`, SITE_URL).toString(),
        lastModified: new Date(post.date),
      })),
  ]
}
