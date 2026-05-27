import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export default function HeritageQuoteSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLQuoteElement>(null)
  const attrRef = useRef<HTMLParagraphElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      if (quoteRef.current) {
        const words = quoteRef.current.querySelectorAll('.quote-word')
        tl.fromTo(words,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'expo.out', stagger: 0.04 },
          0
        )
      }

      if (attrRef.current) {
        tl.fromTo(attrRef.current,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out' },
          0.6
        )
      }

      if (dividerRef.current) {
        tl.fromTo(dividerRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: 'expo.out' },
          0.8
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, { scope: sectionRef })

  const quoteText = 'In Scandinavia, we have a word for the particular joy of being inside while a storm passes outside. That feeling — of shelter, warmth, and calm observation — is what we designed VILDRUM to deliver, anywhere.'
  const quoteWords = quoteText.split(' ')

  return (
    <section
      ref={sectionRef}
      className="bg-sand py-[80px] md:py-[120px] lg:py-[160px]"
    >
      <div className="max-w-[800px] mx-auto px-5 md:px-10 text-center">
        <blockquote
          ref={quoteRef}
          className="font-serif text-[clamp(22px,2.5vw,32px)] font-400 italic text-charcoal leading-[1.5]"
        >
          {quoteWords.map((word, i) => (
            <span key={i} className="quote-word inline-block mr-[0.25em] opacity-0">
              {word}
            </span>
          ))}
        </blockquote>

        <p
          ref={attrRef}
          className="font-sans text-[14px] font-400 text-ash mt-8 opacity-0"
        >
          — Erik Lindqvist, Founder
        </p>

        <div
          ref={dividerRef}
          className="w-10 h-px bg-fog mx-auto mt-12 origin-center"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>
    </section>
  )
}
