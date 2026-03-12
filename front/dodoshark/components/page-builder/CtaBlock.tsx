import Link from 'next/link'

import SectionShell from './SectionShell'
import SectionHeader from './SectionHeader'
import { sectionSubtitleClass } from './sectionStyles'

type CtaButton = {
  _key?: string
  label?: string
  href?: string
}

export type CtaBlockData = {
  _type: 'ctaBlock'
  _key?: string
  title?: string
  subtitle?: string
  variant?: 'banner' | 'card' | 'form'
  formType?: 'newsletter' | 'contact' | 'demo'
  buttons?: CtaButton[]
}

function isExternalHref(href: string) {
  return /^(https?:|mailto:|tel:)/i.test(href)
}

function CtaButtonLink({ button }: { button: CtaButton }) {
  const label = button.label?.trim()
  const href = button.href?.trim()

  if (!label || !href) return null

  const className =
    'px-7 py-3 rounded-md font-bold bg-white text-slate-900 hover:bg-slate-100 transition-all'

  if (isExternalHref(href)) {
    return (
      <a
        href={href}
        className={className}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noreferrer' : undefined}
      >
        {label}
      </a>
    )
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  )
}

function FormTitle(formType?: CtaBlockData['formType']) {
  if (formType === 'contact') return 'Contact Our Engineer'
  if (formType === 'demo') return 'Book a Demo'
  return 'Get Product Brief'
}

function FormFields({ formType }: { formType?: CtaBlockData['formType'] }) {
  const isContact = formType === 'contact'
  const isDemo = formType === 'demo'

  return (
    <form className="grid sm:grid-cols-2 gap-4 mt-8">
      <input
        type="text"
        placeholder="Your Name"
        className="px-4 py-3 rounded-md border border-white/20 bg-white/10 text-white placeholder:text-white/60"
      />
      <input
        type="email"
        placeholder="Business Email"
        className="px-4 py-3 rounded-md border border-white/20 bg-white/10 text-white placeholder:text-white/60"
      />

      {(isContact || isDemo) && (
        <input
          type="text"
          placeholder="Company Name"
          className="px-4 py-3 rounded-md border border-white/20 bg-white/10 text-white placeholder:text-white/60"
        />
      )}

      {isDemo && (
        <input
          type="text"
          placeholder="Preferred Date"
          className="px-4 py-3 rounded-md border border-white/20 bg-white/10 text-white placeholder:text-white/60"
        />
      )}

      <textarea
        placeholder={isContact ? 'Your Requirements' : 'Message (Optional)'}
        rows={isContact ? 4 : 3}
        className="sm:col-span-2 px-4 py-3 rounded-md border border-white/20 bg-white/10 text-white placeholder:text-white/60"
      />

      <button
        type="button"
        className="sm:col-span-2 px-6 py-3 rounded-md bg-white text-slate-900 font-black hover:bg-slate-100 transition-all"
      >
        Submit Inquiry
      </button>
    </form>
  )
}

export default function CtaBlock({ block }: { block: CtaBlockData }) {
  const variant = block.variant ?? 'banner'
  const buttons = (block.buttons ?? []).filter((item) => item.label && item.href)

  if (!block.title && !block.subtitle && buttons.length === 0 && variant !== 'form') {
    return null
  }

  const sectionClass =
    variant === 'card' ? 'bg-white' : 'bg-slate-800'

  const wrapperClass =
    variant === 'card'
      ? 'rounded-lg bg-gradient-to-r from-slate-800 to-slate-800 p-10 md:p-14 text-white shadow-2xl'
      : 'rounded-lg border border-white/10 bg-white/[0.06] p-8 md:p-12 text-white'

  return (
    <SectionShell spacing="compact" sectionClassName={sectionClass}>
      <div className={wrapperClass}>
        <div className={variant === 'banner' ? 'gap-6 md:flex md:items-center md:justify-between' : ''}>
          <div>
            {(block.title || block.subtitle) && (
              <SectionHeader
                title={block.title}
                subtitle={block.subtitle}
                tone="dark"
                align="left"
                showDivider={variant !== 'banner'}
                className={variant === 'banner' ? '' : 'max-w-3xl'}
                subtitleClassName={`max-w-3xl ${sectionSubtitleClass} text-white/75`}
              />
            )}
            {variant === 'form' && (
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-orange-300">
                {FormTitle(block.formType)}
              </p>
            )}
          </div>

          {variant !== 'form' && buttons.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3 md:mt-0">
              {buttons.map((button, idx) => (
                <CtaButtonLink key={button._key ?? `${button.label}-${idx}`} button={button} />
              ))}
            </div>
          )}
        </div>

        {variant === 'form' && <FormFields formType={block.formType} />}
      </div>
    </SectionShell>
  )
}
