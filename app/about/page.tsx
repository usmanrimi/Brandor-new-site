export const dynamic = "force-dynamic";

import { prisma } from '@/lib/prisma'
import * as LucideIcons from 'lucide-react'
import VideoEmbed from '@/components/VideoEmbed'

export default async function About() {
  let aboutContent = await prisma.aboutContent.findUnique({ where: { id: 'global' } })

  const defaultCoreValues = [
    'Creativity & Innovation: Developing fresh, imaginative media and visual solutions that elevate African narratives and capture audience attention.',
    'Inclusion & Accessibility: Championing accessible storytelling and inclusive media practices that empower marginalized communities, youths, and persons with disabilities.',
    'Integrity & Accountability: Upholding absolute transparency, honesty, and professional responsibility in every client partnership, donor engagement, and project delivery.',
    'Excellence & Professionalism: Delivering uncompromising craft, broadcast-grade production standards, and meticulous attention to detail in all our work.',
    'Purpose-Driven Storytelling: Transforming real human experiences, programs, and social impact into compelling narratives that drive meaningful change.',
    'Collaboration & Empowerment: Partnering closely with organizations, institutions, and communities to build lasting capacity, shared ownership, and mutual growth.'
  ].join('\n')

  // Fallback in case DB fields are empty
  if (!aboutContent) {
    aboutContent = {
      id: 'global',
      aboutText: "Brandor is a creative branding, media production, and storytelling agency dedicated to helping organizations, businesses, institutions, and development partners communicate their impact with clarity, creativity, and purpose.\n\nWe believe every project, every event, and every initiative has a story worth telling. Our role is to transform moments, achievements, and ideas into compelling visual experiences that inspire trust, engagement, and action.\n\nFrom corporate branding and media production to event documentation, strategic storytelling, and capacity building, we help our clients showcase their work professionally while creating meaningful connections with their audiences.",
      mission: "To empower brands, organizations, and communities through strategic branding, impactful storytelling, professional media production, and capacity-building initiatives that drive visibility, growth, and lasting impact.",
      vision: "To become Africa's leading creative agency for branding, storytelling, and impact documentation, helping organizations communicate their value, amplify their achievements, and inspire positive change.",
      coreValues: defaultCoreValues,
      process: "",
      whyUs: "",
      aboutHeroImage: "/assets/hero-image.jpg",
      whyUsImage: "/assets/why-image.jpg",
      updatedAt: new Date()
    }
  }

  // Ensure core values are always populated with the 6 approved values
  const activeCoreValues = (aboutContent.coreValues && aboutContent.coreValues.trim().length > 10 && aboutContent.coreValues !== '[]') 
    ? aboutContent.coreValues 
    : defaultCoreValues

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
    if (t.includes('creativity') || t.includes('innovation')) return LucideIcons.Lightbulb
    if (t.includes('inclusion') || t.includes('accessibility')) return LucideIcons.HeartHandshake
    if (t.includes('integrity') || t.includes('accountability')) return LucideIcons.ShieldCheck
    if (t.includes('excellence') || t.includes('professionalism')) return LucideIcons.Award
    if (t.includes('purpose') || t.includes('storytelling')) return LucideIcons.BookOpen
    if (t.includes('collaboration') || t.includes('empowerment')) return LucideIcons.Users
    return LucideIcons.Sparkles
  }

  const agencyVideoUrl = "https://youtu.be/uVEWo6469eE?si=hV8RhfGhOBR24KRO"

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
            <div>
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

            {/* Right Column: Hero Photograph */}
            <div style={{
              width: '100%',
              height: '420px',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(23, 59, 97, 0.12)',
              border: '1px solid rgba(23, 59, 97, 0.08)'
            }}>
              <img 
                src={aboutContent.aboutHeroImage || "/assets/hero-image.jpg"} 
                alt="Brandor Creative Agency Team in Action" 
                loading="lazy" 
                decoding="async" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===================== THREE ALIGNED PANELS FOR ABOUT PARAGRAPHS ===================== */}
      <section style={{ padding: '40px 0 80px', background: 'var(--pure)' }}>
        <div className="wrap" style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
            gap: '28px'
          }}>
            {paragraphs.map((para, i) => {
              const isDark = i === 1
              return (
                <div 
                  key={i}
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

      {/* ===================== AGENCY INTRODUCTION VIDEO ===================== */}
      <section id="agency-video" style={{ padding: '80px 0', background: '#f8fafc', borderTop: '1px solid rgba(23, 59, 97, 0.06)', borderBottom: '1px solid rgba(23, 59, 97, 0.06)' }}>
        <div className="wrap" style={{ maxWidth: '1080px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px' }}>
            <span className="eyebrow" style={{ color: 'var(--orange)', justifyContent: 'center', marginBottom: '12px' }}>
              Brandor in Action
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: 'var(--denim)', marginBottom: '16px' }}>
              See how we capture impact.
            </h2>
            <p style={{ color: 'var(--ink)', opacity: 0.85, fontSize: '1.1rem', lineHeight: 1.7 }}>
              Watch our agency introduction video to explore how we document developmental programs, empower communities, and craft memorable visual narratives across Africa.
            </p>
          </div>

          <div style={{ maxWidth: '880px', margin: '0 auto' }}>
            <VideoEmbed 
              url={agencyVideoUrl}
              title="Brandor Creative Agency — Introduction Video"
              aspectRatio="16/9"
              customThumbnail="/assets/hero-image.jpg"
            />
          </div>
        </div>
      </section>

      {/* ===================== MISSION & VISION ===================== */}
      <section id="mission-vision" style={{ background: 'var(--denim)', padding: '100px 0', color: 'var(--pure)' }}>
        <div className="wrap" style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '60px', marginBottom: '80px' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(253, 137, 22, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--orange)' }}>
                  <LucideIcons.Compass size={22} />
                </div>
                <h3 style={{ color: 'var(--orange)', margin: 0, fontFamily: 'var(--display)', fontSize: '2rem' }}>Our Mission</h3>
              </div>
              <p style={{ lineHeight: '1.8', opacity: '0.92', fontSize: '1.1rem' }}>{aboutContent.mission}</p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(253, 137, 22, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--orange)' }}>
                  <LucideIcons.Eye size={22} />
                </div>
                <h3 style={{ color: 'var(--orange)', margin: 0, fontFamily: 'var(--display)', fontSize: '2rem' }}>Our Vision</h3>
              </div>
              <p style={{ lineHeight: '1.8', opacity: '0.92', fontSize: '1.1rem' }}>{aboutContent.vision}</p>
            </div>
          </div>

          {/* ===================== CORE VALUES (ITEM 7) ===================== */}
          <div style={{ borderTop: '1px solid rgba(255, 235, 208, 0.12)', paddingTop: '64px' }}>
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
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '28px'
            }}>
              {activeCoreValues.split('\n').map((line, idx) => {
                if (!line.trim()) return null
                const parts = line.split(':')
                const title = parts[0].trim()
                const desc = parts.slice(1).join(':').trim()
                const Icon = getCoreValueIcon(title)

                return (
                  <div 
                    key={idx} 
                    style={{ 
                      backgroundColor: 'rgba(255, 235, 208, 0.05)',
                      border: '1px solid rgba(255, 235, 208, 0.12)',
                      borderRadius: '16px',
                      padding: '28px 24px',
                      display: 'flex', 
                      gap: '18px', 
                      alignItems: 'flex-start',
                      transition: 'background-color 0.2s ease, transform 0.2s ease'
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
                      flexShrink: 0,
                      boxShadow: '0 4px 14px rgba(253, 137, 22, 0.3)'
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
                          opacity: 0.88, 
                          lineHeight: 1.65,
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

      {/* ===================== PROCESS (ITEM 8: REMOVE 'THE PROCESS', KEEP 'HOW WE BRING YOUR VISION TO LIFE') ===================== */}
      <section id="approach" className="approach" style={{ padding: '100px 0', background: 'var(--turquoise)', color: 'var(--pure)' }}>
        <div className="wrap" style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 24px' }}>
          <div className="section-head" style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 60px' }}>
            <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', color: 'var(--pure)', marginBottom: '16px' }}>
              How We Bring Your Vision to Life
            </h2>
            <p style={{ color: 'var(--pure)', opacity: 0.9, fontSize: '1.1rem', lineHeight: 1.7 }}>
              A systematic, collaborative approach to ensure every deliverable hits the mark, respects community context, and exceeds stakeholder expectations.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px'
          }}>
            {[
              {
                step: '01',
                title: 'Discovery',
                desc: 'Deep-dive into your goals, audience, stakeholders, and the core impact message you need to communicate.'
              },
              {
                step: '02',
                title: 'Strategy',
                desc: 'Developing a creative and strategic roadmap tailored to your specific institutional or corporate objectives.'
              },
              {
                step: '03',
                title: 'Production',
                desc: 'Executing the creative work through broadcast-standard branding, photography, videography, and content creation.'
              },
              {
                step: '04',
                title: 'Delivery',
                desc: 'Refining, packaging, and delivering professional digital and print assets that are immediately ready to make an impact.'
              }
            ].map((stage, idx) => (
              <div 
                key={idx}
                style={{
                  backgroundColor: 'rgba(23, 59, 97, 0.4)',
                  border: '1px solid rgba(255, 235, 208, 0.15)',
                  borderRadius: '16px',
                  padding: '32px 24px',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px'
                }}>
                  <span style={{
                    fontFamily: 'var(--mono)',
                    fontSize: '1rem',
                    color: 'var(--orange)',
                    fontWeight: 700,
                    letterSpacing: '0.1em'
                  }}>
                    {stage.step}
                  </span>
                  <div style={{
                    width: '32px',
                    height: '2px',
                    backgroundColor: 'var(--orange)',
                    borderRadius: '1px'
                  }} />
                </div>

                <h4 style={{
                  fontFamily: 'var(--display)',
                  fontSize: '1.35rem',
                  fontWeight: 700,
                  color: 'var(--pure)',
                  margin: 0
                }}>
                  {stage.title}
                </h4>

                <p style={{
                  fontSize: '0.95rem',
                  opacity: 0.88,
                  lineHeight: 1.65,
                  margin: 0,
                  color: 'var(--pure)'
                }}>
                  {stage.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* ===================== WHY CHOOSE US ===================== */}
      <section id="why" style={{ background: 'var(--denim)', color: 'var(--pure)', padding: '100px 0' }}>
        <div className="wrap" style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 24px' }}>
          <div className="why-grid">
            <div className="why-visual">
              <img 
                src={aboutContent?.whyUsImage || "/assets/why-image.jpg"} 
                alt="Why Organizations Choose Brandor" 
                loading="lazy" 
                decoding="async" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} 
              />
            </div>
            <div>
              <h2 style={{ marginBottom: '16px', color: 'var(--pure)', fontSize: '2.8rem', position: 'relative', display: 'inline-block' }}>
                Why Organizations Choose Us
                <div style={{ position: 'absolute', bottom: '-8px', left: '0', width: '60px', height: '4px', background: 'var(--orange)', borderRadius: '2px' }}></div>
              </h2>
              <p style={{ fontSize: '1.2rem', color: 'var(--pure)', opacity: 0.9, marginBottom: '40px', marginTop: '24px' }}>
                We don't just record events — we capture impact.
              </p>
              <div className="why-list">
                <div className="why-item">
                  <div className="why-icon" style={{ background: 'transparent', color: 'var(--orange)' }}><LucideIcons.Camera size={36} strokeWidth={1.5} /></div>
                  <div><h4 style={{ color: 'var(--orange)' }}>Professional Documentation</h4><p style={{ color: 'var(--pure)', opacity: 0.85 }}>Every project is planned, executed, and delivered to the highest professional standards.</p></div>
                </div>
                <div className="why-item">
                  <div className="why-icon" style={{ background: 'transparent', color: 'var(--orange)' }}><LucideIcons.Award size={36} strokeWidth={1.5} /></div>
                  <div><h4 style={{ color: 'var(--orange)' }}>High-Quality Production</h4><p style={{ color: 'var(--pure)', opacity: 0.85 }}>We prioritize quality at every stage, from concept development to final broadcast-ready delivery.</p></div>
                </div>
                <div className="why-item">
                  <div className="why-icon" style={{ background: 'transparent', color: 'var(--orange)' }}><LucideIcons.Megaphone size={36} strokeWidth={1.5} /></div>
                  <div><h4 style={{ color: 'var(--orange)' }}>Strategic Storytelling</h4><p style={{ color: 'var(--pure)', opacity: 0.85 }}>We transform activities, projects, and events into stories that resonate with donors and audiences.</p></div>
                </div>
                <div className="why-item">
                  <div className="why-icon" style={{ background: 'transparent', color: 'var(--orange)' }}><LucideIcons.Globe size={36} strokeWidth={1.5} /></div>
                  <div><h4 style={{ color: 'var(--orange)' }}>NGO &amp; Development Expertise</h4><p style={{ color: 'var(--pure)', opacity: 0.85 }}>We understand development programs, donor expectations, and community-centered communication.</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
