'use client'

import * as runtime from 'react/jsx-runtime'
import { isValidElement, useMemo, type ReactNode } from 'react'
import { CodeBlock } from './CodeBlock'

interface MDXContentProps {
  code: string
  components?: Record<string, React.ComponentType<Record<string, unknown>>>
  omitHeading?: { title: string; id: string }
}

function headingText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(headingText).join('')
  if (isValidElement<{ children?: ReactNode }>(node)) return headingText(node.props.children)
  return ''
}

export function MDXContent({ code, components = {}, omitHeading }: MDXContentProps) {
  const Component = useMemo(() => {
    if (!code) return null
    try {
      // The code string already contains a return statement at the end from Velite
      const fn = new Function('runtime', 'components', `
        const { Fragment, jsx, jsxs } = runtime;
        ${code}
      `)
      const result = fn(runtime, components)
      // Fallback for various MDX versions
      return (result?.default || result) as React.ComponentType<{
        components?: Record<string, React.ComponentType<Record<string, unknown>>>
      }>
    } catch (err) {
      console.error('MDX Content Error:', err)
      return null
    }
  }, [code, components])

  if (!Component) return null

  const heading = ({ children, ...props }: Record<string, unknown>) =>
    omitHeading && props.id === omitHeading.id && headingText(children as ReactNode).trim() === omitHeading.title
      ? null
      : <h1 {...props}>{children as ReactNode}</h1>

  return <Component components={{ pre: CodeBlock, ...components, h1: heading }} />
}
