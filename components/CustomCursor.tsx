"use client"

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Check if device supports hover (desktop)
    if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
      const updatePosition = (e: MouseEvent) => {
        setPosition({ x: e.clientX, y: e.clientY })
      }

      const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement
        if (target.tagName.toLowerCase() === 'a' || 
            target.tagName.toLowerCase() === 'button' ||
            target.closest('a') || 
            target.closest('button')) {
          setIsHovered(true)
        } else {
          setIsHovered(false)
        }
      }

      window.addEventListener('mousemove', updatePosition)
      window.addEventListener('mouseover', handleMouseOver)

      return () => {
        window.removeEventListener('mousemove', updatePosition)
        window.removeEventListener('mouseover', handleMouseOver)
      }
    }
  }, [pathname]) // Re-bind when pathname changes to catch new elements

  // Only render on devices that support hover
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null
  }

  return (
    <div 
      className={`custom-cursor ${isHovered ? 'hovered' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
    />
  )
}
