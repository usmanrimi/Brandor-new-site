"use client"

import React, { useState, useRef } from 'react'
import * as Icons from 'lucide-react'
import ProjectModal, { ProjectData } from './ProjectModal'
import { parseImages, mediaSrc } from '@/lib/media'

interface ProjectListProps {
  projects: ProjectData[]
}

export default function ProjectList({ projects }: ProjectListProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null)
  const triggerRef = useRef<{ [key: string]: HTMLElement | null }>({})

  const handleOpenModal = (project: ProjectData) => {
    setSelectedProject(project)
  }

  const handleCloseModal = () => {
    const closedId = selectedProject?.id
    setSelectedProject(null)
    if (closedId && triggerRef.current[closedId]) {
      triggerRef.current[closedId]?.focus()
    }
  }

  return (
    <>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '32px',
        width: '100%'
      }}>
        {projects.map((project) => {
          const gallery = parseImages(project.images)
          const coverImage = gallery[0] || '/assets/why-image.jpg'
          const thumbSrc = mediaSrc(coverImage, 640)

          return (
            <div 
              key={project.id}
              className="project-card"
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(23, 59, 97, 0.06)',
                border: '1px solid rgba(23, 59, 97, 0.06)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
            >
              {/* Cover Image Clickable */}
              <div 
                tabIndex={0}
                role="button"
                aria-label={`View details for ${project.title}`}
                ref={el => { triggerRef.current[project.id] = el }}
                onClick={() => handleOpenModal(project)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleOpenModal(project)
                  }
                }}
                style={{
                  width: '100%',
                  height: '240px',
                  backgroundColor: '#e2e8f0',
                  position: 'relative',
                  cursor: 'pointer',
                  overflow: 'hidden'
                }}
              >
                <img 
                  src={thumbSrc} 
                  alt={project.title} 
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                  className="project-cover-img"
                />
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  backgroundColor: 'var(--orange)',
                  color: '#ffffff',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.18)'
                }}>
                  {project.category}
                </div>

                {project.videoUrl && (
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    backgroundColor: 'rgba(23, 59, 97, 0.85)',
                    color: '#ffffff',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <Icons.PlayCircle size={14} color="var(--orange)" /> Video
                  </div>
                )}

                <div 
                  className="project-hover-overlay"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(23, 59, 97, 0.45)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transition: 'opacity 0.25s ease'
                  }}
                >
                  <span style={{
                    backgroundColor: '#ffffff',
                    color: 'var(--denim)',
                    padding: '8px 18px',
                    borderRadius: '999px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.15)'
                  }}>
                    <Icons.Maximize2 size={14} /> View Details
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                {/* Meta info */}
                <div style={{
                  fontSize: '0.85rem',
                  color: '#64748b',
                  marginBottom: '10px',
                  display: 'flex',
                  gap: '8px',
                  fontWeight: 600,
                  flexWrap: 'wrap',
                  alignItems: 'center'
                }}>
                  <span>{project.client}</span>
                  {project.date && (
                    <>
                      <span style={{ color: 'var(--orange)' }}>•</span>
                      <span>{project.date}</span>
                    </>
                  )}
                  {project.location && (
                    <>
                      <span style={{ color: 'var(--orange)' }}>•</span>
                      <span>{project.location}</span>
                    </>
                  )}
                </div>

                {/* Title */}
                <h3 
                  onClick={() => handleOpenModal(project)}
                  style={{
                    fontSize: '1.35rem',
                    color: 'var(--denim)',
                    marginBottom: '12px',
                    fontFamily: 'var(--display)',
                    fontWeight: 700,
                    lineHeight: 1.3,
                    cursor: 'pointer'
                  }}
                >
                  {project.title}
                </h3>

                {/* Shortened preview description */}
                <p style={{
                  color: 'var(--ink)',
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  opacity: 0.82,
                  marginBottom: '20px',
                  flexGrow: 1
                }}>
                  {project.description?.length > 130 
                    ? `${project.description.substring(0, 130)}...` 
                    : project.description}
                </p>

                {/* Card Action Controls: Independent buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: 'auto' }}>
                  <button
                    type="button"
                    onClick={() => handleOpenModal(project)}
                    className="btn btn-outline"
                    style={{
                      width: '100%',
                      padding: '10px 16px',
                      fontSize: '0.88rem',
                      justifyContent: 'center',
                      borderColor: 'rgba(23, 59, 97, 0.2)',
                      color: 'var(--denim)'
                    }}
                  >
                    <Icons.Eye size={15} /> View Details
                  </button>

                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {project.videoUrl && (
                      <a
                        href={project.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="btn btn-primary"
                        style={{
                          flex: 1,
                          padding: '9px 12px',
                          fontSize: '0.82rem',
                          justifyContent: 'center',
                          backgroundColor: 'var(--orange)',
                          color: '#ffffff',
                          borderRadius: '999px',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        <Icons.PlayCircle size={15} /> Watch Video
                      </a>
                    )}

                    {project.pdfUrl && project.isPdfPublished && (
                      <a
                        href={project.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="btn btn-outline"
                        style={{
                          flex: 1,
                          padding: '9px 12px',
                          fontSize: '0.82rem',
                          justifyContent: 'center',
                          borderColor: 'var(--denim)',
                          color: 'var(--denim)',
                          borderRadius: '999px',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        <Icons.ExternalLink size={15} /> View Report
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Project Modal */}
      <ProjectModal project={selectedProject} onClose={handleCloseModal} />
    </>
  )
}
