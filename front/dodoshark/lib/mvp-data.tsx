import type { ReactNode } from 'react'

export type InquiryType = 'video_demo' | 'quote'

export type ProductCategory = {
  slug: string
  name: string
  shortName: string
  tag: string
  mainImage: ProductImageAsset
  galleryImages: ProductImageAsset[]
  description: string
  bestFor: string
  highlight: string
  keyPoints: string[]
  applications: string[]
  specColumns: string[]
  specRows: string[][]
}

export type ProductImageAsset = {
  src: string
  alt: string
}

export type AboutFeature = {
  title: string
  description: string
  icon: ReactNode
}

export type ChooseConfidenceCard = {
  title: string
  subtitle: string
  points: string[]
  imagePath: string
  imageAlt: string
}

export const MVP_CATEGORY_SLUGS = [
  'stainless-steel-claw-disc-mill',
  'cast-iron-claw-mill',
  'double-roller-crusher',
  'drum-mixer',
] as const

export const MVP_CATEGORIES: ProductCategory[] = [
  {
    slug: 'stainless-steel-claw-disc-mill',
    name: 'Stainless Steel Claw & Disc Mill',
    shortName: 'Stainless Claw Mill',
    tag: 'Food-Grade Milling',
    mainImage: {
      src: '/assets/images/product-image/304Stainless Steel Claw & Disc Mill/304Stainless Steel Claw & Disc Mill.png',
      alt: 'Main image of 304 stainless steel claw and disc mill',
    },
    galleryImages: [
      {
        src: '/assets/images/product-image/304Stainless Steel Claw & Disc Mill/304Stainless Steel Claw & Disc Mill-01.jpg',
        alt: '304 stainless steel claw and disc mill front-side view',
      },
      {
        src: '/assets/images/product-image/304Stainless Steel Claw & Disc Mill/304Stainless Steel Claw & Disc Mill-02.jpg',
        alt: '304 stainless steel claw and disc mill side profile',
      },
      {
        src: '/assets/images/product-image/304Stainless Steel Claw & Disc Mill/304Stainless Steel Claw & Disc Mill-03.jpg',
        alt: '304 stainless steel claw and disc mill chamber detail',
      },
      {
        src: '/assets/images/product-image/304Stainless Steel Claw & Disc Mill/304Stainless Steel Claw & Disc Mill-04.jpg',
        alt: '304 stainless steel claw and disc mill factory setup view',
      },
    ],
    description:
      'Built for hygienic powder processing with 304/201 stainless structure, enclosed flow, and stable fineness control.',
    bestFor: 'Spices, grains, herbs, and chemical powders requiring clean contact surfaces.',
    highlight: 'Fineness 10-120 mesh with sieve options from 0.3mm to 12mm.',
    keyPoints: [
      '10mm heavy stainless steel body for durability.',
      'Integrated bearing chamber with dust-reduced operation.',
      'Supports long duty cycles with stable output.',
    ],
    applications: ['Spice powder', 'Grain flour', 'Herbal medicine', 'Chemical intermediates'],
    specColumns: ['Model', 'Power (kW)', 'Output (1mm corn)', 'Weight (kg)'],
    specRows: [
      ['Model 20', '2.2', '120 kg/h', '100'],
      ['Model 37', '7.5', '300 kg/h', '180'],
      ['Model 70', '22.0', '1500 kg/h', '500'],
      ['Model 100', '30-45', '2000-6000 kg/h', '700-800'],
    ],
  },
  {
    slug: 'cast-iron-claw-mill',
    name: 'Industrial Cast Iron Claw Mill',
    shortName: 'Cast Iron Claw Mill',
    tag: 'High Throughput Crushing',
    mainImage: {
      src: '/assets/images/product-image/Cast Iron Claw Mill/Cast Iron Claw Mill-main.png',
      alt: 'Main image of industrial cast iron claw mill',
    },
    galleryImages: [
      {
        src: '/assets/images/product-image/Cast Iron Claw Mill/Cast Iron Claw Mill-main-1.jpg',
        alt: 'Cast iron claw mill front view',
      },
      {
        src: '/assets/images/product-image/Cast Iron Claw Mill/Cast Iron Claw Mill-main-2.jpg',
        alt: 'Cast iron claw mill side view',
      },
      {
        src: '/assets/images/product-image/Cast Iron Claw Mill/Cast Iron Claw Mill-main-3.jpg',
        alt: 'Cast iron claw mill motor and drive detail',
      },
      {
        src: '/assets/images/product-image/Cast Iron Claw Mill/Cast Iron Claw Mill-main-4.jpg',
        alt: 'Cast iron claw mill feed inlet detail',
      },
      {
        src: '/assets/images/product-image/Cast Iron Claw Mill/Cast Iron Claw Mill-main-5.jpg',
        alt: 'Cast iron claw mill discharge detail',
      },
      {
        src: '/assets/images/product-image/Cast Iron Claw Mill/Cast Iron Claw Mill-main-6.jpg',
        alt: 'Cast iron claw mill structure detail',
      },
    ],
    description:
      'Cost-effective crushing line designed for agriculture and primary industrial processing with reinforced wear parts.',
    bestFor: 'Corn, feed materials, and bulk grain pre-processing where throughput matters most.',
    highlight: 'Large-size models can reach up to 12 ton/h (3mm corn reference).',
    keyPoints: [
      'Optimized tooth line speed and airflow structure for higher output.',
      '45# steel hardened flat teeth (HRC40-48).',
      'Thickened cast-iron fan for long service life.',
    ],
    applications: ['Feed preparation', 'Agricultural grain crushing', 'Primary powdering'],
    specColumns: ['Model Group', 'Output (3mm corn)', 'Typical Use'],
    specRows: [
      ['Model 25 / 28', '350-500 kg/h', 'Small farm and entry-level workshop'],
      ['Model 37 / 40', '1.0-1.5 ton/h', 'Medium production line'],
      ['Widened 40', '2.2 ton/h', 'Higher output with same footprint'],
      ['Model 80 / 100', '6.0-12.0 ton/h', 'Industrial capacity'],
    ],
  },
  {
    slug: 'double-roller-crusher',
    name: 'Double Roller Crusher',
    shortName: 'Roller Crusher',
    tag: 'Controlled Crushing',
    mainImage: {
      src: '/assets/images/product-image/Double Roll crusher/double roll curhser-main.png',
      alt: 'Main image of double roller crusher',
    },
    galleryImages: [
      {
        src: '/assets/images/product-image/Double Roll crusher/double roll curhser-01.jpg',
        alt: 'Double roller crusher front view',
      },
      {
        src: '/assets/images/product-image/Double Roll crusher/double roll curhser-02.jpg',
        alt: 'Double roller crusher side profile',
      },
      {
        src: '/assets/images/product-image/Double Roll crusher/double roll curhser-03.jpg',
        alt: 'Double roller crusher roller assembly detail',
      },
      {
        src: '/assets/images/product-image/Double Roll crusher/double roll curhser-04.jpg',
        alt: 'Double roller crusher operation detail',
      },
    ],
    description:
      'Purpose-built for grain flattening and coarse crushing with low dust and precise roller gap adjustment.',
    bestFor: 'Corn cracking, grain flattening, and sticky or moisture-sensitive materials.',
    highlight: 'Alloy rollers deliver more than 3x durability vs common steel rollers.',
    keyPoints: [
      'Dual-side handwheel fine adjustment on new models.',
      'Sealed structure for cleaner production environment.',
      'Multiple tooth patterns: deep, medium, shallow, smooth.',
    ],
    applications: ['Corn cracking', 'Grain flattening', 'Pre-mixing preparation'],
    specColumns: ['Model', 'Power (kW)', 'Capacity', 'Process Type'],
    specRows: [
      ['New 12-22', '2.2', '1000 kg/h', 'Corn crushing'],
      ['New 14-70', '7.5', '6000 kg/h', 'High-throughput crushing'],
      ['15-120 / 20-170', '15.0-25.0', '15.0-25.0 ton/h', 'Industrial flattening/crushing'],
    ],
  },
  {
    slug: 'drum-mixer',
    name: '360 Degree Drum Mixer',
    shortName: 'Drum Mixer',
    tag: 'Uniform Mixing',
    mainImage: {
      src: '/assets/images/product-image/360 Degree Drum Mixer/360 Degree Drum Mixer-mainimage.jpg',
      alt: 'Main image of 360 degree drum mixer',
    },
    galleryImages: [
      {
        src: '/assets/images/product-image/360 Degree Drum Mixer/360 Degree Drum Mixer-01.jpg',
        alt: '360 degree drum mixer front view',
      },
      {
        src: '/assets/images/product-image/360 Degree Drum Mixer/360 Degree Drum Mixer-02.jpg',
        alt: '360 degree drum mixer side view',
      },
      {
        src: '/assets/images/product-image/360 Degree Drum Mixer/360 Degree Drum Mixer-03.jpg',
        alt: '360 degree drum mixer frame detail',
      },
      {
        src: '/assets/images/product-image/360 Degree Drum Mixer/360 Degree Drum Mixer-04.jpg',
        alt: '360 degree drum mixer loading detail',
      },
      {
        src: '/assets/images/product-image/360 Degree Drum Mixer/MIXER-PR-05.jpg',
        alt: '360 degree drum mixer production line detail',
      },
    ],
    description:
      'Gravity tumble dispersion mixer delivering high mixing uniformity for powders and granules.',
    bestFor: 'Feed blending, additive premix, and fine-powder mixing in food and chemical plants.',
    highlight: 'Mixing coefficient of variation can be controlled below 5%.',
    keyPoints: [
      'Model A supports opposite-rotation blending for high efficiency.',
      'Model B/D offers sealed design for ultra-fine powder handling.',
      'Model C supports laboratory variable-frequency testing.',
    ],
    applications: ['Feed mixing', 'Powder blending', 'Lab pilot testing'],
    specColumns: ['Series', 'Volume Range', 'Feature Focus'],
    specRows: [
      ['Model C (Lab)', '5L-100L', '304 stainless, timer, variable speed'],
      ['Model A', '200L-1000L', 'Bidirectional mixing efficiency'],
      ['Model B/D', '200L-4000L', 'Sealed anti-leakage for fine powder'],
    ],
  },
]

export const TRUST_METRICS = [
  { value: '55 years', label: 'Company History' },
  { value: '10,000 sqm', label: 'Factory Area' },
  { value: '1,000+', label: 'Export Regions' },
  { value: '10,000+', label: 'Annual Output' },
]

export const SERVICE_PROMISES = [
  '1-year full-machine warranty for standard delivery.',
  'Core head warranty up to 3 years.',
  'Free remote installation guidance & operation video support.',
]

export const VIDEO_DEMO_STEPS = [
  {
    title: 'Submit Material Information',
    note: 'Share raw material type, target fineness, and expected capacity.',
  },
  {
    title: 'Confirm Demo Plan',
    note: 'Our engineer confirms test method and available machine model.',
  },
  {
    title: 'Join Live Factory Video',
    note: 'Watch real-time processing and key operating parameters remotely.',
  },
  {
    title: 'Receive Test Summary',
    note: 'Get output feedback and recommended machine configuration.',
  },
]

// Icon Components - Two Product Lines
function CogsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

// Icon Components - Three Production Bases
function IndustryIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  )
}

// Icon Components - Heritage History
function GemIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  )
}

export const ABOUT_FEATURES: AboutFeature[] = [
  {
    title: 'Two Product Lines',
    description:
      'We deliver high-standard agricultural processing machinery and food processing machinery for global buyers.',
    icon: <CogsIcon />,
  },
  {
    title: 'Three Production Bases',
    description:
      'Manufacturing bases in Jinan, Liaocheng, and Weifang support stable delivery with precision machining capability.',
    icon: <IndustryIcon />,
  },
  {
    title: 'Heritage Since 1970',
    description:
      'Evolved from a state-owned crusher factory foundation, then established as DoDoShark in 2019 after restructuring.',
    icon: <GemIcon />,
  },
]

export const CHOOSE_CONFIDENCE_CARDS: ChooseConfidenceCard[] = [
  {
    title: 'Technical Leadership, Continuous Innovation',
    subtitle: 'Built to set practical industry benchmarks.',
    points: [
      'Grain grinding fineness up to 150 mesh.',
      'Uniform mixing of dozens of powders in about 15 minutes.',
      'Dust suppression ratio up to 99.99% in configured systems.',
    ],
    imagePath: '/assets/images/technology-leadership.png',
    imageAlt: 'Technical leadership in industrial machinery',
  },
  {
    title: 'Beyond Single Machines, Built for Custom Solutions',
    subtitle: 'From manufacturing capability to integration capability.',
    points: [
      'Configuration design based on customer process flow.',
      'From feeding to finished output with complete line thinking.',
      'Flexible combinations for capacity, material, and site limits.',
    ],
    imagePath: '/assets/images/beyond-single-products.png',
    imageAlt: 'Custom integrated machinery solutions',
  },
  {
    title: 'Strict Factory QA, Annual Failure Rate Below 2/10000',
    subtitle: 'Quality control designed for long lifecycle operation.',
    points: [
      'Strict QA standards for structure and core components.',
      'Precision machining process for stable long-duty operation.',
      'Mainframe design life can exceed 10 years in normal use.',
    ],
    imagePath: '/assets/images/rigorous-factory-inspection.png',
    imageAlt: 'Strict quality assurance in factory production',
  },
]

export function getCategoryBySlug(slug: string) {
  return MVP_CATEGORIES.find((item) => item.slug === slug)
}

export function buildProductTiles(category: ProductCategory, count = 4): ProductImageAsset[] {
  const candidates = [category.mainImage, ...category.galleryImages.slice(0, Math.max(0, count - 1))]
    .filter((item): item is ProductImageAsset => Boolean(item?.src))

  if (candidates.length === 0) return []

  while (candidates.length < count) {
    candidates.push(candidates[candidates.length - 1])
  }

  return candidates.slice(0, count)
}
