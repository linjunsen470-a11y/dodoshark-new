'use client'

import { useEffect, useRef, useState } from 'react'

interface LiteYouTubeProps {
  videoId: string
  title?: string
  posterQuality?: 'default' | 'hqdefault' | 'mqdefault' | 'sddefault' | 'maxresdefault'
  className?: string
}

// 杞婚噺绾?YouTube 宓屽叆缁勪欢 - 浣跨敤 Intersection Observer 瀹炵幇鎳掑姞杞?
// 閬垮厤椤甸潰鍔犺浇鏃跺氨鍔犺浇 YouTube 鐨勫叏閮ㄨ剼鏈紝澶у箙鎻愬崌鎬ц兘
export default function LiteYouTube({
  videoId,
  title = 'YouTube video',
  posterQuality = 'hqdefault',
  className = '',
}: LiteYouTubeProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isIntersecting, setIsIntersecting] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 浣跨敤 Intersection Observer 妫€娴嬭棰戞槸鍚﹁繘鍏ヨ鍙?
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '100px', // 鎻愬墠 100px 寮€濮嬪姞杞?
        threshold: 0,
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // 鐐瑰嚮鍚庡姞杞界湡姝ｇ殑 iframe
  const handleLoad = () => {
    setIsLoaded(true)
  }

  const posterUrl = `https://i.ytimg.com/vi/${videoId}/${posterQuality}.jpg`
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`

  return (
    <div
      ref={containerRef}
      className={`relative aspect-video overflow-hidden rounded-lg bg-slate-900 ${className}`}
    >
      {isLoaded ? (
        <iframe
          src={embedUrl}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          onClick={handleLoad}
          className="group absolute inset-0 flex items-center justify-center"
          aria-label={`Play ${title}`}
        >
          {/* 缂╃暐鍥?*/}
          {isIntersecting && (
            <img
              src={posterUrl}
              alt={title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          )}
          {/* 娓愬彉閬僵 */}
          <div className="absolute inset-0 bg-slate-900/20 transition-colors group-hover:bg-slate-900/10" />
          {/* 鎾斁鎸夐挳 */}
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-red-600 shadow-lg transition-transform group-hover:scale-110 group-active:scale-95">
            <svg
              className="ml-1 h-8 w-8 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>
      )}
    </div>
  )
}
