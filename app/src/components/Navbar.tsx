import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { totalItems, openCart } = useCart()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const navLinks = [
    { label: 'Shelters', to: '/products' },
    { label: 'About', to: '/about' },
    { label: 'Blog', to: '/blog' },
    { label: 'Contact', to: '/contact' },
  ]

  return (
    <>
      <nav
        className={
          'fixed top-0 left-0 right-0 z-50 h-16 flex items-center transition-all duration-300 ' +
          (scrolled
            ? 'bg-warm-white/95 backdrop-blur-[12px]'
            : 'bg-transparent')
        }
      >
        <div className="w-full max-w-[1320px] mx-auto px-5 md:px-10 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="font-sans text-[16px] font-semibold tracking-[0.08em] text-charcoal"
          >
            VILDRUM
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="font-sans text-[14px] font-400 tracking-[0.04em] text-charcoal/60 hover:text-charcoal transition-opacity duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-4">
            <button
              onClick={openCart}
              className="relative p-1 text-charcoal hover:opacity-70 transition-opacity"
            >
              <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-pine text-warm-white text-[9px] font-sans font-500 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-1 text-charcoal"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" strokeWidth={1.5} />
              ) : (
                <Menu className="w-5 h-5" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] bg-warm-white flex flex-col items-center justify-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="font-sans text-[24px] font-400 tracking-[0.04em] text-charcoal"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
