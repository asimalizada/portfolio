'use client'

import Giscus from '@giscus/react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function GiscusComments() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className="mt-16 pt-8 border-t" style={{ borderColor: 'var(--border-color)' }}>
      <h3 className="text-lg font-semibold mb-6" style={{ color: 'rgb(var(--text-primary))' }}>
        Comments
      </h3>
      <Giscus
        id="giscus-comments"
        repo="asimalizada/portfolio"
        repoId="R_kgDOSIE4-A"
        category="General"
        categoryId="DIC_kwDOSIE4-M4C7Txh"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={theme === 'dark' ? 'dark_dimmed' : 'light'}
        lang="en"
        loading="lazy"
      />
    </div>
  )
}
