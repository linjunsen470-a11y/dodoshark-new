import { getGlobalSettings } from '@/app/lib/global-settings'
import { cleanText } from '@/app/lib/sanity-utils'

export type GlobalContact = {
  email: string
  supportEmail: string
  whatsapp: string
  phone: string
  websiteLabel: string
  websiteUrl: string
}

const FALLBACK_CONTACT: GlobalContact = {
  email: 'service@dodoshark.com',
  supportEmail: 'support@dodoshark.com',
  whatsapp: '+86 13662385371',
  phone: '+86 13662385371',
  websiteLabel: 'www.dodoshark.com',
  websiteUrl: 'https://www.dodoshark.com',
}

function getNormalizedValue(rawValue: string | undefined, fallback: string) {
  const normalized = cleanText(rawValue)
  return normalized || fallback
}

export async function getGlobalContact(): Promise<GlobalContact> {
  const global = await getGlobalSettings()
  return {
    email: getNormalizedValue(global?.contact?.email, FALLBACK_CONTACT.email),
    supportEmail: getNormalizedValue(global?.contact?.supportEmail, FALLBACK_CONTACT.supportEmail),
    whatsapp: getNormalizedValue(global?.contact?.whatsapp, FALLBACK_CONTACT.whatsapp),
    phone: getNormalizedValue(global?.contact?.phone, FALLBACK_CONTACT.phone),
    websiteLabel: getNormalizedValue(global?.contact?.websiteLabel, FALLBACK_CONTACT.websiteLabel),
    websiteUrl: getNormalizedValue(global?.contact?.websiteUrl, FALLBACK_CONTACT.websiteUrl),
  }
}
