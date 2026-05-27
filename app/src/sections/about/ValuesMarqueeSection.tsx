import { useRef } from 'react'

const values = [
  'Quiet',
  'Architectural',
  'Premium',
  'Calm',
  'Confident',
  'Functional',
  'Nature-Literate',
]

export default function ValuesMarqueeSection() {
  const trackRef = useRef<HTMLDivElement>(null)

  // Duplicate the list for seamless infinite scroll
  const allValues = [...values, ...values]

  return (
    <section className="bg-warm-white py-[60px] md:py-[80px] overflow-hidden">
      <div
        ref={trackRef}
        className="flex items-center gap-12 md:gap-12 animate-marquee whitespace-nowrap"
        style={{
          animation: 'marquee-scroll 30s linear infinite',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.animationPlayState = 'paused'
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.animationPlayState = 'running'
        }}
      >
        {allValues.map((value, i) => (
          <span key={i} className="flex items-center gap-12 md:gap-12 shrink-0">
            <span className="font-serif text-[clamp(32px,4vw,56px)] font-400 text-charcoal tracking-[-0.015em] select-none">
              {value}
            </span>
            <span className="font-serif text-fog text-[clamp(32px,4vw,56px)] select-none">&middot;</span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
