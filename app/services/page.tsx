export const dynamic = "force-dynamic";
import { PrismaClient } from '@prisma/client'
import * as LucideIcons from 'lucide-react'

const prisma = new PrismaClient()

export default async function Services() {
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
    <div style={{ paddingTop: '120px' }}>
      <section id="services">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">Our Services</span>
            <h2>Crafting narratives that leave a mark.</h2>
            <p>We blend strategy, design, and media production to deliver comprehensive branding solutions for agencies, non-profits, and corporate organizations.</p>
          </div>
          <div className="services-grid">
            {services.map((service, i) => {
              return (
                <div key={service.id} className={`service-card reveal stagger-${(i % 4) + 1}`}>
                  <div style={{ width: '100%', height: '240px', borderRadius: '12px', overflow: 'hidden', marginBottom: '24px' }}>
                    <img src={service.imageUrl || '/assets/why-image.jpg'} alt={service.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <h3 style={{ marginTop: 0 }}>{service.title}</h3>
                  <p className="desc">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
