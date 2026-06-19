export const dynamic = "force-dynamic";
import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import { Quote } from 'lucide-react'

const prisma = new PrismaClient()

export default async function Testimonials() {
  let testimonials: any[] = []

  try {
    testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' } })
  } catch(error) {
    testimonials = [
      { id: '1', name: 'Aisha Bello', role: 'CEO', company: 'TechNova', content: 'Brandor completely transformed our visual identity.', imageUrl: null }
    ]
  }
  
  return (
    <div style={{ paddingTop: '80px' }}>
      <section style={{ paddingTop: '80px', paddingBottom: '80px', background: 'var(--blue)' }}>
        <div className="wrap">
          <div className="section-head reveal" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <span className="eyebrow" style={{ color: 'var(--orange)' }}>Client Stories</span>
            <h1 className="gsap-split" style={{ color: 'var(--denim)', fontSize: '3rem', marginBottom: '24px' }}>Words from our partners.</h1>
            <p style={{ color: 'var(--ink)', fontSize: '1.1rem' }}>See what NGOs, development agencies, and corporate organizations have to say about working with Brandor.</p>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: 'var(--pure)' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '32px' }}>
            {testimonials.map((testimonial, i) => (
              <div key={testimonial.id} className={`reveal stagger-${(i % 4) + 1}`} style={{ background: 'var(--denim)', padding: '48px', borderRadius: '24px', position: 'relative', boxShadow: '0 20px 40px rgba(23,59,97,0.1)' }}>
                <Quote size={56} color="var(--orange)" style={{ opacity: 0.15, position: 'absolute', top: '32px', right: '32px' }} />
                <p style={{ color: 'var(--pure)', fontSize: '1.15rem', lineHeight: '1.8', fontStyle: 'italic', marginBottom: '40px', position: 'relative', zIndex: 1, fontWeight: '400' }}>
                  "{testimonial.content}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderTop: '1px solid rgba(255,235,208,0.1)', paddingTop: '24px' }}>
                  {testimonial.imageUrl ? (
                    <img src={testimonial.imageUrl} alt={testimonial.name} style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--orange)' }} />
                  ) : (
                    <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--orange)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.4rem' }}>
                      {testimonial.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h4 style={{ color: 'var(--pure)', fontSize: '1.2rem', marginBottom: '2px', fontFamily: 'var(--display)', letterSpacing: '0.5px' }}>{testimonial.name}</h4>
                    <p style={{ color: 'var(--greyblue)', fontSize: '0.9rem', fontWeight: '600', letterSpacing: '0.02em' }}>{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
