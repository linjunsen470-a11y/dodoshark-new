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

type PrivacyPageData = {
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

const PRIVACY_PAGE_QUERY = `coalesce(
  *[_id == "privacyPage"][0],
  *[_type == "privacyPage"][0]
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
    title: '1. Information We Collect',
    body: [
      'We may collect business contact data such as name, company, email, phone number, country, and inquiry details when you submit forms or communicate with us.',
      'We may also collect device and usage information for analytics, website security, and service improvement.',
    ],
  },
  {
    title: '2. How We Use Information',
    body: [
      'We use collected information to provide quotations, respond to inquiries, prepare technical proposals, fulfill contracts, and improve our products and services.',
      'We do not sell personal data to third parties.',
    ],
  },
  {
    title: '3. Legal Basis and International Transfers',
    body: [
      'Where required by applicable law, we process information based on consent, contract performance, legitimate interests, or legal obligations.',
      'Your data may be processed in regions where DoDoShark or its service providers operate, with reasonable safeguards in place.',
    ],
  },
  {
    title: '4. Data Sharing',
    body: [
      'We may share information with logistics partners, payment providers, technical service providers, and legal advisors when necessary to deliver products and services.',
      'All service providers are expected to handle data securely and only for authorized purposes.',
    ],
  },
  {
    title: '5. Cookies and Tracking',
    body: [
      'We use cookies and similar technologies to remember preferences, measure traffic, and optimize website performance.',
      'You can control cookies through your browser settings, but some website functions may be affected.',
    ],
  },
  {
    title: '6. Data Retention and Security',
    body: [
      'We retain data only as long as needed for the purposes described in this policy or as required by law.',
      'We apply reasonable technical and organizational measures to protect data against unauthorized access, disclosure, or loss.',
    ],
  },
  {
    title: '7. Your Rights',
    body: [
      'Depending on your jurisdiction, you may have rights to access, correct, delete, restrict, or object to certain processing activities.',
      'To exercise your rights, contact us through the details below.',
    ],
  },
  {
    title: '8. Contact',
    body: ['For privacy questions or data requests, email privacy@dodoshark.com.'],
  },
]

async function getPrivacyPageData(stega?: boolean) {
  return fetchSanityData<PrivacyPageData | null>({
    query: PRIVACY_PAGE_QUERY,
    stega,
  })
}

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getPrivacyPageData(false)
  return buildPageMetadata({
    seo: pageData?.seo,
    fallbackTitle: 'Privacy Policy | DoDoShark',
    fallbackDescription: 'How DoDoShark collects, uses, and protects business and website data.',
  })
}

export default async function PrivacyPage() {
  const pageData = await getPrivacyPageData()
  const lastUpdated = renderText(pageData?.lastUpdated) || 'March 4, 2026'
  const heroTitle = renderText(pageData?.heroTitle) || 'Privacy Policy'
  const heroDescription =
    renderText(pageData?.heroDescription) ||
    'How we protect your data across industrial sales, technical support, and website operations.'
  const sections = (pageData?.sections ?? FALLBACK_SECTIONS).filter((section) => renderText(section?.title))
  const ctaTitle = renderText(pageData?.bottomCta?.title) || 'Need Data Compliance Support?'
  const ctaDescription =
    renderText(pageData?.bottomCta?.description) ||
    'For NDA workflows, procurement compliance, or customer data handling requests, our team will respond within 2 business days.'
  const ctaLabel = renderText(pageData?.bottomCta?.buttonLabel) || 'Contact Privacy Team'
  const ctaHref = cleanText(pageData?.bottomCta?.buttonHref) || '/contact'

  return (
    <main className="bg-[#fcfdfd] text-slate-900">
      <section className="border-b border-slate-100 bg-slate-50 pb-20 pt-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-3 rounded-md border border-orange-500/20 bg-orange-500/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">
            <span>Last updated {lastUpdated}</span>
          </div>
          <h1 className="mb-6 text-5xl font-display font-black leading-tight tracking-tight text-slate-900 md:text-6xl">
            {heroTitle.includes('Privacy') ? (
              <>
                Privacy <span className="accent-gradient-text">Policy</span>
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

          <div className="mt-20 rounded-lg bg-slate-800 p-10 text-white">
            <h2 className="mb-4 text-xl font-display font-black uppercase tracking-tight">{ctaTitle}</h2>
            <p className="mb-8 text-sm font-light italic text-slate-300">{ctaDescription}</p>
            <Link
              href={ctaHref}
              className="inline-block rounded-md bg-orange-500 px-10 py-4 text-[10px] font-black uppercase tracking-widest text-white shadow-xl transition-all hover:bg-orange-400"
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
