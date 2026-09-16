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
    <div className="services-row-container" style={{ width: '100%', maxWidth: '1080px', margin: '0 auto' }}>
      {services.map((service, index) => {
        const IconComponent = getServiceIcon(service.title)
        const isHovered = hoveredId === service.id
        const orderNumber = String(index + 1).padStart(2, '0')

        return (
          <div
            key={service.id}
            tabIndex={0}
            onMouseEnter={() => setHoveredId(service.id)}
            onMouseLeave={() => setHoveredId(null)}
            onFocus={() => setHoveredId(service.id)}
            onBlur={() => setHoveredId(null)}
            className="service-row-item"
            style={{
              padding: '32px 24px',
              borderBottom: '1px solid rgba(255, 235, 208, 0.12)',
              display: 'grid',
              gridTemplateColumns: '80px 1fr auto',
              gap: '28px',
              alignItems: 'center',
              backgroundColor: isHovered ? 'rgba(255, 235, 208, 0.04)' : 'transparent',
              borderRadius: '12px',
              transition: 'background-color 0.25s ease, transform 0.25s ease, padding 0.25s ease',
              outline: 'none',
              cursor: 'default'
            }}
          >
            {/* Service Number & Icon */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <span style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.85rem',
                color: isHovered ? 'var(--orange)' : 'rgba(255, 235, 208, 0.5)',
                fontWeight: 700,
                letterSpacing: '0.08em',
                transition: 'color 0.25s ease'
              }}>
                {orderNumber}
              </span>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: isHovered ? 'var(--orange)' : 'rgba(255, 235, 208, 0.08)',
                color: isHovered ? '#ffffff' : 'var(--orange)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.25s ease'
              }}>
                <IconComponent size={20} />
              </div>
            </div>

            {/* Title & Description */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h3 style={{
                margin: 0,
                fontFamily: 'var(--display)',
                fontSize: 'clamp(1.3rem, 2.8vw, 1.75rem)',
                fontWeight: 700,
                color: isHovered ? 'var(--orange)' : 'var(--pure)',
                transition: 'color 0.25s ease',
                lineHeight: 1.25
              }}>
                {service.title}
              </h3>
              <p style={{
                margin: 0,
                color: 'var(--pure)',
                opacity: isHovered ? 0.95 : 0.8,
                fontSize: '1rem',
                lineHeight: 1.6,
                maxWidth: '780px',
                transition: 'opacity 0.25s ease'
              }}>
                {service.description}
              </p>
            </div>

            {/* Animated Micro-Arrow Indicator */}
            <div style={{
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isHovered ? 'var(--orange)' : 'rgba(255, 235, 208, 0.3)',
              transform: isHovered ? 'translate(4px, -4px)' : 'none',
              transition: 'transform 0.25s ease, color 0.25s ease'
            }}>
              <Icons.ArrowUpRight size={24} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
