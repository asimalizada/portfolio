import { posts } from '@/.velite'
import Image from 'next/image'
import readingTime from 'reading-time'
import { cvData } from '@/content/data/cv'
import { projects } from '@/content/data/projects'
import { Link } from '@/i18n/navigation'
import { HomeMotion } from './HomeMotion'
import styles from './homepage.module.css'

const publishedPosts = posts
  .filter((post) => post.published)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

const selectedProjectIds = ['fitxlink', 'fintech-transfer', 'cybersecurity-automation']
const selectedProjects = projects
  .filter((project) => selectedProjectIds.includes(project.id))
  .sort((a, b) => selectedProjectIds.indexOf(a.id) - selectedProjectIds.indexOf(b.id))
const selectedExperience = [cvData.experience[0], cvData.experience[1], cvData.experience[2]]

const stack = [
  { label: 'Backend', items: ['C#', '.NET', 'Node.js', 'NestJS'] },
  { label: 'Frontend', items: ['TypeScript', 'React', 'Next.js', 'Angular'] },
  { label: 'Databases', items: ['PostgreSQL', 'SQL Server', 'MongoDB', 'MySQL'] },
  { label: 'AI & LLM', items: ['OpenAI API', 'Anthropic API', 'RAG', 'Vector Databases', 'AI Agents'] },
  { label: 'Infrastructure', items: ['Docker', 'Kubernetes', 'AWS', 'Azure', 'CI/CD'] },
]

type PublicationEntry = {
  id: string
  title: string
  summary: string
  date: string
  topic?: string
  format: 'Article' | 'Video' | 'Article + video'
  articleHref?: string
  videoHref?: string
  readingMinutes?: number
  videoDuration?: string
}

const publishedVideoEntries: PublicationEntry[] = []
const publicationEntries: PublicationEntry[] = [
  ...publishedPosts.map((post) => ({
    id: post.slug,
    title: post.title,
    summary: post.excerpt,
    date: post.date,
    topic: post.category ?? post.tags.slice(0, 3).join(' / '),
    format: post.videoUrl ? 'Article + video' as const : 'Article' as const,
    articleHref: `/blog/${post.slugAsParams}`,
    videoHref: post.videoUrl,
    readingMinutes: Math.ceil(readingTime(post.body).minutes),
    videoDuration: post.videoDuration,
  })),
  ...publishedVideoEntries,
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

const publicationDate = new Intl.DateTimeFormat('en', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

function SectionMarker({ number, label }: { number: string; label: string }) {
  return (
    <div className={styles.sectionMarker} aria-hidden="true">
      <span>{number}</span>
      <span className={styles.markerLine} />
      <span>{label}</span>
    </div>
  )
}

function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link className={styles.textLink} href={href}>{children}<span aria-hidden="true">↗</span></Link>
}

function HomeHero() {
  return (
    <section className={styles.hero} aria-labelledby="home-title">
      <div className={styles.heroComposition}>
        <div className={styles.heroIdentity}>
          <h1 id="home-title">{cvData.name}</h1>
          <p>{cvData.title}</p>
        </div>

        <p className={styles.heroSummary}>
          I work across the full stack, from backend architecture and integrations to frontend applications and complete product experiences.
        </p>

        <div className={styles.heroPortrait}>
          <div className={styles.portraitMedia}>
            <Image
              src={cvData.profilePhoto}
              alt="Asim Alizada"
              fill
              priority
              sizes="(max-width: 700px) 44vw, (max-width: 1280px) 25vw, 270px"
              className={styles.portraitImage}
            />
          </div>
        </div>

      </div>

      <div className={styles.heroFooter}>
        <nav className={styles.heroLinks} aria-label="Homepage sections">
          <Link href="#work">Selected work <span aria-hidden="true">↗</span></Link>
          <Link href="#writing">Field notes <span aria-hidden="true">↗</span></Link>
        </nav>
      </div>
    </section>
  )
}

function Introduction() {
  const practiceAreas = [
    {
      title: 'Product engineering',
      detail: 'Take features from requirements through implementation, including edge cases, maintainability, and behavior after release.',
    },
    {
      title: 'Frontend & backend architecture',
      detail: 'Design user interfaces, client state, APIs, and service boundaries so both sides can evolve together.',
    },
    {
      title: 'LLM applications & AI integrations',
      detail: 'Build application flows around language models, with attention to data quality, evaluation, failures, and integration boundaries.',
    },
    {
      title: 'Distributed systems & automation',
      detail: 'Handle work across services, plan for partial failures, and automate recurring processes that need predictable results.',
    },
  ]

  return (
    <section className={styles.intro} aria-labelledby="intro-title">
      <SectionMarker number="01" label="Engineering practice" />
      <div className={styles.practiceLayout}>
        <div className={styles.practiceLead} data-home-reveal>
          <h2 id="intro-title">How I work.</h2>
          <p>
            I approach software from both sides: how people interact with it and how the systems behind it operate. I care about practical decisions, clean architecture, and what happens after a product ships.
          </p>
        </div>
        <ol className={styles.practiceList}>
          {practiceAreas.map((area, index) => (
            <li className={styles.practiceArea} key={area.title} data-home-reveal data-home-delay={index * 75}>
              <span className={styles.practiceNumber}>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{area.title}</h3>
                <p>{area.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function PublicationActions({ entry }: { entry: PublicationEntry }) {
  return (
    <div className={styles.publicationActions}>
      {entry.articleHref && (
        <Link href={entry.articleHref}>
          Read article <span aria-hidden="true">↗</span>
          <span className="sr-only">: {entry.title}</span>
        </Link>
      )}
      {entry.videoHref && (
        <a href={entry.videoHref} target="_blank" rel="noopener noreferrer">
          Watch video <span aria-hidden="true">↗</span>
          <span className="sr-only">: {entry.title} (opens in a new tab)</span>
        </a>
      )}
    </div>
  )
}

function WritingIndex() {
  const [featuredEntry, ...moreEntries] = publicationEntries

  return (
    <section id="writing" className={styles.writing} aria-labelledby="writing-title">
      <SectionMarker number="02" label="Field notes" />
      <div className={styles.writingMasthead} data-home-reveal>
        <div className={styles.writingIdentity}>
          <p>Underbyte</p>
          <h2 id="writing-title">Field Notes.</h2>
        </div>
        <p>Technical articles, software engineering breakdowns, and video essays.</p>
      </div>
      {featuredEntry && (
        <article className={styles.featuredStory} aria-labelledby={`featured-${featuredEntry.id}`} data-home-reveal data-home-delay="90">
          <div className={styles.featuredStoryMeta}>
            <p>Featured story</p>
            <dl>
              <div><dt>Format</dt><dd>{featuredEntry.format}</dd></div>
              <div><dt>Published</dt><dd><time dateTime={featuredEntry.date}>{publicationDate.format(new Date(featuredEntry.date))}</time></dd></div>
              {featuredEntry.topic && <div><dt>Topics</dt><dd>{featuredEntry.topic}</dd></div>}
              {featuredEntry.readingMinutes && <div><dt>Reading time</dt><dd>{featuredEntry.readingMinutes} min</dd></div>}
              {featuredEntry.videoDuration && <div><dt>Video duration</dt><dd>{featuredEntry.videoDuration}</dd></div>}
            </dl>
          </div>
          <div className={styles.featuredStoryContent}>
            <h3 id={`featured-${featuredEntry.id}`}>{featuredEntry.title}</h3>
            <p>{featuredEntry.summary}</p>
            <PublicationActions entry={featuredEntry} />
          </div>
        </article>
      )}
      {moreEntries.length > 0 && (
        <ol className={styles.publicationIndex} aria-label="More field notes">
          {moreEntries.map((entry) => (
            <li key={entry.id}>
              <article className={styles.publicationRow}>
                <div className={styles.publicationRowMeta}>
                  <span>{entry.format}</span>
                  <time dateTime={entry.date}>{publicationDate.format(new Date(entry.date))}</time>
                </div>
                <div className={styles.publicationRowContent}>
                  <h3>{entry.title}</h3>
                  {entry.topic && <p className={styles.publicationRowTopic}>{entry.topic}</p>}
                  <p>{entry.summary}</p>
                </div>
                <div className={styles.publicationRowEnd}>
                  {entry.readingMinutes && <span>{entry.readingMinutes} min read</span>}
                  {entry.videoDuration && <span>{entry.videoDuration} video</span>}
                  <PublicationActions entry={entry} />
                </div>
              </article>
            </li>
          ))}
        </ol>
      )}
      {publicationEntries.length === 0 && <p className={styles.emptyNote}>The first note is being prepared.</p>}
      <div className={styles.sectionEnd}><TextLink href="/blog">View all articles</TextLink></div>
    </section>
  )
}

function SelectedWork() {
  const [featuredProject, ...secondaryProjects] = selectedProjects

  return (
    <section id="work" className={styles.work} aria-labelledby="work-title">
      <SectionMarker number="03" label="Selected work" />
      <div className={styles.workIntro}>
        <h2 id="work-title">Selected projects.</h2>
      </div>
      <ol className={styles.workCases}>
        {featuredProject && (
          <li>
            <article className={styles.workFeature} aria-labelledby={`work-${featuredProject.id}`} data-home-reveal>
              <div className={styles.workFeatureMain}>
                <p className={styles.workCategory}>01 / {featuredProject.tags.join(' / ')}</p>
                <h3 id={`work-${featuredProject.id}`}>{featuredProject.title}</h3>
                <p className={styles.workDescription}>{featuredProject.description}</p>
                <Link className={styles.workDetailsLink} href={`/projects#project-${featuredProject.id}`}>
                  View project details <span aria-hidden="true">↗</span>
                </Link>
              </div>
              <dl className={styles.workFeatureFacts}>
                <div><dt>Role</dt><dd>{featuredProject.role}</dd></div>
                {featuredProject.impact && (
                  <div>
                    <dt>Engineering work</dt>
                    <dd>
                      <ul>{featuredProject.impact.slice(0, 2).map((item) => <li key={item}>{item}</li>)}</ul>
                    </dd>
                  </div>
                )}
                <div><dt>Core technologies</dt><dd>{featuredProject.tech.slice(0, 6).join(' / ')}</dd></div>
              </dl>
            </article>
          </li>
        )}
        {secondaryProjects.map((project, index) => (
          <li key={project.id} data-home-reveal>
            <Link className={styles.workCaseRow} href={`/projects#project-${project.id}`}>
              <span className={styles.workCaseIndex}>{String(index + 2).padStart(2, '0')} / {project.tags.join(' / ')}</span>
              <span className={styles.workCaseIdentity}>
                <strong>{project.title}</strong>
                <span>{project.role}</span>
              </span>
              <span className={styles.workCaseDetail}>
                <span>{project.description}</span>
                <small>{project.tech.slice(0, 6).join(' / ')}</small>
              </span>
              <span className={styles.workCaseArrow} aria-hidden="true">↗</span>
            </Link>
          </li>
        ))}
      </ol>
      <div className={styles.sectionEnd}><TextLink href="/projects">Complete project index</TextLink></div>
    </section>
  )
}

function CareerIndex() {
  return (
    <section className={styles.career} aria-labelledby="career-title">
      <SectionMarker number="04" label="Work record" />
      <div className={styles.careerHeading}>
        <div>
          <p className={styles.overline}>Current / previous</p>
          <h2 id="career-title" className={styles.sectionTitle}>Experience.</h2>
        </div>
        <p>Selected roles across product engineering, cybersecurity, and connected systems.</p>
      </div>
      <ol className={styles.careerList}>
        {selectedExperience.map((experience, index) => (
          <li className={styles.careerRow} key={`${experience.company}-${experience.period}`} data-home-reveal data-home-delay={index * 60}>
            <span className={styles.entryNumber}>{String(index + 1).padStart(2, '0')} / {experience.current ? 'Now' : 'Previously'}</span>
            <div className={styles.careerRole}>
              <h3>{experience.role}</h3>
              <span>{experience.company}</span>
            </div>
            <p>{experience.description}</p>
            <span className={styles.careerPeriod}>{experience.period}</span>
          </li>
        ))}
      </ol>
      <div className={styles.sectionEnd}>
        <a className={styles.textLink} href={cvData.cvPath} download>Download full CV <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  )
}

function TechnicalIndex() {
  return (
    <section className={styles.stackBand} aria-labelledby="stack-title">
      <div className={styles.stackInner}>
        <SectionMarker number="05" label="Technical index" />
        <div className={styles.stackGrid}>
          <div className={styles.stackIntro} data-home-reveal>
            <h2 id="stack-title" className={styles.sectionTitle}>Technology &amp; Tools.</h2>
            <p>Technologies I use to design, build, and deliver software across the stack.</p>
          </div>
          <dl className={styles.stackList}>
            {stack.map((group, index) => (
              <div className={styles.stackRow} key={group.label} data-home-reveal data-home-delay={index * 70}>
                <dt>{group.label}</dt>
                <dd>{group.items.join(' / ')}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <div className={styles.home}>
      <HomeMotion />
      <div className={styles.pageFrame}>
        <HomeHero />
        <Introduction />
        <WritingIndex />
        <SelectedWork />
        <CareerIndex />
      </div>
      <TechnicalIndex />
    </div>
  )
}
