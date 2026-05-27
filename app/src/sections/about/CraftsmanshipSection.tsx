import { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export default function CraftsmanshipSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      if (imageRef.current) {
        tl.fromTo(imageRef.current,
          { scale: 1.02, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, ease: 'expo.out' },
          0
        )
      }

      if (textRef.current) {
        const els = textRef.current.querySelectorAll('.craft-anim')
        tl.fromTo(els,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out', stagger: 0.12 },
          0.2
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="bg-charcoal py-[80px] md:py-[120px] lg:py-[160px]"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Left — Image */}
          <div
            ref={imageRef}
            className="relative overflow-hidden opacity-0"
            style={{ aspectRatio: '3/2' }}
          >
            <img
              src="/brand-story-workshop.jpg"
              alt="Inside a Scandinavian design workshop"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right — Text */}
          <div
            ref={textRef}
            className="flex flex-col justify-center px-0 md:pl-16 py-12 md:py-0"
          >
            <span className="craft-anim font-sans text-[11px] font-500 uppercase tracking-[0.12em] text-warm-white/50 opacity-0">
              CRAFTSMANSHIP
            </span>

            <h2 className="craft-anim font-serif text-[clamp(32px,4vw,56px)] font-400 text-warm-white leading-[0.98] tracking-[-0.015em] mt-5 opacity-0">
              Built with care,
              <br />
              tested with patience.
            </h2>

            <p className="craft-anim font-sans text-[16px] font-300 text-warm-white/75 leading-[1.65] mt-7 max-w-[440px] opacity-0">
              Every VILDRUM shelter is designed in Copenhagen and manufactured in Northern Europe. Our air beams undergo 72 hours of continuous pressure testing. Every seam is taped and inspected. Every fabric batch is tested for water resistance, UV degradation, and tear strength.
            </p>
            <p className="craft-anim font-sans text-[16px] font-300 text-warm-white/75 leading-[1.65] mt-4 max-w-[440px] opacity-0">
              We build slowly so you can live quickly outdoors.
            </p>

            <Link
              to="/products"
              className="craft-anim group inline-flex items-center gap-2 font-sans text-[14px] font-500 text-warm-white mt-8 opacity-0"
            >
              <span className="relative">
                See our process
                <span className="absolute left-0 bottom-0 w-0 h-px bg-warm-white transition-all duration-400 group-hover:w-full" style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)' }} />
              </span>
              <span className="text-[12px]">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
