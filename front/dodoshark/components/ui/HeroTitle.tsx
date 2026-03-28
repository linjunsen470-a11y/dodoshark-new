import React from 'react'

interface HeroTitleProps {
  title?: string
  fallback?: React.ReactNode
}

/**
 * HeroTitle Component
 * Logic:
 * 1. If title contains a newline (\n), split it. First line is normal (white/inherit), 
 *    second line is highlighted with 'accent-gradient-text'.
 * 2. If title is single line, split by space. The second half of words (rounded down) 
 *    is highlighted with 'accent-gradient-text'.
 */
const HeroTitle: React.FC<HeroTitleProps> = ({ title, fallback }) => {
  if (!title?.trim()) {
    return <>{fallback}</>
  }

  // Check for explicit newline
  if (title.includes('\n')) {
    const lines = title.split('\n').map(l => l.trim()).filter(Boolean)
    if (lines.length >= 2) {
      return (
        <>
          {lines[0]}
          <br />
          <span className="accent-gradient-text">{lines.slice(1).join(' ')}</span>
        </>
      )
    }
  }

  // Single line logic: split half words
  const words = title.trim().split(/\s+/)
  if (words.length <= 1) {
    // If only one word, maybe it's a long word or CJK. 
    // For single word, we just render it plain unless the user wants part of the word colored (not requested here).
    return <>{title}</>
  }

  const highlightCount = Math.floor(words.length / 2)
  const normalCount = words.length - highlightCount

  const normalPart = words.slice(0, normalCount).join(' ')
  const highlightPart = words.slice(normalCount).join(' ')

  return (
    <>
      {normalPart}{' '}
      <span className="accent-gradient-text">{highlightPart}</span>
    </>
  )
}

export default HeroTitle
