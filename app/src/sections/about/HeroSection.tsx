import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)

  useGSAP(() => {
    // Background image scale
    if (imageRef.current) {
      gsap.fromTo(imageRef.current,
        { scale: 1.03 },
        { scale: 1, duration: 1.5, ease: 'power2.out' }
      )
    }

    // Label fade in
    if (labelRef.current) {
      gsap.to(labelRef.current, {
        opacity: 0.6,
        duration: 0.6,
        delay: 0.4,
        ease: 'power2.out',
      })
    }

    // Headline word reveal
    if (headlineRef.current) {
      const words = headlineRef.current.querySelectorAll('.hero-word')
      gsap.fromTo(words,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'expo.out', stagger: 0.06, delay: 0.6 }
      )
    }

    // Subheadline fade up
    if (subRef.current) {
      gsap.fromTo(subRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 0.8, duration: 0.7, ease: 'expo.out', delay: 1.2 }
      )
    }
  }, { scope: sectionRef })

  const headlineWords = 'We build rooms for the wild.'.split(' ')

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100dvh] overflow-hidden"
    >
      {/* Background image */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full"
        style={{ transform: 'scale(1.03)' }}
      >
        <img
          src="/brand-story-landscape.jpg"
          alt="Norwegian fjord landscape at dawn"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(26,26,24,0.3) 0%, rgba(26,26,24,0.1) 40%, rgba(26,26,24,0.5) 100%)',
          }}
        />
      </div>

      {/* Text content */}
      <div className="relative z-10 flex flex-col justify-end min-h-[100dvh] px-5 md:px-10 lg:pl-20 pb-16 md:pb-20">
        <span
          ref={labelRef}
          className="font-sans text-[11px] font-500 uppercase tracking-[0.12em] text-warm-white opacity-0"
        >
          ABOUT VILDRUM
        </span>

        <h1
          ref={headlineRef}
          className="font-serif text-[clamp(40px,6vw,88px)] font-400 text-warm-white leading-[0.95] tracking-[-0.025em] mt-4 max-w-[700px]"
        >
          {headlineWords.map((word, i) => (
            <span key={i} className="hero-word inline-block mr-[0.3em] opacity-0">
              {word}
            </span>
          ))}
        </h1>

        <p
          ref={subRef}
          className="font-sans text-[clamp(17px,1.4vw,20px)] font-300 text-warm-white mt-5 max-w-[480px] opacity-0"
        >
          Scandinavian design meets inflatable engineering.
        </p>
      </div>
    </section>
  )
}
