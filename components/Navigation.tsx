"use client"

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as Icons from 'lucide-react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const drawerRef = useRef<HTMLDivElement>(null)
  const toggleBtnRef = useRef<HTMLButtonElement>(null)

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Manage background scroll lock and Escape key when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsOpen(false)
          toggleBtnRef.current?.focus()
        }
      }

      window.addEventListener('keydown', handleKeyDown)

      return () => {
        document.body.style.overflow = originalOverflow
        window.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [isOpen])

  if (pathname && pathname.startsWith('/admin')) {
    return null
  }

  const isActive = (path: string) => (pathname === path ? 'active' : '')

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/projects', label: 'Projects' },
    { href: '/testimonials', label: 'Testimonials' },
    { href: '/team', label: 'Team' },
  ]

  return (
    <>
      <header className="site-header" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: 'rgba(255, 235, 208, 0.94)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(23, 59, 97, 0.08)',
        transition: 'all 0.3s ease'
      }}>
        <nav className="site-nav" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '1180px',
          margin: '0 auto',
          padding: '14px 28px',
          minHeight: '74px'
        }}>
          {/* Logo with proper proportions */}
          <Link href="/" className="logo-mark" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img 
              src="/assets/brandor-logo-full.png" 
              alt="Brandor Logo" 
              style={{ height: '42px', width: 'auto', objectFit: 'contain' }} 
            />
          </Link>
          
          {/* Desktop Navigation Links */}
          <div className="desktop-nav-links" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '28px'
          }}>
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={isActive(link.href)}
                style={{
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: isActive(link.href) ? 'var(--orange)' : 'var(--denim)',
                  position: 'relative',
                  padding: '6px 2px',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}
              >
                {link.label}
              </Link>
            ))}

            {/* Book a Project CTA Button */}
            <Link
              href="/contact"
              className="nav-book-btn"
              style={{
                backgroundColor: 'var(--orange)',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '999px',
                fontWeight: 700,
                fontSize: '0.92rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(253, 137, 22, 0.28)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                whiteSpace: 'nowrap'
              }}
            >
              Book a Project
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            ref={toggleBtnRef}
            className="mobile-menu-toggle" 
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-nav-drawer"
            onClick={() => setIsOpen(!isOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              width: '44px',
              height: '44px',
              borderRadius: '8px',
              color: 'var(--denim)'
            }}
          >
            {isOpen ? <Icons.X size={28} /> : <Icons.Menu size={28} />}
          </button>
        </nav>
      </header>

      {/* Mobile Drawer (placed outside header to eliminate backdrop-filter trapping) */}
      <div 
        id="mobile-nav-drawer"
        ref={drawerRef}
        className={`mobile-nav-overlay ${isOpen ? 'open' : ''}`}
        aria-hidden={!isOpen}
        style={{
          position: 'fixed',
          inset: 0,
          top: '74px',
          zIndex: 999,
          backgroundColor: 'rgba(14, 40, 64, 0.5)',
          backdropFilter: 'blur(6px)',
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? 'visible' : 'hidden',
          transition: 'opacity 0.25s ease, visibility 0.25s ease',
          display: 'none'
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) setIsOpen(false)
        }}
      >
        <div style={{
          backgroundColor: '#FFEBD0',
          borderBottom: '2px solid rgba(23, 59, 97, 0.1)',
          padding: '28px 24px 36px',
          boxShadow: '0 20px 40px rgba(23, 59, 97, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          transform: isOpen ? 'translateY(0)' : 'translateY(-20px)',
          transition: 'transform 0.25s ease'
        }}>
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              style={{
                fontSize: '1.2rem',
                fontWeight: 700,
                color: isActive(link.href) ? 'var(--orange)' : 'var(--denim)',
                textDecoration: 'none',
                padding: '10px 8px',
                borderBottom: '1px solid rgba(23, 59, 97, 0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <span>{link.label}</span>
              {isActive(link.href) && (
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--orange)' }}></span>
              )}
            </Link>
          ))}

          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            style={{
              backgroundColor: 'var(--orange)',
              color: '#ffffff',
              padding: '14px 20px',
              borderRadius: '999px',
              fontWeight: 700,
              fontSize: '1.05rem',
              textAlign: 'center',
              textDecoration: 'none',
              marginTop: '12px',
              boxShadow: '0 4px 16px rgba(253, 137, 22, 0.35)'
            }}
          >
            Book a Project
          </Link>
        </div>
      </div>
    </>
  )
}
