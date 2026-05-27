import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function BrandPromiseSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const statementRef = useRef<HTMLHeadingElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      if (labelRef.current) {
        tl.to(labelRef.current, { opacity: 1, duration: 0.4, ease: 'power2.out' }, 0)
      }

      if (statementRef.current) {
        const words = statementRef.current.querySelectorAll('.promise-word')
        tl.fromTo(words,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'expo.out', stagger: 0.08 },
          0.1
        )
      }

      if (dividerRef.current) {
        tl.fromTo(dividerRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: 'expo.out' },
          0.6
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const statement = 'The calm of a Scandinavian cabin, anywhere.'
  const words = statement.split(' ')

  return (
    <section
      ref={sectionRef}
      className="bg-warm-white py-[80px] md:py-[120px] lg:py-[160px]"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 text-center">
        {/* Label */}
        <div
          ref={labelRef}
          className="font-sans text-[11px] font-500 uppercase tracking-[0.12em] text-ash mb-8 opacity-0"
        >
          OUR PROMISE
        </div>

        {/* Statement */}
        <h2
          ref={statementRef}
          className="font-serif text-[clamp(40px,6vw,88px)] font-400 text-charcoal leading-[0.95] tracking-[-0.025em] max-w-[700px] mx-auto"
        >
          {words.map((word, i) => (
            <span key={i} className="promise-word inline-block mr-[0.3em] opacity-0">
              {word}
            </span>
          ))}
        </h2>

        {/* Divider */}
        <div
          ref={dividerRef}
          className="w-[60px] h-px bg-fog mx-auto mt-12 origin-center"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>
    </section>
  )
}
