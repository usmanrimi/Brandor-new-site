export const dynamic = "force-dynamic";

import { prisma } from '@/lib/prisma'
import ProjectList from '@/components/ProjectList'
import ServicesList from '@/components/ServicesList'
import VideoEmbed from '@/components/VideoEmbed'
import TestimonialCarousel from '@/components/TestimonialCarousel'
import { mediaSrc } from '@/lib/media'

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
    services = []
  }

  // Fallback services if database is temporarily empty
  if (services.length === 0) {
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

  let partners: any[] = []
  try {
    partners = await prisma.partner.findMany({ orderBy: { order: 'asc' } })
  } catch (error) {
    partners = []
  }

  let projects: any[] = []
  try {
    projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } })
  } catch (error) {
    projects = []
  }

  let testimonials: any[] = []
  try {
    testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' } })
  } catch (error) {
    testimonials = []
  }

  const formattedTestimonials = testimonials.map(t => ({
    id: t.id,
    name: t.name,
    role: t.role,
    company: t.company,
    content: t.content,
    imageUrl: t.imageUrl,
    featured: t.featured,
    isDemo: t.content?.toLowerCase().includes('demo') || t.name?.toLowerCase().includes('demo')
  }))

  return (
    <>
      {/* ===================== HERO (ITEMS 1 & 2) ===================== */}
      <section className="hero" style={{
        position: 'relative',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        padding: '160px 0 110px',
        backgroundColor: 'var(--denim)',
        overflow: 'hidden'
      }}>
        {/* Background Filmmaking/Impact Image - Cropped to focus on sitting participants and crew */}
        <picture style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none'
        }}>
          <source media="(max-width: 768px)" srcSet="/assets/hero-bg-mobile.webp" type="image/webp" />
          <source srcSet="/assets/hero-bg.webp" type="image/webp" />
          <img 
            src="/assets/hero-image.jpg" 
            alt="Brandor Media Production Set and Activity" 
            fetchPriority="high"
            decoding="async"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 68%',
              transform: 'scale(1.02)'
            }}
          />
        </picture>

        {/* Brand-Coloured Contrast Overlays for Crisp Readability */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background: 'linear-gradient(135deg, rgba(14, 40, 64, 0.90) 0%, rgba(23, 59, 97, 0.85) 50%, rgba(14, 40, 64, 0.88) 100%)',
            pointerEvents: 'none'
          }}
        />
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background: 'radial-gradient(circle at center, transparent 0%, rgba(14, 40, 64, 0.45) 100%)',
            pointerEvents: 'none'
          }}
        />

        {/* Hero Content Container: Balanced, spacious, and readable */}
        <div className="wrap" style={{ position: 'relative', zIndex: 2, maxWidth: '1120px', margin: '0 auto', textAlign: 'center', padding: '0 24px' }}>
          <div className="hero-content animate-hero" style={{ maxWidth: '880px', margin: '0 auto' }}>
            
            {/* Subtle Eyebrow Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 18px',
              borderRadius: '999px',
              backgroundColor: 'rgba(253, 137, 22, 0.15)',
              border: '1px solid rgba(253, 137, 22, 0.35)',
              marginBottom: '20px'
            }}>
              <span style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.82rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--orange)',
                fontWeight: 700
              }}>
                Creative Media & Branding
              </span>
            </div>

            {/* Primary Dominant Agency Headline */}
            <h1 style={{ 
              textAlign: 'center', 
              fontSize: 'clamp(2.7rem, 6vw, 4.8rem)', 
              lineHeight: 1.1, 
              marginBottom: '16px',
              color: '#ffffff',
              fontFamily: 'var(--display)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              textShadow: '0 4px 24px rgba(0,0,0,0.35)'
            }}>
              This is Brandor <br />
              <span style={{ color: 'var(--orange)' }}>Creative Media Agency</span>
            </h1>

            {/* Tagline directly beneath: Prominently displayed, colourful, and clearly readable */}
            <p style={{
              fontFamily: 'var(--display)',
              fontSize: 'clamp(1.45rem, 3.2vw, 2.3rem)',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '26px',
              letterSpacing: '-0.01em',
              lineHeight: 1.25,
              textShadow: '0 2px 12px rgba(0,0,0,0.3)'
            }}>
              Your Ultimate <span style={{ color: 'var(--orange)' }}>Branding Door</span>
            </p>

            {/* Wider, comfortable description container with readable line lengths */}
            <p className="lead" style={{ 
              textAlign: 'center', 
              margin: '0 auto 38px', 
              maxWidth: '740px',
              fontSize: '1.2rem',
              lineHeight: 1.8,
              color: '#ffffff',
              opacity: 0.95,
              textShadow: '0 1px 6px rgba(0,0,0,0.25)'
            }}>
              Brandor is a creative media and branding team helping NGOs, institutions, and businesses across Africa document their work, capture their impact, and build a brand worth remembering.
            </p>

            {/* Calls to Action */}
            <div className="btn-row" style={{ justifyContent: 'center', gap: '18px' }}>
              <a 
                href="/contact" 
                className="btn btn-primary"
                style={{ 
                  backgroundColor: 'var(--orange)', 
                  color: '#ffffff', 
                  boxShadow: '0 8px 24px rgba(253, 137, 22, 0.45)',
                  padding: '16px 36px',
                  fontSize: '1rem',
                  fontWeight: 700
                }}
              >
                Book a Project
              </a>
              <a 
                href="/services" 
                className="btn btn-outline"
                style={{ 
                  borderColor: 'rgba(255, 255, 255, 0.8)', 
                  color: '#ffffff',
                  padding: '16px 34px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(6px)'
                }}
              >
                Explore Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== MARQUEE STRIP ===================== */}
      <div className="marquee" aria-label="Services offered by Brandor">
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

      {/* ===================== SERVICES (ITEM 3: PREMIUM SERVICE CARDS) ===================== */}
      <section id="services" style={{ background: 'var(--denim)', color: '#ffffff', padding: '110px 0' }}>
        <div className="wrap" style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 24px' }}>
          <div className="section-head" style={{ textAlign: 'center', maxWidth: '880px', margin: '0 auto 60px' }}>
            <span className="eyebrow" style={{ color: 'var(--orange)', justifyContent: 'center', fontSize: '0.92rem', letterSpacing: '0.16em', marginBottom: '14px' }}>
              Our Services
            </span>
            <h2 style={{ color: '#ffffff', fontSize: 'clamp(2.4rem, 5.2vw, 3.8rem)', lineHeight: 1.15, marginBottom: '22px', fontFamily: 'var(--display)', fontWeight: 800 }}>
              Crafting narratives that leave a mark.
            </h2>
            <p style={{ color: '#ffffff', opacity: 0.9, fontSize: '1.16rem', lineHeight: 1.8, maxWidth: '780px', margin: '0 auto' }}>
              We blend <span style={{ color: 'var(--orange)', fontWeight: 700 }}>strategy</span>, <span style={{ color: 'var(--orange)', fontWeight: 700 }}>design</span>, and <span style={{ color: 'var(--orange)', fontWeight: 700 }}>media production</span> to deliver comprehensive branding solutions for agencies, non-profits, and corporate organizations.
            </p>
          </div>

          <ServicesList services={services.slice(0, 7)} />

          <div style={{ textAlign: 'center', marginTop: '56px' }}>
            <a href="/services" className="btn btn-primary" style={{ backgroundColor: 'var(--orange)', color: '#ffffff', padding: '15px 34px', fontWeight: 700, boxShadow: '0 6px 20px rgba(253, 137, 22, 0.38)' }}>
              View All Services Details
            </a>
          </div>
        </div>
      </section>

      {/* ===================== WHY US / GATEWAY ===================== */}
      <section id="why" style={{ background: '#ffffff', color: 'var(--denim)', padding: '100px 0', borderTop: '1px solid rgba(23, 59, 97, 0.06)' }}>
        <div className="wrap" style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 24px' }}>
          <div className="why-grid">
            <div className="why-visual" style={{ backgroundColor: 'var(--denim)', borderRadius: '24px', overflow: 'hidden' }}>
              <img 
                src={aboutContent?.whyUsImage || "/assets/why-image.jpg"} 
                alt="Brandor Media Documentation Set" 
                loading="lazy" 
                decoding="async" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
            <div>
              <h2 style={{ marginBottom: '16px', color: 'var(--denim)', fontSize: 'clamp(2.2rem, 4vw, 2.8rem)', position: 'relative', display: 'inline-block' }}>
                Why Organizations Choose Us
                <div style={{ position: 'absolute', bottom: '-8px', left: '0', width: '60px', height: '4px', background: 'var(--orange)', borderRadius: '2px' }}></div>
              </h2>
              <p style={{ fontSize: '1.2rem', color: 'var(--ink)', opacity: 0.9, marginBottom: '24px', marginTop: '24px', fontWeight: 600 }}>
                We don't just record events — we capture impact.
              </p>
              <p style={{ color: 'var(--ink)', opacity: 0.85, fontSize: '1.08rem', lineHeight: '1.75', marginBottom: '32px' }}>
                At Brandor, we specialize in high-end media production, strategic storytelling, and event documentation tailored for the unique needs of NGOs, development agencies, and corporate institutions.
              </p>
              <div className="btn-row" style={{ gap: '16px' }}>
                <a href="/about" className="btn btn-outline" style={{ borderColor: 'var(--denim)', color: 'var(--denim)' }}>
                  Read Our Story
                </a>
                <a href="/projects" className="btn btn-primary" style={{ background: 'var(--orange)', color: '#ffffff' }}>
                  View Our Portfolio
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== CAPTURED IMPACT (PROJECTS - ITEM 3) ===================== */}
      <section id="projects" style={{ background: '#f8fafc', padding: '100px 0', borderTop: '1px solid rgba(23, 59, 97, 0.06)' }}>
        <div className="wrap" style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 24px' }}>
          <div className="section-head" style={{ textAlign: 'center', maxWidth: '860px', margin: '0 auto 50px' }}>
            <span className="eyebrow" style={{ color: 'var(--orange)', justifyContent: 'center', marginBottom: '12px' }}>
              Our Projects
            </span>
            <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', color: 'var(--denim)', marginBottom: '16px', fontFamily: 'var(--display)', fontWeight: 800 }}>
              Captured Impact
            </h2>
            <p style={{ color: 'var(--ink)', opacity: 0.88, fontSize: '1.14rem', lineHeight: 1.75, margin: '0 auto', maxWidth: '760px' }}>
              Explore our recent event documentation, branding projects, and strategic storytelling across Africa.
            </p>
          </div>

          <ProjectList projects={projects.slice(0, 6)} />

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <a href="/projects" className="btn btn-primary" style={{ backgroundColor: 'var(--denim)', color: '#ffffff', padding: '14px 32px' }}>
              View All Projects & Reports
            </a>
          </div>
        </div>
      </section>

      {/* ===================== FEATURED VIDEO (ITEM 4: STORIES IN MOTION) ===================== */}
      <section id="featured-video" style={{ padding: '100px 0', background: 'var(--denim)', color: '#ffffff' }}>
        <div className="wrap" style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', maxWidth: '860px', margin: '0 auto 48px' }}>
            <span className="eyebrow" style={{ color: 'var(--orange)', justifyContent: 'center', marginBottom: '14px', letterSpacing: '0.14em' }}>
              Stories in Motion
            </span>
            <h2 style={{ color: '#ffffff', fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', lineHeight: 1.15, marginBottom: '18px', fontFamily: 'var(--display)', fontWeight: 800 }}>
              Visual Storytelling That Inspires Action
            </h2>
            <p style={{ color: '#ffffff', opacity: 0.9, fontSize: '1.14rem', lineHeight: 1.75, maxWidth: '760px', margin: '0 auto' }}>
              Watch how Brandor documents developmental programs, captures community milestones, and produces broadcast-grade visual narratives for NGOs, institutions, and businesses across Africa.
            </p>
          </div>

          <div style={{ maxWidth: '920px', margin: '0 auto' }}>
            <VideoEmbed 
              url="https://youtu.be/uVEWo6469eE?si=hV8RhfGhOBR24KRO"
              title="Brandor Creative Agency — Introduction Documentary"
              aspectRatio="16/9"
            />
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px', display: 'flex', justifyContent: 'center', gap: '18px', flexWrap: 'wrap' }}>
            <a 
              href="/projects" 
              className="btn btn-primary"
              style={{ backgroundColor: 'var(--orange)', color: '#ffffff', padding: '15px 34px', fontWeight: 700, boxShadow: '0 6px 20px rgba(253, 137, 22, 0.38)' }}
            >
              View All Projects
            </a>
            <a 
              href="/contact?service=Media%20Production" 
              className="btn btn-outline"
              style={{ borderColor: 'rgba(255, 255, 255, 0.75)', color: '#ffffff', padding: '15px 32px', backgroundColor: 'rgba(255, 255, 255, 0.06)' }}
            >
              Discuss Video Production
            </a>
          </div>
        </div>
      </section>

      {/* ===================== TRUSTED BY (PARTNERS) ===================== */}
      <section id="clients" className="clients" style={{ padding: '90px 0', background: '#ffffff', borderTop: '1px solid rgba(23, 59, 97, 0.06)' }}>
        <div className="wrap" style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 24px' }}>
          {/* Centered Heading and Supporting Text */}
          <div className="section-head" style={{ textAlign: 'center', maxWidth: '860px', margin: '0 auto 48px' }}>
            <span className="eyebrow" style={{ justifyContent: 'center', color: 'var(--orange)', marginBottom: '12px' }}>
              Trusted By
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: 'var(--denim)', marginBottom: '14px' }}>
              Organizations and institutions we've partnered with.
            </h2>
            <p style={{ color: 'var(--ink)', opacity: 0.85, fontSize: '1.1rem', lineHeight: 1.7, maxWidth: '720px', margin: '0 auto' }}>
              Collaborating with international development organizations, non-profits, and forward-thinking enterprises.
            </p>
          </div>

          {/* Approved Partner Logos Grid */}
          {partners.length > 0 ? (
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '32px 48px',
              padding: '20px 0'
            }}>
              {partners.map((partner) => (
                <div 
                  key={partner.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '16px 24px',
                    backgroundColor: '#ffffff',
                    borderRadius: '14px',
                    border: '1px solid rgba(23, 59, 97, 0.08)',
                    boxShadow: '0 4px 14px rgba(23, 59, 97, 0.04)',
                    minWidth: '180px',
                    height: '84px',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease'
                  }}
                >
                  <img 
                    src={mediaSrc(partner.logoUrl, 320)} 
                    alt={partner.name || "Partner Logo"} 
                    loading="lazy" 
                    decoding="async" 
                    style={{
                      maxHeight: '44px',
                      maxWidth: '150px',
                      width: 'auto',
                      height: 'auto',
                      objectFit: 'contain',
                      filter: 'grayscale(20%)'
                    }} 
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="partner-carousel-wrapper">
              <div className="partner-logos">
                <img src="/assets/partners/p1.png" alt="Partner 1" className="partner-logo" loading="lazy" decoding="async" />
                <img src="/assets/partners/p2.png" alt="Partner 2" className="partner-logo" loading="lazy" decoding="async" />
                <img src="/assets/partners/p3.png" alt="Partner 3" className="partner-logo" loading="lazy" decoding="async" />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===================== TESTIMONIALS CAROUSEL ===================== */}
      <section id="testimonials" style={{ padding: '100px 0', background: '#f8fafc', borderTop: '1px solid rgba(23, 59, 97, 0.06)' }}>
        <div className="wrap" style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 24px' }}>
          <div className="section-head" style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 48px' }}>
            <span className="eyebrow" style={{ color: 'var(--orange)', justifyContent: 'center', marginBottom: '12px' }}>
              Testimonials
            </span>
            <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3rem)', color: 'var(--denim)', marginBottom: '14px' }}>
              What Our Partners Say
            </h2>
            <p style={{ color: 'var(--ink)', opacity: 0.85, fontSize: '1.1rem', lineHeight: 1.7, margin: '0 auto', maxWidth: '680px' }}>
              Verified experiences from organizations who trusted Brandor to tell their story.
            </p>
          </div>

          <TestimonialCarousel 
            testimonials={formattedTestimonials} 
            showDemoPlaceholders={false} 
          />
        </div>
      </section>
    </>
  )
}
