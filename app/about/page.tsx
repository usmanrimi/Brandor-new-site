export const dynamic = "force-dynamic";

import { PrismaClient } from '@prisma/client'
import * as LucideIcons from 'lucide-react'

const prisma = new PrismaClient()

export default async function About() {
  let aboutContent = await prisma.aboutContent.findUnique({ where: { id: 'global' } })

  // Fallback in case the DB is empty or migrating
  if (!aboutContent) {
    aboutContent = {
      id: 'global',
      aboutText: "Brandor is a creative branding, media production, and storytelling agency dedicated to helping organizations, businesses, institutions, and development partners communicate their impact with clarity, creativity, and purpose.\n\nWe believe every project, every event, and every initiative has a story worth telling. Our role is to transform moments, achievements, and ideas into compelling visual experiences that inspire trust, engagement, and action.\n\nFrom corporate branding and media production to event documentation, strategic storytelling, and capacity building, we help our clients showcase their work professionally while creating meaningful connections with their audiences.",
      mission: "To empower brands, organizations, and communities through strategic branding, impactful storytelling, professional media production, and capacity-building initiatives that drive visibility, growth, and lasting impact.",
      vision: "To become Africa's leading creative agency for branding, storytelling, and impact documentation, helping organizations communicate their value, amplify their achievements, and inspire positive change.",
      coreValues: "Creativity with Purpose: We turn ideas into meaningful visuals and stories that serve clear goals.\nQuality & Craft: We bring care, consistency, and attention to detail to every project.\nIntegrity & Trust: We work honestly, communicate clearly, and honour our commitments.\nCollaboration: We listen closely and work with our clients as creative partners.\nAuthentic Storytelling: We represent people, organisations, and their experiences with accuracy and respect.\nLearning & Innovation: We keep improving our skills and exploring better ways to create and communicate.",
      process: "",
      whyUs: "",
      aboutHeroImage: "/assets/hero-image.jpg",
      whyUsImage: "/assets/why-image.jpg",
      updatedAt: new Date()
    }
  }

  // Extract the 3 existing About paragraphs
  const rawParagraphs = (aboutContent.aboutText || '')
    .split('\n')
    .map(p => p.trim())
    .filter(Boolean)

  const paragraphs = [
    rawParagraphs[0] || "Brandor is a creative branding, media production, and storytelling agency dedicated to helping organizations, businesses, institutions, and development partners communicate their impact with clarity, creativity, and purpose.",
    rawParagraphs[1] || "We believe every project, every event, and every initiative has a story worth telling. Our role is to transform moments, achievements, and ideas into compelling visual experiences that inspire trust, engagement, and action.",
    rawParagraphs[2] || "From corporate branding and media production to event documentation, strategic storytelling, and capacity building, we help our clients showcase their work professionally while creating meaningful connections with their audiences."
  ]

  const panelHeaders = [
    "Clarity & Purpose",
    "Transforming Stories",
    "Meaningful Connections"
  ]

  const getCoreValueIcon = (title: string) => {
    const t = title.toLowerCase()
    if (t.includes('creativity') || t.includes('purpose')) return LucideIcons.Lightbulb
    if (t.includes('quality') || t.includes('craft') || t.includes('excellence')) return LucideIcons.Award
    if (t.includes('integrity') || t.includes('trust')) return LucideIcons.ShieldCheck
    if (t.includes('collaboration')) return LucideIcons.Users
    if (t.includes('story') || t.includes('authentic')) return LucideIcons.BookOpen
    if (t.includes('learning') || t.includes('innovation')) return LucideIcons.Sparkles
    if (t.includes('impact')) return LucideIcons.Target
    return LucideIcons.CheckCircle
  }

  return (
    <div style={{ paddingTop: '100px' }}>
      
      {/* ===================== ABOUT HERO: BALANCED 2-COLUMN INTRO ===================== */}
      <section id="about-hero" style={{ padding: '80px 0 60px', background: 'var(--pure)' }}>
        <div className="wrap" style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '56px',
            alignItems: 'center'
          }}>
            {/* Left Column: Heading & Core Introduction */}
            <div className="reveal">
              <p className="eyebrow" style={{ color: 'var(--orange)', marginBottom: '14px', letterSpacing: '0.14em' }}>
                About Us
              </p>
              <h2 style={{
                fontSize: '1.25rem',
                color: 'var(--orange)',
                marginBottom: '14px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase'
              }}>
                Brandor Creative Agency
              </h2>
              <h1 style={{
                fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
                fontFamily: 'var(--display)',
                color: 'var(--denim)',
                lineHeight: 1.15,
                marginBottom: '24px',
                fontWeight: 800
              }}>
                Your Ultimate Branding Door
              </h1>
              <p style={{
                fontSize: '1.15rem',
                lineHeight: 1.8,
                color: 'var(--ink)',
                opacity: 0.88,
                maxWidth: '540px'
              }}>
                We exist to help vision-driven brands, development organizations, and institutions tell stories that inspire confidence, foster connection, and leave an enduring mark.
              </p>
            </div>

            {/* Right Column: Hero Photograph with Super Admin Customization */}
            <div className="reveal" style={{
              width: '100%',
              height: '420px',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(23, 59, 97, 0.12)',
              border: '1px solid rgba(23, 59, 97, 0.08)'
            }}>
              <img 
                src={aboutContent.aboutHeroImage || "/assets/hero-image.jpg"} 
                alt="Brandor Creative Agency Team" 
                loading="lazy" 
                decoding="async" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===================== THREE ALIGNED PANELS FOR ABOUT PARAGRAPHS ===================== */}
      <section style={{ padding: '40px 0 90px', background: 'var(--pure)' }}>
        <div className="wrap" style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
            gap: '28px'
          }}>
            {paragraphs.map((para, i) => {
              // Alternating coordinated cream, navy, and orange treatments
              const isDark = i === 1
              return (
                <div 
                  key={i}
                  className="reveal"
                  style={{
                    backgroundColor: isDark ? 'var(--denim)' : '#ffffff',
                    color: isDark ? 'var(--pure)' : 'var(--denim)',
                    border: isDark ? '1px solid var(--denim)' : '1px solid rgba(23, 59, 97, 0.1)',
                    borderRadius: '16px',
                    padding: '36px 30px',
                    boxShadow: '0 10px 30px rgba(23, 59, 97, 0.06)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    transition: 'transform 0.3s ease'
                  }}
                >
                  <div style={{
                    width: '40px',
                    height: '4px',
                    backgroundColor: 'var(--orange)',
                    borderRadius: '2px',
                    marginBottom: '20px'
                  }} />

                  <h3 style={{
                    fontFamily: 'var(--display)',
                    fontSize: '1.45rem',
                    fontWeight: 700,
                    marginBottom: '16px',
                    color: isDark ? '#ffffff' : 'var(--denim)'
                  }}>
                    {panelHeaders[i]}
                  </h3>

                  <p style={{
                    fontSize: '1.02rem',
                    lineHeight: 1.75,
                    color: isDark ? 'var(--pure)' : 'var(--ink)',
                    opacity: isDark ? 0.92 : 0.85,
                    margin: 0
                  }}>
                    {para}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===================== MISSION & VISION ===================== */}
      <section id="mission-vision" style={{ background: 'var(--denim)', padding: '100px 0', color: 'var(--pure)' }}>
        <div className="wrap" style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '60px', marginBottom: '80px' }}>
            
            <div className="reveal stagger-1" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(253, 137, 22, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--orange)' }}>
                  <LucideIcons.Compass size={22} />
                </div>
                <h3 style={{ color: 'var(--orange)', margin: 0, fontFamily: 'var(--display)', fontSize: '2rem' }}>Our Mission</h3>
              </div>
              <p style={{ lineHeight: '1.8', opacity: '0.92', fontSize: '1.1rem' }}>{aboutContent.mission}</p>
            </div>
            
            <div className="reveal stagger-2" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(253, 137, 22, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--orange)' }}>
                  <LucideIcons.Eye size={22} />
                </div>
                <h3 style={{ color: 'var(--orange)', margin: 0, fontFamily: 'var(--display)', fontSize: '2rem' }}>Our Vision</h3>
              </div>
              <p style={{ lineHeight: '1.8', opacity: '0.92', fontSize: '1.1rem' }}>{aboutContent.vision}</p>
            </div>
          </div>

          {/* Core Values Section */}
          <div className="reveal stagger-3" style={{ borderTop: '1px solid rgba(255, 235, 208, 0.12)', paddingTop: '64px' }}>
            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 48px' }}>
              <span className="eyebrow" style={{ color: 'var(--orange)', justifyContent: 'center', marginBottom: '12px' }}>
                What Guides Us
              </span>
              <h2 style={{ color: 'var(--pure)', fontSize: '2.5rem', fontFamily: 'var(--display)', margin: 0 }}>
                Core Values
              </h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '28px'
            }}>
              {aboutContent.coreValues.split('\n').map((line, idx) => {
                if (!line.trim()) return null
                const parts = line.split(':')
                const title = parts[0].trim()
                const desc = (parts[1] || '').trim()
                const Icon = getCoreValueIcon(title)

                return (
                  <div 
                    key={idx} 
                    style={{ 
                      backgroundColor: 'rgba(255, 235, 208, 0.05)',
                      border: '1px solid rgba(255, 235, 208, 0.1)',
                      borderRadius: '16px',
                      padding: '24px',
                      display: 'flex', 
                      gap: '18px', 
                      alignItems: 'flex-start',
                      transition: 'background-color 0.2s ease'
                    }}
                  >
                    <div style={{ 
                      backgroundColor: 'var(--orange)', 
                      color: '#ffffff', 
                      width: '46px',
                      height: '46px', 
                      borderRadius: '12px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Icon size={22} />
                    </div>
                    <div>
                      <h4 style={{ 
                        color: 'var(--orange)', 
                        fontSize: '1.2rem', 
                        fontFamily: 'var(--display)', 
                        margin: '0 0 8px 0',
                        fontWeight: 700 
                      }}>
                        {title}
                      </h4>
                      {desc && (
                        <p style={{ 
                          fontSize: '0.95rem', 
                          color: 'var(--pure)',
                          opacity: 0.85, 
                          lineHeight: 1.6,
                          margin: 0 
                        }}>
                          {desc}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== APPROACH / THE PROCESS ===================== */}
      <section id="approach" className="approach" style={{ padding: '100px 0' }}>
        <div className="wrap" style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 24px' }}>
          <div className="section-head reveal" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px' }}>
            <span className="eyebrow" style={{ color: 'var(--orange)', justifyContent: 'center' }}>The Process</span>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--denim)' }}>How we bring your vision to life.</h2>
            <p style={{ color: 'var(--ink)', opacity: 0.85 }}>A systematic, collaborative approach to ensure every deliverable hits the mark and exceeds expectations.</p>
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
      <section id="why" style={{ background: 'var(--denim)', color: 'var(--pure)', padding: '100px 0' }}>
        <div className="wrap" style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 24px' }}>
          <div className="why-grid">
            <div className="why-visual reveal">
              <img src={aboutContent?.whyUsImage || "/assets/why-image.jpg"} alt="Brandor abstract" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
            </div>
            <div className="reveal">
              <h2 style={{ marginBottom: '16px', color: 'var(--pure)', fontSize: '2.8rem', position: 'relative', display: 'inline-block' }} className="gsap-split">
                Why Organizations Choose Us
                <div style={{ position: 'absolute', bottom: '-8px', left: '0', width: '60px', height: '4px', background: 'var(--orange)', borderRadius: '2px' }}></div>
              </h2>
              <p style={{ fontSize: '1.2rem', color: 'var(--pure)', opacity: 0.9, marginBottom: '40px', marginTop: '24px' }}>We don't just record events we capture impact.</p>
              <div className="why-list">
                <div className="why-item">
                  <div className="why-icon" style={{ background: 'transparent', color: 'var(--orange)' }}><LucideIcons.Camera size={36} strokeWidth={1.5} /></div>
                  <div><h4 style={{ color: 'var(--orange)' }}>Professional Documentation</h4><p style={{ color: 'var(--pure)', opacity: 0.8 }}>Every project is planned, executed, and delivered to the highest professional standards.</p></div>
                </div>
                <div className="why-item">
                  <div className="why-icon" style={{ background: 'transparent', color: 'var(--orange)' }}><LucideIcons.Award size={36} strokeWidth={1.5} /></div>
                  <div><h4 style={{ color: 'var(--orange)' }}>High-Quality Production</h4><p style={{ color: 'var(--pure)', opacity: 0.8 }}>We prioritize quality at every stage, from concept development to final delivery.</p></div>
                </div>
                <div className="why-item">
                  <div className="why-icon" style={{ background: 'transparent', color: 'var(--orange)' }}><LucideIcons.Megaphone size={36} strokeWidth={1.5} /></div>
                  <div><h4 style={{ color: 'var(--orange)' }}>Strategic Storytelling</h4><p style={{ color: 'var(--pure)', opacity: 0.8 }}>We transform activities, projects, and events into stories that resonate with audiences.</p></div>
                </div>
                <div className="why-item">
                  <div className="why-icon" style={{ background: 'transparent', color: 'var(--orange)' }}><LucideIcons.Globe size={36} strokeWidth={1.5} /></div>
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
