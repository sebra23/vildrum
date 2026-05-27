import { useEffect } from 'react'
import HeroSection from '@/sections/about/HeroSection'
import OriginStorySection from '@/sections/about/OriginStorySection'
import PhilosophySection from '@/sections/about/PhilosophySection'
import CraftsmanshipSection from '@/sections/about/CraftsmanshipSection'
import ValuesMarqueeSection from '@/sections/about/ValuesMarqueeSection'
import TeamSection from '@/sections/about/TeamSection'
import HeritageQuoteSection from '@/sections/about/HeritageQuoteSection'
import CollectionCTASection from '@/sections/about/CollectionCTASection'

export default function About() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <main>
      <HeroSection />
      <OriginStorySection />
      <PhilosophySection />
      <CraftsmanshipSection />
      <ValuesMarqueeSection />
      <TeamSection />
      <HeritageQuoteSection />
      <CollectionCTASection />
    </main>
  )
}
