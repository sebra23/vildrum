import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ModularSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.mod-label',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
        }
      )

      gsap.fromTo('.mod-headline',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
          delay: 0.1,
        }
      )

      gsap.fromTo('.mod-body-cta',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
          delay: 0.3,
        }
      )

      const images = sectionRef.current?.querySelectorAll('.mod-image')
      if (images) {
        gsap.fromTo(images,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, ease: 'expo.out', stagger: 0.15,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
          }
        )
      }

      // Parallax on images at different speeds
      gsap.to('.mod-img-1', {
        y: '-3%',
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
      })
      gsap.to('.mod-img-2', {
        y: '2%',
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
      })
      gsap.to('.mod-img-3', {
        y: '4%',
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="bg-warm-white py-[80px] md:py-[120px] lg:py-[160px]"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left — Stacked images (3 cols) */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <div className="space-y-0 max-md:space-y-6">
              <div className="mod-image w-[85%] max-md:w-full aspect-[4/5] overflow-hidden shadow-[0_4px_24px_rgba(26,26,24,0.06)] opacity-0">
                <img
                  src="/retreat-1.jpg"
                  alt="VILDRUM shelter in golden field"
                  className="mod-img-1 w-full h-[106%] object-cover will-change-transform"
                />
              </div>
              <div className="mod-image w-[70%] max-md:w-full ml-auto aspect-[4/5] overflow-hidden shadow-[0_4px_24px_rgba(26,26,24,0.06)] -mt-10 max-md:mt-0 opacity-0">
                <img
                  src="/retreat-2.jpg"
                  alt="VILDRUM shelter in winter landscape"
                  className="mod-img-2 w-full h-[106%] object-cover will-change-transform"
                />
              </div>
              <div className="mod-image w-[75%] max-md:w-full aspect-[4/5] overflow-hidden shadow-[0_4px_24px_rgba(26,26,24,0.06)] -mt-10 max-md:mt-0 opacity-0">
                <img
                  src="/retreat-3.jpg"
                  alt="VILDRUM carry bag"
                  className="mod-img-3 w-full h-[106%] object-cover will-change-transform"
                />
              </div>
            </div>
          </div>

          {/* Right — Text (2 cols, sticky) */}
          <div className="lg:col-span-2 order-1 lg:order-2 lg:sticky lg:top-[120px] lg:self-start">
            <div className="mod-label font-sans text-[11px] font-500 uppercase tracking-[0.12em] text-ash mb-6 opacity-0">
              FIELD READY
            </div>
            <h2 className="mod-headline font-serif text-[clamp(32px,4vw,56px)] font-400 text-charcoal leading-[1.05] tracking-[-0.015em] opacity-0">
              Built for the wild.
            </h2>
            <div className="mod-body-cta opacity-0">
              <p className="mt-6 max-w-[380px] font-sans text-[16px] font-300 text-charcoal/75 leading-[1.6]">
                From golden fields to snow-covered valleys. From packed to pitched in minutes. VILDRUM goes where you go — portable architecture, ready for every season.
              </p>
              <div className="mt-8">
                <Link
                  to="/products"
                  className="group font-sans text-[14px] font-500 text-charcoal inline-flex items-center gap-1.5"
                >
                  Explore shelters
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                  <span className="block h-px w-0 bg-charcoal group-hover:w-full transition-all duration-[400ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
