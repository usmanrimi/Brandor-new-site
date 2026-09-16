"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const isActive = (path: string) => pathname === path ? 'active' : ''

  if (pathname && pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <header className="site-header">
      <nav className="site-nav">
        <Link href="/" className="logo-mark">
          <img src="/assets/brandor-logo-full.png" alt="Brandor Logo" style={{ height: '38px', borderRadius: '4px' }} />
        </Link>
        
        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          <Link href="/" className={isActive('/')}>Home</Link>
          <Link href="/about" className={isActive('/about')}>About</Link>
          <Link href="/services" className={isActive('/services')}>Services</Link>
          <Link href="/projects" className={isActive('/projects')}>Projects</Link>
          <Link href="/team" className={isActive('/team')}>Team</Link>
          <Link href="/contact" className="nav-cta">Book a Project</Link>
        </div>

        <button 
          className="menu-toggle" 
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen(!isOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {isOpen ? (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--denim)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--denim)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          )}
        </button>
      </nav>
    </header>
  )
}
