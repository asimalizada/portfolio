'use client'

import { isValidElement, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Check, Copy, WrapText } from 'lucide-react'
import styles from './CodeBlock.module.css'

const languageLabels: Record<string, string> = {
  csharp: 'C#',
  cs: 'C#',
  typescript: 'TypeScript',
  ts: 'TypeScript',
  javascript: 'JavaScript',
  js: 'JavaScript',
  python: 'Python',
  py: 'Python',
  bash: 'Bash',
  sh: 'Bash',
  sql: 'SQL',
  json: 'JSON',
}

const nonProgrammingLanguages = new Set(['text', 'plaintext', 'plain', 'none', 'ascii', 'mermaid'])

function languageFromCode(node: ReactNode): string | undefined {
  if (Array.isArray(node)) {
    for (const child of node) {
      const language = languageFromCode(child)
      if (language) return language
    }
  }
  if (isValidElement<{ className?: string; children?: ReactNode }>(node)) {
    if (node.type === 'code') {
      const language = node.props.className?.match(/(?:^|\s)language-([^\s]+)/)?.[1]
      if (language) return language.toLowerCase()
    }
    return languageFromCode(node.props.children)
  }
  return undefined
}

function plainText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(plainText).join('')
  if (isValidElement<{ children?: ReactNode }>(node)) return plainText(node.props.children)
  return ''
}

export function CodeBlock({ children, className, ...preProps }: Record<string, unknown>) {
  const content = children as ReactNode
  const language = languageFromCode(content)
  const [wrap, setWrap] = useState(false)
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle')
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const codeText = useMemo(() => plainText(content), [content])

  useEffect(() => () => {
    if (resetTimer.current) clearTimeout(resetTimer.current)
  }, [])

  if (!language || nonProgrammingLanguages.has(language)) {
    return <pre {...preProps} className={className as string | undefined}>{content}</pre>
  }

  const label = languageLabels[language] ?? language.replace(/[-_]/g, ' ')

  async function copyCode() {
    if (resetTimer.current) clearTimeout(resetTimer.current)
    try {
      await navigator.clipboard.writeText(codeText)
      setCopyState('copied')
    } catch {
      setCopyState('failed')
    }
    resetTimer.current = setTimeout(() => setCopyState('idle'), 2000)
  }

  return (
    <div className={`${styles.frame} ${wrap ? styles.wrapped : ''}`} role="group" aria-label={`${label} code example`}>
      <div className={styles.toolbar}>
        <span className={styles.language}>{label}</span>
        <div className={styles.actions}>
          <button type="button" className={styles.control} aria-label={`Toggle word wrap for ${label} code`} aria-pressed={wrap} onClick={() => setWrap((value) => !value)}>
            {wrap ? <Check size={14} strokeWidth={1.8} aria-hidden="true" /> : <WrapText size={14} strokeWidth={1.8} aria-hidden="true" />}
            <span>Wrap</span>
          </button>
          <button type="button" className={`${styles.control} ${styles.copyControl}`} aria-label={`Copy ${label} code`} onClick={copyCode}>
            {copyState === 'copied' ? <Check size={14} strokeWidth={1.8} aria-hidden="true" /> : <Copy size={14} strokeWidth={1.8} aria-hidden="true" />}
            <span>{copyState === 'copied' ? 'Copied' : copyState === 'failed' ? 'Copy failed' : 'Copy'}</span>
          </button>
        </div>
      </div>
      <span className={styles.srOnly} role="status" aria-live="polite">
        {copyState === 'copied' ? 'Code copied to clipboard.' : copyState === 'failed' ? 'Unable to copy code.' : ''}
      </span>
      <pre {...preProps} className={`${className ?? ''} ${styles.code}`.trim()}>{content}</pre>
    </div>
  )
}
