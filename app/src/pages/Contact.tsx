import { useEffect } from 'react'
import { Toaster } from 'sonner'
import ContactHero from '@/sections/contact/ContactHero'
import ContactFormSection from '@/sections/contact/ContactFormSection'
import ContactFAQ from '@/sections/contact/ContactFAQ'
import ResponsePromise from '@/sections/contact/ResponsePromise'

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: 'var(--charcoal)',
            color: 'var(--warm-white)',
            border: 'none',
            fontFamily: '"Geist", system-ui, sans-serif',
            fontSize: '14px',
            fontWeight: 400,
          },
        }}
      />
      <ContactHero />
      <ContactFormSection />
      <ContactFAQ />
      <ResponsePromise />
    </>
  )
}
