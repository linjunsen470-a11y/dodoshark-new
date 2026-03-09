import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { BROCHURE_CATEGORIES } from '@/app/lib/brochure-gallery-data'
import { MVP_CATEGORIES, SERVICE_PROMISES, TRUST_METRICS } from '@/app/lib/mvp-data'

const capabilityCards = [
  {
    title: 'Precision Machining',
    description:
      'Critical rotating parts are processed with strict tolerance and inspected before assembly.',
    imagePath: '/assets/images/brochure/claw-disc/factory-real-photos.jpg',
    imageAlt: 'Factory photos showing precision-machined claw disc mill parts and assembly',
  },
  {
    title: 'Dynamic Balance Validation',
    description:
      'Grinding head and rotating discs are validated to reduce vibration and improve run stability.',
    imagePath: '/assets/images/brochure/stainless/low-failure.jpg',
    imageAlt: 'Stainless crusher cutter head detail used for dynamic balance and failure-rate control',
  },
  {
    title: 'Durable Drive & Bearings',
    description:
      'Wear-resistant bearings and strengthened structure support continuous duty in production settings.',
    imagePath: '/assets/images/brochure/stainless/continuous-operation.jpg',
    imageAlt: 'Bearing chamber and polished head details for continuous machine operation',
  },
  {
    title: 'Dust-Control Line Options',
    description:
      'Optional bag collection or cyclone plus pulse collector setups for cleaner workshop operation.',
    imagePath: '/assets/images/brochure/stainless/dust-free-solution.jpg',
    imageAlt: 'Dust-control solution with bag collection and cyclone pulse collector system',
  },
]

export const metadata: Metadata = {
  title: 'About | DoDoShark',
  description:
    'About DoDoShark factory capabilities, product scope, and support promise for industrial crushing and mixing lines.',
}

export default function AboutPage() {
  return (
    <main className="bg-[#fcfdfd] text-slate-900">
      <section className="relative overflow-hidden py-20 sm:py-24">
        <div className="absolute inset-0">
          <Image
            src="/assets/images/factory.jpg"
            alt="DoDoShark factory"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/70" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-300">Factory Profile</p>
          <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">About DoDoShark</h1>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-200 sm:text-base">
            Factory-direct manufacturer focused on grinding, crushing, and mixing equipment. We combine practical
            machine engineering with remote video validation to help buyers confirm fit before order.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/video-demo"
              className="rounded-md bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Book Video Demo
            </Link>
            <Link
              href="/gallery"
              className="rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-slate-900"
            >
              View Brochure Gallery
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#f8fafc_0%,#f1f5f9_100%)] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">Factory Facts</h2>
          <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4">
            {TRUST_METRICS.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-slate-200/80 bg-white/95 p-5 text-center shadow-[0_14px_30px_-22px_rgba(15,23,42,0.5)]"
              >
                <p className="text-3xl font-extrabold tracking-tight text-orange-600 md:text-4xl">{item.value}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Manufacturing Capability</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
            Real production and brochure visuals showing the parts, assemblies, and engineering approach behind our
            machine lines.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {capabilityCards.map((card) => (
              <article key={card.title} className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                <div className="relative aspect-[4/3] bg-slate-100">
                  <Image src={card.imagePath} alt={card.imageAlt} fill sizes="(min-width: 768px) 48vw, 100vw" className="object-cover" />
                </div>
                <div className="border-t border-slate-200 p-5">
                  <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{card.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">MVP Product Breadth</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
                Four launch categories for fast selection and clear communication with distributors and end users.
              </p>
            </div>
            <Link href="/products" className="text-sm font-semibold text-slate-700 underline underline-offset-4 hover:text-orange-600">
              View Product Details
            </Link>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {MVP_CATEGORIES.map((item) => (
              <article key={item.slug} className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                <div className="relative aspect-square bg-slate-50">
                  <Image
                    src={item.mainImage.src}
                    alt={item.mainImage.alt}
                    fill
                    sizes="(min-width: 1280px) 22vw, (min-width: 768px) 45vw, 100vw"
                    className="object-contain p-4"
                  />
                </div>
                <div className="border-t border-slate-200 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-orange-600">{item.tag}</p>
                  <h3 className="mt-2 text-base font-semibold text-slate-900">{item.shortName}</h3>
                  <p className="mt-2 text-xs leading-6 text-slate-600">{item.description}</p>
                  <Link
                    href={`/products/${item.slug}`}
                    className="mt-3 inline-flex text-xs font-semibold text-slate-700 underline underline-offset-4 hover:text-orange-600"
                  >
                    View Category
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900">Service & Delivery Promise</h2>
          <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-600">
            {SERVICE_PROMISES.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              href="/video-demo"
              className="rounded-md bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Book Live Video Demo
            </Link>
            <Link
              href="/contact"
              className="rounded-md border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
            >
              Contact DoDoShark
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-14 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">Brochure Collections</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {BROCHURE_CATEGORIES.map((item) => (
              <Link
                key={item.slug}
                href={`/gallery?category=${item.slug}`}
                className="rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-orange-300 hover:text-orange-200"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
