'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Download, ArrowUpRight, Terminal as TerminalIcon, ChevronRight } from 'lucide-react'
import { cvData } from '@/content/data/cv'
import { projects } from '@/content/data/projects'

// ── Social Icons ───────────────────────────────
function GithubIcon({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.17A5.8 5.8 0 0 0 19 4.39a5.8 5.8 0 0 0-.5-3.39S17 1 14 3.26a12 12 0 0 0-4 0C7 1 5 1 5 1a5.8 5.8 0 0 0-.5 3.39A5.8 5.8 0 0 0 3 7.8c0 5.76 3.35 6.79 6.5 7.17A4.8 4.8 0 0 0 8.5 18v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}
function LinkedinIcon({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

// ── Types ──────────────────────────────────────
type LineType = 'prompt' | 'output' | 'error' | 'info' | 'section' | 'blank'
interface Line { type: LineType; text?: string }

// ── Jokes ──────────────────────────────────────
const JOKES = [
  "Why do programmers prefer dark mode? Because light attracts bugs. 🐛",
  "A SQL query walks into a bar, sees two tables and asks: 'Can I join you?' 🍺",
  "How many programmers does it take to change a light bulb? None — that's a hardware problem.",
  "Why do Java developers wear glasses? Because they don't C#. 😎",
  "There are 10 types of people: those who understand binary and those who don't.",
  "A programmer's wife says: 'Get a gallon of milk, and if they have eggs, get 12.' He came back with 12 gallons of milk.",
  "Why did the developer go broke? Because he used up all his cache. 💸",
  "Programmer: 'It works on my machine.' Boss: 'Ship your machine then.'",
  "A while loop walked into a bar... and kept coming back.",
  "Why was the JavaScript developer sad? Because he didn't Node how to Express himself. 😢",
  "What is a computer's favorite snack? Microchips. 🍟",
  "Why do programmers hate nature? Too many bugs and no debugger.",
  "// TODO: Write a funny joke here. (Written 3 years ago — still not done.)",
  "99 little bugs in the code... take one down, patch it around... 127 bugs. 🔁",
  "Debugging: Being the detective in a crime movie where you are also the murderer. 🔍",
]

// ── Command Registry ───────────────────────────
interface CommandDef { name: string; aliases: string[]; description: string }

const COMMAND_DEFS: CommandDef[] = [
  { name: 'whoami',        aliases: [],       description: 'Display identity info'       },
  { name: 'about',         aliases: [],       description: 'About me'                    },
  { name: 'skills',        aliases: [],       description: 'Skills by category'          },
  { name: 'stack',         aliases: [],       description: 'Full tech stack, grouped'    },
  { name: 'experience',    aliases: ['exp'],  description: 'Work experience'             },
  { name: 'education',     aliases: ['edu'],  description: 'Educational background'      },
  { name: 'projects',      aliases: [],       description: 'Featured projects'           },
  { name: 'contact',       aliases: [],       description: 'Contact information'         },
  { name: 'resume',        aliases: ['cv'],   description: 'Download link for resume'    },
  { name: 'blog',          aliases: [],       description: 'Blog page link'              },
  { name: 'status',        aliases: [],       description: 'Current work status'         },
  { name: 'availability',  aliases: [],       description: 'Availability & preferences'  },
  { name: 'languages',     aliases: ['lang'], description: 'Spoken languages'            },
  { name: 'timezone',      aliases: ['tz'],   description: 'Timezone info'               },
  { name: 'open source',   aliases: ['oss'],  description: 'Open source contributions'   },
  { name: 'ls',            aliases: [],       description: 'List directory'              },
  { name: 'date',          aliases: [],       description: 'Current date & time'         },
  { name: 'cat readme.md', aliases: [],       description: 'Read the readme'             },
  { name: 'history',       aliases: [],       description: 'Command history'             },
  { name: 'help',          aliases: ['?'],    description: 'Show all commands'           },
  { name: 'clear',         aliases: [],       description: 'Clear the terminal'          },
  { name: 'exit',          aliases: [],       description: 'Close the terminal'          },
  { name: 'joke',          aliases: [],       description: 'Tell me a joke'             },
  { name: 'coffee',        aliases: [],       description: 'Check fuel levels'           },
  { name: 'sudo',          aliases: [],       description: 'Attempt superuser access'    },
  { name: 'vim',           aliases: [],       description: 'Enter the void'             },
  { name: 'rm -rf /',      aliases: [],       description: '☠️ ...'                      },
  { name: 'ping asim',     aliases: [],       description: 'Ping the developer'         },
]

const ALL_COMMAND_NAMES = COMMAND_DEFS.flatMap(c => [c.name, ...c.aliases])

// ── Command Output ─────────────────────────────
function getCommandOutput(raw: string, cmdHistory: string[]): Line[] | 'clear' | 'exit' {
  const trimmed = raw.trim()
  const lower   = trimmed.toLowerCase()
  if (!trimmed) return []
  if (lower === 'clear') return 'clear'
  if (lower === 'exit')  return 'exit'

  if (lower === 'history') {
    if (!cmdHistory.length) return [{ type: 'info', text: '  No commands in history yet.' }]
    return cmdHistory.map((h, i) => ({ type: 'output' as LineType, text: `  ${String(i + 1).padStart(3)}  ${h}` }))
  }

  if (lower === 'whoami') return [
    { type: 'info',   text: `  👤  ${cvData.name}` },
    { type: 'output', text: `       Title    : ${cvData.title}` },
    { type: 'output', text: `       Location : ${cvData.location}` },
    { type: 'output', text: `       Timezone : ${cvData.timezone}` },
    { type: 'output', text: `       Email    : ${cvData.email}` },
  ]

  if (lower === 'about') return [
    { type: 'section', text: '  About' },
    { type: 'output',  text: `  ${cvData.summary}` },
  ]

  if (lower === 'skills') {
    const s = cvData.skills
    return [
      { type: 'section', text: '  Skills' },
      { type: 'info',    text: '  Languages :' }, { type: 'output', text: `    ${s.languages.join(' · ')}` },
      { type: 'info',    text: '  Backend   :' }, { type: 'output', text: `    ${s.backend.join(' · ')}` },
      { type: 'info',    text: '  Frontend  :' }, { type: 'output', text: `    ${s.frontend.join(' · ')}` },
      { type: 'info',    text: '  Databases :' }, { type: 'output', text: `    ${s.databases.join(' · ')}` },
      { type: 'info',    text: '  Cloud/Ops :' }, { type: 'output', text: `    ${s.cloud.join(' · ')}` },
    ]
  }

  if (lower === 'stack') {
    const s = cvData.skills
    return [
      { type: 'section', text: '  Full Tech Stack' },
      { type: 'info',    text: '  ► Languages'    }, { type: 'output', text: `    ${s.languages.join(' · ')}` },
      { type: 'info',    text: '  ► Backend'      }, { type: 'output', text: `    ${s.backend.join(' · ')}` },
      { type: 'info',    text: '  ► Frontend'     }, { type: 'output', text: `    ${s.frontend.join(' · ')}` },
      { type: 'info',    text: '  ► Databases'    }, { type: 'output', text: `    ${s.databases.join(' · ')}` },
      { type: 'info',    text: '  ► Cloud & DevOps' }, { type: 'output', text: `    ${s.cloud.join(' · ')}` },
      { type: 'info',    text: '  ► Architecture' }, { type: 'output', text: `    ${s.architecture.join(' · ')}` },
      { type: 'info',    text: '  ► Tools'        }, { type: 'output', text: `    ${s.tools.join(' · ')}` },
    ]
  }

  if (lower === 'experience' || lower === 'exp') {
    const lines: Line[] = [{ type: 'section', text: '  Work Experience' }]
    cvData.experience.forEach(e => {
      lines.push({ type: 'info',   text: `  ${e.role} @ ${e.company}${e.current ? '  ← current' : ''}` })
      lines.push({ type: 'output', text: `    ${e.period} · ${e.location}` })
      lines.push({ type: 'output', text: `    ${e.description}` })
      lines.push({ type: 'blank' })
    })
    return lines
  }

  if (lower === 'education' || lower === 'edu') {
    const lines: Line[] = [{ type: 'section', text: '  Education' }]
    cvData.education.forEach(e => {
      lines.push({ type: 'info',   text: `  ${e.degree} — ${e.field}` })
      lines.push({ type: 'output', text: `    ${e.institution}` })
      lines.push({ type: 'output', text: `    ${e.period}${e.gpa ? ' · GPA: ' + e.gpa : ''}` })
      lines.push({ type: 'blank' })
    })
    return lines
  }

  if (lower === 'projects') {
    const lines: Line[] = [{ type: 'section', text: '  Featured Projects' }]
    projects.filter(p => p.featured).forEach(p => {
      lines.push({ type: 'info',   text: `  ${p.title}  [${p.status}]` })
      if (p.role) lines.push({ type: 'info', text: `    Role: ${p.role}` })
      lines.push({ type: 'output', text: `    ${p.description}` })
      lines.push({ type: 'output', text: `    Tech: ${p.tech.join(', ')}` })
      if (p.github) lines.push({ type: 'output', text: `    ↳ ${p.github}` })
      if (p.demo)   lines.push({ type: 'output', text: `    ↳ ${p.demo}` })
      lines.push({ type: 'blank' })
    })
    return lines
  }

  if (lower === 'contact') return [
    { type: 'section', text: '  Contact' },
    { type: 'info',    text: '  Email    :' }, { type: 'output', text: `    ${cvData.email}` },
    { type: 'info',    text: '  GitHub   :' }, { type: 'output', text: `    ${cvData.github}` },
    { type: 'info',    text: '  LinkedIn :' }, { type: 'output', text: `    ${cvData.linkedin}` },
  ]

  if (lower === 'resume' || lower === 'cv') {
    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    return [
      { type: 'section', text: '  Resume' },
      { type: 'output',  text: '  Download your copy at:' },
      { type: 'info',    text: `    ${origin}${cvData.cvPath}` },
    ]
  }

  if (lower === 'blog') {
    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    return [
      { type: 'section', text: '  Blog' },
      { type: 'output',  text: '  Read my writings at:' },
      { type: 'info',    text: `    ${origin}/blog` },
    ]
  }

  if (lower === 'status') {
    const current = cvData.experience.filter(e => e.current)
    const lines: Line[] = [
      { type: 'section', text: '  Current Status' },
      { type: 'info',    text: `  ✅  ${cvData.currentStatus}` },
      { type: 'blank' },
    ]
    current.forEach(c => {
      lines.push({ type: 'output', text: `  Role    : ${c.role}` })
      lines.push({ type: 'output', text: `  Company : ${c.company}` })
      lines.push({ type: 'output', text: `  Since   : ${c.period.split('–')[0].trim()}` })
      lines.push({ type: 'blank' })
    })
    return lines
  }

  if (lower === 'availability') return [
    { type: 'section', text: '  Availability' },
    { type: 'info',    text: '  🟢  Open to new roles' },
    { type: 'output',  text: '  Type     : Remote · Full-time · Contract' },
    { type: 'output',  text: '  Focus    : Backend, Cloud-Native, Microservices' },
    { type: 'output',  text: `  Timezone : ${cvData.timezone} (flexible)` },
  ]

  if (lower === 'languages' || lower === 'lang') return [
    { type: 'section', text: '  Languages' },
    ...cvData.languages.map(l => ({ type: 'output' as LineType, text: `  ${l.lang.padEnd(16)}${l.level}` })),
  ]

  if (lower === 'timezone' || lower === 'tz') return [
    { type: 'output', text: `  Timezone  : ${cvData.timezone}` },
    { type: 'output', text: `  Location  : ${cvData.location}` },
    { type: 'info',   text: '  Flexible across timezones for remote work.' },
  ]

  if (lower === 'open source' || lower === 'oss') {
    const os = projects.filter(p => p.github)
    const lines: Line[] = [
      { type: 'section', text: '  Open Source' },
      { type: 'info',    text: `  GitHub: ${cvData.github}` },
      { type: 'blank' },
    ]
    os.forEach(p => {
      lines.push({ type: 'info',   text: `  ${p.title}` })
      lines.push({ type: 'output', text: `    ${p.github}` })
    })
    return lines
  }

  if (lower === 'ls') return [
    { type: 'output', text: '  📁 projects/    📄 blog/     📄 resume.pdf' },
    { type: 'output', text: '  📄 contact.txt  📄 skills.json' },
  ]

  if (lower === 'date') return [{
    type: 'output',
    text: `  ${new Date().toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })}`,
  }]

  if (lower === 'cat readme.md') return [
    { type: 'section', text: '  README.md' },
    { type: 'info',    text: '  # Asim Alizada — Portfolio' },
    { type: 'output',  text: '  A personal portfolio and blog.' },
    { type: 'output',  text: '  Built with Next.js 15, TypeScript, Framer Motion & MDX.' },
    { type: 'output',  text: '  Explore with the commands above.' },
    { type: 'output',  text: `  Source: ${cvData.github}/portfolio` },
  ]

  if (lower === 'help' || lower === '?') {
    const groups = [
      { label: '  ℹ  Info Commands',   cmds: COMMAND_DEFS.slice(0,  15) },
      { label: '  🛠  System Commands', cmds: COMMAND_DEFS.slice(15, 22) },
      { label: '  😄  Fun Commands',   cmds: COMMAND_DEFS.slice(22)     },
    ]
    const lines: Line[] = [{ type: 'section', text: '  Available Commands' }]
    groups.forEach(({ label, cmds }, gi) => {
      if (gi > 0) lines.push({ type: 'blank' })
      lines.push({ type: 'info', text: label })
      cmds.forEach(c => {
        const alias = c.aliases.length ? ` (${c.aliases.join(', ')})` : ''
        lines.push({ type: 'output', text: `    ${(c.name + alias).padEnd(28)} ${c.description}` })
      })
    })
    lines.push({ type: 'blank' })
    lines.push({ type: 'info',   text: '  ⌨  Keyboard Shortcuts' })
    lines.push({ type: 'output', text: '    ↑↓   Navigate history / suggestions' })
    lines.push({ type: 'output', text: '    Tab  Autocomplete' })
    lines.push({ type: 'output', text: '    ESC  Close terminal' })
    return lines
  }

  if (lower === 'joke') {
    const joke = JOKES[Math.floor(Math.random() * JOKES.length)]
    return [
      { type: 'info',   text: '  😄  Developer Joke:' },
      { type: 'output', text: `  "${joke}"` },
    ]
  }

  if (lower === 'coffee') return [
    { type: 'info',   text: '  ☕  Checking fuel levels...' },
    { type: 'output', text: '  Fuel level : 87%' },
    { type: 'output', text: '  Status     : Still running at full speed.' },
    { type: 'output', text: '  ETA empty  : Never (auto-refilled).' },
  ]

  if (lower === 'sudo') return [
    { type: 'output', text: '  [sudo] password for asim: ••••••••' },
    { type: 'error',  text: '  sudo: Permission denied. Nice try though. 😏' },
  ]

  if (lower === 'vim') return [
    { type: 'output', text: '  Opening vim...' },
    { type: 'error',  text: '  ⚠  Warning: You may never escape.' },
    { type: 'output', text: '  (Hint: try :q! if you dare)' },
  ]

  if (lower === 'rm -rf /') return [
    { type: 'error', text: '  rm: it is dangerous to operate recursively on /' },
    { type: 'error', text: '  Access denied. Protected by common sense. 😄' },
  ]

  if (lower === 'ping asim') return [
    { type: 'output', text: `  PING asimalizada.dev (${cvData.email})` },
    { type: 'info',   text: '  64 bytes · seq=1 · ttl=64 · time=1ms' },
    { type: 'output', text: "  Pong! 👋  I'm here — feel free to reach out." },
  ]

  return [
    { type: 'error',  text: `  bash: command not found: ${trimmed}` },
    { type: 'output', text: `  Type 'help' to see all available commands.` },
  ]
}

// ── Initial Lines ──────────────────────────────
function getInitialLines(): Line[] {
  return [
    { type: 'prompt', text: '$ whoami'     },
    { type: 'output', text: `  ${cvData.name}` },
    { type: 'prompt', text: '$ cat role'   },
    { type: 'output', text: `  ${cvData.title}` },
    { type: 'prompt', text: '$ ./status.sh' },
    { type: 'output', text: `  Building the future from ${cvData.location}` },
    { type: 'blank' },
    { type: 'info',   text: "  Type 'help' to see available commands." },
    { type: 'blank' },
  ]
}

// ── Line Renderer ──────────────────────────────
function renderLine(line: Line, idx: number): React.ReactNode {
  if (line.type === 'blank') return <div key={idx} style={{ height: '6px' }} />

  if (line.type === 'section') return (
    <div key={idx} className="font-mono text-xs font-bold mt-2 mb-1 pb-1"
      style={{ color: 'var(--accent-hex)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
      {line.text}
    </div>
  )

  if (line.type === 'prompt') return (
    <div key={idx} className="font-mono text-xs leading-relaxed font-semibold" style={{ color: 'var(--accent-hex)' }}>
      <span>❯ </span>{line.text}
    </div>
  )

  const colorMap = { output: 'rgb(var(--text-secondary))', error: '#f85149', info: 'var(--accent-hex)' } as const
  return (
    <div key={idx} className="font-mono text-xs leading-relaxed whitespace-pre-wrap"
      style={{ color: colorMap[line.type as 'output' | 'error' | 'info'], opacity: line.type === 'info' ? 0.85 : undefined }}>
      {line.text}
    </div>
  )
}

// ── Typewriter Hook ────────────────────────────
function useTypewriter(text: string, start: boolean, speed = 25) {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    if (!start) return
    setDisplayed('')
    let i = 0
    const id = setInterval(() => {
      if (i < text.length) setDisplayed(text.slice(0, ++i))
      else clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [text, start, speed])
  return displayed
}

// ── Collapsed Preview ──────────────────────────
const PREVIEW_LINES = [
  { prompt: '$ whoami',      output: cvData.name,                                    delay: 200  },
  { prompt: '$ cat role',    output: cvData.title,                                   delay: 900  },
  { prompt: '$ ./status.sh', output: `Building the future from ${cvData.location}`, delay: 1600 },
]

function PreviewLine({ prompt, output, active }: { prompt: string; output: string; active: boolean }) {
  const typedPrompt = useTypewriter(prompt, active, 30)
  const promptDone  = typedPrompt === prompt
  const typedOutput = useTypewriter(output, promptDone, 15)
  if (!active) return null
  return (
    <div className="mb-2">
      <div className="font-mono text-xs">
        <span style={{ color: 'var(--accent-hex)' }}>❯ </span>
        <span style={{ color: 'var(--accent-hex)', fontWeight: 600 }}>{typedPrompt}</span>
        {!promptDone && <span className="cursor-blink" />}
      </div>
      {promptDone && (
        <div className="font-mono text-xs pl-4" style={{ color: 'rgb(var(--text-secondary))' }}>
          {typedOutput}
          {typedOutput !== output && <span className="cursor-blink" />}
        </div>
      )}
    </div>
  )
}

function TerminalPreview() {
  const [phase, setPhase] = useState(0)
  useEffect(() => {
    PREVIEW_LINES.forEach((line, i) => setTimeout(() => setPhase(i + 1), line.delay))
  }, [])
  return (
    <div className="min-h-[160px]">
      {PREVIEW_LINES.map((line, i) => (
        <PreviewLine key={i} prompt={line.prompt} output={line.output} active={phase > i} />
      ))}
      {phase === PREVIEW_LINES.length && (
        <div className="font-mono text-xs mt-2">
          <span style={{ color: 'var(--accent-hex)' }}>❯ </span>
          <span className="cursor-blink" />
        </div>
      )}
    </div>
  )
}

// ── Interactive Terminal ────────────────────────
interface ITProps { isOpen: boolean; onOpen: () => void; onClose: () => void }

function InteractiveTerminal({ isOpen, onOpen, onClose }: ITProps) {
  const [input,       setInput]       = useState('')
  const [lines,       setLines]       = useState<Line[]>(getInitialLines)
  const [cmdHistory,  setCmdHistory]  = useState<string[]>([])
  const [historyIdx,  setHistoryIdx]  = useState(-1)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [suggIdx,     setSuggIdx]     = useState(-1)
  const [hovered,     setHovered]     = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const bodyRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const t = setTimeout(() => inputRef.current?.focus(), 100)
    return () => clearTimeout(t)
  }, [isOpen])

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [lines, isOpen])

  function handleInputChange(val: string) {
    setInput(val)
    setHistoryIdx(-1)
    if (val.trim()) {
      setSuggestions(ALL_COMMAND_NAMES.filter(n => n.startsWith(val.toLowerCase())).slice(0, 5))
      setSuggIdx(-1)
    } else {
      setSuggestions([])
      setSuggIdx(-1)
    }
  }

  function execute(cmd: string) {
    const trimmed = cmd.trim()
    if (!trimmed) return
    const result = getCommandOutput(trimmed, cmdHistory)
    setSuggestions([])
    setSuggIdx(-1)
    setInput('')
    if (result === 'clear') { setLines([]); return }
    if (result === 'exit') {
      setLines(p => [...p, { type: 'prompt', text: trimmed }, { type: 'output', text: '  Goodbye! 👋' }, { type: 'blank' }])
      setTimeout(() => onClose(), 350)
      return
    }
    setLines(p => [...p, { type: 'prompt', text: trimmed }, ...result, { type: 'blank' }])
    setCmdHistory(p => [trimmed, ...p])
    setHistoryIdx(-1)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      execute(suggIdx >= 0 ? suggestions[suggIdx] : input)
    } else if (e.key === 'Tab') {
      e.preventDefault()
      if (suggestions.length) { setInput(suggestions[Math.max(0, suggIdx)]); setSuggestions([]); setSuggIdx(-1) }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (suggestions.length) {
        setSuggIdx(p => Math.max(0, p - 1))
      } else {
        const ni = Math.min(historyIdx + 1, cmdHistory.length - 1)
        if (ni >= 0) { setHistoryIdx(ni); setInput(cmdHistory[ni]) }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (suggestions.length) {
        setSuggIdx(p => Math.min(suggestions.length - 1, p + 1))
      } else if (historyIdx > 0) {
        const ni = historyIdx - 1; setHistoryIdx(ni); setInput(cmdHistory[ni])
      } else { setHistoryIdx(-1); setInput('') }
    } else if (e.key === 'Escape') {
      if (suggestions.length) { setSuggestions([]); setSuggIdx(-1) }
      else onClose()
    }
  }

  const pulseKeyframes = [
    '0 0 0 0px rgba(var(--accent-rgb), 0)',
    '0 0 0 2px rgba(var(--accent-rgb), 0.35)',
    '0 0 0 0px rgba(var(--accent-rgb), 0)',
  ]
  const boxShadow = isOpen
    ? `0 0 0 1.5px var(--accent-hex), 0 0 40px rgba(var(--accent-rgb), 0.2), 0 20px 60px rgba(0,0,0,0.5)`
    : hovered
    ? `0 0 0 1px var(--accent-hex), 0 0 24px rgba(var(--accent-rgb), 0.15)`
    : undefined

  return (
    <motion.div
      className={`terminal w-full shadow-2xl ${!isOpen ? 'rotate-1 hover:rotate-0 transition-transform duration-500' : ''}`}
      style={{ cursor: isOpen ? 'default' : 'pointer' }}
      animate={{
        boxShadow: isOpen
          ? `0 0 0 1.5px var(--accent-hex), 0 0 40px rgba(var(--accent-rgb), 0.2), 0 20px 60px rgba(0,0,0,0.5)`
          : hovered
          ? `0 0 0 1px var(--accent-hex), 0 0 24px rgba(var(--accent-rgb), 0.15)`
          : pulseKeyframes,
      }}
      transition={{
        boxShadow: (!isOpen && !hovered)
          ? { repeat: Infinity, duration: 3, ease: 'easeInOut' }
          : { duration: 0.3 },
      }}
      onClick={!isOpen ? onOpen : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Title Bar ── */}
      <div className="terminal-bar flex items-center justify-between">
        <div className="flex items-center">
          <span className="terminal-dot" style={{ background: '#ff5f57' }} />
          <span className="terminal-dot" style={{ background: '#febc2e' }} />
          <span className="terminal-dot" style={{ background: '#28c840' }} />
          <span className="ml-3 text-xs font-mono" style={{ color: '#8b949e' }}>~/asim — bash</span>
        </div>
        <div className="pr-1 flex items-center">
          {/* Fix 2: Always-visible hint (0.45 opacity default, 1.0 on hover) */}
          {!isOpen && (
            <motion.span
              animate={{ opacity: hovered ? 1 : 0.45 }}
              transition={{ duration: 0.2 }}
              className="text-[10px] font-mono select-none"
              style={{ color: 'var(--accent-hex)' }}
            >
              tap · click to interact ↗
            </motion.span>
          )}
          {/* ESC button */}
          <AnimatePresence>
            {isOpen && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={e => { e.stopPropagation(); onClose() }}
                className="text-[10px] font-mono px-2 py-0.5 rounded border transition-colors"
                style={{ color: '#8b949e', borderColor: 'var(--border-color)', background: 'transparent' }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.color = '#f85149'; el.style.borderColor = '#f85149' }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.color = '#8b949e'; el.style.borderColor = 'var(--border-color)' }}
              >
                ESC
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Body ── Fix 1: overflow hidden when collapsed */}
      <motion.div
        ref={bodyRef}
        className="p-4 sm:p-5"
        animate={{ height: isOpen ? 320 : 185 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{ overflowY: isOpen ? 'auto' : 'hidden' }}
      >
        {isOpen
          ? <div className="space-y-0.5">{lines.map((l, i) => renderLine(l, i))}</div>
          : <TerminalPreview />
        }
      </motion.div>

      {/* ── Input Row ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{ borderTop: '1px solid var(--border-color)', overflow: 'hidden' }}
          >
            <div className="relative px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs flex-shrink-0" style={{ color: 'var(--accent-hex)' }}>❯</span>
                <input
                  ref={inputRef}
                  id="terminal-input"
                  value={input}
                  onChange={e => handleInputChange(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent font-mono text-xs outline-none"
                  style={{ color: 'rgb(var(--text-primary))', caretColor: 'var(--accent-hex)' }}
                  placeholder="type a command... (try 'help')"
                  inputMode="text"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                />
                {/* Fix 5: tab→ autocomplete button for mobile */}
                <AnimatePresence>
                  {suggestions.length > 0 && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.15 }}
                      onMouseDown={e => {
                        e.preventDefault()
                        const sel = suggestions[suggIdx >= 0 ? suggIdx : 0]
                        setInput(sel)
                        setSuggestions([])
                        setSuggIdx(-1)
                        inputRef.current?.focus()
                      }}
                      className="flex-shrink-0 font-mono text-[10px] px-2 py-1 rounded-md border transition-colors"
                      style={{ color: 'var(--accent-hex)', borderColor: 'rgba(var(--accent-rgb), 0.3)', background: 'rgba(var(--accent-rgb), 0.08)' }}
                      aria-label="Autocomplete"
                    >
                      tab →
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              {/* Fix 5: Suggestions — larger tap targets for mobile */}
              <AnimatePresence>
                {suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-2 right-2 bottom-full mb-1 rounded-lg overflow-hidden border shadow-2xl"
                    style={{ background: '#0d1117', borderColor: 'var(--border-color)', zIndex: 50 }}
                  >
                    {suggestions.map((s, i) => (
                      <div
                        key={s}
                        className="px-3 py-2.5 sm:py-1.5 font-mono text-xs cursor-pointer flex items-center gap-2 transition-colors"
                        style={{
                          background: i === suggIdx ? 'rgba(var(--accent-rgb), 0.12)' : 'transparent',
                          color: i === suggIdx ? 'var(--accent-hex)' : 'rgb(var(--text-secondary))',
                        }}
                        onMouseDown={e => { e.preventDefault(); execute(s) }}
                        onMouseEnter={() => setSuggIdx(i)}
                      >
                        <ChevronRight size={10} style={{ opacity: 0.5, flexShrink: 0 }} />
                        <span>{s}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── Profile Avatar ─────────────────────────────
function ProfileAvatar() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative mb-6 w-max mx-auto lg:mx-0"
    >
      <div className="absolute inset-0 rounded-full blur-md opacity-50 scale-110" style={{ background: 'var(--accent-hex)' }} />
      <div className="relative w-28 h-28 rounded-full overflow-hidden border-2" style={{ borderColor: 'var(--accent-hex)' }}>
        <Image src={cvData.profilePhoto} alt={cvData.name} fill sizes="112px" className="object-cover object-top" priority />
        <div className="absolute bottom-0 left-0 right-0 h-6" style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.35))' }} />
      </div>
      <span className="absolute bottom-0.5 right-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center" style={{ borderColor: 'var(--bg-primary, #0d1117)', background: '#22c55e' }}>
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping absolute" />
        <span className="w-1.5 h-1.5 rounded-full bg-white" />
      </span>
    </motion.div>
  )
}

// ── Social Link ────────────────────────────────
function SocialLink({ href, label, icon, id }: { href: string; label: string; icon: React.ReactNode; id: string }) {
  return (
    <a
      href={href} id={id} aria-label={label} target="_blank" rel="noopener noreferrer"
      className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 border"
      style={{ borderColor: 'var(--border-color)', color: 'rgb(var(--text-secondary))', background: 'rgba(255,255,255,0.03)' }}
      onMouseEnter={e => { const el = e.currentTarget; el.style.color = 'var(--accent-hex)'; el.style.borderColor = 'var(--accent-hex)' }}
      onMouseLeave={e => { const el = e.currentTarget; el.style.color = 'rgb(var(--text-secondary))'; el.style.borderColor = 'var(--border-color)' }}
    >
      {icon}
    </a>
  )
}

// ── Hero ───────────────────────────────────────
export function TerminalHero() {
  const { scrollY } = useScroll()
  const y1      = useTransform(scrollY, [0, 500], [0, 100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const [isExpanded, setIsExpanded] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)

  // Click-outside to close
  useEffect(() => {
    if (!isExpanded) return
    function handleMouseDown(e: MouseEvent) {
      if (terminalRef.current && !terminalRef.current.contains(e.target as Node)) {
        setIsExpanded(false)
      }
    }
    document.addEventListener('mousedown', handleMouseDown)
    return () => document.removeEventListener('mousedown', handleMouseDown)
  }, [isExpanded])

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center pt-24 pb-28 lg:pb-20 overflow-hidden px-4 sm:px-8">
      {/* BG glows */}
      <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-20" style={{ background: 'var(--accent-hex)' }} />
      <div className="absolute bottom-[20%] right-[5%] w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none opacity-10" style={{ background: 'var(--accent-hex)' }} />

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">

        {/* ── Left: Content ── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center lg:items-start lg:text-left"
        >
          {/* Inner blur layer when expanded */}
          <motion.div
            animate={{
              filter: isExpanded ? 'blur(3px)' : 'blur(0px)',
              opacity: isExpanded ? 0.45 : 1,
            }}
            transition={{ duration: 0.3 }}
            style={{ pointerEvents: isExpanded ? 'none' : 'auto', userSelect: isExpanded ? 'none' : 'auto' }}
            className="flex flex-col items-center text-center lg:items-start lg:text-left w-full"
          >
            <ProfileAvatar />

            <div className="badge badge-accent mb-5 px-3 py-1.5 flex items-center gap-2">
              <span className="pulse-dot" />
              <span>Available for new roles</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6">
              Building robust <br />
              <span className="gradient-text">cloud-native</span> <br />
              experiences.
            </h1>

            <p className="text-lg max-w-lg pb-8 leading-relaxed" style={{ color: 'rgb(var(--text-secondary))' }}>
              Hi, I&apos;m <strong style={{ color: 'rgb(var(--text-primary))' }}>Asim Alizada</strong>, a Senior Software Engineer specializing in scalable enterprise systems and modern web technologies.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-5">
              <Link href="/projects" className="btn btn-primary h-12 px-6 rounded-xl flex items-center gap-2">
                Explore Work <ArrowUpRight size={18} />
              </Link>
              <a href={cvData.cvPath} download target="_blank" rel="noopener noreferrer" className="btn btn-secondary h-12 px-6 rounded-xl flex items-center gap-2">
                <Download size={18} /> Resume
              </a>
            </div>

            <div className="flex items-center gap-3">
              <SocialLink href={cvData.github ?? '#'} label="GitHub" icon={<GithubIcon size={16} />} id="hero-github" />
              <SocialLink href={cvData.linkedin ?? '#'} label="LinkedIn" icon={<LinkedinIcon size={16} />} id="hero-linkedin" />
              <a
                href={`mailto:${cvData.email}`} id="hero-email"
                className="text-xs font-mono transition-colors duration-200"
                style={{ color: 'rgb(var(--text-secondary))' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--accent-hex)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgb(var(--text-secondary))' }}
              >
                {cvData.email}
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Right: Terminal ── */}
        <motion.div
          ref={terminalRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative lg:h-[450px] flex flex-col items-center justify-center w-full max-w-lg mx-auto mt-6 lg:mt-0"
          style={{ y: y1 }}
        >
          <InteractiveTerminal
            isOpen={isExpanded}
            onOpen={() => setIsExpanded(true)}
            onClose={() => setIsExpanded(false)}
          />

          {/* Badge — Mobile: relative in-flow (no overflow), Desktop: absolute float */}
          <AnimatePresence>
            {!isExpanded && (
              <>
                {/* ── Mobile badge (relative, in normal flow) ── */}
                <motion.div
                  key="badge-mobile"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="lg:hidden flex justify-center mt-5 w-full"
                >
                  <div
                    className="w-max card p-3 rounded-2xl flex items-center gap-3 shadow-xl border"
                    style={{ background: 'rgba(var(--bg-card), 0.8)', backdropFilter: 'blur(12px)' }}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(var(--accent-rgb), 0.15)', color: 'var(--accent-hex)' }}>
                      <TerminalIcon size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-bold leading-tight" style={{ color: 'rgb(var(--text-primary))' }}>5+ Years</p>
                      <p className="text-[10px]" style={{ color: 'rgb(var(--text-secondary))' }}>Engineering</p>
                    </div>
                  </div>
                </motion.div>

                {/* ── Desktop badge (absolute, floating) ── */}
                <motion.div
                  key="badge-desktop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="hidden lg:block absolute -bottom-6 left-1/2 -translate-x-1/2"
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                    className="w-max card p-3 rounded-2xl flex items-center gap-3 shadow-xl border"
                    style={{ background: 'rgba(var(--bg-card), 0.8)', backdropFilter: 'blur(12px)' }}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(var(--accent-rgb), 0.15)', color: 'var(--accent-hex)' }}>
                      <TerminalIcon size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-bold leading-tight" style={{ color: 'rgb(var(--text-primary))' }}>5+ Years</p>
                      <p className="text-[10px]" style={{ color: 'rgb(var(--text-secondary))' }}>Engineering</p>
                    </div>
                  </motion.div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ opacity }}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        <div className="w-6 h-10 rounded-full border-2 flex pt-1.5 justify-center" style={{ borderColor: 'var(--border-color)' }}>
          <div className="w-1 h-2 rounded-full" style={{ background: 'var(--accent-hex)' }} />
        </div>
      </motion.div>
    </section>
  )
}
