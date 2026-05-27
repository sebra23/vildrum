import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEmail('')
  }

  return (
    <footer className="bg-charcoal text-warm-white">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 pt-16 pb-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Column 1: Brand */}
          <div className="lg:col-span-1">
            <span className="font-sans text-[16px] font-semibold tracking-[0.08em]">
              VILDRUM
            </span>
            <p className="mt-3 font-sans text-[13px] text-warm-white/50 leading-relaxed">
              A room for the wild.
            </p>
          </div>

          {/* Column 2: Shop */}
          <div>
            <h4 className="font-sans text-[11px] font-500 uppercase tracking-[0.12em] text-warm-white/40 mb-4">
              Shop
            </h4>
            <ul className="space-y-2.5">
              {['Shelters', 'Accessories', 'Gift Cards'].map(item => (
                <li key={item}>
                  <Link
                    to="/products"
                    className="font-sans text-[13px] text-warm-white/50 hover:text-warm-white transition-opacity duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="font-sans text-[11px] font-500 uppercase tracking-[0.12em] text-warm-white/40 mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'About', to: '/about' },
                { label: 'Blog', to: '/blog' },
                { label: 'Careers', to: '/about' },
                { label: 'Press', to: '/about' },
              ].map(item => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="font-sans text-[13px] text-warm-white/50 hover:text-warm-white transition-opacity duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Support */}
          <div>
            <h4 className="font-sans text-[11px] font-500 uppercase tracking-[0.12em] text-warm-white/40 mb-4">
              Support
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Contact', to: '/contact' },
                { label: 'Shipping', to: '/contact' },
                { label: 'Returns', to: '/contact' },
                { label: 'Warranty', to: '/contact' },
                { label: 'FAQ', to: '/contact' },
              ].map(item => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="font-sans text-[13px] text-warm-white/50 hover:text-warm-white transition-opacity duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Newsletter */}
          <div>
            <h4 className="font-sans text-[11px] font-500 uppercase tracking-[0.12em] text-warm-white/40 mb-4">
              Newsletter
            </h4>
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full bg-transparent border-b border-warm-white/30 pb-2 pr-8 font-sans text-[13px] font-300 text-warm-white placeholder:text-warm-white/30 focus:outline-none focus:border-warm-white transition-colors duration-200"
              />
              <button
                type="submit"
                className="absolute right-0 bottom-2 text-warm-white hover:opacity-70 transition-opacity"
              >
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-warm-white/10 mt-12 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-sans text-[11px] text-warm-white/40">
              &copy; {new Date().getFullYear()} VILDRUM. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {['Privacy', 'Terms'].map(item => (
                <Link
                  key={item}
                  to="/contact"
                  className="font-sans text-[11px] text-warm-white/40 hover:text-warm-white transition-opacity duration-200"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
