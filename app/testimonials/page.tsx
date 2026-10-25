export const dynamic = "force-dynamic";

import { prisma } from '@/lib/prisma'
import TestimonialCarousel from '@/components/TestimonialCarousel'

export default async function Testimonials() {
  let testimonials: any[] = []

  try {
    testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' } })
  } catch (error) {
    testimonials = []
  }

  // Filter verified testimonials (or mark unverified placeholders if any)
  const formattedTestimonials = testimonials.map(t => ({
    id: t.id,
    name: t.name,
    role: t.role,
    company: t.company,
    content: t.content,
    imageUrl: t.imageUrl,
    featured: t.featured,
    // Demo quotes must be explicitly labeled
    isDemo: t.content?.toLowerCase().includes('demo') || t.name?.toLowerCase().includes('demo')
  }))
  
  return (
    <div style={{ paddingTop: '100px' }}>
      {/* ===================== HERO SECTION ===================== */}
      <section style={{ 
        paddingTop: '60px', 
        paddingBottom: '60px', 
        background: 'var(--pure)',
        borderBottom: '1px solid rgba(23, 59, 97, 0.06)'
      }}>
        <div className="wrap" style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.85rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--orange)',
              fontWeight: 700,
              marginBottom: '12px'
            }}>
              Client Stories
            </p>
            <h1 style={{ 
              color: 'var(--denim)', 
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', 
              fontFamily: 'var(--display)',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: '20px'
            }}>
              Words from our partners.
            </h1>
            <p style={{ 
              color: 'var(--ink)', 
              fontSize: '1.15rem',
              lineHeight: 1.7,
              opacity: 0.85,
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Genuine feedback from NGOs, development agencies, and corporate institutions partnering with Brandor to capture impact.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== CAROUSEL SECTION ===================== */}
      <section style={{ padding: '80px 0 120px', background: 'var(--pure)' }}>
        <div className="wrap" style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 24px' }}>
          <TestimonialCarousel 
            testimonials={formattedTestimonials} 
            showDemoPlaceholders={false} 
          />
        </div>
      </section>
    </div>
  )
}
