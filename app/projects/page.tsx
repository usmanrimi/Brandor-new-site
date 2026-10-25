export const dynamic = "force-dynamic";

import { prisma } from '@/lib/prisma'
import ProjectList from '@/components/ProjectList'
import VideoEmbed from '@/components/VideoEmbed'
import * as Icons from 'lucide-react'

export default async function Projects() {
  let projects: any[] = []
  
  try {
    projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } })
  } catch (error) {
    projects = []
  }

  // Find projects that have a videoUrl attached
  const videoProjects = projects.filter(p => !!p.videoUrl)
  const introVideoUrl = "https://youtu.be/uVEWo6469eE?si=hV8RhfGhOBR24KRO"
  
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
            maxWidth: '920px', 
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
              maxWidth: '760px',
              margin: '0 auto'
            }}>
              Explore our recent event documentation, branding projects, documentary films, and strategic storytelling initiatives across Africa.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== PROJECTS GRID ===================== */}
      <section style={{ 
        padding: '70px 0 90px', 
        background: 'var(--pure)', 
        minHeight: '40vh' 
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

      {/* ===================== VIDEO & DOCUMENTARY SHOWCASE (ITEM 5) ===================== */}
      <section style={{ 
        padding: '90px 0 110px', 
        background: 'var(--denim)', 
        color: 'var(--pure)' 
      }}>
        <div className="wrap" style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 50px' }}>
            <span className="eyebrow" style={{ color: 'var(--orange)', justifyContent: 'center', marginBottom: '12px' }}>
              Documentary & Video Showcase
            </span>
            <h2 style={{ color: 'var(--pure)', fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', marginBottom: '16px' }}>
              Stories in motion.
            </h2>
            <p style={{ color: 'var(--pure)', opacity: 0.88, fontSize: '1.1rem', lineHeight: 1.7 }}>
              Broadcast-quality videography, stakeholder testimonials, and human-centered documentaries capturing developmental impact across communities.
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', 
            gap: '36px',
            alignItems: 'start'
          }}>
            {/* Featured Agency Video */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <VideoEmbed 
                url={introVideoUrl}
                title="Brandor Creative Agency — Introduction Documentary"
                aspectRatio="16/9"
                customThumbnail="/assets/hero-image.jpg"
              />
              <div>
                <h3 style={{ color: 'var(--pure)', fontFamily: 'var(--display)', fontSize: '1.35rem', margin: '6px 0 6px' }}>
                  Brandor Agency Overview
                </h3>
                <p style={{ color: 'var(--pure)', opacity: 0.8, fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                  A behind-the-scenes look at how Brandor partners with international agencies, institutions, and local communities to document milestones with authentic storytelling.
                </p>
              </div>
            </div>

            {/* Additional Project Videos if present */}
            {videoProjects.length > 0 ? (
              videoProjects.map((vp) => (
                <div key={vp.id} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <VideoEmbed 
                    url={vp.videoUrl!}
                    title={`${vp.title} — Video Documentation`}
                    aspectRatio="16/9"
                  />
                  <div>
                    <span style={{ 
                      fontSize: '0.78rem', 
                      color: 'var(--orange)', 
                      fontFamily: 'var(--mono)', 
                      fontWeight: 700, 
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em' 
                    }}>
                      {vp.category} • {vp.client}
                    </span>
                    <h3 style={{ color: 'var(--pure)', fontFamily: 'var(--display)', fontSize: '1.35rem', margin: '6px 0 6px' }}>
                      {vp.title}
                    </h3>
                    <p style={{ color: 'var(--pure)', opacity: 0.8, fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                      {vp.description?.length > 140 ? `${vp.description.substring(0, 140)}...` : vp.description}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ 
                backgroundColor: 'rgba(255, 235, 208, 0.05)', 
                border: '1px solid rgba(255, 235, 208, 0.1)', 
                borderRadius: '16px', 
                padding: '36px 28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                minHeight: '260px'
              }}>
                <Icons.Clapperboard size={36} color="var(--orange)" style={{ marginBottom: '16px' }} />
                <h4 style={{ color: 'var(--pure)', fontSize: '1.25rem', fontFamily: 'var(--display)', margin: '0 0 8px' }}>
                  Comprehensive Video Production
                </h4>
                <p style={{ color: 'var(--pure)', opacity: 0.85, fontSize: '0.95rem', lineHeight: 1.65, margin: 0 }}>
                  We provide 4K camera teams, multi-microphone audio setups, aerial drone coverage, and post-production editing for conferences, field visits, and human-interest documentaries across Nigeria and West Africa.
                </p>
                <div style={{ marginTop: '20px' }}>
                  <a href="/contact" className="btn btn-primary" style={{ backgroundColor: 'var(--orange)', color: '#ffffff', padding: '10px 22px', fontSize: '0.88rem' }}>
                    Request Video Coverage
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
