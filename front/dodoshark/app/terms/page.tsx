import type { Metadata } from 'next'
import Link from 'next/link'

const LAST_UPDATED = 'March 4, 2026'

const TERMS_SECTIONS = [
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
] as const

export const metadata: Metadata = {
  title: 'Terms of Service | DoDoShark',
  description: 'Terms and conditions for using DoDoShark industrial equipment and website services.',
  alternates: { canonical: '/terms' },
}

export default function TermsPage() {
  return (
    <main className="bg-[#fcfdfd] text-slate-900">
      <section className="border-b border-slate-100 bg-slate-50 pb-20 pt-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-3 rounded-md border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">
            <span>Last updated {LAST_UPDATED}</span>
          </div>
          <h1 className="mb-6 text-5xl font-display font-black leading-tight tracking-tight text-slate-900 md:text-6xl">
            Terms of <span className="accent-gradient-text">Service</span>
          </h1>
          <p className="text-lg font-light text-slate-500">
            Legal terms for accessing and using DoDoShark products, website, and related services.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {TERMS_SECTIONS.map((section) => (
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

          <div className="premium-card mt-20 border-orange-500/30 bg-white p-10 shadow-2xl">
            <h2 className="mb-4 text-xl font-display font-black uppercase tracking-tight text-slate-900">
              Need Contract Clarification?
            </h2>
            <p className="mb-8 text-sm font-light leading-relaxed text-slate-500">
              Our engineering and compliance teams can align legal terms with your procurement process and local project
              requirements.
            </p>
            <Link
              href="/contact"
              className="inline-block rounded-md bg-slate-800 px-10 py-4 text-[10px] font-black uppercase tracking-widest text-white transition-all hover:bg-orange-500"
            >
              Contact DoDoShark
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
