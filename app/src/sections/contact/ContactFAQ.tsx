import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const easeExpoOut = [0.16, 1, 0.3, 1] as [number, number, number, number]

const faqData = [
  {
    question: 'Where do you ship?',
    answer:
      'We ship to all EU countries, Norway, Switzerland, and the United Kingdom. Shipping is free within the EU. Delivery times vary from 3–7 business days depending on location.',
  },
  {
    question: 'What is your return policy?',
    answer:
      'You can return any unused VILDRUM shelter within 30 days of delivery for a full refund. The shelter must be in original condition with all packaging. We also offer a 60-day exchange window if you would like to switch to a different model.',
  },
  {
    question: 'How long is the warranty?',
    answer:
      'Every VILDRUM shelter comes with a 5-year warranty covering manufacturing defects. This includes air beams, fabric, zippers, and seams. Normal wear and tear, punctures from misuse, and UV degradation beyond expected lifespan are not covered.',
  },
  {
    question: 'Do you offer repair services?',
    answer:
        'Yes. We offer lifetime repair services for all VILDRUM shelters. Send your shelter to us and we will assess and repair it for the cost of materials only. We believe in building products that last decades, not seasons.',
  },
  {
    question: 'Can I see a shelter in person?',
    answer:
      'We have showrooms in Copenhagen, Stockholm, and Oslo. You can book a private viewing through our website. We also attend select outdoor and design fairs across Northern Europe — check our Journal for upcoming dates.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards (Visa, Mastercard, Amex), PayPal, Apple Pay, and bank transfer for orders over €5,000. We also offer installment payments through Klarna for orders within the EU.',
  },
  {
    question: 'Do you sell to professionals?',
    answer:
      'Yes. We have a dedicated program for architects, landscape designers, hospitality operators, and event planners. Professional clients receive bulk pricing, custom configuration support, and extended warranty terms. Contact us for details.',
  },
  {
    question: 'How do I clean and maintain my shelter?',
    answer:
      'Clean the exterior with lukewarm water and a soft brush. Avoid detergents. Allow the shelter to dry completely before packing. Store in a cool, dry place with the valves slightly open to prevent moisture buildup. We recommend an annual inspection of seams and air beams.',
  },
]

function FAQItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: { question: string; answer: string }
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        ease: easeExpoOut,
        delay: index * 0.06,
      }}
      className="border-b border-charcoal/[0.08]"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span className="font-sans font-500 text-[16px] text-charcoal pr-4">
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="flex-shrink-0 text-charcoal"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <line x1="8" y1="1" x2="8" y2="15" />
            <line x1="1" y1="8" x2="15" y2="8" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
              opacity: { duration: 0.3, ease: 'easeInOut' },
            }}
            className="overflow-hidden"
          >
            <p className="font-sans font-300 text-[16px] text-ash pb-6 pt-1 pr-8">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleToggle = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index))
  }

  return (
    <section className="bg-limestone py-[120px] px-5 md:px-10">
      <div className="max-w-[800px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: easeExpoOut }}
          className="mb-12"
        >
          <p className="font-sans text-[11px] font-500 uppercase tracking-[0.12em] text-ash mb-3">
            FREQUENTLY ASKED
          </p>
          <h2
            className="font-serif text-charcoal"
            style={{
              fontSize: 'clamp(32px, 4vw, 56px)',
              lineHeight: 1.05,
              letterSpacing: '-0.015em',
            }}
          >
            Common questions.
          </h2>
        </motion.div>

        {/* Accordion */}
        <div>
          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
