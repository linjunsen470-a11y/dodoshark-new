import Link from 'next/link'

const viewDetailsLinkClass =
  'group inline-flex items-center gap-1 text-center text-sm font-semibold text-[#14b8a6] underline decoration-current underline-offset-4 transition-colors duration-200 hover:text-[#0d9488] focus-visible:outline-none focus-visible:text-[#0d9488]'

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  )
}

export default function ViewDetailsLink({
  href,
  label = 'View Details',
}: {
  href: string
  label?: string
}) {
  return (
    <Link href={href} className={viewDetailsLinkClass}>
      {label}
      <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5" />
    </Link>
  )
}
