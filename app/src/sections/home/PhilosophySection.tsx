import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      tl.fromTo('.phil-label',
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.out' }, 0
      )

      const chars = sectionRef.current?.querySelectorAll('.phil-char')
      if (chars) {
        tl.fromTo(chars,
          { y: '100%', opacity: 0 },
          { y: '0%', opacity: 1, duration: 0.6, ease: 'expo.out', stagger: 0.02 },
          0.2
        )
      }

      tl.fromTo('.phil-body',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 0.75, duration: 0.6, ease: 'expo.out' },
        0.6
      )

      tl.fromTo('.phil-cta',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out' },
        0.8
      )

      tl.fromTo('.phil-image',
        { scale: 1.02, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'expo.out' },
        0.2
      )

      // Parallax on image
      gsap.to('.phil-image-inner', {
        y: '6%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const headlineWords = ['Designed', 'as', 'a', 'room.', 'Built', 'for', 'the', 'wild.']

  return (
    <section
      ref={sectionRef}
      className="bg-charcoal py-[100px] md:py-[160px] lg:py-[200px]"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column — Text */}
          <div className="order-2 lg:order-1">
            <div className="phil-label opacity-0 font-sans text-[11px] font-500 uppercase tracking-[0.12em] text-warm-white/50 mb-6">
              PHILOSOPHY
            </div>

            <h2 className="font-serif text-[clamp(36px,5vw,72px)] font-400 text-warm-white leading-[0.98] tracking-[-0.02em]">
              {headlineWords.map((word, wi) => (
                <span key={wi} className="inline-block mr-[0.25em] overflow-hidden">
                  {word.split('').map((char, ci) => (
                    <span key={ci} className="phil-char inline-block opacity-0">
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </h2>

            <p className="phil-body mt-7 max-w-[440px] font-sans text-[clamp(17px,1.4vw,20px)] font-300 text-warm-white leading-[1.65] opacity-0">
              VILDRUM combines Scandinavian restraint with inflatable air-beam engineering to create outdoor shelters that are fast to set up, beautiful to live in, and composed in changing weather.
            </p>

            <div className="phil-cta mt-10 opacity-0">
              <Link
                to="/about"
                className="group font-sans text-[14px] font-500 text-warm-white inline-flex items-center gap-1.5"
              >
                Our story
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                <span className="block h-px w-0 bg-warm-white group-hover:w-full transition-all duration-[400ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]" />
              </Link>
            </div>
          </div>

          {/* Right column — Image */}
          <div className="order-1 lg:order-2 overflow-hidden">
            <div className="phil-image aspect-[3/2] overflow-hidden opacity-0">
              <img
                src="/designed-room.jpg"
                alt="VILDRUM shelter on the Scandinavian coast"
                className="phil-image-inner w-full h-[112%] object-cover will-change-transform"
                style={{ marginTop: '-6%' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
