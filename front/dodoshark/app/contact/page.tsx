import type { Metadata } from 'next'
import Link from 'next/link'

import { getGlobalContact } from '@/app/lib/global-contact'
import ContactInfoCard from '@/components/contact/ContactInfoCard'
import LeadInquiryForm from '@/components/forms/LeadInquiryForm'
import LeadCapturePageLayout from '@/components/lead/LeadCapturePageLayout'

export const metadata: Metadata = {
  title: 'Contact | DoDoShark',
  description: 'Contact DoDoShark for machine recommendations, quotations, and technical support.',
}

export default async function ContactPage() {
  const contact = await getGlobalContact()

  return (
    <LeadCapturePageLayout
      badge="Contact DoDoShark"
      title="Get Product Recommendation or Quotation"
      description="Leave your contact details and city. Our team will respond within 24 hours."
      formTitle="Send Inquiry"
      formColumn="left"
      formBody={
        <>
          <p className="mt-2 text-sm text-slate-600">For video test booking, use the dedicated booking page.</p>
          <LeadInquiryForm
            inquiryType="quote"
            variant="contact"
            className="mt-5 space-y-4"
            submitLabel="Send Contact Request"
            introText="Please share your city and contact details. Our engineer will follow up shortly."
          />
          <Link
            href="/video-demo"
            className="mt-4 inline-flex text-sm font-semibold text-orange-600 underline underline-offset-4"
          >
            Go to Video Demo Booking {'->'}
          </Link>
        </>
      }
      contentBody={
        <>
          <ContactInfoCard contact={contact} />

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 text-sm leading-7 text-slate-600">
            <p className="font-semibold text-slate-900">Support Promise</p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>Response within 24 hours.</li>
              <li>Remote technical support available.</li>
              <li>Factory video test can be arranged across time zones.</li>
            </ul>
          </div>
        </>
      }
      gridClassName="mx-auto mt-10 grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8"
    />
  )
}
