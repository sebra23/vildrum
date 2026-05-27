import { useRef, useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSEO } from '@/hooks/useSEO'
import { blogPosts } from '@/data/blogPosts'
import NewsletterSection from '@/sections/journal/NewsletterSection'

gsap.registerPlugin(ScrollTrigger)

const categories = ['All', 'Field Guides', 'Culture', 'Design', 'Adventure', 'Setup']

export default function Blog() {
  useSEO(
    "Blog — VILDRUM",
    "Discover stories, design reflections, field guides, and outdoor inspiration from the VILDRUM team."
  )

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [activeCategory, setActiveCategory] = useState('All')
  const pageRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const featRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  // Filter posts based on active category
  const filteredPosts = activeCategory === 'All'
    ? blogPosts
    : blogPosts.filter(p => p.category === activeCategory)

  // The first post is always featured on the "All" tab or when it matches the category
  const featuredPost = blogPosts[0]
  const displayFeatured = activeCategory === 'All' || activeCategory === featuredPost.category

  // The remaining posts are displayed in the grid
  const gridPosts = filteredPosts.filter(p => p.slug !== featuredPost.slug || !displayFeatured)

  useGSAP(() => {
    // Hero Entrance
    if (heroRef.current) {
      const label = heroRef.current.querySelector('.hero-label')
      const title = heroRef.current.querySelector('.hero-title')
      const desc = heroRef.current.querySelector('.hero-desc')

      gsap.fromTo(label, { opacity: 0 }, { opacity: 0.6, duration: 0.5, delay: 0.2 })
      if (title) {
        const chars = title.querySelectorAll('.title-char')
        gsap.fromTo(chars, 
          { y: 30, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out', stagger: 0.02, delay: 0.3 }
        )
      }
      gsap.fromTo(desc, { y: 20, opacity: 0 }, { y: 0, opacity: 0.8, duration: 0.7, ease: 'expo.out', delay: 0.9 })
    }

    // Featured Post Entrance
    if (featRef.current) {
      const img = featRef.current.querySelector('.feat-img')
      const textEls = featRef.current.querySelectorAll('.feat-text')

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: featRef.current,
          start: 'top 85%',
          once: true,
        }
      })

      if (img) tl.fromTo(img, { scale: 1.02, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: 'expo.out' }, 0)
      if (textEls.length) tl.fromTo(textEls, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out', stagger: 0.08 }, 0.2)
    }

    // Grid entrance triggers
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.grid-card-anim')
      gsap.fromTo(cards,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'expo.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            once: true,
          }
        }
      )
    }
  }, { scope: pageRef })

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category)
  }, [])

  return (
    <div ref={pageRef} className="bg-warm-white min-h-screen">
      {/* ========== HERO ========== */}
      <section ref={heroRef} className="relative w-full min-h-[60vh] overflow-hidden flex items-end">
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/journal-field-guide.jpg"
            alt="Person walking in remote Scandinavian field"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(26,26,24,0.25) 0%, rgba(26,26,24,0.45) 100%)',
            }}
          />
        </div>

        <div className="relative z-10 w-full pb-16 md:pb-20 px-5 md:px-10 text-center">
          <span className="hero-label font-sans text-[11px] font-500 uppercase tracking-[0.12em] text-warm-white opacity-0">
            BLOG
          </span>
          <h1 className="hero-title font-serif text-[clamp(40px,6vw,88px)] font-400 text-warm-white leading-[0.95] tracking-[-0.025em] mt-3">
            {"Field Notes".split('').map((char, i) => (
              <span key={i} className="title-char inline-block opacity-0" style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}>
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>
          <p className="hero-desc font-sans text-[clamp(17px,1.4vw,20px)] font-300 text-warm-white/80 mt-4 max-w-[540px] mx-auto opacity-0">
            Stories, design reflections, and setup advice from our journeys in the wild.
          </p>
        </div>
      </section>

      {/* ========== FEATURED STORY (Only visible if matching category) ========== */}
      <AnimatePresence>
        {displayFeatured && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            <section ref={featRef} className="bg-warm-white border-b border-charcoal/[0.06]">
              <div className="max-w-[1200px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-5">
                  <div className="feat-img md:col-span-3 relative overflow-hidden opacity-0 aspect-[16/10] md:aspect-auto md:h-full">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center px-5 md:px-10 lg:px-14 py-12 md:py-16 md:col-span-2">
                    <span className="feat-text font-sans text-[11px] font-500 uppercase tracking-[0.12em] text-ash opacity-0">
                      FEATURED ARTICLE
                    </span>
                    <span className="feat-text font-sans text-[11px] font-500 uppercase tracking-[0.15em] text-pine mt-6 opacity-0">
                      {featuredPost.category}
                    </span>
                    <h2 className="feat-text font-serif text-[clamp(24px,2.2vw,36px)] font-400 text-charcoal leading-[1.15] tracking-[-0.01em] mt-3 opacity-0">
                      {featuredPost.title}
                    </h2>
                    <p className="feat-text font-sans text-[15px] font-300 text-charcoal/70 leading-relaxed mt-4 opacity-0">
                      {featuredPost.excerpt}
                    </p>
                    <div className="feat-text mt-8 opacity-0">
                      <Link
                        to={`/blog/${featuredPost.slug}`}
                        className="group inline-flex items-center gap-2 font-sans text-[14px] font-500 text-charcoal"
                      >
                        <span className="relative">
                          Read the story
                          <span className="absolute left-0 bottom-0 w-0 h-px bg-charcoal transition-all duration-300 group-hover:w-full" />
                        </span>
                        <span>&rarr;</span>
                      </Link>
                    </div>
                    <p className="feat-text font-sans text-[12px] text-ash mt-4 opacity-0">
                      {featuredPost.readTime} &middot; {featuredPost.date}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========== FILTER BAR ========== */}
      <div className="border-b border-charcoal/[0.08] py-4 sticky top-16 z-30 bg-warm-white/90 backdrop-blur-[8px]">
        <div className="max-w-[1200px] mx-auto px-5 md:px-10">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide justify-start md:justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={
                  'shrink-0 px-5 py-2 rounded-full font-sans text-[13px] font-500 tracking-[0.04em] transition-all duration-[250ms] ' +
                  (activeCategory === cat
                    ? 'bg-charcoal text-warm-white'
                    : 'bg-transparent text-charcoal hover:bg-charcoal/5')
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ========== ARTICLES GRID ========== */}
      <section className="bg-warm-white">
        <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-16 lg:pb-[140px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              ref={gridRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
            >
              {gridPosts.map((post) => (
                <div key={post.slug} className="grid-card-anim">
                  <motion.article
                    layout
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="group"
                  >
                    <Link to={`/blog/${post.slug}`} className="block">
                      <div className="overflow-hidden aspect-[3/2] bg-limestone">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-[1.03]"
                        />
                      </div>
                      <span className="font-sans text-[11px] font-500 uppercase tracking-[0.1em] text-pine mt-5 block">
                        {post.category}
                      </span>
                      <h3 className="font-sans text-[17px] font-500 text-charcoal leading-[1.35] mt-2 group-hover:text-pine transition-colors duration-250">
                        {post.title}
                      </h3>
                      <p className="font-sans text-[14px] font-300 text-ash mt-2 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <p className="font-sans text-[12px] text-ash mt-3">
                        {post.readTime} &middot; {post.date}
                      </p>
                    </Link>
                  </motion.article>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {gridPosts.length === 0 && !displayFeatured && (
            <p className="font-sans text-[16px] font-300 text-ash text-center py-20">
              No articles found in this category.
            </p>
          )}
        </div>
      </section>

      {/* ========== NEWSLETTER ========== */}
      <NewsletterSection />
    </div>
  )
}
