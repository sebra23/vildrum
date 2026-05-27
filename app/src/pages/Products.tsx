import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Product {
  slug: string
  name: string
  price: number
  category: string
  badge?: string
  image: string
}

const products: Product[] = [
  { slug: 'vildrum-04', name: 'VILDRUM 04', price: 900, category: 'Small Family', badge: 'BESTSELLER', image: '/vildrum04-a.jpg' },
]

const categories = ['VILDRUM 04']

const comparisonSpecs = [
  { label: 'Capacity', values: ['4 people'] },
  { label: 'Floor area', values: ['18 m\u00B2'] },
  { label: 'Setup time', values: ['8 min'] },
  { label: 'Weight', values: ['11.5 kg'] },
  { label: 'Packed size', values: ['75\u00D735 cm'] },
  { label: 'Height', values: ['2.0 m'] },
  { label: 'Air beams', values: ['6'] },
  { label: 'Seasons', values: ['4'] },
]

const comparisonProducts = [
  { name: '04', slug: 'vildrum-04' },
]

/* ------------------------------------------------------------------ */
/*  Easing                                                            */
/* ------------------------------------------------------------------ */

const easeExpoOut = [0.16, 1, 0.3, 1] as [number, number, number, number]
const easeSoft = [0.4, 0, 0.2, 1] as [number, number, number, number]

/* ------------------------------------------------------------------ */
/*  Products Page                                                      */
/* ------------------------------------------------------------------ */

export default function Products() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const [activeCategory, setActiveCategory] = useState('VILDRUM 04')
  const filteredProducts = products

  return (
    <div>
      {/* ========== HERO ========== */}
      <HeroSection />

      {/* ========== FILTER BAR ========== */}
      <FilterBar activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

      {/* ========== PRODUCT GRID ========== */}
      <ProductGrid products={filteredProducts} />

      {/* ========== COMPARISON TABLE ========== */}
      <ComparisonTable />

      {/* ========== MODULAR CTA ========== */}
      <ModularCTA />
    </div>
  )
}

/* ================================================================== */
/*  HERO                                                               */
/* ================================================================== */

function HeroSection() {
  return (
    <section className="relative h-[50vh] min-h-[320px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/hero-landscape.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(26,26,24,0.35) 0%, rgba(26,26,24,0.15) 50%, rgba(26,26,24,0.5) 100%)',
          }}
        />
      </div>

      {/* Text */}
      <div className="relative z-10 text-center px-5">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeExpoOut, delay: 0.3 }}
          className="font-serif text-[clamp(40px,6vw,88px)] font-400 text-warm-white tracking-[-0.025em] leading-[0.95]"
        >
          Shelters
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeSoft, delay: 0.8 }}
          className="font-sans text-[clamp(17px,1.4vw,20px)] font-300 text-warm-white/80 mt-4"
        >
          Two shelters. One philosophy.
        </motion.p>
      </div>
    </section>
  )
}

/* ================================================================== */
/*  FILTER BAR                                                         */
/* ================================================================== */

function FilterBar({ activeCategory, onCategoryChange }: { activeCategory: string; onCategoryChange: (c: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="sticky top-16 z-40 bg-warm-white/90 backdrop-blur-[8px] border-b border-[rgba(26,26,24,0.08)]"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-4 overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max justify-center">
          {categories.map((cat, i) => (
            <motion.button
              key={cat}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: easeSoft, delay: 0.6 + i * 0.05 }}
              onClick={() => onCategoryChange(cat)}
              className={
                'px-4 py-2 font-sans text-[13px] font-500 tracking-[0.04em] transition-colors duration-[250ms] ' +
                (activeCategory === cat
                  ? 'bg-charcoal text-warm-white'
                  : 'bg-transparent text-charcoal hover:bg-limestone')
              }
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/* ================================================================== */
/*  PRODUCT GRID                                                       */
/* ================================================================== */

function ProductGrid({ products }: { products: Product[] }) {
  return (
    <section className="bg-warm-white py-20 pb-40">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={products.map(p => p.slug).join(',')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-[600px] mx-auto"
          >
            {products.map((product, i) => (
              <ProductCard key={product.slug} product={product} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

/* ================================================================== */
/*  PRODUCT CARD                                                       */
/* ================================================================== */

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: easeExpoOut, delay: index * 0.08 }}
    >
      <Link
        to={`/products/${product.slug}`}
        className="group block"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image container */}
        <div className="relative aspect-square overflow-hidden bg-limestone">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.03]"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/[0.06] transition-colors duration-400" />
          {/* Quick view label (desktop only) */}
          <div className="hidden md:flex absolute inset-0 items-center justify-center">
            <span
              className={
                'px-6 py-3 bg-[rgba(26,26,24,0.5)] text-warm-white font-sans text-[13px] font-500 transition-opacity duration-300 ' +
                (hovered ? 'opacity-100' : 'opacity-0')
              }
            >
              Quick view
            </span>
          </div>
          {/* Badge */}
          {product.badge && (
            <span className="absolute top-3 left-3 px-2 py-1 bg-pine-muted text-pine font-sans text-[10px] font-500 uppercase tracking-[0.1em]">
              {product.badge}
            </span>
          )}
        </div>
        {/* Text */}
        <div className="mt-4">
          <h3 className="font-sans text-[14px] font-500 text-charcoal">{product.name}</h3>
          <p className="font-sans text-[14px] font-400 text-ash mt-0.5">
            CHF 900 · EUR 900
          </p>
        </div>
      </Link>
    </motion.div>
  )
}

/* ================================================================== */
/*  COMPARISON TABLE — GSAP isolated component                         */
/* ================================================================== */

function ComparisonTable() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return

    const rows = containerRef.current.querySelectorAll('.spec-row')
    const label = containerRef.current.querySelector('.section-label')

    if (label) {
      gsap.from(label, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        },
      })
    }

    gsap.from(rows, {
      opacity: 0,
      y: 20,
      duration: 0.4,
      ease: 'power2.out',
      stagger: 0.06,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
      },
    })
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="bg-limestone py-[120px]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        {/* Section label */}
        <div className="section-label text-center mb-16">
          <span className="font-sans text-[11px] font-500 uppercase tracking-[0.12em] text-ash">
            COMPARE
          </span>
        </div>

        {/* Table - desktop */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-fog">
                <th className="pb-4 text-left w-[50%]"></th>
                {comparisonProducts.map(p => (
                  <th key={p.slug} className="pb-4 text-left w-[50%]">
                    <Link
                      to={`/products/${p.slug}`}
                      className="font-sans text-[14px] font-500 text-charcoal hover:opacity-70 transition-opacity"
                    >
                      {p.name}
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonSpecs.map((spec, i) => (
                <tr
                  key={spec.label}
                  className={
                    'spec-row border-b border-fog ' +
                    (i % 2 === 1 ? 'bg-[rgba(26,26,24,0.02)]' : '')
                  }
                >
                  <td className="py-3 font-sans text-[14px] text-ash">{spec.label}</td>
                  {spec.values.map((v, j) => (
                    <td key={j} className="py-3 font-sans text-[14px] font-300 text-charcoal">
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table - mobile (scrollable with sticky first column) */}
        <div className="md:hidden overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b border-fog">
                <th className="sticky left-0 bg-limestone pb-4 text-left w-[100px] z-10"></th>
                {comparisonProducts.map(p => (
                  <th key={p.slug} className="pb-4 text-left">
                    <Link to={`/products/${p.slug}`} className="font-sans text-[13px] font-500 text-charcoal">
                      {p.name}
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonSpecs.map((spec, i) => (
                <tr
                  key={spec.label}
                  className={
                    'spec-row border-b border-fog ' +
                    (i % 2 === 1 ? 'bg-[rgba(26,26,24,0.02)]' : '')
                  }
                >
                  <td className="sticky left-0 bg-limestone py-3 font-sans text-[13px] text-ash z-10">
                    {spec.label}
                  </td>
                  {spec.values.map((v, j) => (
                    <td key={j} className="py-3 font-sans text-[13px] font-300 text-charcoal">
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

/* ================================================================== */
/*  MODULAR CTA — GSAP isolated component                              */
/* ================================================================== */

function ModularCTA() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return

    const textEls = containerRef.current.querySelectorAll('.cta-text-item')
    const images = containerRef.current.querySelectorAll('.cta-gallery-img')

    gsap.from(textEls, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      },
    })

    gsap.from(images, {
      opacity: 0,
      scale: 0.97,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      },
    })
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="bg-charcoal py-[120px]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">
          {/* Text — left */}
          <div className="md:w-[48%]">
            <h2 className="cta-text-item font-serif text-[clamp(32px,4vw,56px)] font-400 text-warm-white tracking-[-0.015em] leading-[1.05]">
              Built for the wild.
            </h2>
            <p className="cta-text-item font-sans text-[16px] font-300 text-warm-white/70 mt-5 max-w-[400px] leading-relaxed">
              Two shelters. One philosophy. The calm of a Scandinavian cabin, anywhere.
            </p>
            <div className="cta-text-item mt-8">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 font-sans text-[14px] font-500 text-warm-white group"
              >
                <span className="relative">
                  Explore shelters
                  <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-px bg-warm-white transition-all duration-[400ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]" />
                </span>
                <span className="text-[12px]">&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Image gallery — right */}
          <div className="md:w-[52%]">
            <div className="grid grid-cols-2 gap-3">
              {/* Large image — winter scene */}
              <div className="cta-gallery-img col-span-2 aspect-[16/10] overflow-hidden">
                <img
                  src="/retreat-2.jpg"
                  alt="VILDRUM shelter in winter landscape"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Bottom left — golden grassland */}
              <div className="cta-gallery-img aspect-[4/3] overflow-hidden">
                <img
                  src="/retreat-1.jpg"
                  alt="VILDRUM shelter in golden field"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Bottom right — carry bag */}
              <div className="cta-gallery-img aspect-[4/3] overflow-hidden">
                <img
                  src="/retreat-3.jpg"
                  alt="VILDRUM carry bag"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
