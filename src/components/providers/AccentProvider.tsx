'use client'

import { createContext, useContext, useEffect, useSyncExternalStore, ReactNode } from 'react'

export type AccentColor = 'indigo' | 'cyan' | 'violet' | 'rose' | 'amber'

export const accentColors: { id: AccentColor; hex: string; label: string }[] = [
  { id: 'indigo', hex: '#315b75', label: 'Indigo' },
  { id: 'cyan',   hex: '#176578', label: 'Cyan'   },
  { id: 'violet', hex: '#665574', label: 'Violet' },
  { id: 'rose',   hex: '#984c52', label: 'Rose'   },
  { id: 'amber',  hex: '#8b6227', label: 'Amber'  },
]

interface AccentContextType {
  accent: AccentColor
  setAccent: (color: AccentColor) => void
}

const AccentContext = createContext<AccentContextType>({
  accent: 'indigo',
  setAccent: () => {},
})

const accentChangeEvent = 'portfolio-accent-change'

function savedAccent(): AccentColor {
  const saved = localStorage.getItem('accent-color')
  return accentColors.find((color) => color.id === saved)?.id ?? 'indigo'
}

function subscribeToAccent(onChange: () => void) {
  window.addEventListener('storage', onChange)
  window.addEventListener(accentChangeEvent, onChange)
  return () => {
    window.removeEventListener('storage', onChange)
    window.removeEventListener(accentChangeEvent, onChange)
  }
}

const serverAccent = (): AccentColor => 'indigo'

export function AccentProvider({ children }: { children: ReactNode }) {
  const accent = useSyncExternalStore(subscribeToAccent, savedAccent, serverAccent)

  useEffect(() => {
    document.documentElement.setAttribute('data-accent', accent)
  }, [accent])

  const setAccent = (color: AccentColor) => {
    localStorage.setItem('accent-color', color)
    document.documentElement.setAttribute('data-accent', color)
    window.dispatchEvent(new Event(accentChangeEvent))
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
