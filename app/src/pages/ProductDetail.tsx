import { useState, useEffect, useRef, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Clock, Maximize, Users, Plus, Minus } from 'lucide-react'
import { useCart } from '@/context/CartContext'

gsap.registerPlugin(ScrollTrigger)

/* ------------------------------------------------------------------ */
/*  Easing                                                             */
/* ------------------------------------------------------------------ */

const easeExpoOut = [0.16, 1, 0.3, 1] as [number, number, number, number]
const easeSoft = [0.4, 0, 0.2, 1] as [number, number, number, number]

/* ------------------------------------------------------------------ */
/*  Product Data                                                       */
/* ------------------------------------------------------------------ */

interface ProductData {
  slug: string
  name: string
  tagline: string
  price: number
  badge?: string
  description: string
  setupTime: string
  floorArea: string
  capacity: string
  mainImage: string
  galleryImages: string[]
  category: string
}

const productDatabase: Record<string, ProductData> = {
  'vildrum-04': {
    slug: 'vildrum-04',
    name: 'VILDRUM 04',
    tagline: 'For couples and small families.',
    price: 900,
    badge: 'BESTSELLER',
    description: 'An 18 m\u00B2 inflatable shelter designed as a portable outdoor room. Floor-to-ceiling mesh panels, integrated groundsheet, and standing height throughout. Sets up in 8 minutes.',
    setupTime: '8 min',
    floorArea: '18 m\u00B2',
    capacity: '4 people',
    mainImage: '/vildrum04-g.jpg',
    galleryImages: ['/vildrum04-a.jpg', '/vildrum04-f.jpg', '/vildrum04-c.jpg', '/vildrum04-e.jpg'],
    category: 'Small Family',
  },
}

/* ------------------------------------------------------------------ */
/*  Feature data                                                       */
/* ------------------------------------------------------------------ */

const features = [
  {
    title: 'Air-Beam Structure',
    description: 'Six interconnected air beams inflate simultaneously from a single valve. The structure reaches full rigidity in under 8 minutes and maintains pressure for 72 hours.',
    image: '/detail-gallery-1.jpg',
  },
  {
    title: 'Panoramic Openings',
    description: 'Full-height mesh panels on three sides zip open to merge the interior with the landscape. Close them for privacy and weather protection without losing the view.',
    image: '/detail-gallery-2.jpg',
  },
  {
    title: 'All-Weather Fabric',
    description: '300D ripstop polyester with dual silicone coating. Waterproof to 5,000mm hydrostatic head. UV-resistant. The fabric softens interior light like a paper lantern.',
    image: '/detail-gallery-4.jpg',
  },
  {
    title: 'Modular Integration',
    description: 'Connect an Annex for gear storage, a Canopy for covered dining, or a Lounge for extended living space. All modules share the same inflation system and fabric family.',
    image: '/detail-gallery-5.jpg',
  },
]

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */

const faqData = [
  {
    q: 'How long does setup really take?',
    a: 'The VILDRUM 04 sets up in approximately 8 minutes with one person. This includes unrolling, inflating, and staking. With two people, expect 5\u20136 minutes.',
  },
  {
    q: 'What happens if an air beam punctures?',
    a: 'Each air beam is independent \u2014 a puncture in one won\'t deflate the others. We include a field repair kit with every shelter, and replacement beams are available through our support team.',
  },
  {
    q: 'Is it suitable for winter use?',
    a: 'Yes. The VILDRUM 04 is 4-season rated. The fabric handles snow load, and the structure remains stable in winds up to 80 km/h. For extended winter use, a compatible stove jack is available.',
  },
  {
    q: 'Can I stand up inside?',
    a: 'Absolutely. The VILDRUM 04 has 2.0 metres of peak height and 1.6 metre wall height throughout. You can walk, cook, and live comfortably inside.',
  },
  {
    q: 'What is the warranty?',
    a: 'Every VILDRUM shelter comes with a 5-year warranty on manufacturing defects and a lifetime repair service. We believe in building things that last.',
  },
]

/* ------------------------------------------------------------------ */
/*  Related products                                                   */
/* ------------------------------------------------------------------ */

const relatedSlugs = ['vildrum-04']

/* ------------------------------------------------------------------ */
/*  Tab Spec Data                                                      */
/* ------------------------------------------------------------------ */

type TabId = 'details' | 'materials' | 'setup' | 'dimensions'

const tabSpecs: Record<TabId, { label: string; value: string }[]> = {
  details: [
    { label: 'Capacity', value: '4 people (2 adults + 2 children)' },
    { label: 'Floor area', value: '18 m\u00B2' },
    { label: 'Peak height', value: '2.0 m' },
    { label: 'Packed weight', value: '11.5 kg' },
    { label: 'Packed size', value: '75 \u00D7 35 cm' },
    { label: 'Setup time', value: '8 minutes (single person)' },
    { label: 'Pressure retention', value: '72 hours' },
    { label: 'Season rating', value: '4-season' },
    { label: 'Ventilation', value: '3 mesh panels + roof vents' },
    { label: 'Doors', value: '2 (front + rear)' },
    { label: 'Windows', value: '2 side windows with covers' },
  ],
  materials: [
    { label: 'Outer fabric', value: '300D ripstop polyester, silicone-coated' },
    { label: 'Floor', value: '210D oxford polyester, 10,000mm HH' },
    { label: 'Air beams', value: 'TPU, 10cm diameter' },
    { label: 'Zippers', value: 'YKK #8 coil, water-resistant' },
    { label: 'Mesh', value: 'No-see-um polyester, 20D' },
    { label: 'Poles', value: 'None (air-beam only)' },
    { label: 'Stakes', value: '12 \u00D7 aluminium Y-stakes included' },
    { label: 'Guylines', value: '6 \u00D7 reflective dyneema' },
  ],
  setup: [
    { label: 'Step 1', value: 'Unroll the shelter and orient the front door facing your preferred view.' },
    { label: 'Step 2', value: 'Attach the included pump to the inflation valve.' },
    { label: 'Step 3', value: 'Inflate until all beams are rigid (approximately 8 minutes).' },
    { label: 'Step 4', value: 'Stake the corners and adjust guylines for tension.' },
    { label: 'Step 5', value: 'Zip open the mesh panels and move in.' },
  ],
  dimensions: [
    { label: 'Floor', value: '3.0 m \u00D7 6.0 m' },
    { label: 'Peak height', value: '2.0 m' },
    { label: 'Wall height', value: '1.6 m' },
    { label: 'Door width', value: '1.4 m' },
    { label: 'Mesh panel width', value: '1.8 m each' },
  ],
}

/* ================================================================== */
/*  MAIN COMPONENT                                                     */
/* ================================================================== */

import { useSEO } from '@/hooks/useSEO'

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()

  const product = useMemo(() => {
    return productDatabase[slug || ''] || productDatabase['vildrum-04']
  }, [slug])

  useSEO(
    `${product.name} — VILDRUM`,
    product.description
  )

  useEffect(() => { window.scrollTo(0, 0) }, [slug])

  return (
    <div>
      {/* Section 1: Product Hero */}
      <ProductHero product={product} />

      {/* Section 2: Editorial Description */}
      <EditorialDescription />

      {/* Section 3: Feature Grid */}
      <FeatureGrid />

      {/* Section 4: Specs Tabs */}
      <SpecsTabs />

      {/* Section 5: In the Field Gallery */}
      <InTheFieldGallery />

      {/* Section 6: Related Products */}
      <RelatedProducts currentSlug={product.slug} />

      {/* Section 7: FAQ */}
      <FAQSection />
    </div>
  )
}

/* ================================================================== */
/*  PRODUCT HERO                                                       */
/* ================================================================== */

function ProductHero({ product }: { product: ProductData }) {
  const [activeImage, setActiveImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState('Limestone')
  const [quantity, setQuantity] = useState(1)
  const { addItem, openCart } = useCart()

  const colorOptions = [
    { name: 'Limestone', hex: '#E8E4DE' },
    { name: 'Dune', hex: '#C4BBAF' },
    { name: 'Pine', hex: '#3D4A3A' },
  ]

  const handleAddToCart = () => {
    addItem({
      id: `${product.slug}-${selectedColor}`,
      name: `${product.name} \u2014 ${selectedColor}`,
      price: product.price,
      image: product.mainImage,
    })
    openCart()
  }

  return (
    <section className="bg-warm-white min-h-[calc(100dvh-64px)] flex flex-col lg:flex-row">
      {/* Left: Image Gallery */}
      <div className="lg:w-[60%] relative flex flex-col">
        {/* Main image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: easeSoft }}
          className="relative overflow-hidden bg-limestone aspect-[3/2] md:aspect-[16/10] lg:aspect-[3/2]"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={activeImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              src={product.galleryImages[activeImage] || product.mainImage}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </AnimatePresence>
        </motion.div>

        {/* Thumbnails */}
        <div className="h-[80px] flex gap-1 bg-warm-white">
          {product.galleryImages.map((img, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 + i * 0.05 }}
              onClick={() => setActiveImage(i)}
              className={
                'flex-1 h-full overflow-hidden transition-opacity duration-200 ' +
                (activeImage === i ? 'border-2 border-charcoal' : 'border-2 border-transparent opacity-70 hover:opacity-100')
              }
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Right: Sticky Product Info */}
      <div className="lg:w-[40%] lg:sticky lg:top-16 lg:h-[calc(100dvh-64px)] lg:overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeExpoOut, delay: 0.3 }}
          className="p-8 md:p-10 lg:p-12"
        >
          {/* Breadcrumb */}
          <div className="mb-8">
            <span className="font-sans text-[12px] text-ash">
              <Link to="/products" className="hover:text-charcoal transition-colors">Shelters</Link>
              {' / '}
              <span className="text-charcoal">{product.name}</span>
            </span>
          </div>

          {/* Badge */}
          {product.badge && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mb-4"
            >
              <span className="inline-block px-2.5 py-1 bg-pine-muted text-pine font-sans text-[10px] font-500 uppercase tracking-[0.1em]">
                {product.badge}
              </span>
            </motion.div>
          )}

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeExpoOut, delay: 0.38 }}
            className="font-serif text-[clamp(36px,3vw,48px)] font-400 text-charcoal tracking-[-0.02em] leading-[0.98]"
          >
            {product.name}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeExpoOut, delay: 0.46 }}
            className="font-sans text-[clamp(17px,1.4vw,20px)] font-300 text-ash mt-2"
          >
            {product.tagline}
          </motion.p>

          {/* Price */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeExpoOut, delay: 0.54 }}
            className="font-sans text-[20px] font-500 text-charcoal tracking-[0.02em] mt-6"
          >
            <span className="text-charcoal">CHF 900</span>
            <span className="text-ash mx-2">·</span>
            <span className="text-ash">SEK 9,950</span>
            <span className="text-ash mx-2">·</span>
            <span className="text-ash">EUR 900</span>
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeExpoOut, delay: 0.62 }}
            className="font-sans text-[16px] font-300 text-charcoal/75 leading-relaxed mt-5"
          >
            {product.description}
          </motion.p>

          {/* Color Selector */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeExpoOut, delay: 0.7 }}
            className="mt-8"
          >
            <span className="font-sans text-[12px] font-500 uppercase tracking-[0.08em] text-ash">
              Colour
            </span>
            <div className="flex items-center gap-3 mt-2">
              {colorOptions.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={
                    'w-7 h-7 rounded-full transition-all duration-200 ' +
                    (selectedColor === color.name
                      ? 'ring-2 ring-charcoal ring-offset-2'
                      : 'hover:scale-110')
                  }
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </motion.div>

          {/* Quantity + Add to Cart */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeExpoOut, delay: 0.78 }}
            className="mt-8"
          >
            {/* Quantity */}
            <div className="flex items-center gap-4 mb-4">
              <span className="font-sans text-[12px] font-500 uppercase tracking-[0.08em] text-ash">Quantity</span>
              <div className="flex items-center border border-[rgba(26,26,24,0.12)]">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="p-2 hover:bg-limestone transition-colors"
                >
                  <Minus className="w-3.5 h-3.5 text-charcoal" strokeWidth={1.5} />
                </button>
                <span className="px-4 font-sans text-[14px] text-charcoal min-w-[40px] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="p-2 hover:bg-limestone transition-colors"
                >
                  <Plus className="w-3.5 h-3.5 text-charcoal" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Add to cart button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-charcoal text-warm-white font-sans text-[14px] font-500 tracking-[0.04em] py-4 hover:bg-[#2A2A28] active:scale-[0.98] transition-all duration-200"
            >
              Add to cart &mdash; CHF {900 * quantity}
            </button>
          </motion.div>

          {/* Key Specs Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-8 pt-6 border-t border-fog"
          >
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-ash" strokeWidth={1.5} />
                <span className="font-sans text-[13px] text-ash">{product.setupTime} setup</span>
              </div>
              <div className="flex items-center gap-2">
                <Maximize className="w-4 h-4 text-ash" strokeWidth={1.5} />
                <span className="font-sans text-[13px] text-ash">{product.floorArea}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-ash" strokeWidth={1.5} />
                <span className="font-sans text-[13px] text-ash">{product.capacity}</span>
              </div>
            </div>
          </motion.div>

          {/* Shipping note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="font-sans text-[12px] text-ash mt-4"
          >
            Free shipping within EU. Dispatched within 2&ndash;3 business days.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

/* ================================================================== */
/*  EDITORIAL DESCRIPTION — GSAP isolated                              */
/* ================================================================== */

function EditorialDescription() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!ref.current) return

    const items = ref.current.querySelectorAll('.ed-item')

    gsap.from(items, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: 'power3.out',
      stagger: 0.15,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
      },
    })
  }, { scope: ref })

  return (
    <section ref={ref} className="bg-limestone py-[120px] md:py-[160px]">
      <div className="max-w-[900px] mx-auto px-5 md:px-10 text-center">
        <span className="ed-item block font-sans text-[11px] font-500 uppercase tracking-[0.12em] text-ash">
          THE VILDRUM 04
        </span>
        <h2 className="ed-item font-serif text-[clamp(32px,4vw,56px)] font-400 text-charcoal tracking-[-0.015em] leading-[1.05] mt-6">
          A room that goes where you go.
        </h2>
        <p className="ed-item font-sans text-[clamp(17px,1.4vw,20px)] font-300 text-charcoal/80 leading-relaxed mt-8">
          The VILDRUM 04 is designed around a simple idea: that spending time outdoors shouldn&apos;t mean leaving comfort behind. At 18 square metres with standing height throughout, it is a genuine room &mdash; not a tent. Six interconnected air beams create a rigid, wind-stable structure that sets up in eight minutes and stays pressurised for up to 72 hours.
        </p>
        <p className="ed-item font-sans text-[clamp(17px,1.4vw,20px)] font-300 text-charcoal/80 leading-relaxed mt-5">
          The asymmetric roof sheds rain and snow. Floor-to-ceiling mesh panels on three sides open the room to the landscape while keeping insects out. When the weather turns, zip them closed and the shelter becomes a calm, private space &mdash; warm, dry, and surprisingly quiet.
        </p>
        <p className="ed-item font-serif text-[clamp(24px,3vw,36px)] text-pine italic leading-[1.2] my-14">
          <span className="text-fog">&mdash;</span> The calm of a Scandinavian cabin, anywhere.
        </p>
        <p className="ed-item font-sans text-[clamp(17px,1.4vw,20px)] font-300 text-charcoal/80 leading-relaxed">
          Every detail serves the experience. A sewn-in groundsheet with elevated bathtub edges keeps the interior clean and dry. Internal storage pockets, gear lofts, and cable management mean the space stays uncluttered. The fabric &mdash; a 300D ripstop polyester with silicone coating &mdash; is chosen for its balance of light weight, durability, and the particular way it softens the light inside.
        </p>
      </div>
    </section>
  )
}

/* ================================================================== */
/*  FEATURE GRID — GSAP isolated                                       */
/* ================================================================== */

function FeatureGrid() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!ref.current) return

    const cards = ref.current.querySelectorAll('.feature-card')

    cards.forEach((card) => {
      const img = card.querySelector('.f-img')
      const num = card.querySelector('.f-num')
      const text = card.querySelectorAll('.f-text')

      if (img) {
        gsap.from(img, {
          opacity: 0,
          scale: 1.02,
          duration: 0.7,
          ease: 'expo.out',
          scrollTrigger: { trigger: card, start: 'top 85%' },
        })
      }

      if (num) {
        gsap.from(num, {
          opacity: 0,
          duration: 0.5,
          delay: 0.1,
          scrollTrigger: { trigger: card, start: 'top 85%' },
        })
      }

      if (text.length) {
        gsap.from(text, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: 'power3.out',
          stagger: 0.1,
          delay: 0.2,
          scrollTrigger: { trigger: card, start: 'top 85%' },
        })
      }
    })
  }, { scope: ref })

  return (
    <section ref={ref} className="bg-warm-white py-[120px] md:py-[160px]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={
                'feature-card flex flex-col ' +
                (i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse')
              }
            >
              {/* Image */}
              <div className="f-img md:w-1/2 aspect-[4/3] overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Text */}
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
                <span className="f-num font-serif text-[72px] text-fog leading-none absolute top-4 left-4 md:top-6 md:left-6">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="relative z-10">
                  <h3 className="f-text font-sans text-[clamp(20px,2vw,28px)] font-500 text-charcoal tracking-[0.02em] leading-[1.3]">
                    {feature.title}
                  </h3>
                  <p className="f-text font-sans text-[16px] font-300 text-charcoal/70 leading-relaxed mt-3">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================================================================== */
/*  SPECS TABS                                                         */
/* ================================================================== */

function SpecsTabs() {
  const [activeTab, setActiveTab] = useState<TabId>('details')
  const tabs: { id: TabId; label: string }[] = [
    { id: 'details', label: 'Details' },
    { id: 'materials', label: 'Materials' },
    { id: 'setup', label: 'Setup' },
    { id: 'dimensions', label: 'Dimensions' },
  ]

  return (
    <section className="bg-limestone py-[120px]">
      <div className="max-w-[900px] mx-auto px-5 md:px-10">
        {/* Header */}
        <span className="block font-sans text-[11px] font-500 uppercase tracking-[0.12em] text-ash mb-10">
          SPECIFICATIONS
        </span>

        {/* Tabs */}
        <div className="flex items-center gap-0 border-b border-[rgba(26,26,24,0.08)] mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={
                'px-4 py-3 font-sans text-[14px] font-500 uppercase tracking-[0.08em] transition-colors duration-200 border-b-2 ' +
                (activeTab === tab.id
                  ? 'text-charcoal border-charcoal'
                  : 'text-ash border-transparent hover:text-charcoal')
              }
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {activeTab === 'setup' ? (
              <div className="space-y-6">
                {tabSpecs.setup.map((step, i) => (
                  <div key={i} className="flex gap-6">
                    <span className="font-serif text-[32px] text-fog leading-none flex-shrink-0 w-10">
                      {i + 1}
                    </span>
                    <p className="font-sans text-[16px] font-300 text-charcoal leading-relaxed pt-1">
                      {step.value}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12">
                {tabSpecs[activeTab].map((spec, i) => (
                  <div
                    key={i}
                    className="py-3 border-b border-[rgba(26,26,24,0.06)]"
                  >
                    <span className="block font-sans text-[14px] text-ash">{spec.label}</span>
                    <span className="block font-sans text-[15px] font-300 text-charcoal mt-0.5">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

/* ================================================================== */
/*  IN THE FIELD GALLERY — GSAP isolated                               */
/* ================================================================== */

function InTheFieldGallery() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!ref.current) return

    const items = ref.current.querySelectorAll('.gallery-item')
    const header = ref.current.querySelector('.gallery-header')

    if (header) {
      gsap.from(header, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%' },
      })
    }

    gsap.from(items, {
      opacity: 0,
      scale: 1.02,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: { trigger: ref.current, start: 'top 85%' },
    })
  }, { scope: ref })

  return (
    <section ref={ref} className="bg-charcoal py-[120px] md:py-[160px]">
      <div className="px-5 md:px-10">
        {/* Header */}
        <div className="gallery-header text-center mb-16">
          <span className="block font-sans text-[11px] font-500 uppercase tracking-[0.12em] text-warm-white/50 mb-4">
            IN THE FIELD
          </span>
          <h2 className="font-serif text-[clamp(32px,4vw,56px)] font-400 text-warm-white tracking-[-0.015em] leading-[1.05]">
            Live the landscape.
          </h2>
        </div>

        {/* Mosaic Grid */}
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-2">
          {/* Row 1 */}
          <div className="gallery-item md:col-span-2 overflow-hidden">
            <img
              src="/lifestyle-interior-1.jpg"
              alt="Interior looking out"
              className="w-full h-[280px] md:h-[360px] object-cover hover:scale-[1.02] transition-transform duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
            />
          </div>
          <div className="gallery-item overflow-hidden">
            <img
              src="/product-04.jpg"
              alt="VILDRUM 04 lakeside"
              className="w-full h-[280px] md:h-[360px] object-cover hover:scale-[1.02] transition-transform duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
            />
          </div>
          {/* Row 2 */}
          <div className="gallery-item overflow-hidden">
            <img
              src="/hero-shelter.jpg"
              alt="Shelter in meadow"
              className="w-full h-[280px] md:h-[360px] object-cover hover:scale-[1.02] transition-transform duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
            />
          </div>
          <div className="gallery-item md:col-span-2 overflow-hidden">
            <img
              src="/lifestyle-family.jpg"
              alt="Family inside shelter"
              className="w-full h-[280px] md:h-[360px] object-cover hover:scale-[1.02] transition-transform duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ================================================================== */
/*  RELATED PRODUCTS                                                   */
/* ================================================================== */

function RelatedProducts({ currentSlug }: { currentSlug: string }) {
  const related = relatedSlugs
    .filter(s => s !== currentSlug)
    .slice(0, 3)
    .map(s => productDatabase[s])
    .filter(Boolean)

  return (
    <section className="bg-warm-white py-[120px]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <span className="block font-sans text-[11px] font-500 uppercase tracking-[0.12em] text-ash mb-12">
          COMPLETE YOUR SETUP
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {related.map((product, i) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: easeExpoOut, delay: i * 0.1 }}
            >
              <Link to={`/products/${product.slug}`} className="group block">
                <div className="relative aspect-[3/2] overflow-hidden bg-limestone">
                  <img
                    src={product.galleryImages[0] || product.mainImage}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
                  />
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/[0.06] transition-colors duration-400" />
                </div>
                <div className="mt-4">
                  <h3 className="font-sans text-[14px] font-500 text-charcoal">{product.name}</h3>
                  <p className="font-sans text-[14px] font-400 text-ash mt-0.5">
                    CHF 900 · EUR 900
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================================================================== */
/*  FAQ ACCORDION                                                      */
/* ================================================================== */

function FAQSection() {
  return (
    <section className="bg-limestone py-[120px]">
      <div className="max-w-[800px] mx-auto px-5 md:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: easeExpoOut }}
          className="font-serif text-[clamp(32px,4vw,56px)] font-400 text-charcoal tracking-[-0.015em] leading-[1.05] mb-12"
        >
          Questions
        </motion.h2>

        <div>
          {faqData.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQItem({ faq, index }: { faq: { q: string; a: string }; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: easeExpoOut, delay: index * 0.08 }}
      className="border-b border-[rgba(26,26,24,0.08)]"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="font-sans text-[16px] font-500 text-charcoal pr-4">{faq.q}</span>
        <span
          className={
            'flex-shrink-0 w-5 h-5 flex items-center justify-center transition-transform duration-300 ' +
            (open ? 'rotate-45' : '')
          }
        >
          <Plus className="w-4 h-4 text-charcoal" strokeWidth={1.5} />
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
            className="overflow-hidden"
          >
            <p className="font-sans text-[16px] font-300 text-ash leading-relaxed pb-6 pt-1">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
