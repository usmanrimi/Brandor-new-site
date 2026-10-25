"use client"

import React, { useState } from 'react'
import * as Icons from 'lucide-react'
import { getYouTubeId } from '@/lib/media'

interface VideoEmbedProps {
  url: string
  title?: string
  aspectRatio?: '16/9' | '4/3' | '1/1'
  customThumbnail?: string | null
  className?: string
  priority?: boolean
}

/**
 * High-performance, lazy-loaded, click-to-load YouTube video embed.
 *
 * Why this is critical for performance:
 * Standard <iframe> embeds from YouTube download ~1.2MB of JavaScript, CSS,
 * and tracking scripts immediately on page load, blocking the main thread.
 * This component renders a lightweight WebP/HQ thumbnail with an accessible
 * play button overlay. The real YouTube player iframe is only mounted into
 * the DOM when the user explicitly clicks Play.
 */
export default function VideoEmbed({
  url,
  title = "Brandor Video Showcase",
  aspectRatio = '16/9',
  customThumbnail,
  className = '',
  priority = false
}: VideoEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoId = getYouTubeId(url)

  if (!videoId) {
    // If not a parseable YouTube URL, render a graceful external link
    return (
      <div 
        style={{
          aspectRatio,
          backgroundColor: '#0e2840',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          color: '#FFEBD0',
          textAlign: 'center'
        }}
        className={className}
      >
        <Icons.VideoOff size={40} style={{ opacity: 0.6, marginBottom: '12px' }} />
        <p style={{ margin: '0 0 16px', fontSize: '0.95rem' }}>{title}</p>
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn btn-primary"
          style={{ backgroundColor: 'var(--orange)', color: '#ffffff', fontSize: '0.88rem', padding: '10px 20px' }}
        >
          <Icons.ExternalLink size={16} /> Open External Video
        </a>
      </div>
    )
  }

  // Use YouTube maxresdefault thumbnail with hqdefault fallback, or custom image
  const defaultThumb = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
  const thumbnailSrc = customThumbnail || defaultThumb

  return (
    <div 
      className={`video-embed-wrapper ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio,
        borderRadius: '16px',
        overflow: 'hidden',
        backgroundColor: '#0e2840',
        boxShadow: '0 20px 40px rgba(23, 59, 97, 0.16)',
        border: '1px solid rgba(255, 235, 208, 0.1)'
      }}
    >
      {isPlaying ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            border: 0
          }}
        />
      ) : (
        <div 
          role="button"
          tabIndex={0}
          aria-label={`Play video: ${title}`}
          onClick={() => setIsPlaying(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              setIsPlaying(true)
            }
          }}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            cursor: 'pointer',
            overflow: 'hidden'
          }}
        >
          {/* Thumbnail */}
          <img 
            src={thumbnailSrc} 
            alt={title}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.4s ease'
            }}
            className="video-thumb-img"
          />

          {/* Dark Brand Overlay */}
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(23, 59, 97, 0.25) 0%, rgba(14, 40, 64, 0.72) 100%)',
              transition: 'background 0.3s ease'
            }}
          />

          {/* Centered Play Button */}
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px'
            }}
          >
            <div 
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                backgroundColor: 'var(--orange)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: '4px',
                boxShadow: '0 8px 30px rgba(253, 137, 22, 0.55)',
                transition: 'transform 0.25s ease, background-color 0.25s ease'
              }}
              className="play-pulse-btn"
            >
              <Icons.Play size={32} fill="#ffffff" stroke="none" />
            </div>

            <span 
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.8rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#FFEBD0',
                fontWeight: 700,
                textShadow: '0 2px 8px rgba(0,0,0,0.6)'
              }}
            >
              Click to Watch Video
            </span>
          </div>

          {/* Video Title Banner */}
          <div 
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '20px',
              right: '20px',
              color: '#ffffff',
              fontSize: '0.95rem',
              fontWeight: 600,
              textShadow: '0 2px 10px rgba(0,0,0,0.8)'
            }}
          >
            {title}
          </div>
        </div>
      )}
    </div>
  )
}
