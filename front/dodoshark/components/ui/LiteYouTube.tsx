'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface LiteYouTubeProps {
  videoId: string
  title?: string
  posterQuality?: 'default' | 'hqdefault' | 'mqdefault' | 'sddefault' | 'maxresdefault'
  className?: string
}

// 轻量级 YouTube 嵌入组件 - 使用 Intersection Observer 实现懒加载
// 避免页面加载时就加载 YouTube 的全部脚本，大幅提升性能
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
    // 使用 Intersection Observer 检测视频是否进入视口
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '100px', // 提前 100px 开始加载
        threshold: 0,
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // 点击后加载真正的 iframe
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
          {/* 缩略图 */}
          {isIntersecting && (
            <Image
              src={posterUrl}
              alt={title}
              fill
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          )}
          {/* 渐变遮罩 */}
          <div className="absolute inset-0 bg-slate-900/20 transition-colors group-hover:bg-slate-900/10" />
          {/* 播放按钮 */}
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
