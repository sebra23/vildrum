import { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export default function FeaturedArticleSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
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
        const els = textRef.current.querySelectorAll('.feat-anim')
        tl.fromTo(els,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out', stagger: 0.1 },
          0.2
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="bg-warm-white">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5">
          {/* Left — Image */}
          <div
            ref={imageRef}
            className="md:col-span-3 relative overflow-hidden opacity-0"
          >
            <div className="aspect-[16/10] md:aspect-auto md:h-full">
              <img
                src="/journal-cabin-culture.jpg"
                alt="Traditional Norwegian hytte cabin interior"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right — Text */}
          <div
            ref={textRef}
            className="md:col-span-2 flex flex-col justify-center px-5 md:px-10 lg:px-14 py-12 md:py-16"
          >
            <span className="feat-anim font-sans text-[11px] font-500 uppercase tracking-[0.12em] text-ash opacity-0">
              FEATURED STORY
            </span>

            <span className="feat-anim font-sans text-[11px] font-500 uppercase tracking-[0.1em] text-pine mt-6 opacity-0">
              CULTURE
            </span>

            <h2 className="feat-anim font-serif text-[clamp(24px,2.5vw,36px)] font-400 text-charcoal leading-[1.15] tracking-[-0.01em] mt-4 opacity-0">
              The Art of the Norwegian Hytte — What Scandinavian Cabin Culture Teaches Us About Living
            </h2>

            <p className="feat-anim font-sans text-[16px] font-300 text-charcoal/70 leading-[1.6] mt-4 opacity-0">
              There is a particular quality to Scandinavian cabin life — a deliberate simplicity, a comfort with solitude, and a deep reverence for the landscape outside the window. We explore how the Norwegian &lsquo;hytte&rsquo; tradition shapes everything we build at VILDRUM.
            </p>

            <div className="feat-anim mt-8 opacity-0">
              <Link
                to="/journal"
                className="group inline-flex items-center gap-2 font-sans text-[14px] font-500 text-charcoal"
              >
                <span className="relative">
                  Read the story
                  <span
                    className="absolute left-0 bottom-0 w-0 h-px bg-charcoal transition-all duration-400 group-hover:w-full"
                    style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)' }}
                  />
                </span>
                <span className="text-[12px]">&rarr;</span>
              </Link>
            </div>

            <p className="feat-anim font-sans text-[12px] font-400 text-ash mt-4 opacity-0">
              12 min read &middot; October 2025
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
