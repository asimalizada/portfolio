import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { AccentProvider } from '@/components/providers/AccentProvider'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CustomCursor } from '@/components/layout/CustomCursor'

export const metadata: Metadata = {
  title: {
    default: 'Asim Alizada | Senior Software Engineer',
    template: '%s | Asim Alizada',
  },
  description:
    'Senior Software Engineer specializing in .NET, Node.js, and cloud-native systems. Based in Istanbul, Türkiye.',
  keywords: ['software engineer', '.NET', 'Node.js', 'React', 'Azure', 'portfolio', 'blog'],
  authors: [{ name: 'Asim Alizada' }],
  creator: 'Asim Alizada',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://asimalizada.vercel.app',
    siteName: 'Asim Alizada',
    title: 'Asim Alizada | Senior Software Engineer',
    description: 'Senior Software Engineer specializing in .NET, Node.js, and cloud-native systems.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Asim Alizada | Senior Software Engineer',
    description: 'Senior Software Engineer specializing in .NET, Node.js, and cloud-native systems.',
  },
  robots: { index: true, follow: true },
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider>
        <AccentProvider>
          <CustomCursor />
          <Header />
          <main className="w-full flex flex-col items-center pt-12">
            {children}
          </main>
          <Footer />
        </AccentProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  )
}
