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
          <img src="/assets/brandor-logo-full.png" alt="Brandor Logo" style={{ height: '48px', borderRadius: '4px' }} />
        </Link>
        
        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          <Link href="/" className={isActive('/')}>Home</Link>
          <Link href="/about" className={isActive('/about')}>About</Link>
          <Link href="/services" className={isActive('/services')}>Services</Link>
          <Link href="/projects" className={isActive('/projects')}>Projects</Link>
          <Link href="/testimonials" className={isActive('/testimonials')}>Testimonials</Link>
          <Link href="/team" className={isActive('/team')}>Team</Link>
          <Link href="/contact" className="nav-cta">Book a Project</Link>
        </div>

        <button 
          className="menu-toggle" 
          aria-label="Toggle menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span><span></span><span></span>
        </button>
      </nav>
    </header>
  )
}
