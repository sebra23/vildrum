import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'
import { toast } from 'sonner'

const easeExpoOut = [0.16, 1, 0.3, 1] as [number, number, number, number]

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

const fadeUpStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const fadeUpChild = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeExpoOut },
  },
}

const fadeUpStaggerInfo = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const fadeUpChildInfo = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeExpoOut },
  },
}

const subjectOptions = [
  'General inquiry',
  'Product question',
  'Order support',
  'Partnership',
  'Press',
]

export default function ContactFormSection() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Please enter your name'
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.subject) newErrors.subject = 'Please select a subject'
    if (!formData.message.trim()) newErrors.message = 'Please enter a message'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      toast.success('Message sent successfully! We will be in touch within 24 hours.')
    }, 1500)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const inputClassName =
    'w-full bg-transparent border-0 border-b border-fog pb-3 font-sans font-300 text-[16px] text-charcoal placeholder:text-fog focus:outline-none focus:border-charcoal transition-colors duration-200'

  return (
    <section className="bg-warm-white py-[120px] px-5 md:px-10">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-20">
        {/* Left Column — Contact Form */}
        <div>
          <p className="font-sans text-[11px] font-500 uppercase tracking-[0.12em] text-ash mb-10">
            SEND A MESSAGE
          </p>

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                variants={fadeUpStagger}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, transition: { duration: 0.4, ease: easeExpoOut } }}
                noValidate
              >
                {/* Name */}
                <motion.div variants={fadeUpChild} className="mb-8">
                  <label className="block font-sans text-[12px] font-500 uppercase tracking-[0.08em] text-ash mb-3">
                    NAME
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className={inputClassName}
                  />
                  {errors.name && (
                    <p className="mt-2 font-sans text-[12px] text-[#8B3A3A]">{errors.name}</p>
                  )}
                </motion.div>

                {/* Email */}
                <motion.div variants={fadeUpChild} className="mb-8">
                  <label className="block font-sans text-[12px] font-500 uppercase tracking-[0.08em] text-ash mb-3">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={inputClassName}
                  />
                  {errors.email && (
                    <p className="mt-2 font-sans text-[12px] text-[#8B3A3A]">{errors.email}</p>
                  )}
                </motion.div>

                {/* Subject */}
                <motion.div variants={fadeUpChild} className="mb-8">
                  <label className="block font-sans text-[12px] font-500 uppercase tracking-[0.08em] text-ash mb-3">
                    SUBJECT
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={
                      inputClassName +
                      ' appearance-none cursor-pointer ' +
                      (formData.subject ? '' : ' text-fog')
                    }
                  >
                    <option value="" disabled>
                      Select a subject
                    </option>
                    {subjectOptions.map(opt => (
                      <option key={opt} value={opt} className="text-charcoal">
                        {opt}
                      </option>
                    ))}
                  </select>
                  {errors.subject && (
                    <p className="mt-2 font-sans text-[12px] text-[#8B3A3A]">
                      {errors.subject}
                    </p>
                  )}
                </motion.div>

                {/* Message */}
                <motion.div variants={fadeUpChild} className="mb-10">
                  <label className="block font-sans text-[12px] font-500 uppercase tracking-[0.08em] text-ash mb-3">
                    MESSAGE
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="How can we help?"
                    className={inputClassName + ' resize-none'}
                  />
                  {errors.message && (
                    <p className="mt-2 font-sans text-[12px] text-[#8B3A3A]">
                      {errors.message}
                    </p>
                  )}
                </motion.div>

                {/* Submit */}
                <motion.div variants={fadeUpChild}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={
                      'w-full bg-charcoal text-warm-white font-sans font-500 text-[14px] tracking-[0.04em] py-4 px-8 ' +
                      'hover:bg-[#2A2A28] transition-all duration-200 ' +
                      'active:scale-[0.98] active:duration-100 ' +
                      'disabled:opacity-70 disabled:cursor-not-allowed'
                    }
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-warm-white/30 border-t-warm-white rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      'Send message'
                    )}
                  </button>
                </motion.div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: easeExpoOut }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-pine-muted flex items-center justify-center mb-6">
                  <Check className="w-6 h-6 text-pine" strokeWidth={1.5} />
                </div>
                <p className="font-sans font-300 text-[16px] text-charcoal">
                  Thank you. We will be in touch within 24 hours.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column — Contact Information */}
        <motion.div
          variants={fadeUpStaggerInfo}
          initial="hidden"
          animate="visible"
        >
          <p className="font-sans text-[11px] font-500 uppercase tracking-[0.12em] text-ash mb-10">
            GET IN TOUCH
          </p>

          {/* Contact Methods */}
          <motion.div variants={fadeUpChildInfo} className="mb-8">
            <p className="font-sans text-[12px] font-500 uppercase tracking-[0.08em] text-ash mb-1">
              Email
            </p>
            <a
              href="mailto:hello@vildrum.com"
              className="font-sans font-300 text-[16px] text-charcoal relative inline-block group"
            >
              hello@vildrum.com
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-charcoal origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-400" />
            </a>
          </motion.div>

          <motion.div variants={fadeUpChildInfo} className="mb-8">
            <p className="font-sans text-[12px] font-500 uppercase tracking-[0.08em] text-ash mb-1">
              Phone
            </p>
            <p className="font-sans font-300 text-[16px] text-charcoal">
              +45 32 12 34 56
            </p>
          </motion.div>

          <motion.div variants={fadeUpChildInfo} className="mb-10">
            <p className="font-sans text-[12px] font-500 uppercase tracking-[0.08em] text-ash mb-1">
              Hours
            </p>
            <p className="font-sans font-300 text-[16px] text-charcoal">
              Mon–Fri, 9:00–17:00 CET
            </p>
          </motion.div>

          {/* Divider */}
          <div className="border-b border-fog my-10" />

          {/* Headquarters */}
          <motion.div variants={fadeUpChildInfo}>
            <p className="font-sans text-[12px] font-500 uppercase tracking-[0.08em] text-ash mb-3">
              HEADQUARTERS
            </p>
            <p className="font-sans font-300 text-[16px] text-charcoal leading-[1.7]">
              VILDRUM ApS
              <br />
              Sortedam Dossering 59
              <br />
              2100 Copenhagen Ø
              <br />
              Denmark
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={fadeUpChildInfo} className="mt-10">
            <p className="font-sans text-[11px] font-500 uppercase tracking-[0.12em] text-ash mb-3">
              FOLLOW
            </p>
            <div className="flex flex-col gap-3">
              {['Instagram', 'Pinterest'].map(social => (
                <a
                  key={social}
                  href="#"
                  className="font-sans text-[14px] text-charcoal relative inline-block group w-fit"
                >
                  {social}
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-charcoal origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[0.4s]" style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)' }} />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
