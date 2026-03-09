import type { Metadata } from 'next'
import Link from 'next/link'

const LAST_UPDATED = 'March 4, 2026'

const PRIVACY_SECTIONS = [
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
] as const

export const metadata: Metadata = {
  title: 'Privacy Policy | DoDoShark',
  description: 'How DoDoShark collects, uses, and protects business and website data.',
  alternates: { canonical: '/privacy' },
}

export default function PrivacyPage() {
  return (
    <main className="bg-[#fcfdfd] text-slate-900">
      <section className="border-b border-slate-100 bg-slate-50 pb-20 pt-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-3 rounded-md border border-orange-500/20 bg-orange-500/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">
            <span>Last updated {LAST_UPDATED}</span>
          </div>
          <h1 className="mb-6 text-5xl font-display font-black leading-tight tracking-tight text-slate-900 md:text-6xl">
            Privacy <span className="accent-gradient-text">Policy</span>
          </h1>
          <p className="text-lg font-light text-slate-500">
            How we protect your data across industrial sales, technical support, and website operations.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {PRIVACY_SECTIONS.map((section) => (
            <section key={section.title} className="mb-12">
              <h2 className="mb-5 text-2xl font-display font-black uppercase tracking-wide text-slate-900">
                {section.title}
              </h2>
              <div className="space-y-4">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="leading-8 text-slate-600">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}

          <div className="mt-20 rounded-lg bg-slate-800 p-10 text-white">
            <h2 className="mb-4 text-xl font-display font-black uppercase tracking-tight">Need Data Compliance Support?</h2>
            <p className="mb-8 text-sm font-light italic text-slate-300">
              For NDA workflows, procurement compliance, or customer data handling requests, our team will respond within
              2 business days.
            </p>
            <Link
              href="/contact"
              className="inline-block rounded-md bg-orange-500 px-10 py-4 text-[10px] font-black uppercase tracking-widest text-white shadow-xl transition-all hover:bg-orange-400"
            >
              Contact Privacy Team
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
