export const dynamic = "force-dynamic";

import { prisma } from '@/lib/prisma'
import ServicesList from '@/components/ServicesList'

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
      <section id="services" style={{ background: 'var(--denim)', color: '#ffffff', padding: '90px 0 130px' }}>
        <div className="wrap" style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 24px' }}>
          <div className="section-head reveal" style={{ textAlign: 'center', maxWidth: '880px', margin: '0 auto 70px' }}>
            <span className="eyebrow" style={{ color: 'var(--orange)', justifyContent: 'center', fontSize: '0.95rem', letterSpacing: '0.16em', marginBottom: '14px' }}>
              Our Services
            </span>
            <h1 style={{ color: '#ffffff', fontSize: 'clamp(2.4rem, 5.2vw, 4rem)', lineHeight: 1.15, marginBottom: '24px', fontFamily: 'var(--display)', fontWeight: 800 }}>
              Crafting narratives that leave a mark.
            </h1>
            <p style={{ color: '#ffffff', opacity: 0.9, fontSize: '1.18rem', lineHeight: 1.8, maxWidth: '780px', margin: '0 auto' }}>
              We blend <span style={{ color: 'var(--orange)', fontWeight: 700 }}>strategy</span>, <span style={{ color: 'var(--orange)', fontWeight: 700 }}>design</span>, and <span style={{ color: 'var(--orange)', fontWeight: 700 }}>media production</span> to deliver comprehensive branding solutions for agencies, non-profits, and corporate organizations.
            </p>
          </div>

          <ServicesList services={services} />

          <div style={{ textAlign: 'center', marginTop: '72px' }} className="reveal">
            <div style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.05)', 
              borderRadius: '20px', 
              padding: '48px 32px', 
              maxWidth: '800px', 
              margin: '0 auto',
              border: '1px solid rgba(255, 255, 255, 0.12)' 
            }}>
              <h3 style={{ color: '#ffffff', fontFamily: 'var(--display)', fontSize: '1.85rem', marginBottom: '12px', fontWeight: 700 }}>
                Need a tailored media package?
              </h3>
              <p style={{ color: '#ffffff', opacity: 0.88, marginBottom: '28px', maxWidth: '540px', margin: '0 auto 28px', fontSize: '1.05rem', lineHeight: 1.7 }}>
                We partner with international organizations, government initiatives, and forward-thinking enterprises across Africa.
              </p>
              <a href="/contact" className="btn btn-primary" style={{ backgroundColor: 'var(--orange)', color: '#ffffff', padding: '14px 34px', fontWeight: 700, boxShadow: '0 6px 20px rgba(253, 137, 22, 0.38)' }}>
                Book a Project
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
