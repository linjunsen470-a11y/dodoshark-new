export type HighlightPoint = {
  title: string
  detail: string
}

export type GalleryItem = {
  imagePath: string
  alt: string
  title: string
  description: string
}

export type BrochureCategory = {
  slug: 'stainless' | 'claw-disc' | 'roller' | 'mixer'
  name: string
  summary: string
  items: GalleryItem[]
  highlights: HighlightPoint[]
}

export type SocialVideo = {
  title: string
  description: string
  url: string
}

export const BROCHURE_CATEGORIES: BrochureCategory[] = [
  {
    slug: 'stainless',
    name: 'Stainless Steel Crusher',
    summary: 'Hygienic tooth-claw disc milling with multi-mesh control and long-duty operation.',
    items: [
      {
        imagePath: '/assets/images/brochure/stainless/hero-stainless.jpg',
        alt: 'Stainless steel crusher brochure cover with complete machine setup',
        title: 'Stainless Crusher Overview',
        description: '304/201 stainless structure designed for agricultural and food powder processing.',
      },
      {
        imagePath: '/assets/images/brochure/stainless/model-preview.jpg',
        alt: 'Stainless crusher model preview chart with output references',
        title: 'Model Capacity Range',
        description: 'Representative models from 120 kg/h to 2000 kg/h for 3mm corn reference.',
      },
      {
        imagePath: '/assets/images/brochure/stainless/material-range.jpg',
        alt: 'Stainless crusher suitable materials and fineness range panel',
        title: 'Material & Fineness Coverage',
        description: 'Supports wide material range with 0.4mm to 12mm sieve options.',
      },
      {
        imagePath: '/assets/images/brochure/stainless/low-failure.jpg',
        alt: 'Stainless crusher low-failure manufacturing detail with cutter head close-up',
        title: 'Low-Failure Design',
        description: 'Precision machining and full inspection focus to reduce annual failure risk.',
      },
      {
        imagePath: '/assets/images/brochure/stainless/continuous-operation.jpg',
        alt: 'Stainless crusher bearing design for continuous operation over 12 hours',
        title: '12+ Hour Continuous Duty',
        description: 'Wear-resistant bearings and sealing design for stable long-cycle operation.',
      },
      {
        imagePath: '/assets/images/brochure/stainless/dust-free-solution.jpg',
        alt: 'Stainless crusher dust-free production options with bag and pulse collector',
        title: 'Dust-Control Solutions',
        description: 'Collection bag or cyclone plus pulse collector options for low-dust workshops.',
      },
    ],
    highlights: [
      {
        title: 'Fineness: 10-120 mesh',
        detail: 'Screen aperture options from 0.3mm to 12mm depending on material.',
      },
      {
        title: 'Continuous operation',
        detail: 'Configured for 12+ hour duty with precision lubrication and sealing.',
      },
      {
        title: 'Durability & dust control',
        detail: 'Thickened structure and optional dust-collection flows for cleaner plants.',
      },
    ],
  },
  {
    slug: 'claw-disc',
    name: 'Claw & Disc Mill',
    summary: 'High-throughput cast-iron claw and disc grinding with optimized air flow and stable output.',
    items: [
      {
        imagePath: '/assets/images/brochure/claw-disc/hero-claw-disc.jpg',
        alt: 'Claw and disc mill hero poster with throughput claims',
        title: 'Claw & Disc Main Line',
        description: 'Large models can scale to high hourly throughput with industrial-grade frame.',
      },
      {
        imagePath: '/assets/images/brochure/claw-disc/gear-disc-and-options.jpg',
        alt: 'Claw and disc mill gear discs and feeding options comparison',
        title: 'Gear Disc & Feeding Options',
        description: 'Optional blower-free hopper and screw conveyor feeding for different materials.',
      },
      {
        imagePath: '/assets/images/brochure/claw-disc/model-preview-compact.jpg',
        alt: 'Claw and disc mill compact model preview with output levels',
        title: 'Compact Model Preview',
        description: 'Entry to medium models for multiple workshop scales.',
      },
      {
        imagePath: '/assets/images/brochure/claw-disc/high-capacity-models.jpg',
        alt: 'Claw and disc mill high-capacity model lineup up to 12 ton per hour',
        title: 'High-Capacity Models',
        description: 'Industrial range from 3 ton/h up to 12 ton/h in representative lineup.',
      },
      {
        imagePath: '/assets/images/brochure/claw-disc/factory-real-photos.jpg',
        alt: 'Claw and disc mill product and factory real photos',
        title: 'Factory Real Photos',
        description: 'Machine, grinding chamber, and assembly details from real production scenes.',
      },
      {
        imagePath: '/assets/images/brochure/claw-disc/high-output-design.jpg',
        alt: 'Claw and disc mill high-output design with air duct and fan impeller',
        title: 'High Output with Same Power',
        description: 'Staggered gear-disc design and air duct optimization improve grinding efficiency.',
      },
    ],
    highlights: [
      {
        title: 'Screen aperture 0.3-12mm',
        detail: 'Applicable to agricultural, food, medicinal, and selected chemical materials.',
      },
      {
        title: 'Throughput scalability',
        detail: 'Model coverage from compact entry units to 10+ ton/h industrial class.',
      },
      {
        title: 'Service life focus',
        detail: 'Cast-iron fan and hardened flat teeth support long-term operation.',
      },
    ],
  },
  {
    slug: 'roller',
    name: 'Double Roller Crusher',
    summary: 'Dual-purpose crushing and flattening with configurable roller patterns and precise gap control.',
    items: [
      {
        imagePath: '/assets/images/brochure/roller/after-sales-policy.jpg',
        alt: 'Double roller crusher after-sales policy panel',
        title: 'After-Sales Assurance',
        description: 'Warranty and service support statements for dealer and end-user confidence.',
      },
      {
        imagePath: '/assets/images/brochure/roller/agricultural-roller-structure.jpg',
        alt: 'Agricultural roller crusher structure with key components annotated',
        title: 'Agricultural Crusher Structure',
        description: 'Core structure view including pressure rollers, hopper, and adjustment positions.',
      },
      {
        imagePath: '/assets/images/brochure/roller/crushing-vs-flattening.jpg',
        alt: 'Double roller crusher crushing versus flattening application panel',
        title: 'Crushing vs Flattening',
        description: 'One machine supports coarse crushing and grain flattening workflows.',
      },
      {
        imagePath: '/assets/images/brochure/roller/alloy-roller-patterns.jpg',
        alt: 'Double roller crusher alloy pressure roller tooth pattern comparison',
        title: 'Alloy Roller Patterns',
        description: 'Deep, medium, shallow, and smooth surfaces for different output targets.',
      },
      {
        imagePath: '/assets/images/brochure/roller/new-vs-classic.jpg',
        alt: 'Double roller crusher new versus classic model comparison',
        title: 'New vs Classic Models',
        description: 'Upgraded handwheel precision and sealed design on the newer generation.',
      },
      {
        imagePath: '/assets/images/brochure/roller/specification-table.jpg',
        alt: 'Double roller crusher specification parameter table by model',
        title: 'Specification Table',
        description: 'Model-based reference for roller size, output, power, weight, and machine dimensions.',
      },
    ],
    highlights: [
      {
        title: 'Dual process type',
        detail: 'Supports corn/sorghum crushing and red-bean/oat flattening in one platform.',
      },
      {
        title: 'Alloy roller durability',
        detail: 'Manganese-steel alloy pressure rollers with multiple tooth patterns.',
      },
      {
        title: 'Detailed model table',
        detail: 'Brochure includes full reference parameters for new and classic variants.',
      },
    ],
  },
  {
    slug: 'mixer',
    name: 'Mixer & Blender',
    summary: 'Model A/B/C/D series covering laboratory testing to large-volume industrial blending.',
    items: [
      {
        imagePath: '/assets/images/brochure/mixer/model-d-series.jpg',
        alt: 'Mixer model D co-rotating stirring lineup',
        title: 'Model D Series',
        description: 'Co-rotating stirring configurations for medium-volume production use.',
      },
      {
        imagePath: '/assets/images/brochure/mixer/model-c-lab-series.jpg',
        alt: 'Mixer model C laboratory lineup from 5L to 100L',
        title: 'Model C Laboratory Series',
        description: 'Lab-scale capacities for process validation and formula trials.',
      },
      {
        imagePath: '/assets/images/brochure/mixer/model-b-large-series.jpg',
        alt: 'Mixer model B large-size lineup with stainless and carbon steel options',
        title: 'Model B Large-Size Line',
        description: 'Large-volume blender options for industrial feed and powder workflows.',
      },
      {
        imagePath: '/assets/images/brochure/mixer/model-a-bidirectional.jpg',
        alt: 'Mixer model A bidirectional stirring lineup',
        title: 'Model A Bidirectional',
        description: 'Bidirectional stirring style for stable and efficient tumble mixing.',
      },
      {
        imagePath: '/assets/images/brochure/mixer/engineering-detail.jpg',
        alt: 'Mixer engineering and finishing detail view',
        title: 'Engineering Detail Focus',
        description: 'Visual evidence of mechanical detail control and finish quality.',
      },
      {
        imagePath: '/assets/images/brochure/mixer/material-applications.jpg',
        alt: 'Mixer material application panel with powders and granules',
        title: 'Material Application Scope',
        description: 'Applicable to seasoning, medicine powder, feed, chemical powder, and more.',
      },
    ],
    highlights: [
      {
        title: 'Wide capacity matrix',
        detail: 'Laboratory to large industrial range under one model family system.',
      },
      {
        title: 'Material flexibility',
        detail: 'Designed for powders, granules, and compound feed blending tasks.',
      },
      {
        title: 'Process detail control',
        detail: 'Engineering refinement on structure and finish for stable long-term operation.',
      },
    ],
  },
]

export const FACEBOOK_PROFILE_URL = 'https://www.facebook.com/profile.php?id=61582975393919'

export const FACEBOOK_VIDEO_SOURCES: SocialVideo[] = [
  {
    title: 'DoDoShark Facebook Videos',
    description: 'Watch our latest machine demonstration videos on Facebook.',
    url: 'https://www.facebook.com/reel/2344055886097542',
  },
]

export function toFacebookEmbedUrl(rawUrl: string) {
  const normalized = rawUrl.trim()
  if (!normalized) return null

  let parsedUrl: URL
  try {
    parsedUrl = new URL(normalized)
  } catch {
    return normalized
  }

  const host = parsedUrl.hostname.toLowerCase()
  const isFacebookHost = host === 'facebook.com' || host.endsWith('.facebook.com')
  if (!isFacebookHost) return normalized

  const path = parsedUrl.pathname.toLowerCase()
  const href = encodeURIComponent(normalized)

  if (path.includes('/reel/')) {
    const reelId = parsedUrl.pathname.split('/').filter(Boolean).at(-1) ?? ''
    const watchUrl = reelId ? `https://www.facebook.com/watch/?v=${encodeURIComponent(reelId)}` : normalized
    const watchHref = encodeURIComponent(watchUrl)
    return `https://www.facebook.com/plugins/video.php?href=${watchHref}&show_text=false&width=560&height=960&t=0`
  }

  const isWatchPath = path === '/watch' || path.startsWith('/watch/')
  if (path.includes('/videos/') || isWatchPath) {
    return `https://www.facebook.com/plugins/video.php?href=${href}&show_text=false&width=560&height=315&t=0`
  }

  return `https://www.facebook.com/plugins/post.php?href=${href}&show_text=false&width=560`
}
