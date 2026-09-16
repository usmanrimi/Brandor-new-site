"use client"

import React, { useEffect, useRef, useState } from 'react'
import * as Icons from 'lucide-react'

export interface ProjectData {
  id: string
  title: string
  client: string
  category: string
  date: string
  location: string
  description: string
  images: string
  videoUrl?: string | null
  pdfUrl?: string | null
  isPdfPublished?: boolean
}

interface ProjectModalProps {
  project: ProjectData | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const [activeImage, setActiveImage] = useState<string>('')

  // Parse images: can be a JSON array string, comma-separated, or single URL
  const getImages = (imagesStr?: string): string[] => {
    if (!imagesStr) return ['/assets/why-image.jpg']
    try {
      if (imagesStr.startsWith('[')) {
        const parsed = JSON.parse(imagesStr)
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
      }
    } catch {
      // Fall through
    }
    if (imagesStr.includes(',')) {
      return imagesStr.split(',').map(s => s.trim()).filter(Boolean)
    }
    return [imagesStr]
  }

  const gallery = project ? getImages(project.images) : []

  useEffect(() => {
    if (gallery.length > 0) {
      setActiveImage(gallery[0])
    }
  }, [project])

  useEffect(() => {
    if (!project) return

    // Background scroll lock
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Focus close button on open
    setTimeout(() => {
      closeButtonRef.current?.focus()
    }, 50)

    // Escape key listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
      // Simple focus trap
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (focusableElements.length > 0) {
          const firstElement = focusableElements[0]
          const lastElement = focusableElements[focusableElements.length - 1]

          if (e.shiftKey && document.activeElement === firstElement) {
            lastElement.focus()
            e.preventDefault()
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            firstElement.focus()
            e.preventDefault()
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [project, onClose])

  if (!project) return null

  return (
    <div 
      className="project-modal-backdrop" 
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(14, 40, 64, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.2s ease-out'
      }}
    >
      <div 
        ref={modalRef}
        className="project-modal-card"
        style={{
          backgroundColor: '#ffffff',
          width: '100%',
          maxWidth: '840px',
          maxHeight: '90vh',
          borderRadius: '20px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(23, 59, 97, 0.35)',
          position: 'relative'
        }}
      >
        {/* Modal Header Bar with Close */}
        <div style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          zIndex: 10
        }}>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close project details"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid rgba(23, 59, 97, 0.1)',
              color: 'var(--denim)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s ease, background 0.2s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Icons.X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div style={{ overflowY: 'auto', flexGrow: 1, padding: '0 0 32px 0' }}>
          {/* Main Visual */}
          <div style={{
            width: '100%',
            height: '380px',
            backgroundColor: '#0e2840',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <img 
              src={activeImage || gallery[0] || '/assets/why-image.jpg'} 
              alt={project.title} 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: '16px',
              left: '24px',
              backgroundColor: 'var(--orange)',
              color: '#ffffff',
              padding: '6px 14px',
              borderRadius: '24px',
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em'
            }}>
              {project.category}
            </div>
          </div>

          {/* Gallery Thumbnails (if multiple) */}
          {gallery.length > 1 && (
            <div style={{
              display: 'flex',
              gap: '12px',
              padding: '16px 32px 0',
              overflowX: 'auto'
            }}>
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: activeImage === img ? '2px solid var(--orange)' : '1px solid #e2e8f0',
                    cursor: 'pointer',
                    padding: 0,
                    flexShrink: 0
                  }}
                >
                  <img src={img} alt={`Gallery ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}

          {/* Body Content */}
          <div style={{ padding: '32px 32px 12px 32px' }}>
            {/* Meta Tags */}
            <div style={{
              display: 'flex',
              gap: '16px',
              fontSize: '0.9rem',
              color: '#64748b',
              fontWeight: 600,
              marginBottom: '16px',
              flexWrap: 'wrap',
              alignItems: 'center'
            }}>
              {project.client && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Icons.Briefcase size={16} color="var(--orange)" />
                  {project.client}
                </span>
              )}
              {project.date && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Icons.Calendar size={16} color="var(--orange)" />
                  {project.date}
                </span>
              )}
              {project.location && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Icons.MapPin size={16} color="var(--orange)" />
                  {project.location}
                </span>
              )}
            </div>

            {/* Project Title */}
            <h2 id="modal-project-title" style={{
              fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
              color: 'var(--denim)',
              fontFamily: 'var(--display)',
              lineHeight: 1.25,
              marginBottom: '20px',
              fontWeight: 800
            }}>
              {project.title}
            </h2>

            {/* Full Description */}
            <div style={{
              color: 'var(--ink)',
              fontSize: '1.05rem',
              lineHeight: 1.8,
              opacity: 0.9,
              marginBottom: '32px',
              whiteSpace: 'pre-line'
            }}>
              {project.description}
            </div>

            {/* Action Row */}
            <div style={{
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap',
              paddingTop: '20px',
              borderTop: '1px solid rgba(23, 59, 97, 0.08)'
            }}>
              {project.videoUrl && (
                <a
                  href={project.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px 26px',
                    backgroundColor: 'var(--orange)',
                    color: '#ffffff',
                    fontWeight: 700,
                    borderRadius: '999px',
                    textDecoration: 'none'
                  }}
                >
                  <Icons.PlayCircle size={18} />
                  Watch Video
                </a>
              )}

              {project.pdfUrl && project.isPdfPublished && (
                <a
                  href={project.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px 26px',
                    borderColor: 'var(--denim)',
                    color: 'var(--denim)',
                    fontWeight: 700,
                    borderRadius: '999px',
                    textDecoration: 'none'
                  }}
                >
                  <Icons.ExternalLink size={18} />
                  View Report
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
