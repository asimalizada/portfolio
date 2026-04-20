import { posts } from '@/.velite'

export async function GET() {
  const siteUrl = 'https://asimalizada.vercel.app' // TODO: update to your custom domain if bought later

  const publishedPosts = posts
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Asim Alizada | Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Thoughts on software engineering, architecture, and the craft of building.</description>
    <language>en</language>
    <atom:link href="${siteUrl}/rss" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${publishedPosts
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/blog/${post.slugAsParams}</link>
      <guid>${siteUrl}/blog/${post.slugAsParams}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      ${post.tags.map((t) => `<category>${t}</category>`).join('\n      ')}
    </item>`
      )
      .join('')}
  </channel>
</rss>`

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  })
}
