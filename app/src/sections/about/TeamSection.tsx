import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const teamMembers = [
  { name: 'Erik Lindqvist', role: 'Founder & Design Director' },
  { name: 'Astrid Nyström', role: 'Head of Engineering' },
  { name: 'Jonas Holm', role: 'Product Development' },
  { name: 'Freja Andersen', role: 'Brand & Operations' },
]

export default function TeamSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

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
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'expo.out' },
          0
        )
      }

      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.team-card')
        tl.fromTo(cards,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out', stagger: 0.1 },
          0.2
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
        <div ref={headerRef} className="mb-12 md:mb-16 opacity-0">
          <span className="font-sans text-[11px] font-500 uppercase tracking-[0.12em] text-ash">
            THE TEAM
          </span>
          <h2 className="font-serif text-[clamp(32px,4vw,56px)] font-400 text-charcoal leading-[1.05] tracking-[-0.015em] mt-3">
            A small team with a quiet mission.
          </h2>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {teamMembers.map((member, i) => (
            <div key={i} className="team-card opacity-0 group">
              <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                <img
                  src="/about-team.jpg"
                  alt={member.name}
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-400"
                  style={{ transitionTimingFunction: 'ease' }}
                />
              </div>
              <p className="font-sans text-[15px] font-500 text-charcoal mt-4">
                {member.name}
              </p>
              <p className="font-sans text-[13px] font-400 text-ash mt-0.5">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
