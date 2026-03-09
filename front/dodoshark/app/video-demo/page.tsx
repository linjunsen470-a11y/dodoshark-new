import type { Metadata } from 'next'

import { getGlobalContact } from '@/app/lib/global-contact'
import LeadInquiryForm from '@/components/forms/LeadInquiryForm'
import ContactInfoCard from '@/components/contact/ContactInfoCard'
import LeadCapturePageLayout from '@/components/lead/LeadCapturePageLayout'
import { client } from '@/app/lib/sanity'
import { VIDEO_DEMO_STEPS } from '@/app/lib/mvp-data'

export const metadata: Metadata = {
  title: 'Book Video Demo | DoDoShark',
  description:
    'Book a remote video test with DoDoShark factory engineers and verify material processing performance before ordering.',
}

type VideoDemoData = {
  whyChooseUsVideoUrl?: string
}

const homeVideoQuery = `coalesce(
  *[_type == "homePage" && _id == "homePage"][0],
  *[_type == "homePage"][0]
){
  whyChooseUsVideoUrl
}`

function toEmbedVideoUrl(rawUrl?: string) {
  if (!rawUrl?.trim()) return null

  try {
    const url = new URL(rawUrl)
    const host = url.hostname.replace('www.', '')

    if (host === 'youtu.be') {
      const id = url.pathname.split('/').filter(Boolean)[0]
      return id ? `https://www.youtube.com/embed/${id}` : null
    }

    if (host === 'youtube.com' || host === 'm.youtube.com') {
      if (url.pathname === '/watch') {
        const id = url.searchParams.get('v')
        return id ? `https://www.youtube.com/embed/${id}` : null
      }

      if (url.pathname.startsWith('/embed/')) return rawUrl
    }

    if (host === 'vimeo.com') {
      const id = url.pathname.split('/').filter(Boolean)[0]
      return id ? `https://player.vimeo.com/video/${id}` : null
    }
  } catch {
    return null
  }

  return null
}

export default async function VideoDemoPage() {
  const [videoData, contact] = await Promise.all([
    client.fetch<VideoDemoData | null>(homeVideoQuery),
    getGlobalContact(),
  ])

  const embedUrl = toEmbedVideoUrl(videoData?.whyChooseUsVideoUrl)

  return (
    <LeadCapturePageLayout
      badge="Main Conversion Page"
      title="Book a Live Video Machine Test"
      description="We are a real factory. You can schedule a remote live test and watch us process your target material in real time."
      formTitle="Submit Your Demo Request"
      formColumn="right"
      formBody={
        <LeadInquiryForm
          inquiryType="video_demo"
          variant="video_demo"
          className="mt-5 space-y-4"
          submitLabel="Book Video Demo"
          introText="We will confirm schedule and timezone within 24 hours, then share test preparation notes."
        />
      }
      contentBody={
        <>
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-900 p-4">
            {embedUrl ? (
              <div className="relative aspect-video overflow-hidden rounded-md">
                <iframe
                  src={embedUrl}
                  title="DoDoShark Factory Video Test"
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="flex aspect-video items-center justify-center rounded-md border border-dashed border-white/25 bg-slate-800 p-6 text-center text-sm text-slate-300">
                Video is not configured yet. Please set `homePage.whyChooseUsVideoUrl` in Sanity.
              </div>
            )}
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">How the Video Demo Works</h2>
            <div className="mt-4 space-y-3">
              {VIDEO_DEMO_STEPS.map((step, index) => (
                <div key={step.title} className="rounded-md bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Step {index + 1}: {step.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{step.note}</p>
                </div>
              ))}
            </div>
          </div>

          <ContactInfoCard contact={contact} title="Quick Contact" variant="compact" />
        </>
      }
      bottomSection={
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">FAQ</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600">
            <p>
              <span className="font-semibold text-slate-900">Q1: Can we test our own material?</span>{' '}
              Yes. Share material details in advance and we will prepare the closest test condition.
            </p>
            <p>
              <span className="font-semibold text-slate-900">Q2: Can dealers join together?</span>{' '}
              Yes. Multiple participants can join one session.
            </p>
            <p>
              <span className="font-semibold text-slate-900">Q3: What do we get after the session?</span>{' '}
              A test summary with observed output and machine recommendation.
            </p>
          </div>
        </div>
      }
      gridClassName="mx-auto mt-10 grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:px-8"
    />
  )
}
