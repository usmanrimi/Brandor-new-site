export const dynamic = "force-dynamic";

import { PrismaClient } from '@prisma/client'
import ServicesList from '@/components/ServicesList'

const prisma = new PrismaClient()

export default async function Services() {
  let services: any[] = []
  
  try {
    services = await prisma.service.findMany({ orderBy: { order: 'asc' } })
  } catch (error) {
    console.error("Database fallback")
    services = [
      { id: '1', title: 'Branding & Identity', description: 'Building memorable brands that inspire trust, recognition, and growth.', order: 1 },
      { id: '2', title: 'Media Production', description: 'Professional photography, videography, documentaries, and visual content production.', order: 2 },
      { id: '3', title: 'Event & Training Documentation', description: 'Comprehensive coverage of trainings, workshops, conferences, and community programs.', order: 3 },
      { id: '4', title: 'Strategic Storytelling', description: 'Transforming impact into compelling stories for stakeholders, donors, and audiences.', order: 4 },
      { id: '5', title: 'Marketing & Communications', description: 'Helping organizations communicate effectively and strengthen their visibility.', order: 5 },
      { id: '6', title: 'Training & Capacity Building', description: 'Empowering individuals, businesses, and organizations through practical training and workshops.', order: 6 },
      { id: '7', title: 'Community Engagement & Development', description: 'Supporting community-focused initiatives, outreach programs, and social impact projects.', order: 7 }
    ]
  }

  return (
    <div style={{ paddingTop: '100px' }}>
      <section id="services" style={{ background: 'var(--denim)', color: 'var(--pure)', padding: '90px 0 130px' }}>
        <div className="wrap">
          <div className="section-head reveal" style={{ textAlign: 'center', maxWidth: '880px', margin: '0 auto 70px' }}>
            <span className="eyebrow" style={{ color: 'var(--orange)', justifyContent: 'center', fontSize: '0.95rem', letterSpacing: '0.16em', marginBottom: '14px' }}>
              Our Services
            </span>
            <h1 style={{ color: 'var(--pure)', fontSize: 'clamp(2.4rem, 5.2vw, 4rem)', lineHeight: 1.15, marginBottom: '24px' }}>
              Crafting narratives that leave a mark.
            </h1>
            <p style={{ color: 'var(--pure)', opacity: 0.88, fontSize: '1.2rem', lineHeight: 1.8, maxWidth: '760px', margin: '0 auto' }}>
              We blend <span style={{ color: 'var(--orange)', fontWeight: 600 }}>strategy</span>, <span style={{ color: 'var(--orange)', fontWeight: 600 }}>design</span>, and <span style={{ color: 'var(--orange)', fontWeight: 600 }}>media production</span> to deliver comprehensive branding solutions for agencies, non-profits, and corporate organizations.
            </p>
          </div>

          <ServicesList services={services} />

          <div style={{ textAlign: 'center', marginTop: '72px' }} className="reveal">
            <div style={{ 
              backgroundColor: 'rgba(255, 235, 208, 0.05)', 
              borderRadius: '20px', 
              padding: '48px 32px', 
              maxWidth: '800px', 
              margin: '0 auto',
              border: '1px solid rgba(255, 235, 208, 0.1)' 
            }}>
              <h3 style={{ color: 'var(--pure)', fontFamily: 'var(--display)', fontSize: '1.8rem', marginBottom: '12px' }}>
                Need a tailored media package?
              </h3>
              <p style={{ color: 'var(--pure)', opacity: 0.82, marginBottom: '28px', maxWidth: '520px', margin: '0 auto 28px' }}>
                We partner with international organizations, government initiatives, and forward-thinking enterprises.
              </p>
              <a href="/contact" className="btn btn-primary" style={{ backgroundColor: 'var(--orange)', color: '#ffffff' }}>
                Book a Project
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
