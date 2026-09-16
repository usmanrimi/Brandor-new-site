export const dynamic = "force-dynamic";
import { PrismaClient } from '@prisma/client'
import * as LucideIcons from 'lucide-react'
import ProjectList from '@/components/ProjectList'
import ServicesList from '@/components/ServicesList'

const prisma = new PrismaClient()

export default async function Home() {
  let content = null
  try {
    content = await prisma.homeContent.findUnique({ where: { id: 'global' } })
  } catch(e) {}
  
  let aboutContent = null
  try {
    aboutContent = await prisma.aboutContent.findUnique({ where: { id: 'global' } })
  } catch(e) {}
  
  let services: any[] = []
  try {
    services = await prisma.service.findMany({ orderBy: { order: 'asc' } })
  } catch (error) {
    console.error("Database fallback")
    services = [
      { id: '1', title: 'Branding & Identity', description: 'Building memorable brands that inspire trust, recognition, and growth.', imageUrl: '/assets/why-image.jpg', order: 1 },
      { id: '2', title: 'Media Production', description: 'Professional photography, videography, documentaries, and visual content production.', imageUrl: '/assets/hero-image.jpg', order: 2 },
      { id: '3', title: 'Event & Training Documentation', description: 'Comprehensive coverage of trainings, workshops, conferences, and community programs.', imageUrl: '/assets/why-image.jpg', order: 3 },
      { id: '4', title: 'Strategic Storytelling', description: 'Transforming impact into compelling stories for stakeholders, donors, and audiences.', imageUrl: '/assets/hero-image.jpg', order: 4 },
      { id: '5', title: 'Marketing & Communications', description: 'Helping organizations communicate effectively and strengthen their visibility.', imageUrl: '/assets/why-image.jpg', order: 5 },
      { id: '6', title: 'Training & Capacity Building', description: 'Empowering individuals, businesses, and organizations through practical training and workshops.', imageUrl: '/assets/hero-image.jpg', order: 6 },
      { id: '7', title: 'Community Engagement & Development', description: 'Supporting community-focused initiatives, outreach programs, and social impact projects.', imageUrl: '/assets/why-image.jpg', order: 7 }
    ]
  }

  let partners: any[] = []
  try {
    partners = await prisma.partner.findMany({ orderBy: { order: 'asc' } })
  } catch (error) {
    console.error("Partner fallback")
    partners = [
      { id: '1', logoUrl: '/assets/partners/p1.png' },
      { id: '2', logoUrl: '/assets/partners/p2.png' },
      { id: '3', logoUrl: '/assets/partners/p3.png' }
    ]
  }

  let projects: any[] = []
  try {
    projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } })
  } catch (error) {
    projects = []
  }

  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-content animate-hero">
            <div className="hero-header-block" style={{ textAlign: 'center', marginBottom: '16px' }}>
              <p className="eyebrow" style={{ justifyContent: 'center', marginBottom: '14px', letterSpacing: '0.14em' }}>
                This is Brandor Creative Media Agency
              </p>
              <h1 style={{ textAlign: 'center', fontSize: 'clamp(2.5rem, 5.2vw, 4.4rem)', lineHeight: 1.1, marginBottom: '20px' }}>
                Your Ultimate <br />
                <span className="accent" style={{ color: 'var(--orange)' }}>Branding Door</span>
              </h1>
            </div>
            <p className="lead" style={{ textAlign: 'center', margin: '0 auto 32px', maxWidth: '500px' }}>
              Brandor is a creative media and branding team helping NGOs, institutions, and businesses across Africa document their work, capture their impact, and build a brand worth remembering.
            </p>
            <div className="btn-row" style={{ justifyContent: 'center' }}>
              <a href="/contact" className="btn btn-primary">Book a Project</a>
              <a href="/services" className="btn btn-outline">Explore Services</a>
            </div>
          </div>
          
          <div className="hero-visual animate-hero-visual">
            <img src={content?.heroImage || "/assets/hero-image.jpg"} alt="Brandor Media Production" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 20px 40px rgba(23,59,97,0.1)' }} />
          </div>
        </div>
      </section>

      {/* ===================== MARQUEE ===================== */}
      <div className="marquee">
        <div className="marquee-track">
          <span>Media Production</span>
          <span>Photography</span>
          <span>Videography</span>
          <span>Creative Direction</span>
          <span>Creative Design</span>
          <span>Strategy</span>
          <span>Branding</span>
          <span>Storytelling</span>
          <div aria-hidden="true" style={{ display: 'flex', gap: '48px' }}>
            <span>Media Production</span>
            <span>Photography</span>
            <span>Videography</span>
            <span>Creative Direction</span>
            <span>Creative Design</span>
            <span>Strategy</span>
            <span>Branding</span>
            <span>Storytelling</span>
          </div>
        </div>
      </div>

      {/* ===================== SERVICES ===================== */}
      <section id="services" style={{ background: 'var(--denim)', color: 'var(--pure)', padding: '110px 0' }}>
        <div className="wrap">
          <div className="section-head reveal" style={{ textAlign: 'center', maxWidth: '880px', margin: '0 auto 60px' }}>
            <span className="eyebrow" style={{ color: 'var(--orange)', justifyContent: 'center', fontSize: '0.95rem', letterSpacing: '0.16em', marginBottom: '14px' }}>
              Our Services
            </span>
            <h2 style={{ color: 'var(--pure)', fontSize: 'clamp(2.4rem, 5.2vw, 3.8rem)', lineHeight: 1.15, marginBottom: '22px' }}>
              Crafting narratives that leave a mark.
            </h2>
            <p style={{ color: 'var(--pure)', opacity: 0.88, fontSize: '1.15rem', lineHeight: 1.8, maxWidth: '740px', margin: '0 auto' }}>
              We blend <span style={{ color: 'var(--orange)', fontWeight: 600 }}>strategy</span>, <span style={{ color: 'var(--orange)', fontWeight: 600 }}>design</span>, and <span style={{ color: 'var(--orange)', fontWeight: 600 }}>media production</span> to deliver comprehensive branding solutions for agencies, non-profits, and corporate organizations.
            </p>
          </div>

          <ServicesList services={services.slice(0, 6)} />

          <div style={{ textAlign: 'center', marginTop: '56px' }} className="reveal">
            <a href="/services" className="btn btn-primary" style={{ backgroundColor: 'var(--orange)', color: '#ffffff' }}>
              View All Services
            </a>
          </div>
        </div>
      </section>

      {/* ===================== WHY US / GATEWAY ===================== */}
      <section id="why" style={{ background: 'var(--denim)', color: 'var(--pure)', paddingBottom: '100px' }}>
        <div className="wrap">
          <div className="why-grid">
            <div className="why-visual reveal">
              <img src={aboutContent?.whyUsImage || "/assets/why-image.jpg"} alt="Brandor abstract" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
            </div>
            <div className="reveal">
              <h2 style={{ marginBottom: '16px', color: 'var(--pure)', fontSize: '2.8rem', position: 'relative', display: 'inline-block' }} className="gsap-split">
                Why Organizations Choose Us
                <div style={{ position: 'absolute', bottom: '-8px', left: '0', width: '60px', height: '4px', background: 'var(--orange)', borderRadius: '2px' }}></div>
              </h2>
              <p style={{ fontSize: '1.2rem', color: 'var(--pure)', opacity: 0.9, marginBottom: '24px', marginTop: '24px' }}>We don't just record events we capture impact.</p>
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

      {/* ===================== PROJECTS ===================== */}
      <section id="projects" style={{ background: '#f8fafc', padding: '100px 0' }}>
        <div className="wrap">
          <div className="section-head reveal" style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 50px' }}>
            <span className="eyebrow" style={{ color: 'var(--orange)', justifyContent: 'center' }}>Our Projects</span>
            <h2>Captured impact.</h2>
            <p style={{ color: 'var(--ink)', opacity: 0.82 }}>Explore our recent event documentation, branding projects, and strategic storytelling across Africa.</p>
          </div>
          <ProjectList projects={projects.slice(0, 6)} />
          <div style={{ textAlign: 'center', marginTop: '48px' }} className="reveal">
            <a href="/projects" className="btn btn-primary">View All Projects</a>
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
          <div className="partner-carousel-wrapper reveal">
            <div className="partner-logos">
              {[...partners, ...partners].map((p, index) => (
                <img key={`${p.id}-${index}`} src={p.logoUrl} alt="Partner Logo" className="partner-logo" loading="lazy" decoding="async" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
