"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as Icons from 'lucide-react'

export default function Footer() {
  const pathname = usePathname()
  
  if (pathname && pathname.startsWith('/admin')) {
    return null
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="site-footer" style={{
      backgroundColor: 'var(--denim)',
      color: 'var(--pure)',
      paddingTop: '80px',
      paddingBottom: '36px',
      borderTop: '1px solid rgba(255, 235, 208, 0.12)'
    }}>
      <div className="wrap" style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 24px' }}>
        {/* Main 4-Column Footer Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '48px',
          paddingBottom: '56px',
          borderBottom: '1px solid rgba(255, 235, 208, 0.12)'
        }}>
          {/* Column 1: Brand & Tagline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Link href="/" style={{ display: 'inline-block' }}>
              <img 
                src="/assets/brandor-logo-full.png" 
                alt="Brandor Logo" 
                style={{ 
                  height: '46px', 
                  width: 'auto',
                  borderRadius: '4px',
                  backgroundColor: '#ffffff',
                  padding: '4px 8px'
                }} 
              />
            </Link>
            <p style={{
              fontFamily: 'var(--display)',
              fontSize: '1.25rem',
              fontWeight: 700,
              color: 'var(--orange)',
              margin: '4px 0 0'
            }}>
              Your Ultimate Branding Door
            </p>
            <p style={{
              fontSize: '0.95rem',
              lineHeight: 1.7,
              opacity: 0.85,
              maxWidth: '320px',
              margin: 0
            }}>
              A creative media and branding agency dedicated to helping NGOs, development partners, and businesses communicate their impact across Africa with clarity and purpose.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h4 style={{
              fontFamily: 'var(--display)',
              fontSize: '1.2rem',
              fontWeight: 700,
              color: '#ffffff',
              margin: 0,
              borderBottom: '2px solid var(--orange)',
              paddingBottom: '8px',
              width: 'fit-content'
            }}>
              Quick Navigation
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.92rem' }}>
              <Link href="/" style={{ opacity: 0.85, transition: 'color 0.2s, opacity 0.2s', textDecoration: 'none' }} onMouseEnter={e => { e.currentTarget.style.color = 'var(--orange)'; e.currentTarget.style.opacity = '1' }} onMouseLeave={e => { e.currentTarget.style.color = 'var(--pure)'; e.currentTarget.style.opacity = '0.85' }}>Home</Link>
              <Link href="/about" style={{ opacity: 0.85, transition: 'color 0.2s, opacity 0.2s', textDecoration: 'none' }} onMouseEnter={e => { e.currentTarget.style.color = 'var(--orange)'; e.currentTarget.style.opacity = '1' }} onMouseLeave={e => { e.currentTarget.style.color = 'var(--pure)'; e.currentTarget.style.opacity = '0.85' }}>About Us</Link>
              <Link href="/services" style={{ opacity: 0.85, transition: 'color 0.2s, opacity 0.2s', textDecoration: 'none' }} onMouseEnter={e => { e.currentTarget.style.color = 'var(--orange)'; e.currentTarget.style.opacity = '1' }} onMouseLeave={e => { e.currentTarget.style.color = 'var(--pure)'; e.currentTarget.style.opacity = '0.85' }}>Services</Link>
              <Link href="/projects" style={{ opacity: 0.85, transition: 'color 0.2s, opacity 0.2s', textDecoration: 'none' }} onMouseEnter={e => { e.currentTarget.style.color = 'var(--orange)'; e.currentTarget.style.opacity = '1' }} onMouseLeave={e => { e.currentTarget.style.color = 'var(--pure)'; e.currentTarget.style.opacity = '0.85' }}>Projects & Portfolio</Link>
              <Link href="/testimonials" style={{ opacity: 0.85, transition: 'color 0.2s, opacity 0.2s', textDecoration: 'none' }} onMouseEnter={e => { e.currentTarget.style.color = 'var(--orange)'; e.currentTarget.style.opacity = '1' }} onMouseLeave={e => { e.currentTarget.style.color = 'var(--pure)'; e.currentTarget.style.opacity = '0.85' }}>Testimonials</Link>
              <Link href="/team" style={{ opacity: 0.85, transition: 'color 0.2s, opacity 0.2s', textDecoration: 'none' }} onMouseEnter={e => { e.currentTarget.style.color = 'var(--orange)'; e.currentTarget.style.opacity = '1' }} onMouseLeave={e => { e.currentTarget.style.color = 'var(--pure)'; e.currentTarget.style.opacity = '0.85' }}>Our Team</Link>
            </div>
          </div>

          {/* Column 3: Services */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h4 style={{
              fontFamily: 'var(--display)',
              fontSize: '1.2rem',
              fontWeight: 700,
              color: '#ffffff',
              margin: 0,
              borderBottom: '2px solid var(--orange)',
              paddingBottom: '8px',
              width: 'fit-content'
            }}>
              What We Do
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.92rem', opacity: 0.85 }}>
              <span>Branding & Identity</span>
              <span>Media Production</span>
              <span>Event & Training Documentation</span>
              <span>Strategic Storytelling</span>
              <span>Marketing & Communications</span>
              <span>Training & Capacity Building</span>
            </div>
          </div>

          {/* Column 4: Contact & Let's Work Together CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <h4 style={{
              fontFamily: 'var(--display)',
              fontSize: '1.2rem',
              fontWeight: 700,
              color: '#ffffff',
              margin: 0,
              borderBottom: '2px solid var(--orange)',
              paddingBottom: '8px',
              width: 'fit-content'
            }}>
              Let's Connect
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.92rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', opacity: 0.9 }}>
                <Icons.MapPin size={18} color="var(--orange)" />
                <span>Kano State, Nigeria</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', opacity: 0.9 }}>
                <Icons.Mail size={18} color="var(--orange)" />
                <a href="mailto:hello@brandor.com" style={{ color: 'inherit', textDecoration: 'none' }}>hello@brandor.com</a>
              </div>
            </div>

            {/* Prominent "Let's Work Together" CTA */}
            <div style={{
              backgroundColor: 'rgba(255, 235, 208, 0.06)',
              borderRadius: '14px',
              padding: '20px',
              border: '1px solid rgba(255, 235, 208, 0.12)',
              marginTop: '4px'
            }}>
              <p style={{
                fontSize: '0.95rem',
                fontWeight: 600,
                marginBottom: '12px',
                color: '#ffffff'
              }}>
                Ready to capture your impact?
              </p>
              <Link
                href="/contact"
                className="btn btn-primary"
                style={{
                  backgroundColor: 'var(--orange)',
                  color: '#ffffff',
                  width: '100%',
                  justifyContent: 'center',
                  padding: '10px 18px',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  borderRadius: '999px',
                  boxShadow: '0 4px 14px rgba(253, 137, 22, 0.3)'
                }}
              >
                Let's Work Together
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Tagline */}
        <div style={{
          paddingTop: '28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '0.88rem',
          opacity: 0.75,
          fontFamily: 'var(--mono)'
        }}>
          <div>
            © {currentYear} Brandor Creative Media Agency. All rights reserved.
          </div>
          <div>
            Your Ultimate Branding Door · Kano State, Nigeria
          </div>
        </div>
      </div>
    </footer>
  )
}
