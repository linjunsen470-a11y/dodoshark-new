import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { cache } from 'react'

import { client } from '@/app/lib/sanity'
import { buildPageMetadata } from '@/app/lib/seo'
import { toImageSrc } from '@/app/lib/sanity-utils'
import type { SanityImage, SeoMeta } from '@/app/lib/types/sanity'
import HeroTitle from '@/components/ui/HeroTitle'

type RecruitAgentsPageData = {
  seo?: SeoMeta
  hero?: {
    title?: string
    eyebrow?: string
    subtitle?: string
    primaryCtaLabel?: string
    primaryCtaHref?: string
  }
  scope?: {
    title?: string
    description?: string
  }
  cta?: {
    title?: string
    description?: string
    buttonLabel?: string
    buttonHref?: string
  }
  images?: {
    heroBackground?: SanityImage
    recruitmentScopeImage?: SanityImage
  }
}

const RECRUIT_AGENTS_PAGE_QUERY = `coalesce(
  *[_id == "recruitAgentsPage"][0],
  *[_type == "recruitAgentsPage"][0]
){
  seo,
  hero,
  scope,
  cta,
  images{
    heroBackground{
      alt,
      asset
    },
    recruitmentScopeImage{
      alt,
      asset
    }
  }
}`

const getRecruitAgentsPageData = cache(
  async () => client.fetch<RecruitAgentsPageData | null>(RECRUIT_AGENTS_PAGE_QUERY),
)

function resolvePageImage(
  image: SanityImage | undefined,
  fallbackSrc: string,
  fallbackAlt: string,
  width: number,
) {
  return {
    src: toImageSrc(image, width) || fallbackSrc,
    alt: image?.alt?.trim() || fallbackAlt,
  }
}

const WHY_CHOOSE_US = [
  {
    title: 'Continuous Innovation',
    description:
      'Our professional R&D team focuses on "differentiated product value," establishing unique competitive advantages in regional markets beyond low-price competition.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0012 18.75c-1.03 0-1.9-.4-2.593-1.02l-.547-.548z"
        />
      </svg>
    ),
  },
  {
    title: 'Superior Quality',
    description:
      'Combined cutting-edge technology with precision manufacturing. High satisfaction, low failure rates, and long service life across all processing scenarios.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
        />
      </svg>
    ),
  },
  {
    title: 'Diverse Portfolio',
    description:
      'Full-category matrix from small crushers to large-scale equipment, covering agriculture, food, and chemicals with precise configuration coverage.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    ),
  },
  {
    title: 'Stable Supply',
    description:
      'Independent control from R&D to assembly. No chain-break risks, fast order response, and timely global delivery guaranteed.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    ),
  },
]

const SCOPE = [
  {
    region: 'Africa',
    countries: ['Nigeria', 'Ghana', 'Benin', 'Kenya', 'Ethiopia', 'Senegal'],
    color: 'from-orange-500/10 to-transparent',
  },
  {
    region: 'Southeast Asia',
    countries: ['Philippines', 'Indonesia', 'Thailand', 'Vietnam', 'Laos', 'Cambodia'],
    color: 'from-blue-500/10 to-transparent',
  },
  {
    region: 'South America',
    countries: ['Brazil', 'Mexico', 'Argentina'],
    color: 'from-green-500/10 to-transparent',
  },
  {
    region: 'Central Asia',
    countries: ['Kazakhstan', 'Pakistan', 'Uzbekistan'],
    color: 'from-purple-500/10 to-transparent',
  },
]

const SUPPORT = [
  {
    title: 'Product & Supply Chain',
    items: [
      'Competitive pricing & flex ordering',
      'Intelligent inventory management',
      'Customized SKU for regional needs',
    ],
  },
  {
    title: 'Brand & Marketing',
    items: ['Unified VI & multi-lang materials', 'Global promotion resources', 'Localized marketing guidance'],
  },
  {
    title: 'Training & After-Sales',
    items: ['24/7 dedicated technical support', 'Remote troubleshooting & spare parts', 'Master product selling points & setup'],
  },
  {
    title: 'Cooperation Model',
    items: ['Exclusive & regional agency options', 'Transparent commission & incentives', 'Standardized sustainable agreements'],
  },
]

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getRecruitAgentsPageData()
  return buildPageMetadata({
    seo: pageData?.seo,
    fallbackTitle: 'Recruit Agents | DoDoShark Machinery',
    fallbackDescription:
      'Join the DoDoShark global network. We are looking for high-quality partners to share global industrial dividends and set new brand benchmarks.',
  })
}

export default async function RecruitAgentsPage() {
  const pageData = await getRecruitAgentsPageData()
  const heroImage = resolvePageImage(
    pageData?.images?.heroBackground,
    '/assets/images/about/join-us.jpg',
    'DoDoShark Global Partnership',
    1800,
  )
  const scopeImage = resolvePageImage(
    pageData?.images?.recruitmentScopeImage,
    '/assets/images/about/global-layout.jpg',
    'DoDoShark Global Layout',
    1400,
  )
  const heroTitle =
    pageData?.hero?.title?.trim() || 'Partner with DoDoShark Explore Global Blue Oceans'
  const heroEyebrow =
    pageData?.hero?.eyebrow?.trim() || 'Overseas Partner (Agent) Recruitment Plan'
  const heroSubtitle =
    pageData?.hero?.subtitle?.trim() ||
    'In the wave of global manufacturing upgrades, premium mechanical equipment is the core competitiveness. DoDoShark invites you to seize regional market dividends and embark on a new journey of growth together.'
  const heroCtaLabel = pageData?.hero?.primaryCtaLabel?.trim() || 'Apply Now'
  const heroCtaHref = pageData?.hero?.primaryCtaHref?.trim() || '/contact'
  const scopeTitle = pageData?.scope?.title?.trim() || 'Strategic Layout, Precise Recruitment'
  const scopeDescription =
    pageData?.scope?.description?.trim() ||
    'We are actively expanding our global presence, focusing on regions with high agricultural and industrial potential.'
  const ctaTitle = pageData?.cta?.title?.trim() || 'Act Now and Share the Dividends'
  const ctaDescription =
    pageData?.cta?.description?.trim() ||
    "We believe that combining DoDoShark's excellent products with your localized advantages will create miracles. If you are ready to start a new chapter, contact us today."
  const ctaButtonLabel = pageData?.cta?.buttonLabel?.trim() || 'Contact Us To Apply'
  const ctaButtonHref = pageData?.cta?.buttonHref?.trim() || '/contact'

  return (
    <main className="bg-[#fcfdfd] text-slate-900 font-sans selection:bg-orange-100 selection:text-orange-900">
      <section className="relative overflow-hidden bg-slate-800 pb-48 pt-32">
        <div className="absolute inset-0 opacity-30">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-800/90 via-slate-800/40 to-slate-800" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/30 to-slate-900" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-6 text-4xl font-black leading-tight tracking-tight text-white md:text-6xl">
            <HeroTitle title={heroTitle} fallback="Partner with DoDoShark Explore Global Blue Oceans" />
          </h1>
          <p className="mb-8 font-serif text-xl font-bold italic text-orange-400">{heroEyebrow}</p>
          <p className="mx-auto max-w-4xl text-lg font-light leading-relaxed text-slate-300">
            {heroSubtitle}
          </p>
          <div className="mt-12">
            <Link
              href={heroCtaHref}
              className="inline-block rounded-full bg-orange-500 px-10 py-4 text-sm font-bold uppercase tracking-widest text-white shadow-xl shadow-orange-500/30 transition-all hover:bg-orange-600"
            >
              {heroCtaLabel}
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-20 -mt-16 bg-white py-24 md:rounded-t-[1rem]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-20 text-center">
            <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 md:text-4xl">
              Choice is Greater Than <span className="text-orange-500">Effort</span>
            </h2>
            <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-orange-500" />
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {WHY_CHOOSE_US.map((item) => (
              <div
                key={item.title}
                className="group rounded-xl border border-slate-200 bg-slate-50 p-8 shadow-xl transition-all duration-300 hover:border-orange-500"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white shadow-lg transition-colors group-hover:bg-orange-500">
                  {item.icon}
                </div>
                <h3 className="mb-4 text-xl font-black uppercase tracking-tight text-slate-900">
                  {item.title}
                </h3>
                <p className="text-sm font-light leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-16 lg:flex-row">
            <div className="w-full lg:w-1/2">
              <h2 className="mb-6 text-3xl font-black uppercase tracking-tight">{scopeTitle}</h2>
              <p className="mb-10 text-lg font-light leading-relaxed text-slate-600">
                {scopeDescription}
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {SCOPE.map((item) => (
                  <div
                    key={item.region}
                    className={`rounded-xl border border-slate-200 bg-gradient-to-br p-6 ${item.color}`}
                  >
                    <h4 className="mb-3 font-black uppercase tracking-tight text-slate-900">
                      {item.region}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {item.countries.map((country) => (
                        <span
                          key={country}
                          className="rounded-full border border-slate-200 bg-white/50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-500"
                        >
                          {country}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative w-full overflow-hidden rounded-xl shadow-2xl md:aspect-video lg:w-1/2 lg:aspect-square">
              <Image src={scopeImage.src} alt={scopeImage.alt} fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-black uppercase tracking-tight">
            One Mind, <span className="text-orange-500">One Journey</span>
          </h2>
          <p className="mx-auto mb-16 max-w-2xl font-light text-slate-500">
            Successful cooperation stems from shared philosophy and strength.
          </p>

          <div className="grid gap-8 text-left md:grid-cols-3">
            <div className="rounded-b-xl border-t-4 border-orange-500 bg-white p-8 shadow-xl">
              <h3 className="mb-6 text-xl font-black uppercase tracking-tight">Qualifications</h3>
              <ul className="space-y-4 font-light text-slate-600">
                <li className="flex gap-3"><span className="shrink-0 font-bold text-orange-500">+</span> Legal operating status & qualifications</li>
                <li className="flex gap-3"><span className="shrink-0 font-bold text-orange-500">+</span> Familiarity with local market & laws</li>
                <li className="flex gap-3"><span className="shrink-0 font-bold text-orange-500">+</span> Strong local customer resources</li>
              </ul>
            </div>
            <div className="rounded-b-xl border-t-4 border-slate-900 bg-white p-8 shadow-xl">
              <h3 className="mb-6 text-xl font-black uppercase tracking-tight">Capabilities</h3>
              <ul className="space-y-4 font-light text-slate-600">
                <li className="flex gap-3"><span className="shrink-0 font-bold text-orange-500">+</span> 3+ years mechanical sales experience</li>
                <li className="flex gap-3"><span className="shrink-0 font-bold text-orange-500">+</span> Professional tech & sales team</li>
                <li className="flex gap-3"><span className="shrink-0 font-bold text-orange-500">+</span> Full lifecycle service capability</li>
              </ul>
            </div>
            <div className="rounded-b-xl border-t-4 border-orange-500 bg-white p-8 shadow-xl">
              <h3 className="mb-6 text-xl font-black uppercase tracking-tight">Compliance</h3>
              <ul className="space-y-4 font-light text-slate-600">
                <li className="flex gap-3"><span className="shrink-0 font-bold text-orange-500">+</span> Adherence to market rules & integrity</li>
                <li className="flex gap-3"><span className="shrink-0 font-bold text-orange-500">+</span> Solid financial & credit standing</li>
                <li className="flex gap-3"><span className="shrink-0 font-bold text-orange-500">+</span> Adequate capital for operations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-slate-900 py-24 text-white">
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon points="0,100 100,0 100,100" />
          </svg>
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-20 text-center">
            <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
              Your Success, <span className="text-orange-500">Our Promise</span>
            </h2>
            <p className="mt-4 font-light text-slate-400">
              Empowering Partners, Achieving Shared Value.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {SUPPORT.map((section) => (
              <div
                key={section.title}
                className="rounded-xl border border-white/10 bg-white/5 p-8 transition-colors hover:bg-white/10"
              >
                <h3 className="mb-6 text-lg font-black uppercase tracking-tight text-orange-500">
                  {section.title}
                </h3>
                <ul className="space-y-4">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm font-light text-slate-300">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[1rem] border border-slate-200 bg-slate-50 p-12 text-center shadow-2xl lg:p-16">
            <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-orange-500/10 blur-[100px]" />
            <h2 className="mb-8 text-3xl font-black uppercase tracking-tight text-slate-900">
              {ctaTitle}
            </h2>
            <p className="mx-auto mb-10 max-w-3xl text-lg font-light leading-relaxed text-slate-600">
              {ctaDescription}
            </p>

            <Link
              href={ctaButtonHref}
              className="inline-block rounded-full bg-slate-900 px-10 py-4 text-sm font-black uppercase tracking-widest text-white shadow-xl shadow-slate-900/20 transition-all hover:bg-orange-500"
            >
              {ctaButtonLabel}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
