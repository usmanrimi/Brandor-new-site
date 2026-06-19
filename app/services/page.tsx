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
    services = [
      { id: '1', title: 'Branding & Identity', description: 'Building memorable brands that inspire trust, recognition, and growth.', icon: 'Palette', order: 1 },
      { id: '2', title: 'Media Production', description: 'Professional photography, videography, documentaries, and visual content.', icon: 'Camera', order: 2 },
      { id: '3', title: 'Event Documentation', description: 'Comprehensive coverage of trainings, workshops, conferences.', icon: 'Video', order: 3 },
      { id: '4', title: 'Strategic Storytelling', description: 'Transforming impact into compelling stories for stakeholders.', icon: 'PenTool', order: 4 },
      { id: '5', title: 'Marketing & Comms', description: 'Helping organizations communicate effectively and strengthen visibility.', icon: 'Megaphone', order: 5 },
      { id: '6', title: 'Training & Capacity', description: 'Empowering individuals and teams with practical skills.', icon: 'Users', order: 6 }
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
              const IconComponent = (LucideIcons as any)[service.icon] || LucideIcons.CheckCircle;
              return (
                <div key={service.id} className={`service-card reveal stagger-${(i % 4) + 1}`}>
                  <div className="service-arch">
                    <IconComponent size={32} strokeWidth={1.5} color="var(--orange)" />
                  </div>
                  <h3>{service.title}</h3>
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
