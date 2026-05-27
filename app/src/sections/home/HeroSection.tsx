import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })

      if (labelRef.current) {
        tl.to(labelRef.current, {
          opacity: 0.7,
          duration: 0.4,
          ease: 'power2.out',
        }, 0.3)
      }

      if (headlineRef.current) {
        const chars = headlineRef.current.querySelectorAll('.hero-char')
        tl.fromTo(chars,
          { y: '100%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            duration: 0.6,
            ease: 'expo.out',
            stagger: 0.02,
          },
          0.5
        )
      }

      if (subRef.current) {
        tl.fromTo(subRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 0.85, duration: 0.6, ease: 'expo.out' },
          1.4
        )
      }

      if (ctaRef.current) {
        tl.fromTo(ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out' },
          1.7
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const headlineText = 'A room for the wild.'
  const words = headlineText.split(' ')

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100dvh] overflow-hidden flex items-center justify-center"
    >
      {/* Background */}
      <img
        src="/hero-vildrum.jpg"
        alt="VILDRUM shelter in golden field"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(26,26,24,0.2) 0%, rgba(26,26,24,0.05) 40%, rgba(26,26,24,0.35) 100%)',
        }}
      />

      {/* Text content */}
      <div className="relative z-10 text-center px-5 max-w-[800px] mx-auto">
        {/* Brand label */}
        <div
          ref={labelRef}
          className="opacity-0 font-sans text-[11px] font-500 uppercase tracking-[0.12em] text-warm-white mb-8"
          style={{ opacity: 0 }}
        >
          VILDRUM — WATCH IT RISE
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="font-serif text-[clamp(48px,8vw,120px)] font-400 text-warm-white leading-[0.92] tracking-[-0.03em]"
        >
          <span className="block overflow-hidden">
            {words.map((word, wi) => (
              <span key={wi} className="inline-block mr-[0.3em]">
                {word.split('').map((char, ci) => (
                  <span
                    key={ci}
                    className="hero-char inline-block"
                    style={{ opacity: 0 }}
                  >
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </span>
        </h1>

        {/* Subheadline */}
        <p
          ref={subRef}
          className="mt-7 mx-auto max-w-[560px] font-sans text-[clamp(17px,1.4vw,20px)] font-300 text-warm-white leading-[1.65]"
          style={{ opacity: 0 }}
        >
          From flat ground to outdoor room in eight minutes. Inflatable Scandinavian shelters that rise before your eyes.
        </p>

        {/* CTA Group */}
        <div
          ref={ctaRef}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-10"
          style={{ opacity: 0 }}
        >
          <a
            href="#collection"
            className="group relative font-sans text-[14px] font-500 text-warm-white inline-flex items-center gap-2"
          >
            Watch it rise
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-warm-white group-hover:w-full transition-all duration-[400ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]" />
          </a>
          <span className="hidden sm:inline text-warm-white/30">|</span>
          <Link
            to="/products"
            className="group relative font-sans text-[14px] font-500 text-warm-white/70 hover:text-warm-white transition-colors duration-200 inline-flex items-center gap-2"
          >
            Explore VILDRUM
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-warm-white/70 group-hover:w-full transition-all duration-[400ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]" />
          </Link>
        </div>
      </div>
    </section>
  )
}
