import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)

  useGSAP(() => {
    // Label fade in
    if (labelRef.current) {
      gsap.to(labelRef.current, {
        opacity: 0.6,
        duration: 0.5,
        delay: 0.2,
        ease: 'power2.out',
      })
    }

    // Headline character reveal
    if (headlineRef.current) {
      const chars = headlineRef.current.querySelectorAll('.hero-char')
      gsap.fromTo(chars,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out', stagger: 0.02, delay: 0.3 }
      )
    }

    // Subheadline fade up
    if (subRef.current) {
      gsap.fromTo(subRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 0.8, duration: 0.7, ease: 'expo.out', delay: 0.9 }
      )
    }
  }, { scope: sectionRef })

  const headlineText = 'Field Notes'

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[60vh] md:min-h-[60vh] overflow-hidden flex items-end"
    >
      {/* Background image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/journal-field-guide.jpg"
          alt="Person walking across Scandinavian alpine field"
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(26,26,24,0.25) 0%, rgba(26,26,24,0.45) 100%)',
          }}
        />
      </div>

      {/* Text content */}
      <div className="relative z-10 w-full pb-16 md:pb-20 px-5 md:px-10 text-center">
        <span
          ref={labelRef}
          className="font-sans text-[11px] font-500 uppercase tracking-[0.12em] text-warm-white opacity-0"
        >
          JOURNAL
        </span>

        <h1
          ref={headlineRef}
          className="font-serif text-[clamp(40px,6vw,88px)] font-400 text-warm-white leading-[0.95] tracking-[-0.025em] mt-3"
        >
          {headlineText.split('').map((char, i) => (
            <span key={i} className="hero-char inline-block opacity-0" style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        <p
          ref={subRef}
          className="font-sans text-[clamp(17px,1.4vw,20px)] font-300 text-warm-white/80 mt-4 max-w-[540px] mx-auto opacity-0"
        >
          Stories, guides, and quiet moments from the outdoors.
        </p>
      </div>
    </section>
  )
}
