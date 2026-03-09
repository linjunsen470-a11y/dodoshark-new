import { client } from '@/app/lib/sanity'

type GlobalContactData = {
  contact?: {
    email?: string
    whatsapp?: string
    phone?: string
  }
}

export type GlobalContact = {
  email: string
  whatsapp: string
  phone: string
}

const GLOBAL_CONTACT_QUERY = `*[_type == "globalSettings"][0]{
  contact{email, whatsapp, phone}
}`

const FALLBACK_CONTACT: GlobalContact = {
  email: 'service@dodoshark.com',
  whatsapp: '+86 13662385371',
  phone: '+86 13662385371',
}

const FIXED_BUSINESS_EMAIL = 'service@dodoshark.com'

function getNormalizedValue(rawValue: string | undefined, fallback: string) {
  const normalized = rawValue?.trim()
  return normalized || fallback
}

export async function getGlobalContact(): Promise<GlobalContact> {
  const global = await client.fetch<GlobalContactData | null>(GLOBAL_CONTACT_QUERY)
  return {
    email: FIXED_BUSINESS_EMAIL,
    whatsapp: getNormalizedValue(global?.contact?.whatsapp, FALLBACK_CONTACT.whatsapp),
    phone: getNormalizedValue(global?.contact?.phone, FALLBACK_CONTACT.phone),
  }
}
