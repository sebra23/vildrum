import { useEffect } from 'react'
import HeroSection from '@/sections/journal/HeroSection'
import FeaturedArticleSection from '@/sections/journal/FeaturedArticleSection'
import ArticleGridSection from '@/sections/journal/ArticleGridSection'
import NewsletterSection from '@/sections/journal/NewsletterSection'

export default function Journal() {
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
