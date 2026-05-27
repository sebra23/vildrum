import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function NewsletterSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState('')

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.news-headline',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        }
      )

      gsap.fromTo('.news-body',
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
          delay: 0.2,
        }
      )

      gsap.fromTo('.news-form',
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
          delay: 0.4,
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEmail('')
  }

  return (
    <section
      ref={sectionRef}
      className="bg-charcoal py-[80px] md:py-[100px] lg:py-[140px]"
    >
      <div className="max-w-[600px] mx-auto px-5 md:px-10 text-center">
        <h2 className="news-headline font-serif text-[clamp(32px,4vw,56px)] font-400 text-warm-white leading-[1.05] tracking-[-0.015em] opacity-0">
          Stay close to the wild.
        </h2>
        <p className="news-body mt-4 font-sans text-[16px] font-300 text-warm-white/[0.65] leading-[1.6] opacity-0">
          New shelters, field stories, and quiet moments from the outdoors — delivered sparingly.
        </p>

        <form onSubmit={handleSubmit} className="news-form mt-10 opacity-0">
          <div className="relative max-w-[400px] mx-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="w-full bg-transparent border-b border-warm-white/30 pb-3 pr-10 font-sans text-[16px] font-300 text-warm-white placeholder:text-warm-white/30 focus:outline-none focus:border-warm-white transition-colors duration-200"
            />
            <button
              type="submit"
              className="absolute right-0 bottom-3 text-warm-white hover:opacity-70 transition-opacity"
            >
              <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>
          <p className="mt-4 font-sans text-[12px] text-warm-white/40">
            No spam. Unsubscribe anytime.
          </p>
        </form>
      </div>
    </section>
  )
}
