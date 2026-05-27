import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function NewsletterSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEmail('')
  }

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      if (headlineRef.current) {
        tl.fromTo(headlineRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'expo.out' },
          0
        )
      }

      const rest = [bodyRef.current, formRef.current].filter(Boolean)
      if (rest.length) {
        tl.fromTo(rest,
          { y: 25, opacity: 0 },
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
      className="bg-limestone py-[80px] md:py-[100px] lg:py-[120px]"
    >
      <div className="max-w-[700px] mx-auto px-5 md:px-10 text-center">
        <h2
          ref={headlineRef}
          className="font-serif text-[clamp(32px,4vw,56px)] font-400 text-charcoal leading-[1.05] tracking-[-0.015em] opacity-0"
        >
          Never miss a field note.
        </h2>

        <p
          ref={bodyRef}
          className="font-sans text-[16px] font-300 text-charcoal/70 leading-[1.65] mt-4 opacity-0"
        >
          New stories, setup tips, and quiet inspiration — delivered when we have something worth saying.
        </p>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="relative max-w-[400px] mx-auto mt-8 opacity-0"
        >
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Your email address"
            className="w-full bg-transparent border-b border-fog pb-3 pr-10 font-sans text-[16px] font-300 text-charcoal placeholder:text-fog focus:outline-none focus:border-charcoal transition-colors duration-200"
          />
          <button
            type="submit"
            className="absolute right-0 bottom-3 text-charcoal hover:opacity-60 transition-opacity"
          >
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </form>
      </div>
    </section>
  )
}
