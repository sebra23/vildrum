import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'

const easeExpoOut = [0.16, 1, 0.3, 1] as [number, number, number, number]

export default function ResponsePromise() {
  return (
    <section className="bg-charcoal py-20 px-5 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: easeExpoOut }}
        className="max-w-[800px] mx-auto text-center"
      >
        <Clock
          className="w-8 h-8 mx-auto text-warm-white"
          strokeWidth={1.5}
          style={{ opacity: 0.5 }}
        />

        <h3
          className="font-serif text-warm-white mt-4"
          style={{
            fontSize: 'clamp(22px, 2.5vw, 32px)',
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
          }}
        >
          We respond within 24 hours.
        </h3>

        <p
          className="font-sans font-300 text-[16px] text-warm-white mt-3 max-w-[600px] mx-auto"
          style={{ opacity: 0.65, lineHeight: 1.6 }}
        >
          Every message is read by a human on our team in Copenhagen. We do not
          outsource support because we believe personal care is part of the
          product.
        </p>
      </motion.div>
    </section>
  )
}
