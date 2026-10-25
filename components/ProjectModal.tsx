"use client"

import React, { useEffect, useRef, useState } from 'react'
import * as Icons from 'lucide-react'
import { parseImages, mediaSrc, getYouTubeId } from '@/lib/media'
import VideoEmbed from './VideoEmbed'

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

  const gallery = project ? parseImages(project.images) : []

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

    // Escape key listener & focus trap
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
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

  const hasYouTube = !!getYouTubeId(project.videoUrl)

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
        backgroundColor: 'rgba(14, 40, 64, 0.8)',
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
          maxWidth: '860px',
          maxHeight: '90vh',
          borderRadius: '20px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(23, 59, 97, 0.4)',
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
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid rgba(23, 59, 97, 0.15)',
              color: 'var(--denim)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
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
          {/* Main Visual or Video */}
          <div style={{
            width: '100%',
            height: '380px',
            backgroundColor: '#0e2840',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <img 
              src={mediaSrc(activeImage || gallery[0], 1200)} 
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
              letterSpacing: '0.06em',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}>
              {project.category}
            </div>
          </div>

          {/* Gallery Thumbnails (if multiple images) */}
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
                  type="button"
                  onClick={() => setActiveImage(img)}
                  aria-label={`View photo ${idx + 1}`}
                  style={{
                    width: '68px',
                    height: '68px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    border: activeImage === img ? '2px solid var(--orange)' : '1px solid #cbd5e1',
                    cursor: 'pointer',
                    padding: 0,
                    flexShrink: 0,
                    transition: 'transform 0.2s ease'
                  }}
                >
                  <img src={mediaSrc(img, 160)} alt={`Thumbnail ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}

          {/* Body Content */}
          <div style={{ padding: '28px 32px 12px 32px' }}>
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

            {/* In-Modal Video Embed (if videoUrl is present) */}
            {project.videoUrl && (
              <div style={{ marginBottom: '32px' }}>
                <h4 style={{
                  fontSize: '1.15rem',
                  fontFamily: 'var(--display)',
                  color: 'var(--denim)',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Icons.Film size={20} color="var(--orange)" /> Project Video Documentation
                </h4>
                <VideoEmbed 
                  url={project.videoUrl}
                  title={`${project.title} — Video Documentation`}
                  aspectRatio="16/9"
                  customThumbnail={gallery[0]}
                />
              </div>
            )}

            {/* Action Row */}
            <div style={{
              display: 'flex',
              gap: '14px',
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
                    gap: '8px',
                    padding: '12px 24px',
                    backgroundColor: 'var(--orange)',
                    color: '#ffffff',
                    fontWeight: 700,
                    borderRadius: '999px',
                    textDecoration: 'none'
                  }}
                >
                  <Icons.PlayCircle size={18} />
                  Watch Video on YouTube
                </a>
              )}

              {project.pdfUrl && project.isPdfPublished && (
                <>
                  <a
                    href={project.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 24px',
                      borderColor: 'var(--denim)',
                      color: 'var(--denim)',
                      fontWeight: 700,
                      borderRadius: '999px',
                      textDecoration: 'none'
                    }}
                  >
                    <Icons.FileText size={18} />
                    View Report (PDF)
                  </a>

                  <a
                    href={`${project.pdfUrl}?download=1`}
                    download
                    className="btn btn-outline"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 22px',
                      borderColor: 'rgba(23, 59, 97, 0.3)',
                      color: 'var(--denim)',
                      fontWeight: 600,
                      borderRadius: '999px',
                      textDecoration: 'none'
                    }}
                  >
                    <Icons.Download size={16} />
                    Download PDF
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
