'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export type AccentColor = 'indigo' | 'cyan' | 'violet' | 'rose' | 'amber'

export const accentColors: { id: AccentColor; hex: string; label: string }[] = [
  { id: 'indigo', hex: '#6366f1', label: 'Indigo' },
  { id: 'cyan',   hex: '#06b6d4', label: 'Cyan'   },
  { id: 'violet', hex: '#8b5cf6', label: 'Violet' },
  { id: 'rose',   hex: '#f43f5e', label: 'Rose'   },
  { id: 'amber',  hex: '#f59e0b', label: 'Amber'  },
]

interface AccentContextType {
  accent: AccentColor
  setAccent: (color: AccentColor) => void
}

const AccentContext = createContext<AccentContextType>({
  accent: 'indigo',
  setAccent: () => {},
})

export function AccentProvider({ children }: { children: ReactNode }) {
  const [accent, setAccentState] = useState<AccentColor>('indigo')

  useEffect(() => {
    const saved = localStorage.getItem('accent-color') as AccentColor | null
    if (saved && accentColors.find((c) => c.id === saved)) {
      setAccentState(saved)
      document.documentElement.setAttribute('data-accent', saved)
    } else {
      document.documentElement.setAttribute('data-accent', 'indigo')
    }
  }, [])

  const setAccent = (color: AccentColor) => {
    setAccentState(color)
    localStorage.setItem('accent-color', color)
    document.documentElement.setAttribute('data-accent', color)
  }

  return (
    <AccentContext.Provider value={{ accent, setAccent }}>
      {children}
    </AccentContext.Provider>
  )
}

export function useAccent() {
  return useContext(AccentContext)
}
