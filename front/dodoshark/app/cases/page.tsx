import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { client, urlFor } from '@/app/lib/sanity'
import Icon from '@/components/ui/Icon'

type QueryParamValue = string | string[] | undefined

type SeoMeta = {
  title?: string
  description?: string
  keywords?: string[]
  canonicalUrl?: string
  noIndex?: boolean
}

type SanityImage = {
  alt?: string
  asset?: {
    _id?: string
    _ref?: string
    url?: string
  }
}

type CategoryItem = {
  _id?: string
  title?: string
  slug?: { current?: string }
}

type CaseStat = {
  label?: string
  value?: string
}

type CaseCard = {
  _id: string
  title?: string
  slug?: { current?: string }
  excerpt?: string
  location?: string
  coverImage?: SanityImage
  industry?: CategoryItem
  impactStats?: CaseStat[]
}

type CasesLandingData = {
  seo?: SeoMeta
  hero?: {
    badge?: string
    title?: string
    subtitle?: string
    image?: SanityImage
    stats?: CaseStat[]
  }
  industries?: CategoryItem[]
}

type CasesPageProps = {
  searchParams: Promise<Record<string, QueryParamValue>>
}

const PAGE_SIZE = 6

const casesLandingQuery = `*[_type == "casesPage"][0]{
  seo,
  hero{
    badge,
    title,
    subtitle,
    image{
      alt,
      asset
    },
    stats[]{
      label,
      value
    }
  },
  industries[]->{
    _id,
    title,
    slug{current}
  }
}`

const casesCountQuery = `count(*[
  _type == "caseStudy"
  && defined(slug.current)
  && ($industry == "" || industry->slug.current == $industry)
])`

const casesListQuery = `*[
  _type == "caseStudy"
  && defined(slug.current)
  && ($industry == "" || industry->slug.current == $industry)
] | order(_createdAt desc)[$start...$end]{
  _id,
  title,
  slug{current},
  excerpt,
  location,
  coverImage{
    alt,
    asset
  },
  industry->{
    _id,
    title,
    slug{current}
  },
  impactStats[]{
    label,
    value
  }
}`

const allCategoriesQuery = `*[_type == "category"] | order(title asc){
  _id,
  title,
  slug{current}
}`

function firstParam(value: QueryParamValue) {
  if (Array.isArray(value)) return value[0]
  return value
}

function parsePositiveInt(value: string | undefined, fallback = 1) {
  const parsed = Number.parseInt(value ?? '', 10)
  if (!Number.isFinite(parsed) || parsed < 1) return fallback
  return parsed
}

function toImageSrc(image?: SanityImage, width = 1200) {
  if (!image) return undefined

  const directUrl = image.asset?.url?.trim()
  if (directUrl) return directUrl

  const hasIdentity = Boolean(image.asset?._id || image.asset?._ref)
  if (!hasIdentity) return undefined

  try {
    return urlFor(image).width(width).fit('max').url()
  } catch {
    return undefined
  }
}

function buildHref({ industry, page }: { industry?: string; page?: number }) {
  const params = new URLSearchParams()
  if (industry) params.set('industry', industry)
  if (page && page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `/cases?${query}` : '/cases'
}

export async function generateMetadata(): Promise<Metadata> {
  const landing = await client.fetch<CasesLandingData | null>(casesLandingQuery)
  const seo = landing?.seo

  return {
    title: seo?.title || 'Global Success Stories | DoDoShark',
    description: seo?.description || 'Explore real industrial project case studies and outcomes.',
    keywords: seo?.keywords,
    alternates: seo?.canonicalUrl ? { canonical: seo.canonicalUrl } : undefined,
    robots: { index: false, follow: false },
  }
}

export default async function CasesPage({ searchParams }: CasesPageProps) {
  const params = await searchParams
  const industry = firstParam(params.industry)?.trim() || ''
  const requestedPage = parsePositiveInt(firstParam(params.page), 1)

  const landing = await client.fetch<CasesLandingData | null>(casesLandingQuery)
  const total = await client.fetch<number>(casesCountQuery, { industry })
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const currentPage = Math.min(requestedPage, totalPages)
  const start = (currentPage - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE

  const [cases, fallbackIndustries] = await Promise.all([
    client.fetch<CaseCard[]>(casesListQuery, { industry, start, end }),
    client.fetch<CategoryItem[]>(allCategoriesQuery),
  ])

  const configuredIndustries = landing?.industries?.filter((item) => item?.slug?.current) ?? []
  const industries = configuredIndustries.length > 0 ? configuredIndustries : fallbackIndustries
  const heroImageSrc = toImageSrc(landing?.hero?.image, 1800)
  const heroBadge = landing?.hero?.badge?.trim()
  const heroTitle = landing?.hero?.title?.trim()
  const heroSubtitle =
    landing?.hero?.subtitle?.trim() ||
    'Discover how industrial partners improve throughput and efficiency with real deployments.'
  const heroStats = landing?.hero?.stats ?? []

  return (
    <main className="bg-[#fcfdfd] text-slate-900">
      <section className="relative overflow-hidden bg-slate-800 pb-24 pt-32">
        {heroImageSrc && (
          <Image
            src={heroImageSrc}
            alt={landing?.hero?.image?.alt || 'Cases hero'}
            fill
            sizes="100vw"
            className="object-cover opacity-20"
          />
        )}
        <div className="absolute inset-0 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:40px_40px] opacity-20" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            {heroBadge && (
              <div className="mb-8 inline-flex items-center gap-3 rounded-md border border-orange-500/20 bg-orange-500/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-orange-400">
                <Icon icon="globe" className="h-4 w-4" />
                <span>{heroBadge}</span>
              </div>
            )}
            <h1 className="mb-8 text-5xl font-display font-black leading-tight tracking-tight text-white md:text-7xl">
              {heroTitle ? (
                heroTitle
              ) : (
                <>
                  Success Stories <span className="accent-gradient-text">in Action</span>
                </>
              )}
            </h1>
            <p className="mx-auto max-w-3xl text-xl font-light leading-relaxed text-slate-400">{heroSubtitle}</p>
            {heroStats.length ? (
              <div className="mt-12 flex flex-wrap items-center justify-center gap-8 md:gap-10">
                {heroStats.slice(0, 3).map((stat, index) => (
                  <div key={`${stat.label}-${index}`} className="min-w-[120px]">
                    <div className="text-3xl font-display font-black text-white">{stat.value}</div>
                    <div className="mt-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section id="cases" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {cases.length === 0 ? (
            <div className="rounded-lg border border-dashed border-slate-300 bg-white p-16 text-center text-slate-500">
              No case studies found for current industry filter.
            </div>
          ) : (
            <div className="mb-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {cases.map((item) => {
                const cover = toImageSrc(item.coverImage, 900)
                const caseHref = item.slug?.current ? `/cases/${item.slug.current}` : '#'
                const caseTag = item.industry?.title || 'Case Study'
                return (
                  <article key={item._id} className="premium-card group overflow-hidden">
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                      {cover ? (
                        <Image
                          src={cover}
                          alt={item.coverImage?.alt || item.title || 'Case cover'}
                          fill
                          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-slate-300">
                          <Icon icon="image" className="h-10 w-10" />
                        </div>
                      )}
                    </div>
                    <div className="p-7">
                      <div className="mb-4 flex justify-center">
                        <div
                          className="inline-flex max-w-full items-center gap-2 whitespace-nowrap rounded-full border border-orange-200 bg-orange-50 px-3 py-1.5 text-[13px] font-semibold leading-none text-orange-600 shadow-[0_8px_24px_rgba(249,115,22,0.08)]"
                          title={caseTag}
                        >
                          <span className="h-2 w-2 shrink-0 rounded-full bg-orange-400" />
                          <span className="block max-w-[180px] truncate">{caseTag}</span>
                        </div>
                      </div>
                      {item.location ? (
                        <div className="mb-4 flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">
                          <Icon icon="location" className="h-4 w-4 shrink-0" />
                          <span className="truncate">{item.location}</span>
                        </div>
                      ) : null}
                      {!!item.impactStats?.length && (
                        <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
                          {item.impactStats.slice(0, 2).map((stat, idx) => (
                            <span
                              key={`${stat.label}-${idx}`}
                              className="rounded-lg bg-orange-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-orange-600"
                            >
                              {stat.value || stat.label}
                            </span>
                          ))}
                        </div>
                      )}
                      <h3 className="mb-3 text-xl font-display font-black leading-tight text-slate-900 transition-colors group-hover:text-orange-600">
                        {item.title}
                      </h3>
                      <p className="mb-6 line-clamp-3 text-sm font-light leading-relaxed text-slate-500">
                        {item.excerpt || 'Detailed case study content is available in the full project report.'}
                      </p>
                      <Link
                        href={caseHref}
                        className="flex w-full items-center justify-center rounded-lg bg-slate-50 py-3 text-[11px] font-black tracking-widest transition-all hover:bg-slate-800 hover:text-white"
                      >
                        View&nbsp; Details
                      </Link>
                    </div>
                  </article>
                )
              })}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-16 flex items-center justify-center gap-3">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                <Link
                  key={pageNumber}
                  href={buildHref({ industry, page: pageNumber })}
                  className={`h-3 rounded-full transition-all ${
                    pageNumber === currentPage ? 'w-8 bg-orange-500' : 'w-3 bg-slate-200 hover:bg-slate-300'
                  }`}
                  aria-label={`Go to page ${pageNumber}`}
                />
              ))}
            </div>
          )}

          <div className="mt-20 -mx-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:overflow-visible md:px-0">
            <div className="inline-flex min-w-full gap-3 md:flex md:w-full md:flex-wrap md:justify-center">
              <Link
                href={buildHref({})}
                className={`shrink-0 whitespace-nowrap rounded-md border-2 px-5 py-2.5 text-[11px] font-black tracking-widest transition-all md:px-6 ${
                  industry
                    ? 'border-slate-200 text-slate-700 hover:border-slate-300'
                    : 'border-orange-500 bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                }`}
              >
                All Industries
              </Link>
              {industries.map((item) => {
                const slug = item.slug?.current
                if (!slug) return null
                const active = slug === industry
                return (
                  <Link
                    key={item._id ?? slug}
                    href={buildHref({ industry: slug })}
                    className={`shrink-0 whitespace-nowrap rounded-md border-2 px-5 py-2.5 text-[11px] font-black tracking-widest transition-all md:px-6 ${
                      active
                        ? 'border-orange-500 bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                        : 'border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {item.title || slug}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
