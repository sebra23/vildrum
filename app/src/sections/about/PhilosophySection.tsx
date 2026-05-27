import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { VolumeX, Ruler, CloudSun } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const pillars = [
  {
    number: '01',
    title: 'Quiet Design',
    body: 'We design for silence — visual, spatial, and material. Every element serves a purpose. Nothing shouts. The shelter is a backdrop for the landscape, not a statement against it.',
    icon: VolumeX,
  },
  {
    number: '02',
    title: 'Architectural Presence',
    body: 'Form follows function, but function deserves beauty. Our shelters have clean geometry, proportional lines, and a spatial quality that feels designed — because it is.',
    icon: Ruler,
  },
  {
    number: '03',
    title: 'Nature-Literate',
    body: 'We build for real weather and real landscapes. Four-season capability, wind stability to 80 km/h, and fabric that ages gracefully. A VILDRUM is at home in a storm.',
    icon: CloudSun,
  },
]

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true,
        },
      })

      if (headerRef.current) {
        tl.fromTo(headerRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'expo.out' },
          0
        )
      }

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.pillar-card')
        const borders = cardsRef.current.querySelectorAll('.pillar-border')

        tl.fromTo(cards,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out', stagger: 0.15 },
          0.2
        )

        tl.fromTo(borders,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.6, ease: 'expo.out', stagger: 0.15 },
          0.4
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="bg-limestone py-[80px] md:py-[120px] lg:py-[160px]"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <h2
          ref={headerRef}
          className="font-serif text-[clamp(32px,4vw,56px)] font-400 text-charcoal leading-[1.05] tracking-[-0.015em] text-center mb-16 md:mb-20 opacity-0"
        >
          Our philosophy
        </h2>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-12"
        >
          {pillars.map((pillar) => {
            const Icon = pillar.icon
            return (
              <div key={pillar.number} className="pillar-card relative opacity-0">
                <div
                  className="pillar-border w-10 h-0.5 bg-charcoal origin-left"
                  style={{ transform: 'scaleX(0)' }}
                />
                <span className="font-serif text-[80px] font-400 text-fog/40 leading-none mt-6 block select-none">
                  {pillar.number}
                </span>
                <div className="mt-4 mb-3">
                  <Icon className="w-5 h-5 text-ash" strokeWidth={1.5} />
                </div>
                <h3 className="font-sans text-[clamp(20px,2vw,28px)] font-500 text-charcoal leading-[1.3] tracking-[0.02em]">
                  {pillar.title}
                </h3>
                <p className="font-sans text-[16px] font-300 text-charcoal/70 leading-[1.65] mt-4">
                  {pillar.body}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
