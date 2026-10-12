'use client'

import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { createPortal } from 'react-dom'
import { ALL_COMMAND_NAMES, getCommandOutput, getInitialLines, type Line } from './terminalEngine'
import styles from './SystemConsole.module.css'

function ConsoleLine({ line }: { line: Line }) {
  if (line.type === 'blank') return <div className={styles.blankLine} aria-hidden="true" />
  return (
    <div className={`${styles.line} ${styles[line.type]}`}>
      {line.type === 'prompt' && <span aria-hidden="true">❯ </span>}
      {line.text}
    </div>
  )
}

export function SystemConsole() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [lines, setLines] = useState<Line[]>(getInitialLines)
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [historyIdx, setHistoryIdx] = useState(-1)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [suggIdx, setSuggIdx] = useState(-1)

  const triggerRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const panelRef = useRef<HTMLElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    const trigger = triggerRef.current
    document.body.style.overflow = 'hidden'
    const focusFrame = requestAnimationFrame(() => inputRef.current?.focus())

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
        return
      }

      if (event.key !== 'Tab' || !panelRef.current) return
      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled])'))
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      cancelAnimationFrame(focusFrame)
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
      trigger?.focus()
    }
  }, [open])

  useEffect(() => {
    if (open && bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [lines, open])

  function handleInputChange(value: string) {
    setInput(value)
    setHistoryIdx(-1)
    if (value.trim()) {
      setSuggestions(ALL_COMMAND_NAMES.filter((name) => name.startsWith(value.toLowerCase())).slice(0, 5))
      setSuggIdx(-1)
    } else {
      setSuggestions([])
      setSuggIdx(-1)
    }
  }

  function execute(command: string) {
    const trimmed = command.trim()
    if (!trimmed) return
    const result = getCommandOutput(trimmed, cmdHistory)
    setSuggestions([])
    setSuggIdx(-1)
    setInput('')
    if (result === 'clear') { setLines([]); return }
    if (result === 'exit') {
      setLines((previous) => [...previous, { type: 'prompt', text: trimmed }, { type: 'output', text: '  Goodbye! 👋' }, { type: 'blank' }])
      setTimeout(() => setOpen(false), 350)
      return
    }
    setLines((previous) => [...previous, { type: 'prompt', text: trimmed }, ...result, { type: 'blank' }])
    setCmdHistory((previous) => [trimmed, ...previous])
    setHistoryIdx(-1)
  }

  function handleInputKeyDown(event: ReactKeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      execute(suggIdx >= 0 ? suggestions[suggIdx] : input)
    } else if (event.key === 'Tab') {
      if (!suggestions.length) return
      event.preventDefault()
      setInput(suggestions[Math.max(0, suggIdx)])
      setSuggestions([])
      setSuggIdx(-1)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (suggestions.length) {
        setSuggIdx((previous) => Math.max(0, previous - 1))
      } else {
        const nextIndex = Math.min(historyIdx + 1, cmdHistory.length - 1)
        if (nextIndex >= 0) { setHistoryIdx(nextIndex); setInput(cmdHistory[nextIndex]) }
      }
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (suggestions.length) {
        setSuggIdx((previous) => Math.min(suggestions.length - 1, previous + 1))
      } else if (historyIdx > 0) {
        const nextIndex = historyIdx - 1
        setHistoryIdx(nextIndex)
        setInput(cmdHistory[nextIndex])
      } else { setHistoryIdx(-1); setInput('') }
    }
  }

  function completeSuggestion() {
    if (!suggestions.length) return
    setInput(suggestions[suggIdx >= 0 ? suggIdx : 0])
    setSuggestions([])
    setSuggIdx(-1)
    inputRef.current?.focus()
  }

  return (
    <>
      <button
        ref={triggerRef}
        id="system-console-trigger"
        className={styles.trigger}
        type="button"
        aria-label="Open system console"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="system-console"
        onClick={() => setOpen(true)}
      >
        <span aria-hidden="true">&gt;_</span>
      </button>

      {open && createPortal(
        <div className={styles.drawerRoot}>
          <div className={styles.backdrop} onPointerDown={() => setOpen(false)} aria-hidden="true" />
          <section
            ref={panelRef}
            id="system-console"
            role="dialog"
            aria-modal="true"
            aria-labelledby="system-console-title"
            className={styles.panel}
          >
            <header className={styles.panelHeader}>
              <div>
                <p className={styles.eyebrow}>Utility / 01</p>
                <h2 id="system-console-title">System console</h2>
              </div>
              <button className={styles.close} type="button" onClick={() => setOpen(false)} aria-label="Close system console">
                <span aria-hidden="true">×</span>
                <kbd>Esc</kbd>
              </button>
            </header>

            <div className={styles.sessionBar}>
              <span>~/asim — interactive session</span>
              <span>{ALL_COMMAND_NAMES.length} entries</span>
            </div>

            <div className={styles.transcript} ref={bodyRef} role="log" aria-live="polite" aria-relevant="additions text">
              {lines.map((line, index) => <ConsoleLine key={index} line={line} />)}
            </div>

            <div className={styles.inputArea}>
              {suggestions.length > 0 && (
                <div className={styles.suggestions} aria-label="Command suggestions">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={suggestion}
                      type="button"
                      className={`${styles.suggestion} ${index === suggIdx ? styles.selectedSuggestion : ''}`}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => { execute(suggestion); inputRef.current?.focus() }}
                      onMouseEnter={() => setSuggIdx(index)}
                    >
                      <span aria-hidden="true">↳</span>{suggestion}
                    </button>
                  ))}
                </div>
              )}
              <div className={styles.inputRow}>
                <span className={styles.prompt} aria-hidden="true">❯</span>
                <input
                  ref={inputRef}
                  id="terminal-input"
                  value={input}
                  onChange={(event) => handleInputChange(event.target.value)}
                  onKeyDown={handleInputKeyDown}
                  aria-label="Terminal command"
                  placeholder="Type a command, or try help"
                  inputMode="text"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                />
                {suggestions.length > 0 && <button type="button" className={styles.complete} onMouseDown={(event) => event.preventDefault()} onClick={completeSuggestion} aria-label="Autocomplete suggestion">Tab ↪</button>}
              </div>
              <p className={styles.inputHint}>Enter to run <span>/</span> ↑↓ history <span>/</span> Tab to complete</p>
            </div>
          </section>
        </div>,
        document.body,
      )}
    </>
  )
}
