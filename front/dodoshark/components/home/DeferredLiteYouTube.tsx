'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

const LiteYouTube = dynamic(() => import('@/components/ui/LiteYouTube'), {
  ssr: false,
  loading: () => <div className="aspect-video rounded-lg bg-slate-200" />,
})

type DeferredLiteYouTubeProps = {
  videoId: string
  title?: string
  posterQuality?: 'default' | 'hqdefault' | 'mqdefault' | 'sddefault' | 'maxresdefault'
  className?: string
}

export default function DeferredLiteYouTube(props: DeferredLiteYouTubeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const node = containerRef.current
    if (!node || shouldLoad) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '320px 0px' }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [shouldLoad])

  return (
    <div ref={containerRef}>
      {shouldLoad ? <LiteYouTube {...props} /> : <div className="aspect-video rounded-lg bg-slate-200" aria-hidden="true" />}
    </div>
  )
}
