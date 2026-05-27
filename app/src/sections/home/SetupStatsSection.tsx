import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '8', suffix: ' min', label: 'Average setup time', rawNum: 8 },
  { value: '72', suffix: ' hr', label: 'Air pressure retention', rawNum: 72 },
  { value: '4', suffix: ' season', label: 'All-weather rated', rawNum: 4 },
]

export default function SetupStatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const countRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline word reveal
      const words = sectionRef.current?.querySelectorAll('.stat-word')
      if (words) {
        gsap.fromTo(words,
          { y: 20, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.6, ease: 'expo.out', stagger: 0.06,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
          }
        )
      }

      gsap.fromTo('.stat-body',
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 0.7, duration: 0.6, ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
          delay: 0.3,
        }
      )

      // Divider line draw
      gsap.fromTo('.stat-divider',
        { scaleX: 0 },
        {
          scaleX: 1, duration: 0.8, ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        }
      )

      // Count up animation
      stats.forEach((stat, i) => {
        const el = countRefs.current[i]
        if (!el) return
        const obj = { val: 0 }
        gsap.to(obj, {
          val: stat.rawNum,
          duration: 1.2,
          ease: 'expo.out',
          delay: 0.3 + i * 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
          onUpdate: () => {
            el.textContent = Math.round(obj.val).toString()
          },
        })
      })

      // Label fade-in
      gsap.fromTo('.stat-label',
        { opacity: 0 },
        {
          opacity: 1, duration: 0.5, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
          delay: 0.5,
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const headlineWords = ['Ready', 'in', 'minutes.']

  return (
    <section
      ref={sectionRef}
      className="bg-limestone py-[80px] md:py-[120px] lg:py-[160px]"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        {/* Header */}
        <div className="text-center">
          <div className="font-sans text-[11px] font-500 uppercase tracking-[0.12em] text-ash mb-6">
            SETUP
          </div>
          <h2 className="font-serif text-[clamp(32px,4vw,56px)] font-400 text-charcoal leading-[1.05] tracking-[-0.015em]">
            {headlineWords.map((word, i) => (
              <span key={i} className="stat-word inline-block mr-[0.25em] opacity-0">
                {word}
              </span>
            ))}
          </h2>
          <p className="stat-body mt-5 max-w-[540px] mx-auto font-sans text-[clamp(17px,1.4vw,20px)] font-300 text-charcoal leading-[1.65] opacity-0">
            No poles. No confusion. Our air-beam technology inflates the entire structure in under 8 minutes with the included pump.
          </p>
        </div>

        {/* Divider */}
        <div className="stat-divider h-px bg-fog mt-16 mb-16 origin-left" style={{ transform: 'scaleX(0)' }} />

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {stats.map((stat, i) => (
            <div key={stat.label} className="text-center">
              <div className="font-serif text-[clamp(48px,5vw,72px)] font-400 text-charcoal leading-[0.92] tracking-[-0.02em]">
                <span ref={el => { countRefs.current[i] = el }}>0</span>
                <span>{stat.suffix}</span>
              </div>
              <div className="stat-label mt-2 font-sans text-[14px] font-400 text-ash opacity-0">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
