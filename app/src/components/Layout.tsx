import type { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import CartDrawer from './CartDrawer'

interface LayoutProps {
  children: ReactNode
  showFooter?: boolean
}

export default function Layout({ children, showFooter = true }: LayoutProps) {
  return (
    <div className="min-h-[100dvh]">
      <Navbar />
      <CartDrawer />
      <main>{children}</main>
      {showFooter && <Footer />}
    </div>
  )
}
