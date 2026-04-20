'use client'

import * as runtime from 'react/jsx-runtime'
import { useMemo, useState, useEffect } from 'react'

interface MDXContentProps {
  code: string
  components?: Record<string, React.ComponentType<Record<string, unknown>>>
}

export function MDXContent({ code, components = {} }: MDXContentProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const Component = useMemo(() => {
    if (!code) return null
    try {
      // The code string already contains a return statement at the end from Velite
      // eslint-disable-next-line no-new-func
      const fn = new Function('runtime', 'components', `
        const { Fragment, jsx, jsxs } = runtime;
        ${code}
      `)
      const result = fn(runtime, components)
      // Fallback for various MDX versions
      return (result?.default || result) as React.ComponentType
    } catch (err) {
      console.error('MDX Content Error:', err)
      return null
    }
  }, [code, components])

  if (!mounted || !Component) return null

  return <Component />
}
