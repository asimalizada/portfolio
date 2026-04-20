import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { AccentProvider } from '@/components/providers/AccentProvider'
import { CustomCursor } from '@/components/layout/CustomCursor'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning data-scroll-behavior="smooth">
      <body suppressHydrationWarning className="overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
