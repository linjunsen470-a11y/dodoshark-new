import {
  BulbOutlineIcon,
  CaseIcon,
  ControlsIcon,
  DocumentIcon,
  DocumentTextIcon,
  PlugIcon,
  TagIcon,
  UserIcon,
  VideoIcon,
  WrenchIcon,
} from '@sanity/icons'

export function pickFirst<T>(...values: Array<T | null | undefined | false>): T | undefined {
  return values.find((value) => Boolean(value)) as T | undefined
}

export function pickText(...values: Array<string | null | undefined>): string | undefined {
  return values.find((value) => typeof value === 'string' && value.trim())?.trim()
}

export function joinPreview(
  parts: Array<string | null | undefined | false>,
  separator = ' | ',
): string {
  return parts.filter(Boolean).join(separator)
}

export function itemCount(value: unknown): number {
  return Array.isArray(value) ? value.length : 0
}

const schemaTypeIconMap = {
  accessory: PlugIcon,
  author: UserIcon,
  caseStudy: CaseIcon,
  contentTag: TagIcon,
  post: DocumentTextIcon,
  product: WrenchIcon,
  productVariant: ControlsIcon,
  solution: BulbOutlineIcon,
  vlogItem: VideoIcon,
} as const

export function iconForSchemaType(schemaType?: string) {
  if (!schemaType) return DocumentIcon
  return schemaTypeIconMap[schemaType as keyof typeof schemaTypeIconMap] || DocumentIcon
}
