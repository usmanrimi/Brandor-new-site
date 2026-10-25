"use client"

import { useEffect, useRef, useState } from 'react'

/**
 * Ultra-lightweight custom cursor using direct transform updates.
 *
 * Avoids updating React state on every mousemove event, which previously
 * caused 60-120 React re-renders per second and added substantial main-thread
 * latency (Total Blocking Time).
 */
export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    // Only bind on desktop devices with fine hover capability
    if (typeof window === 'undefined' || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return
    }

    const cursor = cursorRef.current
    if (!cursor) return

    let rafId: number | null = null
    let mouseX = -100
    let mouseY = -100

    const updateTransform = () => {
      if (cursor) {
        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
      }
      rafId = null
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!rafId) {
        rafId = requestAnimationFrame(updateTransform)
      }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseover', handleMouseOver, { passive: true })

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  // Do not render anything on touchscreens
  if (typeof window !== 'undefined' && !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    return null
  }

  return (
    <div 
      ref={cursorRef}
      className={`custom-cursor ${isHovered ? 'hovered' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        willChange: 'transform',
        pointerEvents: 'none'
      }}
      aria-hidden="true"
    />
  )
}
