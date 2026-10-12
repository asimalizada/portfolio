import type { Metadata } from 'next'
import { projects, type Project } from '@/content/data/projects'
import { ProjectMotion } from './ProjectMotion'
import styles from './projects.module.css'

export const metadata: Metadata = {
  title: 'Selected Projects',
  description: 'A collection of production platforms, applications, and engineering projects I have worked on.',
  alternates: { canonical: '/projects' },
  openGraph: {
    title: 'Selected Projects | Asim Alizada',
    description: 'A collection of production platforms, applications, and engineering projects I have worked on.',
    url: '/projects',
    type: 'website',
    siteName: 'Asim Alizada',
  },
  twitter: {
    card: 'summary',
    title: 'Selected Projects | Asim Alizada',
    description: 'A collection of production platforms, applications, and engineering projects I have worked on.',
  },
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className={styles.projectLinks}>
      {project.demo && (
        <a id={`project-${project.id}-demo`} href={project.demo} target="_blank" rel="noopener noreferrer">
          Visit project <span aria-hidden="true">↗</span>
        </a>
      )}
      {project.github && (
        <a id={`project-${project.id}-github`} href={project.github} target="_blank" rel="noopener noreferrer">
          Source code <span aria-hidden="true">↗</span>
        </a>
      )}
    </div>
  )
}

function TechnicalRecord({ project }: { project: Project }) {
  return (
    <details className={styles.technicalRecord} data-technical-record>
      <summary>Technical record <span aria-hidden="true">+</span></summary>
      <div className={styles.technicalBody}>
        {project.impact && project.impact.length > 0 && (
          <div>
            <h4>Engineering work</h4>
            <ul>{project.impact.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        )}
        <div>
          <h4>Complete stack</h4>
          <p>{project.tech.join(' / ')}</p>
        </div>
      </div>
    </details>
  )
}

function FeaturedProject({ project }: { project: Project }) {
  return (
    <article id={`project-${project.id}`} className={styles.featuredProject} data-project-reveal>
      <div className={styles.featuredTopline}>
        <span>Featured case study</span>
        <span>{project.tags.join(' / ')}</span>
      </div>
      <div className={styles.featuredGrid}>
        <div className={styles.featuredPrimary}>
          <h2>{project.title}</h2>
          {project.role && <p className={styles.role}>{project.role}</p>}
          <p className={styles.featuredDescription}>{project.description}</p>
        </div>
        <div className={styles.featuredSecondary}>
          <h3>Selected engineering work</h3>
          <ul>{project.impact?.slice(0, 3).map((item) => <li key={item}>{item}</li>)}</ul>
          <p className={styles.stackLine}><span>Stack</span>{project.tech.slice(0, 5).join(' / ')}</p>
          <ProjectLinks project={project} />
        </div>
      </div>
      <TechnicalRecord project={project} />
    </article>
  )
}

function ArchiveProject({ project, index }: { project: Project; index: number }) {
  return (
    <article id={`project-${project.id}`} className={styles.archiveProject} data-project-reveal>
      <div className={styles.archiveNumber}>{String(index).padStart(2, '0')}</div>
      <div className={styles.archiveIdentity}>
        <p className={styles.category}>{project.tags.join(' / ')}</p>
        <h3>{project.title}</h3>
        {project.role && <p className={styles.role}>{project.role}</p>}
        {project.status === 'archived' && <span className={styles.archiveStatus}>Archived</span>}
      </div>
      <p className={styles.archiveDescription}>{project.description}</p>
      <div className={styles.archiveMetadata}>
        <p className={styles.stackLine}><span>Stack</span>{project.tech.slice(0, 4).join(' / ')}</p>
        <ProjectLinks project={project} />
      </div>
      <TechnicalRecord project={project} />
    </article>
  )
}

export default function ProjectsPage() {
  const featured = projects.find((project) => project.id === 'fitxlink')
  const archive = projects.filter((project) => project.id !== 'fitxlink')

  return (
    <div className={styles.page}>
      <ProjectMotion />
      <div className="site-container">
        <header className={styles.introduction}>
          <p className={styles.eyebrow}>Project archive</p>
          <div className={styles.introGrid}>
            <div>
              <h1>Selected Projects.</h1>
              <p>A collection of production platforms, applications, and engineering projects I&apos;ve worked on.</p>
            </div>
            <p className={styles.projectCount}>{String(projects.length).padStart(2, '0')} projects in the archive</p>
          </div>
        </header>

        <div className={styles.results}>
          {featured && <FeaturedProject project={featured} />}
          {archive.length > 0 && (
            <section className={styles.archive} aria-labelledby="archive-title">
              <div className={styles.archiveHeading}>
                <h2 id="archive-title">Project archive</h2>
                <span>{String(archive.length).padStart(2, '0')} records</span>
              </div>
              <div className={styles.archiveList}>
                {archive.map((project, index) => <ArchiveProject key={project.id} project={project} index={index + 1} />)}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
