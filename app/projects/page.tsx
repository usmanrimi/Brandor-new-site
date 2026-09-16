export const dynamic = "force-dynamic";

import { PrismaClient } from '@prisma/client'
import ProjectList from '@/components/ProjectList'

const prisma = new PrismaClient()

export default async function Projects() {
  let projects: any[] = []
  
  try {
    projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } })
  } catch (error) {
    console.error("Project fetch fallback")
    projects = [
      { 
        id: '1', 
        title: 'Inclusive Digital Empowerment For Youths With Disabilities', 
        client: 'British Council & Partners', 
        category: 'Media Production & Training', 
        date: '2024', 
        location: 'Kano, Nigeria', 
        description: 'Comprehensive documentation and visual storytelling covering skills acquisition, community impact, and empowerment initiatives.', 
        images: '/assets/hero-image.jpg',
        isPdfPublished: true,
        pdfUrl: '/api/media/cmu4icsiu00008lmm5584q156'
      }
    ]
  }
  
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
          <div style={{ 
            maxWidth: '900px', 
            margin: '0 auto', 
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            {/* Clean Page Title */}
            <p style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.85rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--orange)',
              fontWeight: 700,
              marginBottom: '12px'
            }}>
              Our Projects
            </p>

            {/* Prominent Introductory Headline */}
            <h1 style={{ 
              color: 'var(--denim)', 
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', 
              fontFamily: 'var(--display)',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: '20px'
            }}>
              Captured Impact
            </h1>

            {/* Centered, widened supporting description */}
            <p style={{ 
              color: 'var(--ink)', 
              fontSize: '1.15rem',
              lineHeight: 1.7,
              opacity: 0.85,
              maxWidth: '720px',
              margin: '0 auto'
            }}>
              Explore our recent event documentation, branding projects, and strategic storytelling initiatives across Africa.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== PROJECTS GRID ===================== */}
      <section style={{ 
        padding: '70px 0 110px', 
        background: 'var(--pure)', 
        minHeight: '60vh' 
      }}>
        <div className="wrap" style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 24px' }}>
          {projects.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '80px 20px', 
              background: '#ffffff', 
              borderRadius: '16px',
              border: '1px solid rgba(23, 59, 97, 0.08)'
            }}>
              <h3 style={{ color: 'var(--denim)', fontFamily: 'var(--display)', fontSize: '1.6rem', marginBottom: '8px' }}>
                No projects found
              </h3>
              <p style={{ color: '#64748b' }}>
                Published projects will appear here. Add new project records from the Super Admin.
              </p>
            </div>
          ) : (
            <ProjectList projects={projects} />
          )}
        </div>
      </section>
    </div>
  )
}
