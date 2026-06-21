export const dynamic = "force-dynamic";

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function About() {
  let aboutContent = await prisma.aboutContent.findUnique({ where: { id: 'global' } })

  // Fallback in case the DB is empty or migrating
  if (!aboutContent) {
    aboutContent = {
      id: 'global',
      aboutText: "Brandor is a creative branding, media production, and storytelling agency dedicated to helping organizations communicate their impact.",
      mission: "To empower brands, organizations, and communities through strategic branding, impactful storytelling, and professional media production.",
      vision: "To become Africa's leading creative agency for branding, storytelling, and impact documentation.",
      coreValues: "Excellence. Creativity. Impact. Integrity. Collaboration.",
      process: "",
      whyUs: "",
      updatedAt: new Date()
    }
  }

  return (
    <div style={{ paddingTop: '120px' }}>
      
      {/* ===================== ABOUT HERO ===================== */}
      <section id="about-hero" className="wrap" style={{ paddingBottom: '60px' }}>
        <div className="section-head reveal" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <span className="eyebrow">Your Ultimate Branding Door</span>
          <h1 className="gsap-split" style={{ fontSize: '3rem', marginBottom: '32px' }}>About Brandor</h1>
          <div style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--text-light)', textAlign: 'left' }}>
            {aboutContent.aboutText.split('\n').map((paragraph, idx) => (
              paragraph.trim() ? <p key={idx} style={{ marginBottom: '24px' }}>{paragraph}</p> : null
            ))}
          </div>
        </div>
      </section>

      {/* ===================== MISSION, VISION, VALUES ===================== */}
      <section id="mission-vision" style={{ background: 'var(--denim)', padding: '110px 0', color: 'var(--pure)' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
            
            <div className="service-card reveal stagger-1" style={{ background: 'rgba(255, 235, 208, 0.03)', borderColor: 'rgba(255, 235, 208, 0.1)', color: 'var(--pure)' }}>
              <h3 style={{ color: 'var(--orange)', marginBottom: '16px', fontFamily: 'var(--display)', fontSize: '1.8rem' }}>Our Mission</h3>
              <p style={{ lineHeight: '1.7', opacity: '0.9', fontSize: '1.05rem' }}>{aboutContent.mission}</p>
            </div>
            
            <div className="service-card reveal stagger-2" style={{ background: 'rgba(255, 235, 208, 0.03)', borderColor: 'rgba(255, 235, 208, 0.1)', color: 'var(--pure)' }}>
              <h3 style={{ color: 'var(--orange)', marginBottom: '16px', fontFamily: 'var(--display)', fontSize: '1.8rem' }}>Our Vision</h3>
              <p style={{ lineHeight: '1.7', opacity: '0.9', fontSize: '1.05rem' }}>{aboutContent.vision}</p>
            </div>

            <div className="service-card reveal stagger-3" style={{ background: 'rgba(255, 235, 208, 0.03)', borderColor: 'rgba(255, 235, 208, 0.1)', color: 'var(--pure)' }}>
              <h3 style={{ color: 'var(--orange)', marginBottom: '16px', fontFamily: 'var(--display)', fontSize: '1.8rem' }}>Core Values</h3>
              <div style={{ lineHeight: '1.7', opacity: '0.9', fontSize: '1.05rem' }}>
                {aboutContent.coreValues.split('\n').map((line, idx) => {
                  if (!line.trim()) return null;
                  const parts = line.split(':');
                  if (parts.length > 1) {
                    return <p key={idx} style={{ marginBottom: '12px' }}><strong style={{ color: 'var(--pure)', display: 'block', fontSize: '1.15rem', fontFamily: 'var(--display)', marginBottom: '4px' }}>{parts[0]}</strong>{parts[1]}</p>
                  }
                  return <p key={idx} style={{ marginBottom: '12px' }}>{line}</p>
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===================== APPROACH ===================== */}
      <section id="approach" className="approach">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">The Process</span>
            <h2>How we bring your vision to life.</h2>
            <p>A systematic, collaborative approach to ensure every deliverable hits the mark and exceeds expectations.</p>
          </div>
          <div className="timeline">
            <div className="step reveal stagger-1">
              <div className="step-arch"></div>
              <h4>Discovery</h4>
              <p>Deep-dive into your goals, audience, and the core message you need to communicate.</p>
            </div>
            <div className="step reveal stagger-2">
              <div className="step-arch"></div>
              <h4>Strategy</h4>
              <p>Developing a creative and strategic roadmap tailored to your objectives.</p>
            </div>
            <div className="step reveal stagger-3">
              <div className="step-arch"></div>
              <h4>Production</h4>
              <p>Executing the creative work through branding, photography, videography, and content creation.</p>
            </div>
            <div className="step reveal stagger-4">
              <div className="step-arch"></div>
              <h4>Delivery</h4>
              <p>Refining and delivering professional assets that are ready to make an impact.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* ===================== WHY CHOOSE US ===================== */}
      <section id="why" style={{ background: 'var(--denim)', color: 'var(--pure)' }}>
        <div className="wrap">
          <div className="why-grid">
            <div className="why-visual reveal">
              <img src="/assets/why-image.jpg" alt="Brandor abstract" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
            </div>
            <div className="reveal">
              <p className="eyebrow" style={{ color: 'var(--orange)' }}>Why Organizations Choose Us</p>
              <h2 style={{ marginBottom: '32px', color: 'var(--pure)' }} className="gsap-split">We don't just record events we capture impact.</h2>
              <div className="why-list">
                <div className="why-item">
                  <div className="why-icon" style={{ background: 'var(--turquoise)' }}>P</div>
                  <div><h4 style={{ color: 'var(--orange)' }}>Professional Documentation</h4><p style={{ color: 'var(--pure)', opacity: 0.8 }}>Every project is planned, executed, and delivered to the highest professional standards.</p></div>
                </div>
                <div className="why-item">
                  <div className="why-icon" style={{ background: 'var(--turquoise)' }}>Q</div>
                  <div><h4 style={{ color: 'var(--orange)' }}>High-Quality Production</h4><p style={{ color: 'var(--pure)', opacity: 0.8 }}>We prioritize quality at every stage, from concept development to final delivery.</p></div>
                </div>
                <div className="why-item">
                  <div className="why-icon" style={{ background: 'var(--turquoise)' }}>S</div>
                  <div><h4 style={{ color: 'var(--orange)' }}>Strategic Storytelling</h4><p style={{ color: 'var(--pure)', opacity: 0.8 }}>We transform activities, projects, and events into stories that resonate with audiences.</p></div>
                </div>
                <div className="why-item">
                  <div className="why-icon" style={{ background: 'var(--turquoise)' }}>N</div>
                  <div><h4 style={{ color: 'var(--orange)' }}>NGO &amp; Development Expertise</h4><p style={{ color: 'var(--pure)', opacity: 0.8 }}>We understand development programs, donor expectations, and impact communication.</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
