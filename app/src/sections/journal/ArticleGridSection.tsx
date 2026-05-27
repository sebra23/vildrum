import { useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { motion, AnimatePresence } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

// ─── Types ───────────────────────────────────────────
interface Article {
  id: number
  category: string
  title: string
  excerpt: string
  image: string
  readTime: string
  date: string
}

// ─── Data ────────────────────────────────────────────
const categories = ['All', 'Field Guides', 'Culture', 'Design', 'Adventure', 'Setup']

const articles: Article[] = [
  {
    id: 1,
    category: 'Field Guides',
    title: 'How to Choose the Right Shelter for Your Landscape',
    excerpt: 'From coastal winds to alpine meadows — a guide to matching your VILDRUM to the terrain you\'ll call home.',
    image: '/journal-field-guide.jpg',
    readTime: '8 min read',
    date: 'September 2025',
  },
  {
    id: 2,
    category: 'Setup',
    title: 'The 8-Minute Setup: A Step-by-Step Visual Guide',
    excerpt: 'Watch a VILDRUM 04 go from packed bag to fully inflated shelter in real time.',
    image: '/journal-set-up.jpg',
    readTime: '6 min read',
    date: 'August 2025',
  },
  {
    id: 3,
    category: 'Culture',
    title: 'Slow Morning Rituals: Coffee, Wool, and the Outdoors',
    excerpt: 'On the Scandinavian art of beginning the day slowly, even — especially — in the wild.',
    image: '/lifestyle-interior-1.jpg',
    readTime: '10 min read',
    date: 'August 2025',
  },
  {
    id: 4,
    category: 'Design',
    title: 'Why We Chose Air Beams Over Traditional Poles',
    excerpt: 'The engineering decision that defines VILDRUM — and the unexpected benefits of inflatable structure.',
    image: '/brand-story-workshop.jpg',
    readTime: '7 min read',
    date: 'July 2025',
  },
  {
    id: 5,
    category: 'Adventure',
    title: 'A Week on the Lofoten Coast: Notes from the Field',
    excerpt: 'Five VILDRUM shelters, seven days, and the particular light of the Arctic summer.',
    image: '/brand-story-landscape.jpg',
    readTime: '15 min read',
    date: 'July 2025',
  },
  {
    id: 6,
    category: 'Field Guides',
    title: 'Packing Light for Extended Outdoor Stays',
    excerpt: 'What to bring, what to leave behind, and how to create a sense of home with very little.',
    image: '/hero-landscape.jpg',
    readTime: '9 min read',
    date: 'June 2025',
  },
]

// ─── Category Filter Pill ────────────────────────────
function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={
        'shrink-0 px-5 py-2 rounded-full font-sans text-[14px] font-500 transition-all duration-200 ' +
        (active
          ? 'bg-charcoal text-warm-white'
          : 'bg-transparent text-charcoal hover:bg-charcoal/5')
      }
    >
      {label}
    </button>
  )
}

// ─── Article Card ────────────────────────────────────
function ArticleCard({ article, index }: { article: Article; index: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      className="group cursor-pointer"
    >
      <div className="overflow-hidden" style={{ aspectRatio: '3/2' }}>
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-[1.03]"
          style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
        />
      </div>
      <span className="font-sans text-[11px] font-500 uppercase tracking-[0.1em] text-pine mt-5 block">
        {article.category}
      </span>
      <h3 className="font-sans text-[17px] font-500 text-charcoal leading-[1.4] mt-2 group-hover:text-pine transition-colors duration-200">
        {article.title}
      </h3>
      <p className="font-sans text-[14px] font-300 text-ash mt-2 line-clamp-2">
        {article.excerpt}
      </p>
      <p className="font-sans text-[12px] font-400 text-ash mt-3">
        {article.readTime} &middot; {article.date}
      </p>
    </motion.article>
  )
}

// ─── Main Section ────────────────────────────────────
export default function ArticleGridSection() {
  const [activeCategory, setActiveCategory] = useState('All')
  const sectionRef = useRef<HTMLDivElement>(null)
  const filterRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const filteredArticles = activeCategory === 'All'
    ? articles
    : articles.filter(a => a.category === activeCategory)

  const handleFilterChange = useCallback((cat: string) => {
    setActiveCategory(cat)
  }, [])

  // Entrance animation for filter + grid
  useGSAP(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.article-card-static')
        gsap.fromTo(cards,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'expo.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="bg-warm-white">
      {/* Filter bar */}
      <div
        ref={filterRef}
        className="border-b border-charcoal/[0.08] py-4"
      >
        <div className="max-w-[1200px] mx-auto px-5 md:px-10">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {categories.map(cat => (
              <FilterPill
                key={cat}
                label={cat}
                active={activeCategory === cat}
                onClick={() => handleFilterChange(cat)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Article grid */}
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-12 md:py-16 lg:pb-[160px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredArticles.map((article, i) => (
              <div key={article.id} className="article-card-static">
                <ArticleCard article={article} index={i} />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredArticles.length === 0 && (
          <p className="font-sans text-[16px] font-300 text-ash text-center py-20">
            No articles found in this category.
          </p>
        )}
      </div>
    </section>
  )
}
