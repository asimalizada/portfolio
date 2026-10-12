import { cvData } from '@/content/data/cv'
import { projects } from '@/content/data/projects'

// ── Types ──────────────────────────────────────
type LineType = 'prompt' | 'output' | 'error' | 'info' | 'section' | 'blank'
export interface Line { type: LineType; text?: string }

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

export const ALL_COMMAND_NAMES = COMMAND_DEFS.flatMap(c => [c.name, ...c.aliases])

// ── Command Output ─────────────────────────────
export function getCommandOutput(raw: string, cmdHistory: string[]): Line[] | 'clear' | 'exit' {
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
    { type: 'output',  text: '  Focus    : Full-Stack Cloud Platforms, Microservices, Integrations' },
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
    { type: 'info',    text: '  # Asim Alizada - Portfolio' },
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
    { type: 'output', text: "  Pong! 👋  I'm here, feel free to reach out." },
  ]

  return [
    { type: 'error',  text: `  bash: command not found: ${trimmed}` },
    { type: 'output', text: `  Type 'help' to see all available commands.` },
  ]
}

// ── Initial Lines ──────────────────────────────
export function getInitialLines(): Line[] {
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


