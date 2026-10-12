import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { AccentProvider } from '@/components/providers/AccentProvider'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CustomCursor } from '@/components/layout/CustomCursor'
import { SITE_URL } from '@/site'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: '/' },
  title: {
    default: 'Asim Alizada | Senior Software Engineer',
    template: '%s | Asim Alizada',
  },
  description:
    'Full-stack cloud platforms, microservices, integrations, and production-ready systems using .NET, Node.js, React/Next.js, and Angular.',
  keywords: ['senior software engineer', '.NET', 'Node.js', 'React', 'Next.js', 'Angular', 'microservices', 'integrations', 'cloud platforms', 'portfolio', 'blog'],
  authors: [{ name: 'Asim Alizada' }],
  creator: 'Asim Alizada',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Asim Alizada',
    title: 'Asim Alizada | Senior Software Engineer',
    description: 'Building full-stack cloud platforms with .NET, Node.js, React/Next.js, microservices, integrations, and release-ready production systems.',
  },
  twitter: {
    card: 'summary',
    title: 'Asim Alizada | Senior Software Engineer',
    description: 'Building full-stack cloud platforms with .NET, Node.js, React/Next.js, microservices, integrations, and release-ready production systems.',
  },
  robots: { index: true, follow: true },
}

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider>
        <AccentProvider>
          <CustomCursor />
          <Header />
          <main className="w-full flex flex-col items-center pt-16">
            {children}
          </main>
          <Footer />
        </AccentProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  )
}
