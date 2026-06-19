export const dynamic = "force-dynamic";
import Link from 'next/link'
import { ArrowLeft, Quote } from 'lucide-react'

const fallbackTestimonials = [
  { id: '1', name: 'Aisha Bello', role: 'CEO', company: 'TechNova', content: 'Brandor completely transformed our visual identity.', imageUrl: null }
]

export default async function Testimonials() {
  const testimonials = fallbackTestimonials
  
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
            <span className="eyebrow" style={{ color: 'var(--orange)' }}>Client Stories</span>
            <h1 className="gsap-split" style={{ color: '#fff', fontSize: '3rem', marginBottom: '24px' }}>Words from our partners.</h1>
            <p style={{ color: '#cbd5e1', fontSize: '1.1rem' }}>See what NGOs, development agencies, and corporate organizations have to say about working with Brandor.</p>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: '#f8fafc' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
            {testimonials.map((testimonial, i) => (
              <div key={testimonial.id} className={`reveal stagger-${(i % 4) + 1}`} style={{ background: '#fff', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', position: 'relative' }}>
                <Quote size={48} color="var(--orange)" style={{ opacity: 0.2, position: 'absolute', top: '32px', right: '32px' }} />
                <p style={{ color: '#334155', fontSize: '1.1rem', lineHeight: '1.7', fontStyle: 'italic', marginBottom: '32px', position: 'relative', zIndex: 1 }}>
                  "{testimonial.content}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  {testimonial.imageUrl ? (
                    <img src={testimonial.imageUrl} alt={testimonial.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--denim)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>
                      {testimonial.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h4 style={{ color: 'var(--denim)', fontSize: '1.1rem', marginBottom: '2px' }}>{testimonial.name}</h4>
                    <p style={{ color: '#64748b', fontSize: '0.85rem' }}>{testimonial.role}, {testimonial.company}</p>
                  </div>
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
