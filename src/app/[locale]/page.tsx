import { TerminalHero } from '@/components/home/TerminalHero'
import { BentoGrid } from '@/components/home/BentoGrid'
import { ExperienceTimeline } from '@/components/home/ExperienceTimeline'
import { FeaturedProjects } from '@/components/home/FeaturedProjects'

export default function HomePage() {
  return (
    <>
      <TerminalHero />
      <BentoGrid />
      <ExperienceTimeline />
      <FeaturedProjects />
    </>
  )
}
