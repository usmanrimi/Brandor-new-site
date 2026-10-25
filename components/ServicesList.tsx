"use client"

import React, { useState } from 'react'
import * as Icons from 'lucide-react'

export interface ServiceItem {
  id: string
  title: string
  description: string
  order?: number
}

interface ServicesListProps {
  services: ServiceItem[]
}

export default function ServicesList({ services }: ServicesListProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const getServiceIcon = (title: string) => {
    const t = title.toLowerCase()
    if (t.includes('branding') || t.includes('identity')) return Icons.Sparkles
    if (t.includes('media') || t.includes('photography') || t.includes('video')) return Icons.Camera
    if (t.includes('event') || t.includes('documentation')) return Icons.FileText
    if (t.includes('storytelling') || t.includes('narrative')) return Icons.Feather
    if (t.includes('marketing') || t.includes('communication')) return Icons.Megaphone
    if (t.includes('training') || t.includes('capacity')) return Icons.GraduationCap
    if (t.includes('community') || t.includes('engagement') || t.includes('development')) return Icons.HeartHandshake
    return Icons.Layers
  }

  return (
    <div 
      className="services-cards-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '28px',
        width: '100%',
        maxWidth: '1180px',
        margin: '0 auto'
      }}
    >
      {services.map((service, index) => {
        const IconComponent = getServiceIcon(service.title)
        const isHovered = hoveredId === service.id
        const orderNumber = String(index + 1).padStart(2, '0')

        return (
          <div
            key={service.id}
            id={`service-${service.id}`}
            tabIndex={0}
            onMouseEnter={() => setHoveredId(service.id)}
            onMouseLeave={() => setHoveredId(null)}
            onFocus={() => setHoveredId(service.id)}
            onBlur={() => setHoveredId(null)}
            className="service-card-block"
            style={{
              backgroundColor: isHovered ? 'rgba(23, 59, 97, 0.55)' : 'rgba(255, 255, 255, 0.05)',
              border: isHovered ? '1px solid rgba(253, 137, 22, 0.45)' : '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '20px',
              padding: '36px 30px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
              transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
              boxShadow: isHovered ? '0 18px 40px rgba(0, 0, 0, 0.28)' : '0 4px 20px rgba(0, 0, 0, 0.1)',
              outline: 'none',
              position: 'relative'
            }}
          >
            {/* Top Row: Index number & Brand Icon */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '24px'
              }}>
                <span style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  color: 'var(--orange)'
                }}>
                  {orderNumber}
                </span>

                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  backgroundColor: isHovered ? 'var(--orange)' : 'rgba(253, 137, 22, 0.12)',
                  color: isHovered ? '#ffffff' : 'var(--orange)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  boxShadow: isHovered ? '0 6px 18px rgba(253, 137, 22, 0.35)' : 'none'
                }}>
                  <IconComponent size={22} />
                </div>
              </div>

              {/* Title & Description */}
              <h3 style={{
                fontFamily: 'var(--display)',
                fontSize: '1.45rem',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '14px',
                lineHeight: 1.25
              }}>
                {service.title}
              </h3>

              <p style={{
                color: '#ffffff',
                opacity: 0.88,
                fontSize: '1rem',
                lineHeight: 1.7,
                margin: '0 0 28px'
              }}>
                {service.description}
              </p>
            </div>

            {/* Meaningful CTAs */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              paddingTop: '20px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              flexWrap: 'wrap'
            }}>
              <a 
                href={`/services#service-${service.id}`}
                style={{
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  color: '#ffffff',
                  opacity: 0.85,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease, opacity 0.2s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--orange)'; e.currentTarget.style.opacity = '1' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.opacity = '0.85' }}
              >
                Explore Service
              </a>

              <a 
                href={`/contact?service=${encodeURIComponent(service.title)}`}
                style={{
                  backgroundColor: 'var(--orange)',
                  color: '#ffffff',
                  padding: '9px 18px',
                  borderRadius: '999px',
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  textDecoration: 'none',
                  transition: 'background-color 0.2s ease, transform 0.2s ease',
                  boxShadow: '0 4px 12px rgba(253, 137, 22, 0.3)'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <span>Discuss Your Project</span>
                <Icons.ArrowRight size={14} />
              </a>
            </div>
          </div>
        )
      })}
    </div>
  )
}
