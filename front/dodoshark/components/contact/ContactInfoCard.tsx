import type { GlobalContact } from '@/lib/global-contact'
import Icon from '@/components/ui/Icon'

type ContactInfoCardProps = {
  contact: GlobalContact
  title?: string
  className?: string
  variant?: 'list' | 'compact'
}

const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61582975393919'

export default function ContactInfoCard({
  contact,
  title = 'Direct Contact',
  className,
  variant = 'list',
}: ContactInfoCardProps) {
  return (
    <div className={className || 'rounded-lg border border-slate-200 bg-white p-6 shadow-sm'}>
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      {variant === 'compact' ? (
        <div className="mt-2 space-y-1 text-sm text-slate-600">
          <p>
            Email:{' '}
            <a href={`mailto:${contact.email}`} className="font-medium text-slate-700 transition hover:text-orange-600">
              {contact.email}
            </a>
          </p>
          <p>WhatsApp: {contact.whatsapp}</p>
          <p>Phone: {contact.phone}</p>
          <p>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-medium text-slate-700 transition hover:text-orange-600"
              aria-label="Visit DoDoShark on Facebook"
            >
              <Icon icon="facebook" className="h-4 w-4" />
              <span>Facebook</span>
            </a>
          </p>
        </div>
      ) : (
        <ul className="mt-4 space-y-2 text-sm text-slate-600">
          <li>
            <span className="font-semibold text-slate-900">Phone:</span> {contact.phone}
          </li>
          <li>
            <span className="font-semibold text-slate-900">Email:</span>{' '}
            <a href={`mailto:${contact.email}`} className="font-medium text-slate-700 transition hover:text-orange-600">
              {contact.email}
            </a>
          </li>
          <li>
            <span className="font-semibold text-slate-900">WhatsApp:</span> {contact.whatsapp}
          </li>
          <li>
            <span className="font-semibold text-slate-900">Facebook:</span>{' '}
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-medium text-slate-700 transition hover:text-orange-600"
              aria-label="Visit DoDoShark on Facebook"
            >
              <Icon icon="facebook" className="h-4 w-4" />
              <span>DoDoShark</span>
            </a>
          </li>
        </ul>
      )}
    </div>
  )
}
