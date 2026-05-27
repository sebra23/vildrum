import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'

const easeExpoOut = [0.16, 1, 0.3, 1] as [number, number, number, number]

export default function ContactHero() {
  const headlineRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const el = headlineRef.current
    if (!el) return

    const chars = el.querySelectorAll('.char')
    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        { y: '100%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 0.6,
          stagger: 0.02,
          ease: 'expo.out',
          delay: 0.2,
        }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  const headlineText = 'We are here.'

  return (
    <section className="bg-charcoal min-h-[40vh] md:min-h-[40vh] min-h-[35vh] flex items-center justify-center text-center px-5">
      <div className="max-w-[800px] mx-auto">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-sans text-[11px] font-500 uppercase tracking-[0.12em] text-warm-white"
          style={{ opacity: 0.5 }}
        >
          CONTACT
        </motion.p>

        {/* Headline with character reveal */}
        <h1
          ref={headlineRef}
          className="font-serif text-warm-white mt-3 overflow-hidden"
          style={{
            fontSize: 'clamp(40px, 6vw, 88px)',
            lineHeight: 0.95,
            letterSpacing: '-0.025em',
          }}
        >
          {headlineText.split('').map((char, i) => (
            <span
              key={i}
              className="char inline-block"
              style={{ opacity: 0 }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeExpoOut, delay: 0.8 }}
          className="font-sans font-300 text-warm-white mt-4 mx-auto max-w-[500px]"
          style={{
            fontSize: 'clamp(17px, 1.4vw, 20px)',
            lineHeight: 1.65,
            opacity: 0.75,
          }}
        >
          Questions about shelters, orders, or partnerships — we will respond
          within 24 hours.
        </motion.p>
      </div>
    </section>
  )
}
