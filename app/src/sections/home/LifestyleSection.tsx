import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function LifestyleSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.lifestyle-image',
        { scale: 1.03, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
        }
      )

      gsap.fromTo('.lifestyle-label',
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
          delay: 0.2,
        }
      )

      const words = sectionRef.current?.querySelectorAll('.lifestyle-word')
      if (words) {
        gsap.fromTo(words,
          { y: 20, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.6, ease: 'expo.out', stagger: 0.06,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
            delay: 0.4,
          }
        )
      }

      gsap.fromTo('.lifestyle-cta',
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
          delay: 0.8,
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const words = ['Every', 'landscape', 'becomes', 'a', 'room.']

  return (
    <section ref={sectionRef} className="bg-sand">
      {/* Desktop: Image with overlay text */}
      <div className="relative w-full aspect-[21/9] max-md:aspect-[16/9] overflow-hidden max-md:hidden">
        <img
          src="/every-landscape.jpg"
          alt="VILDRUM shelter on the Scandinavian coast"
          className="lifestyle-image w-full h-full object-cover opacity-0"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(26,26,24,0.5) 0%, rgba(26,26,24,0) 60%)' }}
        />
        {/* Overlay text */}
        <div className="absolute bottom-0 left-0 p-[60px]">
          <div className="lifestyle-label font-sans text-[11px] font-500 uppercase tracking-[0.12em] text-warm-white/70 mb-3 opacity-0">
            FIELD ROOMS
          </div>
          <h2 className="font-serif text-[clamp(32px,4vw,56px)] font-400 text-warm-white leading-[1.05] tracking-[-0.015em]">
            {words.map((word, i) => (
              <span key={i} className="lifestyle-word inline-block mr-[0.25em] opacity-0">
                {word}
              </span>
            ))}
          </h2>
          <div className="lifestyle-cta mt-6 opacity-0">
            <Link
              to="/journal"
              className="group font-sans text-[14px] font-500 text-warm-white inline-flex items-center gap-1.5"
            >
              Explore the Journal
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              <span className="block h-px w-0 bg-warm-white group-hover:w-full transition-all duration-[400ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile: Stacked layout */}
      <div className="md:hidden">
        <div className="w-full aspect-[16/9] overflow-hidden">
          <img
            src="/every-landscape.jpg"
            alt="VILDRUM shelter on the Scandinavian coast"
            className="lifestyle-image w-full h-full object-cover opacity-0"
          />
        </div>
        <div className="px-5 py-10 text-center">
          <div className="lifestyle-label font-sans text-[11px] font-500 uppercase tracking-[0.12em] text-charcoal/70 mb-3 opacity-0">
            FIELD ROOMS
          </div>
          <h2 className="font-serif text-[clamp(32px,4vw,56px)] font-400 text-charcoal leading-[1.05] tracking-[-0.015em]">
            {words.map((word, i) => (
              <span key={i} className="lifestyle-word inline-block mr-[0.25em] opacity-0">
                {word}
              </span>
            ))}
          </h2>
          <div className="lifestyle-cta mt-6 opacity-0">
            <Link
              to="/journal"
              className="group font-sans text-[14px] font-500 text-charcoal inline-flex items-center gap-1.5"
            >
              Explore the Journal
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              <span className="block h-px w-0 bg-charcoal group-hover:w-full transition-all duration-[400ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
