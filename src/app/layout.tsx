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
