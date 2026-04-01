'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

import type { InquiryType } from '@/lib/mvp-data'

const LeadInquiryForm = dynamic(() => import('@/components/forms/LeadInquiryForm'), {
  ssr: false,
  loading: () => (
    <div className="space-y-4">
      <div className="h-5 w-2/3 rounded bg-slate-100" />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="h-12 rounded-md bg-slate-100" />
        <div className="h-12 rounded-md bg-slate-100" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="h-12 rounded-md bg-slate-100" />
        <div className="h-12 rounded-md bg-slate-100" />
      </div>
      <div className="h-11 rounded-md bg-slate-200" />
    </div>
  ),
})

type DeferredLeadInquiryFormProps = {
  inquiryType: InquiryType
  variant?: 'contact' | 'video_demo' | 'mini'
  submitLabel?: string
  introText?: string
  className?: string
  showMessageField?: boolean
}

export default function DeferredLeadInquiryForm(props: DeferredLeadInquiryFormProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const node = containerRef.current
    if (!node || shouldLoad) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '320px 0px' }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [shouldLoad])

  return (
    <div ref={containerRef}>
      {shouldLoad ? (
        <LeadInquiryForm {...props} />
      ) : (
        <div className="space-y-4" aria-hidden="true">
          <div className="h-5 w-2/3 rounded bg-slate-100" />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="h-12 rounded-md bg-slate-100" />
            <div className="h-12 rounded-md bg-slate-100" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="h-12 rounded-md bg-slate-100" />
            <div className="h-12 rounded-md bg-slate-100" />
          </div>
          <div className="h-28 rounded-md bg-slate-100" />
          <div className="h-11 rounded-md bg-slate-200" />
        </div>
      )}
    </div>
  )
}
