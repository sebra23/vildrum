import { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export default function CollectionCTASection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      if (headlineRef.current) {
        tl.fromTo(headlineRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out' },
          0
        )
      }

      if (ctaRef.current) {
        tl.fromTo(ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out' },
          0.2
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="bg-charcoal py-[80px] md:py-[120px] lg:py-[140px]"
    >
      <div className="max-w-[600px] mx-auto px-5 md:px-10 text-center">
        <h2
          ref={headlineRef}
          className="font-serif text-[clamp(32px,4vw,56px)] font-400 text-warm-white leading-[1.05] tracking-[-0.015em] opacity-0"
        >
          Find your room.
        </h2>

        <div ref={ctaRef} className="mt-6 opacity-0">
          <Link
            to="/products"
            className="group inline-flex items-center gap-2 font-sans text-[14px] font-500 text-warm-white"
          >
            <span className="relative">
              Explore the collection
              <span
                className="absolute left-0 bottom-0 w-0 h-px bg-warm-white transition-all duration-400 group-hover:w-full"
                style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)' }}
              />
            </span>
            <span className="text-[12px]">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
