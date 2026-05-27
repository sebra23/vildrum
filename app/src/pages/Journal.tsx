import { useEffect } from 'react'
import { useSEO } from '@/hooks/useSEO'
import HeroSection from '@/sections/journal/HeroSection'
import FeaturedArticleSection from '@/sections/journal/FeaturedArticleSection'
import ArticleGridSection from '@/sections/journal/ArticleGridSection'
import NewsletterSection from '@/sections/journal/NewsletterSection'

export default function Journal() {
  useSEO(
    "Journal — VILDRUM",
    "Read editorial content, cabin culture inspiration, and set-up guides for your portable Scandinavian room."
  )

  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <main>
      <HeroSection />
      <FeaturedArticleSection />
      <ArticleGridSection />
      <NewsletterSection />
    </main>
  )
}
