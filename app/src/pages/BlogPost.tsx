import { useEffect, useMemo, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useSEO } from '@/hooks/useSEO'
import { blogPosts } from '@/data/blogPosts'
import NewsletterSection from '@/sections/journal/NewsletterSection'

gsap.registerPlugin(ScrollTrigger)

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const containerRef = useRef<HTMLDivElement>(null)

  // Find the current post
  const post = useMemo(() => {
    return blogPosts.find(p => p.slug === slug) || blogPosts[0]
  }, [slug])

  // Find related posts (excluding current, up to 2)
  const relatedPosts = useMemo(() => {
    return blogPosts.filter(p => p.slug !== post.slug).slice(0, 2)
  }, [post.slug])

  useSEO(
    `${post.title} — VILDRUM`,
    post.excerpt
  )

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  useGSAP(() => {
    if (!containerRef.current) return

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo('.anim-header',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 }
    )

    tl.fromTo('.anim-hero-img',
      { scale: 1.03, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'expo.out' },
      '-=0.3'
    )

    // Body blocks reveal on scroll
    const blocks = containerRef.current.querySelectorAll('.anim-block')
    blocks.forEach((block) => {
      gsap.fromTo(block,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: block,
            start: 'top 85%',
            once: true,
          }
        }
      )
    })
  }, { scope: containerRef, dependencies: [slug] })

  return (
    <div ref={containerRef} className="bg-warm-white min-h-screen pt-16">
      {/* ========== ARTICLE HEADER ========== */}
      <header className="max-w-[800px] mx-auto px-5 pt-12 md:pt-20 pb-8 text-center">
        {/* Back Link */}
        <div className="anim-header opacity-0 mb-8 flex justify-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-sans text-[12px] font-500 uppercase tracking-[0.1em] text-ash hover:text-charcoal transition-colors duration-200"
          >
            <span>&larr;</span> Back to Field Notes
          </Link>
        </div>

        <span className="anim-header opacity-0 font-sans text-[11px] font-500 uppercase tracking-[0.15em] text-pine">
          {post.category}
        </span>

        <h1 className="anim-header opacity-0 font-serif text-[clamp(32px,3.8vw,56px)] font-400 text-charcoal leading-[1.08] tracking-[-0.015em] mt-4">
          {post.title}
        </h1>

        <p className="anim-header opacity-0 font-sans text-[12px] text-ash mt-6">
          {post.readTime} &middot; {post.date}
        </p>
      </header>

      {/* ========== FEATURED IMAGE ========== */}
      <div className="max-w-[1100px] mx-auto px-5 mb-16 md:mb-24">
        <div className="anim-hero-img opacity-0 aspect-[16/9] overflow-hidden bg-limestone">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* ========== ARTICLE BODY ========== */}
      <article className="max-w-[700px] mx-auto px-5 mb-24 md:mb-32">
        <div className="space-y-8 md:space-y-10">
          {post.blocks.map((block, i) => {
            switch (block.type) {
              case 'paragraph':
                return (
                  <p
                    key={i}
                    className="anim-block opacity-0 font-sans text-[16px] md:text-[17px] font-300 text-charcoal/80 leading-[1.7] tracking-[0.01em]"
                  >
                    {block.value}
                  </p>
                )
              case 'heading':
                return (
                  <h3
                    key={i}
                    className="anim-block opacity-0 font-sans text-[20px] md:text-[22px] font-500 text-charcoal tracking-[0.01em] mt-12 md:mt-16"
                  >
                    {block.value}
                  </h3>
                )
              case 'quote':
                return (
                  <blockquote
                    key={i}
                    className="anim-block opacity-0 border-l border-pine pl-6 my-10 md:my-12 py-1"
                  >
                    <p className="font-serif text-[22px] md:text-[26px] italic text-pine leading-[1.4] tracking-[-0.01em]">
                      &ldquo;{block.value}&rdquo;
                    </p>
                  </blockquote>
                )
              case 'image':
                return (
                  <figure key={i} className="anim-block opacity-0 my-12 md:my-16">
                    <div className="aspect-[16/10] overflow-hidden bg-limestone">
                      <img
                        src={block.value}
                        alt={block.caption || ''}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {block.caption && (
                      <figcaption className="font-sans text-[12px] text-ash text-center mt-3 tracking-[0.02em]">
                        {block.caption}
                      </figcaption>
                    )}
                  </figure>
                )
              case 'table':
                return (
                  <div key={i} className="anim-block opacity-0 my-12 overflow-x-auto border border-charcoal/[0.08] p-4 bg-limestone/25">
                    <table className="w-full border-collapse font-sans text-[13px] md:text-[14px]">
                      <thead>
                        <tr className="border-b border-charcoal/20">
                          {block.tableHeaders?.map((header, hIdx) => (
                            <th key={hIdx} className="py-3 px-4 text-left font-500 text-charcoal">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {block.tableRows?.map((row, rIdx) => (
                          <tr key={rIdx} className="border-b border-charcoal/5 hover:bg-charcoal/[0.02] last:border-none">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="py-3 px-4 font-300 text-charcoal/80">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
              default:
                return null
            }
          })}
        </div>
      </article>

      {/* ========== RELATED ARTICLES ========== */}
      <section className="bg-limestone py-16 md:py-24 border-t border-charcoal/[0.05]">
        <div className="max-w-[900px] mx-auto px-5">
          <span className="block font-sans text-[11px] font-500 uppercase tracking-[0.12em] text-ash mb-12 text-center md:text-left">
            READ NEXT
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedPosts.map((rPost) => (
              <article key={rPost.slug} className="group">
                <Link to={`/blog/${rPost.slug}`} className="block">
                  <div className="aspect-[16/10] overflow-hidden bg-warm-white">
                    <img
                      src={rPost.image}
                      alt={rPost.title}
                      className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-[1.02]"
                    />
                  </div>
                  <span className="font-sans text-[10px] font-500 uppercase tracking-[0.1em] text-pine mt-4 block">
                    {rPost.category}
                  </span>
                  <h4 className="font-sans text-[16px] font-500 text-charcoal leading-[1.35] mt-1.5 group-hover:text-pine transition-colors">
                    {rPost.title}
                  </h4>
                  <p className="font-sans text-[12px] text-ash mt-3">
                    {rPost.readTime} &middot; {rPost.date}
                  </p>
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <Link
              to="/blog"
              className="px-6 py-3 border border-charcoal text-charcoal font-sans text-[13px] font-500 uppercase tracking-[0.08em] hover:bg-charcoal hover:text-warm-white transition-colors duration-300"
            >
              All Stories
            </Link>
          </div>
        </div>
      </section>

      {/* ========== NEWSLETTER ========== */}
      <NewsletterSection />
    </div>
  )
}
