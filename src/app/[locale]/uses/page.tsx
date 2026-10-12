import type { Metadata } from 'next'
import { WorkspaceWorkbench } from './WorkspaceWorkbench'
import styles from './uses.module.css'

export const metadata: Metadata = {
  title: 'Uses',
  description: 'Hardware, software, and tools I use daily.',
  alternates: { canonical: '/uses' },
  openGraph: {
    title: 'Uses | Asim Alizada',
    description: 'Hardware, software, and tools I use daily.',
    url: '/uses',
    type: 'website',
    siteName: 'Asim Alizada',
  },
  twitter: {
    card: 'summary',
    title: 'Uses | Asim Alizada',
    description: 'Hardware, software, and tools I use daily.',
  },
}

export default function UsesPage() {
  return (
    <div className={styles.page}>
      <div className="site-container">
        <header className={styles.introduction}>
          <p className={styles.eyebrow}>The Workspace</p>
          <h1>Behind the build.</h1>
          <p className={styles.description}>
            A closer look at the tools, environments, and workflows I use to build software.
          </p>
        </header>

        <WorkspaceWorkbench />
      </div>
    </div>
  )
}
