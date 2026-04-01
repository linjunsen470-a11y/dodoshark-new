import {stegaClean} from 'next-sanity'

import type { SanityImage } from '@/lib/types/sanity'

import { urlFor } from '@/lib/sanity'

export type QueryParamValue = string | string[] | undefined

type ToImageSrcOptions = {
  height?: number
  fit?: 'crop' | 'max'
}

export function firstParam(value: QueryParamValue) {
  if (Array.isArray(value)) return value[0]
  return value
}

export function cleanText(value?: string | null) {
  if (typeof value !== 'string') return undefined
  if (value.trim() === '') return undefined

  try {
    const cleaned = stegaClean(value)?.trim()
    return cleaned || undefined
  } catch {
    const trimmed = value.trim()
    return trimmed || undefined
  }
}

export function hasStegaMetadata(value?: string | null) {
  if (typeof value !== 'string' || value === '') return false

  try {
    return stegaClean(value) !== value
  } catch {
    return true
  }
}

export function renderText(value?: string | null) {
  if (typeof value !== 'string') return undefined
  if (value.trim() === '') return undefined
  return value
}

export function renderSentenceCase(value?: string | null) {
  const rendered = renderText(value)
  if (!rendered) return ''
  if (hasStegaMetadata(rendered)) return rendered

  const normalized = rendered.trim().replace(/\s+/g, ' ').toLowerCase()
  if (!normalized) return ''

  return normalized.charAt(0).toUpperCase() + normalized.slice(1)
}

export function cleanSlug(value?: string | { current?: string } | null) {
  if (typeof value === 'string') return cleanText(value)
  return cleanText(value?.current)
}

export function hasText(value?: string | null) {
  return Boolean(cleanText(value))
}

export function hasRenderableText(value?: string | null) {
  return Boolean(renderText(value))
}

export function toImageSrc(image?: SanityImage, width = 1200, options?: ToImageSrcOptions) {
  if (!image) return undefined

  const directUrl = image.asset?.url?.trim()
  if (directUrl) return directUrl

  const hasIdentity = Boolean(image.asset?._id || image.asset?._ref)
  if (!hasIdentity) return undefined

  try {
    let imageBuilder = urlFor(image).width(width)
    if (options?.height) {
      imageBuilder = imageBuilder.height(options.height)
    }
    return imageBuilder.fit(options?.fit ?? 'max').url()
  } catch {
    return undefined
  }
}
