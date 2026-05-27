import { Routes, Route } from 'react-router-dom'
import { CartProvider } from '@/context/CartContext'
import Layout from '@/components/Layout'
import Home from '@/pages/Home'
import Products from '@/pages/Products'
import ProductDetail from '@/pages/ProductDetail'
import About from '@/pages/About'
import Blog from '@/pages/Blog'
import BlogPost from '@/pages/BlogPost'
import Contact from '@/pages/Contact'

export default function App() {
  return (
    <CartProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/journal" element={<Blog />} />
          <Route path="/journal/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </CartProvider>
  )
}
