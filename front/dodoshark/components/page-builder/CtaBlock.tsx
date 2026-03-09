import Link from 'next/link'

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
    variant === 'card'
      ? 'py-24 bg-white'
      : variant === 'form'
        ? 'py-24 bg-slate-800'
        : 'py-20 bg-slate-800'

  const wrapperClass =
    variant === 'card'
      ? 'rounded-lg bg-gradient-to-r from-slate-800 to-slate-800 p-10 md:p-14 text-white shadow-2xl'
      : 'rounded-lg border border-white/10 bg-white/[0.06] p-8 md:p-12 text-white'

  return (
    <section className={sectionClass}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={wrapperClass}>
          <div className={variant === 'banner' ? 'md:flex md:items-center md:justify-between gap-6' : ''}>
            <div>
              {block.title && (
                <h2 className="text-3xl md:text-4xl font-display font-black tracking-tight mb-3">
                  {block.title}
                </h2>
              )}
              {block.subtitle && (
                <p className="text-white/75 max-w-3xl leading-relaxed">{block.subtitle}</p>
              )}
              {variant === 'form' && (
                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-orange-300 font-bold">
                  {FormTitle(block.formType)}
                </p>
              )}
            </div>

            {variant !== 'form' && buttons.length > 0 && (
              <div className="mt-6 md:mt-0 flex flex-wrap gap-3">
                {buttons.map((button, idx) => (
                  <CtaButtonLink key={button._key ?? `${button.label}-${idx}`} button={button} />
                ))}
              </div>
            )}
          </div>

          {variant === 'form' && <FormFields formType={block.formType} />}
        </div>
      </div>
    </section>
  )
}
