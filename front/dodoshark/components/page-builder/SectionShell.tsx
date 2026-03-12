import type { ElementType, ReactNode } from 'react'

import {
  defaultSectionContainerClass,
  proseSectionContainerClass,
  sectionSpacingClassMap,
  type SectionSpacing,
} from './sectionStyles'

type SectionShellProps = {
  as?: ElementType
  id?: string
  spacing?: SectionSpacing
  container?: 'default' | 'prose'
  sectionClassName?: string
  containerClassName?: string
  children: ReactNode
}

export default function SectionShell({
  as: Component = 'section',
  id,
  spacing = 'default',
  container = 'default',
  sectionClassName = '',
  containerClassName = '',
  children,
}: SectionShellProps) {
  const containerBaseClass =
    container === 'prose' ? proseSectionContainerClass : defaultSectionContainerClass

  return (
    <Component
      id={id}
      className={`${sectionSpacingClassMap[spacing]} ${sectionClassName}`.trim()}
    >
      <div className={`${containerBaseClass} ${containerClassName}`.trim()}>{children}</div>
    </Component>
  )
}
