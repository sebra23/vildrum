import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export default function OriginStorySection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const sigRef = useRef<HTMLParagraphElement>(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      if (labelRef.current) {
        tl.to(labelRef.current, { opacity: 1, duration: 0.6, ease: 'power2.out' }, 0)
      }

      if (bodyRef.current) {
        const paras = bodyRef.current.querySelectorAll('.story-para')
        tl.fromTo(paras,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'expo.out', stagger: 0.15 },
          0.2
        )
      }

      if (sigRef.current) {
        tl.fromTo(sigRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out' },
          0.8
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="bg-warm-white py-[80px] md:py-[120px] lg:py-[160px]"
    >
      <div className="max-w-[1000px] mx-auto px-5 md:px-10 text-center">
        <div
          ref={labelRef}
          className="font-sans text-[11px] font-500 uppercase tracking-[0.12em] text-ash opacity-0"
        >
          OUR STORY
        </div>

        <div ref={bodyRef} className="mt-10 max-w-[700px] mx-auto">
          <p className="story-para font-sans text-[clamp(17px,1.4vw,20px)] font-300 text-charcoal/80 leading-[1.7] opacity-0">
            VILDRUM was born from a simple frustration: the gap between the experience of being outdoors and the quality of the shelters available. Camping tents felt like temporary inconveniences. Glamping options were overwrought. Expedition gear was technically impressive but emotionally cold.
          </p>
          <p className="story-para font-sans text-[clamp(17px,1.4vw,20px)] font-300 text-charcoal/80 leading-[1.7] mt-6 opacity-0">
            We wanted something else entirely — a shelter that felt like a room. Something quiet, architectural, and composed. Something that honoured the Scandinavian tradition of building simply and beautifully in nature.
          </p>
          <p className="story-para font-sans text-[clamp(17px,1.4vw,20px)] font-300 text-charcoal/80 leading-[1.7] mt-6 opacity-0">
            So we combined inflatable air-beam engineering with Scandinavian design principles to create outdoor shelters that are fast to set up, beautiful to live in, and respectful of the landscapes they occupy.
          </p>
        </div>

        <p
          ref={sigRef}
          className="font-serif text-[18px] italic text-charcoal mt-12 opacity-0"
        >
          — The VILDRUM team
        </p>
      </div>
    </section>
  )
}
