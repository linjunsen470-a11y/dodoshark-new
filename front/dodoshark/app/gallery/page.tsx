import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import {
  BROCHURE_CATEGORIES,
  FACEBOOK_PROFILE_URL,
  FACEBOOK_VIDEO_SOURCES,
  toFacebookEmbedUrl,
} from '@/app/lib/brochure-gallery-data'
import Icon from '@/components/ui/Icon'

type GalleryPageProps = {
  searchParams: Promise<{
    category?: string
  }>
}

export const metadata: Metadata = {
  title: 'Gallery | DoDoShark Brochure Highlights',
  description:
    'Machine gallery with brochure highlights for stainless crushers, claw mills, roller crushers, and mixers.',
}

function getCategoryHref(slug: string) {
  return `/gallery?category=${slug}`
}

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  const params = await searchParams
  const selectedSlug = params.category?.trim()

  const selectedCategory =
    BROCHURE_CATEGORIES.find((item) => item.slug === selectedSlug) || BROCHURE_CATEGORIES[0]

  return (
    <main className="bg-[#fcfdfd] text-slate-900">
      <section className="relative overflow-hidden bg-slate-900 py-20 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.25),transparent_45%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-300">Brochure Visual Library</p>
          <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">Machine Gallery & Brochure Highlights</h1>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-200 sm:text-base">
            Real brochure visuals from our crusher and mixer lines. Pair image review with a live video demo to verify
            machine fit for your materials.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/video-demo"
              className="rounded-md bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Book Video Demo
            </Link>
            <Link
              href="/products"
              className="rounded-md border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white hover:text-slate-900"
            >
              View Products
            </Link>
            <a
              href={FACEBOOK_PROFILE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white hover:text-slate-900"
            >
              <Icon icon="facebook" className="h-4 w-4" />
              Facebook Feed
            </a>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            {BROCHURE_CATEGORIES.map((item) => {
              const active = item.slug === selectedCategory.slug
              return (
                <Link
                  key={item.slug}
                  href={getCategoryHref(item.slug)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    active
                      ? 'border-orange-500 bg-orange-500 text-white'
                      : 'border-slate-300 text-slate-700 hover:border-orange-400 hover:text-orange-600'
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>

          <div className="mt-8 rounded-lg border border-slate-200 bg-white p-5 sm:p-6">
            <h2 className="text-2xl font-bold text-slate-900">{selectedCategory.name}</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">{selectedCategory.summary}</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {selectedCategory.items.map((item) => (
                <article key={item.imagePath} className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                  <div className="relative aspect-[3/4] bg-white">
                    <Image
                      src={item.imagePath}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 1280px) 24vw, (min-width: 640px) 45vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="border-t border-slate-200 bg-white p-4">
                    <h3 className="text-sm font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-xs leading-6 text-slate-600">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900">Technical Highlights</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {selectedCategory.highlights.map((item) => (
              <article key={item.title} className="rounded-lg border border-slate-200 bg-white p-5">
                <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-5 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-bold text-slate-900">Facebook Video Feed</h2>
            <a
              href={FACEBOOK_PROFILE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 underline underline-offset-4 hover:text-orange-600"
            >
              <Icon icon="facebook" className="h-4 w-4" />
              Visit Profile
            </a>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {FACEBOOK_VIDEO_SOURCES.map((item) => {
              const embedSrc = toFacebookEmbedUrl(item.url)

              return (
                <article key={item.url} className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                  <div className="relative aspect-[9/16] bg-slate-100">
                    <iframe
                      src={embedSrc || item.url}
                      title={item.title}
                      className="h-full w-full"
                      loading="lazy"
                      style={{ border: 'none', overflow: 'hidden' }}
                      scrolling="no"
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-1 text-xs leading-6 text-slate-600">{item.description}</p>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex text-xs font-semibold text-slate-700 underline underline-offset-4 hover:text-orange-600"
                    >
                      Open source URL
                    </a>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold">Need a material-matched setup?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-200">
            Share material type, target fineness, and expected output. We can run a live remote test before you place
            the order.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/video-demo"
              className="rounded-md bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Book Live Video Demo
            </Link>
            <Link
              href="/contact"
              className="rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-slate-900"
            >
              Contact Engineering Team
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
