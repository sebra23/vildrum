import { useEffect } from 'react'
import HeroSection from '@/sections/home/HeroSection'
import BrandPromiseSection from '@/sections/home/BrandPromiseSection'
import ProductCollectionSection from '@/sections/home/ProductCollectionSection'
import PhilosophySection from '@/sections/home/PhilosophySection'
import LifestyleSection from '@/sections/home/LifestyleSection'
import ModularSection from '@/sections/home/ModularSection'
import SetupStatsSection from '@/sections/home/SetupStatsSection'
import NewsletterSection from '@/sections/home/NewsletterSection'

export default function Home() {
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
