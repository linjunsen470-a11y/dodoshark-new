'use client'

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'

import { urlFor } from '@/app/lib/sanity'
import Icon from '@/components/ui/Icon'
import { getSharedBackgroundTheme } from './backgroundTheme'
import SectionHeader from './SectionHeader'

type SelectorImage = {
  alt?: string
  asset?: {
    _ref?: string
    _id?: string
    url?: string
    metadata?: {
      dimensions?: {
        width?: number
        height?: number
      }
      lqip?: string
    }
  }
}

type ProductVariantItem = {
  _id?: string
  modelName?: string
  shortDescription?: string
  image?: SelectorImage
}

type MachineItem = {
  _key?: string
  modelLabel?: string
  isFeatured?: boolean
  productVariant?: ProductVariantItem
}

type MachineGroup = {
  _key?: string
  label?: string
  description?: string
  items?: MachineItem[]
}

export type MachineSelectorBlockData = {
  _type: 'machineSelectorBlock'
  _key?: string
  title?: string
  subtitle?: string
  backgroundVariant?: 'default' | 'muted' | 'dark'
  groups?: MachineGroup[]
  defaultGroupIndex?: number
  maxItemsPerRow?: 2 | 3 | 4 | 5
  showModelDescription?: boolean
  footerText?: string
}

function hasImageIdentity(image?: SelectorImage) {
  const ref = image?.asset?._ref?.trim()
  const id = image?.asset?._id?.trim()
  const url = image?.asset?.url?.trim()
  return Boolean(ref || id || url)
}

function resolveImageSrc(image?: SelectorImage) {
  if (!image) return undefined

  const directUrl = image.asset?.url?.trim()
  if (directUrl) return directUrl
  if (!hasImageIdentity(image)) return undefined

  try {
    return urlFor(image).width(1200).fit('max').url()
  } catch {
    return undefined
  }
}

function resolveColumnsClass(columns?: number) {
  if (columns === 2) return 'md:grid-cols-2'
  if (columns === 3) return 'md:grid-cols-2 lg:grid-cols-3'
  if (columns === 5) return 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'
  return 'md:grid-cols-2 lg:grid-cols-4'
}

export default function MachineSelectorBlock({ block }: { block: MachineSelectorBlockData }) {
  const variant = block.backgroundVariant ?? 'muted'
  const theme = getSharedBackgroundTheme(variant)
  const isDark = variant === 'dark'

  const groups = useMemo(
    () => (block.groups ?? []).filter((group) => (group.items ?? []).length > 0 && group.label?.trim()),
    [block.groups],
  )

  const initialIndex = Number.isInteger(block.defaultGroupIndex)
    ? Math.max(0, Math.min(block.defaultGroupIndex as number, Math.max(groups.length - 1, 0)))
    : 0
  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const mobileGroupRefs = useRef<Array<HTMLButtonElement | null>>([])
  const activeGroup = groups[activeIndex]
  const activeItems = (activeGroup?.items ?? []).filter((item) => item.productVariant)

  const tabActiveClass = isDark
    ? 'bg-orange-400 text-slate-900'
    : 'bg-orange-400 text-slate-900'
  const tabInactiveClass = isDark
    ? 'bg-slate-700 text-slate-100 hover:bg-slate-600'
    : 'bg-slate-800 text-white hover:bg-slate-700'
  const footerClass = isDark ? 'text-slate-300' : 'text-slate-700'
  const groupDescriptionClass = isDark ? 'text-slate-300' : theme.body
  const subtitleClass = isDark ? theme.subtitle : theme.body
  const shouldShowModelDescription = block.showModelDescription !== false
  const stickyTabsClass = isDark
    ? 'bg-slate-800/95 border-slate-700'
    : 'bg-white/95 border-slate-200'

  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth >= 768) return
    mobileGroupRefs.current[activeIndex]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    })
  }, [activeIndex])

  if (!block.title && !block.subtitle && groups.length === 0) return null

  return (
    <section className={`py-24 ${theme.section}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(block.title || block.subtitle) && (
          <SectionHeader
            title={block.title}
            subtitle={block.subtitle}
            isDark={isDark}
            className="mb-10"
            titleClassName={`text-3xl md:text-4xl font-display font-black tracking-tight ${theme.heading}`}
            subtitleClassName={`max-w-3xl mx-auto text-base md:text-lg ${subtitleClass}`}
          />
        )}

        {groups.length > 0 && (
          <>
            <div className={`md:hidden sticky top-20 z-40 -mx-4 px-4 py-3 mb-8 border-y backdrop-blur-md ${stickyTabsClass}`}>
              <div className="flex gap-2 overflow-x-auto whitespace-nowrap">
                {groups.map((group, idx) => {
                  const active = idx === activeIndex
                  return (
                    <button
                      key={`mobile-${group._key ?? `${group.label}-${idx}`}`}
                      ref={(node) => {
                        mobileGroupRefs.current[idx] = node
                      }}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      aria-pressed={active}
                      className={`shrink-0 rounded-sm px-4 py-2 text-xs font-black uppercase tracking-wider transition-colors ${active ? tabActiveClass : tabInactiveClass}`}
                    >
                      {group.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="hidden md:flex mb-10 flex-wrap justify-center gap-4">
              {groups.map((group, idx) => {
                const active = idx === activeIndex
                return (
                  <button
                    key={`desktop-${group._key ?? `${group.label}-${idx}`}`}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    aria-pressed={active}
                    className={`min-w-[180px] px-6 py-3 rounded-sm font-black text-base transition-colors ${active ? tabActiveClass : tabInactiveClass}`}
                  >
                    {group.label}
                  </button>
                )
              })}
            </div>
          </>
        )}

        {activeGroup?.description && (
          <p className={`mb-8 text-center text-sm md:text-base ${groupDescriptionClass}`}>
            {activeGroup.description}
          </p>
        )}

        <div className={`grid grid-cols-1 gap-6 ${resolveColumnsClass(block.maxItemsPerRow ?? 4)}`}>
          {activeItems.map((item, idx) => {
            const variantItem = item.productVariant
            const title = item.modelLabel?.trim() || variantItem?.modelName?.trim() || 'Unnamed Model'
            const description = variantItem?.shortDescription?.trim()
            const image = variantItem?.image
            const src = resolveImageSrc(image)

            return (
              <article
                key={item._key ?? `${title}-${idx}`}
                className={`rounded-[0.75rem] p-5 ${item.isFeatured
                  ? 'ring-2 ring-orange-400 bg-white shadow-lg'
                  : 'bg-white border border-slate-200'
                  }`}
              >
                <div className="aspect-[4/3] rounded-sm bg-slate-100 overflow-hidden mb-5 flex items-center justify-center">
                  {src ? (
                    <Image
                      src={src}
                      alt={image?.alt || title}
                      width={image?.asset?.metadata?.dimensions?.width ?? 1000}
                      height={image?.asset?.metadata?.dimensions?.height ?? 750}
                      className="w-full h-full object-contain"
                      placeholder={image?.asset?.metadata?.lqip ? 'blur' : 'empty'}
                      blurDataURL={image?.asset?.metadata?.lqip}
                    />
                  ) : (
                    <Icon icon="image" className="h-8 w-8 text-slate-300" />
                  )}
                </div>
                <h3 className="text-center text-xl md:text-2xl font-display font-black text-slate-900 mb-2">
                  {title}
                </h3>
                {shouldShowModelDescription && description && (
                  <p className="text-center text-sm md:text-base text-slate-600 leading-relaxed">
                    {description}
                  </p>
                )}
              </article>
            )
          })}
        </div>

        {block.footerText && (
          <p className={`mt-12 text-center text-xl font-semibold ${footerClass}`}>{block.footerText}</p>
        )}
      </div>
    </section>
  )
}
