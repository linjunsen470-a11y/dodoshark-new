'use client'

import {useEffect, useRef, useState} from 'react'

const LOAD_TIMEOUT_MS = 12000

type SolutionHtmlTemplateFrameProps = {
  src: string
  templateKey: string
  title?: string
}

export default function SolutionHtmlTemplateFrame({
  src,
  templateKey,
  title,
}: SolutionHtmlTemplateFrameProps) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const timeoutRef = useRef<number | null>(null)
  const [height, setHeight] = useState(640)
  const [attempt, setAttempt] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasTimedOut, setHasTimedOut] = useState(false)

  const frameSrc =
    attempt > 0
      ? `${src}${src.includes('?') ? '&' : '?'}attempt=${attempt}`
      : src

  useEffect(() => {
    setHeight(640)
    setIsLoaded(false)
    setHasTimedOut(false)

    const frame = iframeRef.current
    if (!frame) return

    let resizeObserver: ResizeObserver | null = null
    let animationFrame = 0
    let imageListeners: Array<{image: HTMLImageElement; handler: () => void}> = []

    const clearTimeoutRef = () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }

    const measure = () => {
      const doc = frame.contentDocument
      if (!doc) return

      const nextHeight = Math.max(
        doc.documentElement?.scrollHeight ?? 0,
        doc.body?.scrollHeight ?? 0,
        480,
      )

      setHeight((currentHeight) =>
        currentHeight === nextHeight ? currentHeight : nextHeight,
      )
    }

    const requestMeasure = () => {
      cancelAnimationFrame(animationFrame)
      animationFrame = requestAnimationFrame(measure)
    }

    const attachObservers = () => {
      const doc = frame.contentDocument
      if (!doc) return

      requestMeasure()

      resizeObserver?.disconnect()
      resizeObserver = new ResizeObserver(requestMeasure)

      if (doc.documentElement) {
        resizeObserver.observe(doc.documentElement)
      }

      if (doc.body) {
        resizeObserver.observe(doc.body)
      }

      imageListeners.forEach(({image, handler}) => image.removeEventListener('load', handler))
      imageListeners = Array.from(doc.images).map((image) => {
        const handler = () => requestMeasure()
        image.addEventListener('load', handler)
        return {image, handler}
      })
    }

    const handleLoad = () => {
      clearTimeoutRef()
      setIsLoaded(true)
      setHasTimedOut(false)
      attachObservers()
    }

    frame.addEventListener('load', handleLoad)

    if (frame.contentDocument?.readyState === 'complete') {
      handleLoad()
    }

    window.addEventListener('resize', requestMeasure)
    timeoutRef.current = window.setTimeout(() => {
      setHasTimedOut(true)
    }, LOAD_TIMEOUT_MS)

    return () => {
      frame.removeEventListener('load', handleLoad)
      window.removeEventListener('resize', requestMeasure)
      resizeObserver?.disconnect()
      cancelAnimationFrame(animationFrame)
      clearTimeoutRef()
      imageListeners.forEach(({image, handler}) => image.removeEventListener('load', handler))
    }
  }, [frameSrc, templateKey])

  return (
    <div className="bg-white">
      {(!isLoaded || hasTimedOut) && (
        <div className="border-b border-slate-200 bg-slate-50 px-4 py-10 sm:px-6">
          <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-orange-600">
              Template Viewer
            </p>
            <h2 className="mt-2 text-2xl font-display font-black tracking-tight text-slate-900">
              {hasTimedOut ? 'Template loading is taking longer than expected' : 'Loading template'}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              {hasTimedOut
                ? 'The HTML artifact has not finished loading in the embedded viewer yet. You can retry the request or open the template directly.'
                : 'We are loading the rendered HTML artifact for this solution.'}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {hasTimedOut ? (
                <button
                  type="button"
                  onClick={() => setAttempt((currentAttempt) => currentAttempt + 1)}
                  className="rounded-md bg-orange-500 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-orange-600"
                >
                  Retry Template Load
                </button>
              ) : (
                <div className="rounded-full bg-orange-100 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-orange-700">
                  Loading...
                </div>
              )}
              <a
                href={frameSrc}
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-100"
              >
                Open Template Directly
              </a>
            </div>
          </div>
        </div>
      )}
      <iframe
        key={`${templateKey}:${attempt}`}
        ref={iframeRef}
        title={title || 'Solution template'}
        src={frameSrc}
        sandbox="allow-same-origin"
        scrolling="no"
        className="block w-full border-0 bg-white"
        style={{height, opacity: isLoaded ? 1 : 0}}
      />
    </div>
  )
}
