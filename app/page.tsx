export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="hero">
        <div className="wrap">
          <div>
            <p className="eyebrow">Kano · Creative Media Agency</p>
            <h1 className="gsap-split">Every program has a story. We open the <span className="accent">door</span> to tell it.</h1>
            <p className="lead">Brandor is a creative media and branding team helping NGOs, institutions, and businesses across Africa document their work, capture their impact, and build a brand worth remembering.</p>
            <div className="btn-row">
              <a href="/contact" className="btn btn-primary">Book a Project</a>
              <a href="/services" className="btn btn-outline">Explore Services</a>
            </div>
          </div>
          
          <div className="hero-visual">
            <img src="/assets/hero-image.jpg" alt="Brandor Media Production" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 20px 40px rgba(23,59,97,0.1)' }} />
          </div>
        </div>
      </section>

      {/* ===================== MARQUEE ===================== */}
      <div className="marquee">
        <div className="marquee-track">
          <span>Branding</span>
          <span>Storytelling</span>
          <span>Documentation</span>
          <span>Media Production</span>
          <span>Creative Direction</span>
          <span>Strategy</span>
          <span>Branding</span>
          <span>Storytelling</span>
          <span>Documentation</span>
          <span>Media Production</span>
          <span>Creative Direction</span>
          <span>Strategy</span>
        </div>
      </div>

      {/* ===================== WHY US / GATEWAY ===================== */}
      <section id="why" style={{ paddingBottom: '60px' }}>
        <div className="wrap">
          <div className="why-grid">
            <div className="why-visual reveal">
              <img src="/assets/why-image.jpg" alt="Brandor abstract" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
            </div>
            <div className="reveal">
              <p className="eyebrow">Why Organizations Choose Us</p>
              <h2 style={{ marginBottom: '32px' }} className="gsap-split">We don't just record events we capture impact.</h2>
              <p style={{ color: 'var(--ink)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '24px' }}>
                At Brandor, we specialize in high-end media production, strategic storytelling, and event documentation tailored for the unique needs of NGOs, development agencies, and corporate institutions. 
              </p>
              <div className="btn-row">
                <a href="/about" className="btn btn-outline">Read Our Story</a>
                <a href="/projects" className="btn btn-primary">View Our Portfolio</a>
              </div>
            </div>
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
          <div className="partner-logos reveal stagger-2">
            <img src="/assets/partners/p1.png" alt="Partner Logo" className="partner-logo" />
            <img src="/assets/partners/p2.png" alt="Partner Logo" className="partner-logo" />
            <img src="/assets/partners/p3.png" alt="Partner Logo" className="partner-logo" />
          </div>
        </div>
      </section>
    </>
  )
}
