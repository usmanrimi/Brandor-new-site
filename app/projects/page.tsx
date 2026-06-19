export const dynamic = "force-dynamic";
import Link from 'next/link'
import { ArrowLeft, ExternalLink } from 'lucide-react'

// Hardcoded fallback data to ensure the site always loads
const fallbackProjects = [
  { id: '1', title: 'Brandor Corporate Identity', client: 'Brandor', category: 'Branding', date: '2023', location: 'Nigeria', description: 'Complete brand overhaul.', images: '/api/placeholder/400/300' }
]

export default async function Projects() {
  const projects = fallbackProjects
  
  return (
    <>
      <header>
        <nav>
          <a href="/" className="logo-mark">
            <img src="/assets/brandor-logo-full.png" alt="Brandor Logo" style={{ height: '48px', borderRadius: '4px' }} />
          </a>
          <div className="nav-links">
            <a href="/">Home</a>
            <a href="/#about">About</a>
            <a href="/#services">Services</a>
            <a href="/projects">Projects</a>
            <a href="/testimonials">Testimonials</a>
            <a href="/#team">Team</a>
            <a href="/#contact" className="nav-cta">Book a Project</a>
          </div>
        </nav>
      </header>

      <section style={{ paddingTop: '160px', paddingBottom: '80px', background: 'var(--blue)' }}>
        <div className="wrap">
          <div className="section-head reveal" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <span className="eyebrow" style={{ color: 'var(--orange)' }}>Our Portfolio</span>
            <h1 className="gsap-split" style={{ color: '#fff', fontSize: '3rem', marginBottom: '24px' }}>Captured impact.</h1>
            <p style={{ color: '#cbd5e1', fontSize: '1.1rem' }}>Explore our recent event documentation, branding projects, and strategic storytelling across Africa.</p>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: '#f8fafc' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '40px' }}>
            {projects.map((project, i) => (
              <div key={project.id} className={`reveal stagger-${(i % 4) + 1}`} style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                <div style={{ width: '100%', height: '240px', background: '#e2e8f0', position: 'relative' }}>
                  <img src={project.images} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'var(--orange)', color: 'var(--denim)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
                    {project.category}
                  </div>
                </div>
                <div style={{ padding: '24px' }}>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                    <span>{project.client}</span>
                    <span>{project.date}</span>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--denim)', marginBottom: '12px' }}>{project.title}</h3>
                  <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6' }}>{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer style={{ marginTop: '0' }}>
        <div className="wrap">
          <div className="footer-grid">
            <a href="/" className="logo-mark">
              <img src="/assets/brandor-logo-full.png" alt="Brandor Logo" style={{ height: '48px', borderRadius: '4px' }} />
            </a>
            <div className="footer-links">
              <a href="/">Home</a>
              <a href="/#about">About</a>
              <a href="/#services">Services</a>
              <a href="/projects">Projects</a>
              <a href="/testimonials">Testimonials</a>
              <a href="/#team">Team</a>
              <a href="/#contact">Contact</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Brandor Your Ultimate Branding Door</span>
            <span>Kano State, Nigeria</span>
          </div>
        </div>
      </footer>
    </>
  )
}
