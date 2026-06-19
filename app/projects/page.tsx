export const dynamic = "force-dynamic";
import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import { ArrowLeft, ExternalLink } from 'lucide-react'

const prisma = new PrismaClient()

export default async function Projects() {
  let projects: any[] = []
  
  try {
    projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } })
  } catch (error) {
    projects = [
      { id: '1', title: 'Brandor Corporate Identity', client: 'Brandor', category: 'Branding', date: '2023', location: 'Nigeria', description: 'Complete brand overhaul.', images: '/assets/why-image.jpg' }
    ]
  }
  
  return (
    <div style={{ paddingTop: '80px' }}>
      <section style={{ paddingTop: '80px', paddingBottom: '80px', background: 'var(--blue)' }}>
        <div className="wrap">
          <div className="section-head reveal" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <span className="eyebrow" style={{ color: 'var(--orange)' }}>Our Portfolio</span>
            <h1 className="gsap-split" style={{ color: 'var(--denim)', fontSize: '3rem', marginBottom: '24px' }}>Captured impact.</h1>
            <p style={{ color: 'var(--ink)', fontSize: '1.1rem' }}>Explore our recent event documentation, branding projects, and strategic storytelling across Africa.</p>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: 'var(--pure)' }}>
        <div className="wrap">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
            {projects.map((project, i) => (
              <div key={project.id} className={`reveal stagger-${(i % 4) + 1}`} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px', background: '#fff', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(23,59,97,0.06)' }}>
                <div style={{ width: '100%', height: '100%', minHeight: '400px', background: '#e2e8f0', position: 'relative' }}>
                  <img src={project.images} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '24px', left: '24px', background: 'var(--orange)', color: '#fff', padding: '6px 16px', borderRadius: '24px', fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {project.category}
                  </div>
                </div>
                <div style={{ padding: '48px 48px 48px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '16px', display: 'flex', gap: '16px', fontWeight: '600' }}>
                    <span>{project.client}</span>
                    <span style={{ color: 'var(--orange)' }}>•</span>
                    <span>{project.date}</span>
                    <span style={{ color: 'var(--orange)' }}>•</span>
                    <span>{project.location}</span>
                  </div>
                  <h3 style={{ fontSize: '2rem', color: 'var(--denim)', marginBottom: '20px', fontFamily: 'var(--display)', fontWeight: '800', lineHeight: '1.2' }}>{project.title}</h3>
                  <p style={{ color: 'var(--ink)', fontSize: '1.05rem', lineHeight: '1.7', opacity: '0.8' }}>{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
