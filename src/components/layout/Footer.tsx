'use client'

import { cvData } from '@/content/data/cv'
import styles from './Footer.module.css'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className="site-container">
        <section id="contact" className={styles.contact} aria-labelledby="contact-title">
          <div className={styles.contactIntro}>
            <p className={styles.sectionLabel}>Contact</p>
            <h2 id="contact-title">Get in touch.</h2>
            <p>Open to engineering opportunities, collaborations, and conversations about software.</p>
          </div>

          <div className={styles.contactChannels}>
            <div className={styles.emailChannel}>
              <span className={styles.channelLabel}>Email</span>
              <a id="footer-email" href={`mailto:${cvData.email}`} className={styles.emailLink}>
                {cvData.email}
                <span aria-hidden="true">↗</span>
              </a>
            </div>

            <nav className={styles.socialChannels} aria-label="Social profiles">
              <a id="footer-github" href={cvData.github} target="_blank" rel="noopener noreferrer">
                GitHub <span aria-hidden="true">↗</span>
              </a>
              <a id="footer-linkedin" href={cvData.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
            </nav>
          </div>
        </section>

        <div className={styles.footerBar}>
          <span className={styles.footerName}>{cvData.name}</span>
          <span className={styles.copyright}>© {year}</span>
        </div>
      </div>
    </footer>
  )
}
