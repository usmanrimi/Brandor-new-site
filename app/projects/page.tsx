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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '32px' }}>
            {projects.map((project, i) => (
              <div key={project.id} className={`reveal stagger-${(i % 4) + 1} project-card`} style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(23,59,97,0.05)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: '100%', height: '220px', background: '#e2e8f0', position: 'relative' }}>
                  <img src={project.images} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'var(--orange)', color: '#fff', padding: '4px 12px', borderRadius: '24px', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {project.category}
                  </div>
                </div>
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '12px', display: 'flex', gap: '8px', fontWeight: '600', flexWrap: 'wrap' }}>
                    <span>{project.client}</span>
                    <span style={{ color: 'var(--orange)' }}>•</span>
                    <span>{project.date}</span>
                  </div>
                  <h3 style={{ fontSize: '1.4rem', color: 'var(--denim)', marginBottom: '12px', fontFamily: 'var(--display)', fontWeight: '700', lineHeight: '1.3' }}>{project.title}</h3>
                  <p style={{ color: 'var(--ink)', fontSize: '0.95rem', lineHeight: '1.6', opacity: '0.8', marginBottom: '24px', flexGrow: 1 }}>{project.description.length > 120 ? project.description.substring(0, 120) + '...' : project.description}</p>
                  
                  {project.isPdfPublished && project.pdfUrl && (
                    <a href={project.pdfUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', padding: '10px', fontSize: '0.9rem' }}>
                      <ExternalLink size={16} /> View PDF Report
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
