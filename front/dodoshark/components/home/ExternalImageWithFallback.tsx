'use client'

import Image from 'next/image'
import { useState } from 'react'

type ExternalImageWithFallbackProps = {
  src?: string
  alt: string
  sizes: string
  className?: string
  imageClassName?: string
  fallbackClassName?: string
  priority?: boolean
  isLcp?: boolean
}

export default function ExternalImageWithFallback({
  src,
  alt,
  sizes,
  className = 'relative overflow-hidden',
  imageClassName = 'object-cover',
  fallbackClassName = 'bg-[linear-gradient(135deg,#e2e8f0_0%,#cbd5e1_45%,#f8fafc_100%)]',
  priority = false,
  isLcp = false,
}: ExternalImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false)
  const shouldPrioritize = priority || isLcp

  return (
    <div className={className}>
      <div className={`absolute inset-0 ${fallbackClassName}`} />
      {src && !hasError && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          preload={shouldPrioritize}
          fetchPriority={shouldPrioritize ? 'high' : 'auto'}
          loading={shouldPrioritize ? 'eager' : undefined}
          className={imageClassName}
          onError={() => setHasError(true)}
        />
      )}
    </div>
  )
}
