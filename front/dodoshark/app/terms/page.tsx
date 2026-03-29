import type {Metadata} from 'next'
import Link from 'next/link'

import {fetchSanityData} from '@/app/lib/sanity.live'
import {buildPageMetadata} from '@/app/lib/seo'
import {cleanText, renderText} from '@/app/lib/sanity-utils'
import type {SeoMeta} from '@/app/lib/types/sanity'

type LegalSection = {
  title?: string
  body?: string[]
}

type TermsPageData = {
  seo?: SeoMeta
  lastUpdated?: string
  heroTitle?: string
  heroDescription?: string
  sections?: LegalSection[]
  bottomCta?: {
    title?: string
    description?: string
    buttonLabel?: string
    buttonHref?: string
  }
}

const TERMS_PAGE_QUERY = `coalesce(
  *[_id == "termsPage"][0],
  *[_type == "termsPage"][0]
){
  seo,
  lastUpdated,
  heroTitle,
  heroDescription,
  sections[]{
    title,
    body
  },
  bottomCta{
    title,
    description,
    buttonLabel,
    buttonHref
  }
}`

const FALLBACK_SECTIONS: LegalSection[] = [
  {
    title: '1. Acceptance of Terms',
    body: [
      'By accessing or using DoDoShark websites, documents, quotations, products, or technical services, you agree to these Terms of Service.',
      'If you are acting on behalf of a company, you confirm that you have authority to bind that company to this agreement.',
    ],
  },
  {
    title: '2. Product and Technical Information',
    body: [
      'All product descriptions, capacities, dimensions, and performance values are provided for reference and may vary by model, raw material, and operation environment.',
      'Final technical scope is defined by the signed quotation, contract, and confirmed technical annexes.',
    ],
  },
  {
    title: '3. Quotations, Orders, and Payment',
    body: [
      'Quotations are valid only within the stated validity period and are subject to confirmation of stock, production schedule, and engineering requirements.',
      'Prices, payment milestones, and delivery terms follow the executed contract or proforma invoice.',
    ],
  },
  {
    title: '4. Delivery, Installation, and Risk',
    body: [
      'Delivery terms are interpreted according to the latest Incoterms edition unless otherwise specified in writing.',
      'Customer is responsible for site readiness, utilities, local permits, and operator safety training before commissioning.',
    ],
  },
  {
    title: '5. Warranty and Limitation of Liability',
    body: [
      'Warranty scope and period follow the signed sales agreement. Wear parts, misuse, unauthorized modifications, and force majeure are excluded unless agreed otherwise.',
      'To the extent permitted by law, DoDoShark is not liable for indirect, incidental, or consequential damages, including production downtime or profit loss.',
    ],
  },
  {
    title: '6. Intellectual Property',
    body: [
      'All technical drawings, manuals, media assets, and website content are owned by DoDoShark or its licensors and may not be copied or redistributed without written consent.',
    ],
  },
  {
    title: '7. Governing Law and Dispute Resolution',
    body: [
      'Unless a contract states otherwise, disputes shall first be resolved through friendly negotiation. If unresolved, disputes may be submitted to competent arbitration or court under the governing law specified in the relevant agreement.',
    ],
  },
  {
    title: '8. Contact',
    body: ['For contract, legal, or compliance questions, contact our team at legal@dodoshark.com.'],
  },
]

async function getTermsPageData(stega?: boolean) {
  return fetchSanityData<TermsPageData | null>({
    query: TERMS_PAGE_QUERY,
    stega,
  })
}

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getTermsPageData(false)
  return buildPageMetadata({
    seo: pageData?.seo,
    fallbackTitle: 'Terms of Service | DoDoShark',
    fallbackDescription: 'Terms and conditions for using DoDoShark industrial equipment and website services.',
  })
}

export default async function TermsPage() {
  const pageData = await getTermsPageData()
  const lastUpdated = renderText(pageData?.lastUpdated) || 'March 4, 2026'
  const heroTitle = renderText(pageData?.heroTitle) || 'Terms of Service'
  const heroDescription =
    renderText(pageData?.heroDescription) ||
    'Legal terms for accessing and using DoDoShark products, website, and related services.'
  const sections = (pageData?.sections ?? FALLBACK_SECTIONS).filter((section) => renderText(section?.title))
  const ctaTitle = renderText(pageData?.bottomCta?.title) || 'Need Contract Clarification?'
  const ctaDescription =
    renderText(pageData?.bottomCta?.description) ||
    'Our engineering and compliance teams can align legal terms with your procurement process and local project requirements.'
  const ctaLabel = renderText(pageData?.bottomCta?.buttonLabel) || 'Contact DoDoShark'
  const ctaHref = cleanText(pageData?.bottomCta?.buttonHref) || '/contact'

  return (
    <main className="bg-[#fcfdfd] text-slate-900">
      <section className="border-b border-slate-100 bg-slate-50 pb-20 pt-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-3 rounded-md border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">
            <span>Last updated {lastUpdated}</span>
          </div>
          <h1 className="mb-6 text-5xl font-display font-black leading-tight tracking-tight text-slate-900 md:text-6xl">
            {heroTitle.includes('Terms') ? (
              <>
                Terms of <span className="accent-gradient-text">Service</span>
              </>
            ) : (
              heroTitle
            )}
          </h1>
          <p className="text-lg font-light text-slate-500">{heroDescription}</p>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {sections.map((section) => (
            <section key={section.title} className="mb-12">
              <h2 className="mb-5 text-2xl font-display font-black uppercase tracking-wide text-slate-900">
                {section.title}
              </h2>
              <div className="space-y-4">
                {(section.body ?? []).map((paragraph) => (
                  <p key={paragraph} className="leading-8 text-slate-600">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}

          <div className="premium-card mt-20 border-orange-500/30 bg-white p-10 shadow-2xl">
            <h2 className="mb-4 text-xl font-display font-black uppercase tracking-tight text-slate-900">
              {ctaTitle}
            </h2>
            <p className="mb-8 text-sm font-light leading-relaxed text-slate-500">{ctaDescription}</p>
            <Link
              href={ctaHref}
              className="inline-block rounded-md bg-slate-800 px-10 py-4 text-[10px] font-black uppercase tracking-widest text-white transition-all hover:bg-orange-500"
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
