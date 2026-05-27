import { useEffect } from 'react'
import { useSEO } from '@/hooks/useSEO'
import HeroSection from '@/sections/home/HeroSection'
import BrandPromiseSection from '@/sections/home/BrandPromiseSection'
import ProductCollectionSection from '@/sections/home/ProductCollectionSection'
import PhilosophySection from '@/sections/home/PhilosophySection'
import LifestyleSection from '@/sections/home/LifestyleSection'
import ModularSection from '@/sections/home/ModularSection'
import SetupStatsSection from '@/sections/home/SetupStatsSection'
import NewsletterSection from '@/sections/home/NewsletterSection'

export default function Home() {
  useSEO(
    "VILDRUM — A room for the wild.",
    "Inflatable Scandinavian shelters designed as portable outdoor rooms — calm, architectural, and ready in minutes."
  )

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <HeroSection />
      <BrandPromiseSection />
      <ProductCollectionSection />
      <PhilosophySection />
      <LifestyleSection />
      <ModularSection />
      <SetupStatsSection />
      <NewsletterSection />
    </>
  )
}
