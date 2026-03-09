import type { ReactNode } from 'react'

type LeadCapturePageLayoutProps = {
  badge: string
  title: string
  description: string
  formTitle: string
  formBody: ReactNode
  contentBody: ReactNode
  formColumn: 'left' | 'right'
  bottomSection?: ReactNode
  gridClassName?: string
}

export default function LeadCapturePageLayout({
  badge,
  title,
  description,
  formTitle,
  formBody,
  contentBody,
  formColumn,
  bottomSection,
  gridClassName,
}: LeadCapturePageLayoutProps) {
  const sectionClassName =
    gridClassName ||
    'mx-auto mt-10 grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8'

  const formPanel = (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">{formTitle}</h2>
      {formBody}
    </div>
  )

  const contentPanel = <div className="space-y-6">{contentBody}</div>

  return (
    <main className="bg-[#fcfdfd] py-16 text-slate-900 sm:py-20">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-600">{badge}</p>
        <h1 className="mt-3 text-4xl font-bold sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">{description}</p>
      </section>

      <section className={sectionClassName}>
        {formColumn === 'left' ? (
          <>
            {formPanel}
            {contentPanel}
          </>
        ) : (
          <>
            {contentPanel}
            {formPanel}
          </>
        )}
      </section>

      {bottomSection ? (
        <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">{bottomSection}</section>
      ) : null}
    </main>
  )
}
