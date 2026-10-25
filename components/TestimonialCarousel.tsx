"use client"

import React, { useState, useEffect, useRef } from 'react'
import * as Icons from 'lucide-react'

export interface TestimonialItem {
  id: string
  name: string
  role: string
  company: string
  content: string
  imageUrl?: string | null
  featured?: boolean
  isDemo?: boolean
}

interface TestimonialCarouselProps {
  testimonials: TestimonialItem[]
  showDemoPlaceholders?: boolean
}

export default function TestimonialCarousel({
  testimonials,
  showDemoPlaceholders = false
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  // Filter out demo placeholders from public view unless explicitly enabled
  const items = testimonials.filter(t => showDemoPlaceholders || !t.isDemo)

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? items.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex(prev => (prev === items.length - 1 ? 0 : prev + 1))
  }

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      handlePrev()
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      handleNext()
    }
  }

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    const distance = touchStartX.current - touchEndX.current
    const isSwipe = Math.abs(distance) > 50
    if (isSwipe) {
      if (distance > 0) {
        handleNext() // Swiped left -> next
      } else {
        handlePrev() // Swiped right -> prev
      }
    }
    touchStartX.current = null
    touchEndX.current = null
  }

  if (items.length === 0) {
    return (
      <div 
        style={{
          maxWidth: '780px',
          margin: '0 auto',
          padding: '48px 32px',
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          border: '1px solid rgba(23, 59, 97, 0.08)',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(23, 59, 97, 0.05)'
        }}
      >
        <Icons.ShieldCheck size={44} color="var(--orange)" style={{ margin: '0 auto 16px' }} />
        <h3 style={{ color: 'var(--denim)', fontFamily: 'var(--display)', fontSize: '1.45rem', marginBottom: '12px' }}>
          Verified Client Stories
        </h3>
        <p style={{ color: 'var(--ink)', opacity: 0.82, fontSize: '1rem', lineHeight: 1.7, maxWidth: '580px', margin: '0 auto 24px' }}>
          Brandor shares only genuine, verified client feedback from our institutional partners, NGOs, and corporate clients. Verified partner reviews are published once authorized.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/contact" className="btn btn-primary" style={{ backgroundColor: 'var(--orange)', color: '#ffffff', padding: '12px 26px', fontSize: '0.92rem' }}>
            Work With Us
          </a>
          <a href="/projects" className="btn btn-outline" style={{ borderColor: 'var(--denim)', color: 'var(--denim)', padding: '12px 26px', fontSize: '0.92rem' }}>
            View Project Case Studies
          </a>
        </div>
      </div>
    )
  }

  const current = items[currentIndex]

  return (
    <div 
      className="testimonial-carousel-container"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="Client Testimonials Carousel"
      style={{
        maxWidth: '920px',
        margin: '0 auto',
        position: 'relative',
        outline: 'none'
      }}
    >
      {/* Testimonial Card */}
      <div 
        style={{
          backgroundColor: 'var(--denim)',
          color: 'var(--pure)',
          borderRadius: '24px',
          padding: 'clamp(36px, 6vw, 64px)',
          boxShadow: '0 24px 50px rgba(23, 59, 97, 0.16)',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '340px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        {/* Background Decorative Quote Mark */}
        <Icons.Quote 
          size={120} 
          color="var(--orange)" 
          style={{
            position: 'absolute',
            top: '20px',
            right: '24px',
            opacity: 0.08,
            pointerEvents: 'none'
          }} 
        />

        {/* Demo Warning Badge if placeholder */}
        {current.isDemo && (
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#fee2e2',
              color: '#b91c1c',
              padding: '6px 14px',
              borderRadius: '999px',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              marginBottom: '20px',
              width: 'fit-content'
            }}
          >
            <Icons.AlertTriangle size={14} /> Demo testimonial — replace before publication
          </div>
        )}

        {/* Quote Content */}
        <div style={{ position: 'relative', zIndex: 1, marginBottom: '36px' }}>
          <p 
            style={{
              color: 'var(--pure)',
              fontSize: 'clamp(1.15rem, 2.4vw, 1.45rem)',
              lineHeight: 1.7,
              fontStyle: 'italic',
              fontWeight: 400,
              margin: 0
            }}
          >
            "{current.content}"
          </p>
        </div>

        {/* Client Author Info & Controls Row */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
            borderTop: '1px solid rgba(255, 235, 208, 0.12)',
            paddingTop: '24px',
            position: 'relative',
            zIndex: 1
          }}
        >
          {/* Author */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {current.imageUrl ? (
              <img 
                src={current.imageUrl} 
                alt={current.name} 
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid var(--orange)'
                }} 
              />
            ) : (
              <div 
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--orange)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1.4rem',
                  fontFamily: 'var(--display)'
                }}
              >
                {current.name.charAt(0)}
              </div>
            )}
            <div>
              <h4 
                style={{
                  color: 'var(--pure)',
                  fontSize: '1.25rem',
                  margin: '0 0 4px',
                  fontFamily: 'var(--display)',
                  fontWeight: 700
                }}
              >
                {current.name}
              </h4>
              <p 
                style={{
                  color: 'var(--greyblue)',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  margin: 0
                }}
              >
                {current.role}{current.company ? `, ${current.company}` : ''}
              </p>
            </div>
          </div>

          {/* Navigation Controls */}
          {items.length > 1 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous testimonial"
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 235, 208, 0.1)',
                  border: '1px solid rgba(255, 235, 208, 0.2)',
                  color: 'var(--pure)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = 'var(--orange)'
                  e.currentTarget.style.color = '#ffffff'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 235, 208, 0.1)'
                  e.currentTarget.style.color = 'var(--pure)'
                }}
              >
                <Icons.ChevronLeft size={22} />
              </button>

              <span 
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '0.82rem',
                  color: 'var(--pure)',
                  opacity: 0.75,
                  padding: '0 6px'
                }}
              >
                {currentIndex + 1} / {items.length}
              </span>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next testimonial"
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 235, 208, 0.1)',
                  border: '1px solid rgba(255, 235, 208, 0.2)',
                  color: 'var(--pure)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = 'var(--orange)'
                  e.currentTarget.style.color = '#ffffff'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 235, 208, 0.1)'
                  e.currentTarget.style.color = 'var(--pure)'
                }}
              >
                <Icons.ChevronRight size={22} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Dot Indicators */}
      {items.length > 1 && (
        <div 
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '20px'
          }}
        >
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              style={{
                width: currentIndex === i ? '28px' : '10px',
                height: '10px',
                borderRadius: '5px',
                backgroundColor: currentIndex === i ? 'var(--orange)' : 'rgba(23, 59, 97, 0.2)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.25s ease'
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
