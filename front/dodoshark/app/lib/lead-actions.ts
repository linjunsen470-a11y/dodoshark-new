'use server'

import { Resend } from 'resend'

import type { InquiryType } from '@/app/lib/mvp-data'

export type LeadInquiry = {
  inquiryType: InquiryType
  name: string
  city?: string
  company?: string
  email: string
  whatsapp?: string
  material?: string
  targetFineness?: string
  preferredTime?: string
  message?: string
}

export type LeadActionResult = {
  success: boolean
  message: string
}

function cleanValue(value: FormDataEntryValue | null) {
  if (typeof value !== 'string') return ''
  return value.trim()
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function getInquirySubject(type: InquiryType) {
  return type === 'video_demo' ? '[Video Demo Booking]' : '[Quote Request]'
}

function getSuccessMessage(type: InquiryType) {
  if (type === 'video_demo') {
    return 'Thank you. We will confirm your video demo time within 24 hours.'
  }

  return 'Thank you. Our team will contact you within 24 hours.'
}

type RequiredLeadField = 'name' | 'email' | 'city' | 'material' | 'preferredTime'

const REQUIRED_FIELDS_BY_INQUIRY_TYPE: Record<InquiryType, RequiredLeadField[]> = {
  quote: ['name', 'email', 'city'],
  video_demo: ['name', 'email', 'material', 'preferredTime'],
}

function hasValue(value?: string) {
  return Boolean(value?.trim())
}

function getFieldLabel(field: RequiredLeadField) {
  if (field === 'name') return 'Name'
  if (field === 'email') return 'Email'
  if (field === 'city') return 'City'
  if (field === 'material') return 'Material'
  return 'Preferred Time'
}

function formatList(values: string[]) {
  if (values.length <= 1) return values[0] || ''
  if (values.length === 2) return `${values[0]} and ${values[1]}`
  return `${values.slice(0, -1).join(', ')}, and ${values[values.length - 1]}`
}

export async function submitLeadInquiry(formData: FormData): Promise<LeadActionResult> {
  const apiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.LEAD_TO_EMAIL || 'service@dodoshark.com'
  const fromEmail = process.env.LEAD_FROM_EMAIL || 'DoDoShark Leads <onboarding@resend.dev>'

  if (!apiKey) {
    return {
      success: false,
      message:
        'Form service is not configured yet. Please email us directly at your business contact address.',
    }
  }

  const inquiryTypeValue = cleanValue(formData.get('inquiryType'))
  const inquiryType: InquiryType = inquiryTypeValue === 'video_demo' ? 'video_demo' : 'quote'

  const payload: LeadInquiry = {
    inquiryType,
    name: cleanValue(formData.get('name')),
    city: cleanValue(formData.get('city')),
    company: cleanValue(formData.get('company')),
    email: cleanValue(formData.get('email')),
    whatsapp: cleanValue(formData.get('whatsapp')),
    material: cleanValue(formData.get('material')),
    targetFineness: cleanValue(formData.get('targetFineness')),
    preferredTime: cleanValue(formData.get('preferredTime')),
    message: cleanValue(formData.get('message')),
  }

  const missingFields = REQUIRED_FIELDS_BY_INQUIRY_TYPE[inquiryType].filter((field) => {
    if (field === 'name') return !hasValue(payload.name)
    if (field === 'email') return !hasValue(payload.email)
    if (field === 'city') return !hasValue(payload.city)
    if (field === 'material') return !hasValue(payload.material)
    return !hasValue(payload.preferredTime)
  })

  if (missingFields.length > 0) {
    return {
      success: false,
      message: `Please fill in ${formatList(missingFields.map(getFieldLabel))}.`,
    }
  }

  try {
    const resend = new Resend(apiKey)
    const subject = `${getInquirySubject(inquiryType)} ${payload.name} | ${payload.company || 'No Company'}`

    const fields: Array<[string, string]> =
      inquiryType === 'video_demo'
        ? [
            ['Inquiry Type', 'Video Demo Booking'],
            ['Name', payload.name],
            ['Company', payload.company || 'Not provided'],
            ['Email', payload.email],
            ['Phone / WhatsApp', payload.whatsapp || 'Not provided'],
            ['Material', payload.material || 'Not provided'],
            ['Target Fineness', payload.targetFineness || 'Not provided'],
            ['Preferred Time', payload.preferredTime || 'Not provided'],
            ['Message', payload.message || 'Not provided'],
          ]
        : [
            ['Inquiry Type', 'Quote Request'],
            ['Name', payload.name],
            ['Email', payload.email],
            ['City', payload.city || 'Not provided'],
            ['Phone / WhatsApp', payload.whatsapp || 'Not provided'],
            ['Message', payload.message || 'Not provided'],
          ]

    const rowsHtml = fields
      .map(
        ([label, value], index) =>
          `<tr><td style="padding:10px;font-weight:600;background:${index % 2 ? '#ffffff' : '#f8fafc'};width:36%;">${escapeHtml(label)}</td><td style="padding:10px;background:${index % 2 ? '#ffffff' : '#f8fafc'};">${escapeHtml(value)}</td></tr>`,
      )
      .join('')

    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject,
      replyTo: payload.email,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:680px;margin:0 auto;color:#1e293b;">
          <h2 style="margin:0 0 12px 0;color:#0f172a;">DoDoShark New Lead</h2>
          <p style="margin:0 0 16px 0;color:#475569;">A new lead has been submitted from the website.</p>
          <table style="width:100%;border-collapse:collapse;border:1px solid #e2e8f0;">${rowsHtml}</table>
        </div>
      `,
    })

    return { success: true, message: getSuccessMessage(inquiryType) }
  } catch (error) {
    console.error('Failed to send lead email:', error)
    return {
      success: false,
      message: 'Submission failed. Please try again or contact us by email/WhatsApp directly.',
    }
  }
}
