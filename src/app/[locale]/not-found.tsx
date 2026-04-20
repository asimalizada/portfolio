'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div
        className="max-w-lg w-full text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Terminal window */}
        <div className="terminal text-left mb-8">
          <div className="terminal-bar">
            <span className="terminal-dot" style={{ background: '#ff5f57' }} />
            <span className="terminal-dot" style={{ background: '#febc2e' }} />
            <span className="terminal-dot" style={{ background: '#28c840' }} />
            <span className="ml-4 text-xs font-mono" style={{ color: '#8b949e' }}>
              ~/asim - bash
            </span>
          </div>
          <div className="terminal-body">
            <div className="mb-2">
              <span className="terminal-prompt">❯ </span>
              <span className="terminal-highlight">curl -I this-page</span>
            </div>
            <div className="terminal-output mb-1">HTTP/1.1 <span style={{ color: '#f85149' }}>404</span> Not Found</div>
            <div className="terminal-output mb-2">Content-Type: text/html</div>
            <div className="mb-1">
              <span className="terminal-prompt">❯ </span>
              <span className="terminal-highlight">echo $?</span>
            </div>
            <div className="terminal-output">1 (page does not exist)</div>
            <div className="mt-3">
              <span className="terminal-prompt">❯ </span>
              <span className="cursor-blink" />
            </div>
          </div>
        </div>

        <h1 className="text-6xl font-black mb-2" style={{ color: 'var(--accent-hex)' }}>
          404
        </h1>
        <p className="text-lg font-medium mb-2" style={{ color: 'rgb(var(--text-primary))' }}>
          Page not found
        </p>
        <p className="text-sm mb-8" style={{ color: 'rgb(var(--text-secondary))' }}>
          The route you requested doesn&apos;t exist. Maybe it was moved, deleted, or never existed.
        </p>

        <div className="flex gap-3 justify-center">
          <Link href="/" id="not-found-home" className="btn btn-primary">
            Go Home
          </Link>
          <Link href="/blog" id="not-found-blog" className="btn btn-secondary">
            Read the Blog
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
