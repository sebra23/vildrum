import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useCart } from '@/context/CartContext'

gsap.registerPlugin(ScrollTrigger)

const products = [
  { slug: 'vildrum-04', name: 'VILDRUM 04', price: 900, image: '/vildrum04-a.jpg', badge: 'BESTSELLER' },
]

export default function ProductCollectionSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const { addItem } = useCart()

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(headerRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.5, ease: 'expo.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
          }
        )
      }

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.product-card')
        gsap.fromTo(cards,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.5, ease: 'expo.out', stagger: 0.1,
            scrollTrigger: { trigger: cardsRef.current, start: 'top 85%', once: true },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="collection"
      className="bg-limestone py-[80px] md:py-[120px] lg:py-[160px]"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        {/* Header row */}
        <div
          ref={headerRef}
          className="flex items-center justify-between mb-10 opacity-0"
        >
          <span className="font-sans text-[11px] font-500 uppercase tracking-[0.12em] text-ash">
            THE SHELTER
          </span>
          <Link
            to="/products"
            className="group font-sans text-[14px] font-500 text-charcoal inline-flex items-center gap-1.5"
          >
            View details
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            <span className="block h-px w-0 bg-charcoal group-hover:w-full transition-all duration-[400ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]" />
          </Link>
        </div>

        {/* Product grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-[600px] mx-auto"
        >
          {products.map(p => (
            <div key={p.slug} className="product-card opacity-0 group">
              <Link to={`/products/${p.slug}`} className="block">
                <div className="relative aspect-square overflow-hidden bg-dune/20">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
                  />
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/[0.06] transition-colors duration-[400ms]" />
                  {p.badge && (
                    <span className="absolute top-3 left-3 font-sans text-[10px] font-500 uppercase tracking-[0.1em] text-pine bg-pine-muted px-2 py-1">
                      {p.badge}
                    </span>
                  )}
                  {/* Quick add button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      addItem({ id: p.slug, name: p.name, price: p.price, image: p.image })
                    }}
                    className="absolute bottom-3 right-3 bg-warm-white/90 backdrop-blur-sm px-3 py-1.5 font-sans text-[11px] font-500 text-charcoal opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-warm-white"
                  >
                    Add to cart
                  </button>
                </div>
                <h3 className="font-sans text-[14px] font-500 text-charcoal mt-4">
                  {p.name}
                </h3>
                <p className="font-sans text-[14px] font-400 text-ash">
                  CHF 900 · EUR 900
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
