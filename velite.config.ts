import { defineConfig, defineCollection, s } from 'velite'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeShiki from '@shikijs/rehype'
import remarkGfm from 'remark-gfm'

const posts = defineCollection({
  name: 'Post',
  pattern: 'blog/**/*.mdx',
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(120),
      excerpt: s.string().max(999),
      date: s.isodate(),
      tags: s.array(s.string()).default([]),
      published: s.boolean().default(true),
      cover: s.image().optional(),
      body: s.mdx(),
      raw: s.raw(),
    })
    .transform((data) => ({
      ...data,
      slugAsParams: data.slug.split('/').slice(1).join('/'),
    })),
})

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: { posts },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      [
        rehypeShiki,
        {
          themes: { dark: 'github-dark-dimmed', light: 'github-light' },
          addLanguageClass: true,
        },
      ],
    ],
    remarkPlugins: [remarkGfm],
  },
})
