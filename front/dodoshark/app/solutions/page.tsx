import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { client, urlFor } from '@/app/lib/sanity'
import SectionHeader from '@/components/page-builder/SectionHeader'
import SectionShell from '@/components/page-builder/SectionShell'
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

type SolutionCard = {
  _id: string
  title?: string
  slug?: { current?: string }
  summary?: string
  heroImage?: SanityImage
  category?: CategoryItem
}

type SolutionsLandingData = {
  seo?: SeoMeta
  hero?: {
    badge?: string
    title?: string
    subtitle?: string
    image?: SanityImage
  }
  solutionCategories?: CategoryItem[]
}

type SolutionsPageProps = {
  searchParams: Promise<Record<string, QueryParamValue>>
}

const PAGE_SIZE = 8

const solutionsLandingQuery = `*[_type == "solutionsPage"][0]{
  seo,
  hero{
    badge,
    title,
    subtitle,
    image{
      alt,
      asset
    }
  },
  solutionCategories[]->{
    _id,
    title,
    slug{current}
  }
}`

const solutionsCountQuery = `count(*[
  _type == "solution"
  && defined(slug.current)
  && ($category == "" || category->slug.current == $category)
  && (
    $search == ""
    || title match $search
    || summary match $search
    || category->title match $search
  )
])`

const solutionsListQuery = `*[
  _type == "solution"
  && defined(slug.current)
  && ($category == "" || category->slug.current == $category)
  && (
    $search == ""
    || title match $search
    || summary match $search
    || category->title match $search
  )
] | order(_createdAt desc)[$start...$end]{
  _id,
  title,
  slug{current},
  summary,
  heroImage{
    alt,
    asset
  },
  category->{
    _id,
    title,
    slug{current}
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

function buildHref({
  category,
  q,
  page,
}: {
  category?: string
  q?: string
  page?: number
}) {
  const params = new URLSearchParams()
  if (category) params.set('category', category)
  if (q) params.set('q', q)
  if (page && page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `/solutions?${query}` : '/solutions'
}

export async function generateMetadata(): Promise<Metadata> {
  const landing = await client.fetch<SolutionsLandingData | null>(solutionsLandingQuery)
  const seo = landing?.seo

  return {
    title: seo?.title || 'Industrial Solutions | DoDoShark',
    description: seo?.description || 'Explore material processing solutions across industries.',
    keywords: seo?.keywords,
    alternates: seo?.canonicalUrl ? { canonical: seo.canonicalUrl } : undefined,
    robots: { index: false, follow: false },
  }
}

export default async function SolutionsPage({ searchParams }: SolutionsPageProps) {
  const params = await searchParams
  const category = firstParam(params.category)?.trim() || ''
  const q = firstParam(params.q)?.trim() || ''
  const requestedPage = parsePositiveInt(firstParam(params.page), 1)
  const search = q ? `*${q}*` : ''

  const landing = await client.fetch<SolutionsLandingData | null>(solutionsLandingQuery)
  const total = await client.fetch<number>(solutionsCountQuery, { category, search })
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const currentPage = Math.min(requestedPage, totalPages)
  const start = (currentPage - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE

  const [solutions, fallbackCategories] = await Promise.all([
    client.fetch<SolutionCard[]>(solutionsListQuery, { category, search, start, end }),
    client.fetch<CategoryItem[]>(allCategoriesQuery),
  ])

  const configuredCategories = landing?.solutionCategories?.filter((item) => item?.slug?.current) ?? []
  const categories = configuredCategories.length > 0 ? configuredCategories : fallbackCategories
  const heroImageSrc = toImageSrc(landing?.hero?.image, 1800)
  const heroBadge = landing?.hero?.badge?.trim()
  const heroTitle = landing?.hero?.title?.trim()
  const heroSubtitle =
    landing?.hero?.subtitle?.trim() || 'Discover proven process flows for different materials and industries.'

  return (
    <main className="bg-[#fcfdfd] text-slate-900">
      <section className="relative overflow-hidden bg-slate-800 pb-20 pt-28 md:pb-24 md:pt-32">
        {heroImageSrc && (
          <Image
            src={heroImageSrc}
            alt={landing?.hero?.image?.alt || 'Solutions hero'}
            fill
            sizes="100vw"
            className="object-cover opacity-20"
          />
        )}
        <div className="absolute inset-0 bg-[radial-gradient(#fb923c_1px,transparent_1px)] [background-size:32px_32px] opacity-15" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          {heroBadge && (
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-300">
              <Icon icon="lightbulb" className="h-4 w-4" />
              <span>{heroBadge}</span>
            </div>
          )}
          <div className="mx-auto max-w-4xl">
            <SectionHeader
              title={
                heroTitle ? (
                  heroTitle
                ) : (
                  <>
                    Material Processing <span className="accent-gradient-text">Solutions</span>
                  </>
                )
              }
              subtitle={heroSubtitle}
              tone="dark"
              className="mx-auto"
              titleClassName="text-white"
              subtitleClassName="mx-auto max-w-3xl text-sm leading-7 text-slate-300 md:text-base lg:text-lg"
            />
          </div>
        </div>
      </section>

      <SectionShell id="solutions">
        <div className="mb-10 md:mb-12">
          <SectionHeader
            eyebrow="Browse Solutions"
            title="Find the right process route by material and application"
            subtitle="Use category filters and keyword search to narrow down solution pages built around actual process scenarios."
            className="mx-auto max-w-3xl"
          />
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-3 md:mb-10">
          <Link
            href={buildHref({ q })}
            className={`rounded-full border px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors ${
              category
                ? 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                : 'border-orange-500 bg-orange-500 text-white shadow-lg shadow-orange-500/20'
            }`}
          >
            All Solutions
          </Link>
          {categories.map((item) => {
            const slug = item.slug?.current
            if (!slug) return null
            const active = slug === category
            return (
              <Link
                key={item._id ?? slug}
                href={buildHref({ category: slug, q })}
                className={`rounded-full border px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors ${
                  active
                    ? 'border-orange-500 bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                {item.title || slug}
              </Link>
            )
          })}
        </div>

        <form action="/solutions" method="get" className="mx-auto mb-14 max-w-2xl md:mb-16">
          {category && <input type="hidden" name="category" value={category} />}
          <div className="relative">
            <Icon icon="search" className="pointer-events-none absolute right-5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              name="q"
              defaultValue={q}
              placeholder="Search your material (e.g. Corn, Spices, Plastic)..."
              className="w-full rounded-2xl border border-slate-200 bg-white px-6 py-4 pr-12 text-sm font-medium text-slate-900 shadow-sm transition-all focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/10"
            />
          </div>
        </form>

        {solutions.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-16 text-center text-slate-500">
            No solutions found matching your search.
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {solutions.map((item) => {
              const imageSrc = toImageSrc(item.heroImage, 900)
              const href = item.slug?.current ? `/solutions/${item.slug.current}` : '#'
              return (
                <article key={item._id} className="premium-card group overflow-hidden p-2">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-100 shadow-inner">
                    {imageSrc ? (
                      <Image
                        src={imageSrc}
                        alt={item.heroImage?.alt || item.title || 'Solution image'}
                        fill
                        sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-slate-300">
                        <Icon icon="image" className="h-10 w-10" />
                      </div>
                    )}
                    <div className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-700 shadow-sm backdrop-blur-md">
                      {item.category?.title || 'Solution'}
                    </div>
                  </div>
                  <div className="p-7">
                    <h3 className="mb-3 text-xl font-display font-extrabold leading-[1.15] tracking-[-0.02em] text-slate-900 transition-colors group-hover:text-orange-600 md:text-[1.375rem]">
                      {item.title}
                    </h3>
                    <p className="mb-6 line-clamp-2 min-h-14 text-sm leading-7 text-slate-600 md:text-base">
                      {item.summary || 'High-efficiency and stable industrial process design.'}
                    </p>
                    <Link
                      href={href}
                      className="flex w-full items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-800 transition-colors hover:border-slate-800 hover:bg-slate-800 hover:text-white"
                    >
                      Explore Solution Details
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-16 flex items-center justify-center gap-2 md:mt-20">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
              <Link
                key={pageNumber}
                href={buildHref({ category, q, page: pageNumber })}
                className={`h-3 rounded-full transition-all ${
                  pageNumber === currentPage ? 'w-8 bg-orange-500' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to page ${pageNumber}`}
              />
            ))}
          </div>
        )}
      </SectionShell>
    </main>
  )
}
