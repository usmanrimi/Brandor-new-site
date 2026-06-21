export const dynamic = "force-dynamic";
import { PrismaClient } from '@prisma/client'
import * as LucideIcons from 'lucide-react'

const prisma = new PrismaClient()

export default async function Home() {
  let services: any[] = []
  try {
    services = await prisma.service.findMany({ orderBy: { order: 'asc' } })
  } catch (error) {
    console.error("Database fallback")
      { id: '1', title: 'Branding & Identity', description: 'Building memorable brands that inspire trust, recognition, and growth.', imageUrl: '/assets/why-image.jpg', order: 1 },
      { id: '2', title: 'Media Production', description: 'Professional photography, videography, documentaries, and visual content production.', imageUrl: '/assets/hero-image.jpg', order: 2 },
      { id: '3', title: 'Event & Training Documentation', description: 'Comprehensive coverage of trainings, workshops, conferences, and community programs.', imageUrl: '/assets/why-image.jpg', order: 3 },
      { id: '4', title: 'Strategic Storytelling', description: 'Transforming impact into compelling stories for stakeholders, donors, and audiences.', imageUrl: '/assets/hero-image.jpg', order: 4 },
      { id: '5', title: 'Marketing & Communications', description: 'Helping organizations communicate effectively and strengthen their visibility.', imageUrl: '/assets/why-image.jpg', order: 5 },
      { id: '6', title: 'Training & Capacity Building', description: 'Empowering individuals, businesses, and organizations through practical training and workshops.', imageUrl: '/assets/hero-image.jpg', order: 6 },
      { id: '7', title: 'Community Engagement & Development', description: 'Supporting community-focused initiatives, outreach programs, and social impact projects.', imageUrl: '/assets/why-image.jpg', order: 7 }
    ]
  }

  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="hero">
        <div className="wrap">
          <div>
            <p className="eyebrow">Kano · Creative Media Agency</p>
            <h1 className="gsap-split">Every program has a story. We open the <span className="accent">door</span> to tell it.</h1>
            <p className="lead">Brandor is a creative media and branding team helping NGOs, institutions, and businesses across Africa document their work, capture their impact, and build a brand worth remembering.</p>
            <div className="btn-row">
              <a href="/contact" className="btn btn-primary">Book a Project</a>
              <a href="/services" className="btn btn-outline">Explore Services</a>
            </div>
          </div>
          
          <div className="hero-visual">
            <img src="/assets/hero-image.jpg" alt="Brandor Media Production" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 20px 40px rgba(23,59,97,0.1)' }} />
          </div>
        </div>
      </section>

      {/* ===================== MARQUEE ===================== */}
      <div className="marquee">
        <div className="marquee-track">
          <span>Branding</span>
          <span>Storytelling</span>
          <span>Documentation</span>
          <span>Media Production</span>
          <span>Creative Direction</span>
          <span>Strategy</span>
          <span>Branding</span>
          <span>Storytelling</span>
          <span>Documentation</span>
          <span>Media Production</span>
          <span>Creative Direction</span>
          <span>Strategy</span>
        </div>
      </div>

      {/* ===================== SERVICES ===================== */}
      <section id="services" style={{ background: '#f8fafc' }}>
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">Our Services</span>
            <h2>Crafting narratives that leave a mark.</h2>
            <p>We blend strategy, design, and media production to deliver comprehensive branding solutions for agencies, non-profits, and corporate organizations.</p>
          </div>
          <div className="services-grid">
            {services.slice(0, 6).map((service, i) => {
              return (
                <div key={service.id} className={`service-card reveal stagger-${(i % 4) + 1}`}>
                  <div style={{ width: '100%', height: '200px', borderRadius: '12px', overflow: 'hidden', marginBottom: '24px' }}>
                    <img src={service.imageUrl || '/assets/why-image.jpg'} alt={service.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <h3 style={{ marginTop: 0 }}>{service.title}</h3>
                  <p className="desc">{service.description}</p>
                </div>
              );
            })}
          </div>
          <div style={{ textAlign: 'center', marginTop: '48px' }} className="reveal">
            <a href="/services" className="btn btn-primary">View All Services</a>
          </div>
        </div>
      </section>

      {/* ===================== WHY US / GATEWAY ===================== */}
      <section id="why" style={{ background: 'var(--denim)', color: 'var(--pure)', paddingBottom: '100px' }}>
        <div className="wrap">
          <div className="why-grid">
            <div className="why-visual reveal">
              <img src="/assets/why-image.jpg" alt="Brandor abstract" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
            </div>
            <div className="reveal">
              <p className="eyebrow" style={{ color: 'var(--orange)' }}>Why Organizations Choose Us</p>
              <h2 style={{ marginBottom: '32px', color: 'var(--pure)' }} className="gsap-split">We don't just record events we capture impact.</h2>
              <p style={{ color: 'var(--pure)', opacity: 0.8, fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '24px' }}>
                At Brandor, we specialize in high-end media production, strategic storytelling, and event documentation tailored for the unique needs of NGOs, development agencies, and corporate institutions. 
              </p>
              <div className="btn-row">
                <a href="/about" className="btn btn-outline" style={{ borderColor: 'var(--pure)', color: 'var(--pure)' }}>Read Our Story</a>
                <a href="/projects" className="btn btn-primary" style={{ background: 'var(--orange)', color: 'var(--pure)' }}>View Our Portfolio</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== CLIENTS ===================== */}
      <section id="clients" className="clients">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">Trusted By</span>
            <h2>Organizations we've partnered with.</h2>
          </div>
          <div className="partner-logos reveal stagger-2">
            <img src="/assets/partners/p1.png" alt="Partner Logo" className="partner-logo" />
            <img src="/assets/partners/p2.png" alt="Partner Logo" className="partner-logo" />
            <img src="/assets/partners/p3.png" alt="Partner Logo" className="partner-logo" />
          </div>
        </div>
      </section>
    </>
  )
}
