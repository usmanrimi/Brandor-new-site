'use client';

export default function Home() {
  return (
    <>
      {/* Header/Nav will be moved to a component later, keeping it here for now */}
      

{/* Custom Cursor will be added back via React component later */}

{/* Preloader will be added back via React/GSAP component later */}

<header>
  <nav>
    <a href="#" className="logo-mark">
      <img src="/assets/brandor-logo-full.png" alt="Brandor Logo" style={{ height: '48px', borderRadius: '4px' }} />
    </a>
    <div className="nav-links" id="navLinks">
      <a href="#services">Services</a>
      <a href="#approach">Approach</a>
      <a href="#why">Why Brandor</a>
      <a href="#team">Team</a>
      <a href="#clients">Clients</a>
      <a href="#contact" className="nav-cta">Book a Project</a>
    </div>
    <button className="menu-toggle" id="menuToggle" aria-label="Toggle menu">
      <span></span><span></span><span></span>
    </button>
  </nav>
</header>

{/* ===================== HERO ===================== */}
<section className="hero">
  <div className="wrap">
    <div>
      <p className="eyebrow">Kano · Creative Media Agency</p>
      <h1 className="gsap-split">Every program has a story. We open the <span className="accent">door</span> to tell it.</h1>
      <p className="lead">Brandor is a creative media and branding team helping NGOs, institutions, and businesses across Africa document their work, capture their impact, and build a brand worth remembering.</p>
      <div className="btn-row">
        <a href="#contact" className="btn btn-primary">Book a Project</a>
        <a href="#services" className="btn btn-outline">Explore Services</a>
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

{/* ===================== SERVICES ===================== */}
<section id="services">
  <div className="wrap">
    <div className="section-head reveal">
      <span className="eyebrow">Our Services</span>
      <h2>Crafting narratives that leave a mark.</h2>
      <p>We blend strategy, design, and media production to deliver comprehensive branding solutions for agencies, non-profits, and corporate organizations.</p>
    </div>
    <div className="services-grid">
      <div className="service-card reveal stagger-1">
        <div className="service-arch"></div>
        <h3>Corporate Branding</h3>
        <p className="desc">Building strong, memorable brand identities from the ground up.</p>
        <ul>
          <li>Logo & Identity Systems</li>
          <li>Brand Guidelines</li>
          <li>Corporate Profiles</li>
        </ul>
      </div>
      <div className="service-card reveal stagger-2">
        <div className="service-arch"></div>
        <h3>Event Documentation</h3>
        <p className="desc">Capturing the essence of your workshops, conferences, and community programs.</p>
        <ul>
          <li>Professional Photography</li>
          <li>Highlight Video Reels</li>
          <li>Live Streaming Setup</li>
        </ul>
      </div>
      <div className="service-card reveal stagger-3">
        <div className="service-arch"></div>
        <h3>Strategic Storytelling</h3>
        <p className="desc">Translating your impact into compelling narratives for donors and stakeholders.</p>
        <ul>
          <li>Impact Reports</li>
          <li>Documentary Films</li>
          <li>Social Media Content</li>
        </ul>
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
        <p>Developing a comprehensive plan, storyboard, or moodboard tailored to your project.</p>
      </div>
      <div className="step reveal stagger-3">
        <div className="step-arch"></div>
        <h4>Production</h4>
        <p>Executing the creative work—from filming on location to drafting brand guidelines.</p>
      </div>
      <div className="step reveal stagger-4">
        <div className="step-arch"></div>
        <h4>Delivery</h4>
        <p>Polishing, refining, and handing over the final high-quality assets ready for the world.</p>
      </div>
    </div>
  </div>
</section>

{/* ===================== WHY US ===================== */}
<section id="why">
  <div className="wrap">
    <div className="why-grid">
      <div className="why-visual reveal">
        <img src="/assets/why-image.jpg" alt="Brandor abstract" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
      </div>
      <div className="reveal">
        <p className="eyebrow">Why Organizations Choose Us</p>
        <h2 style={{ marginBottom: '32px' }} className="gsap-split">We don't just record events we capture impact.</h2>
        <div className="why-list">
          <div className="why-item">
            <div className="why-icon">P</div>
            <div><h4>Professional documentation</h4><p>Every shoot is planned, executed, and delivered to a professional standard.</p></div>
          </div>
          <div className="why-item">
            <div className="why-icon">Q</div>
            <div><h4>High-quality production</h4><p>From raw footage to final cut, quality is non-negotiable.</p></div>
          </div>
          <div className="why-item">
            <div className="why-icon">S</div>
            <div><h4>Strong storytelling</h4><p>We frame your work as a narrative, not just a record of an event.</p></div>
          </div>
          <div className="why-item">
            <div className="why-icon">N</div>
            <div><h4>NGO &amp; development expertise</h4><p>We understand how programs run — and what donors and partners want to see.</p></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* ===================== TEAM ===================== */}
<section id="team" className="team">
  <div className="wrap">
    <div className="section-head reveal">
      <p className="eyebrow">Our People</p>
      <h2 className="gsap-split">Meet the team behind the lens</h2>
      <p>A collective of storytellers, strategists, and creatives dedicated to elevating your brand's narrative.</p>
    </div>
    <div className="team-grid">
      <div className="team-member reveal stagger-1">
        <div className="team-photo">
          <img src="/assets/team/1.png" alt="Usman Auwal" />
        </div>
        <h4>Usman Auwal</h4>
        <p>Founder</p>
      </div>
      <div className="team-member reveal stagger-2">
        <div className="team-photo">
          <img src="/assets/team/2.jpg" alt="Muhammad Usman Sani" />
        </div>
        <h4>Muhammad Usman Sani</h4>
        <p>Creative Director</p>
      </div>
      <div className="team-member reveal stagger-3">
        <div className="team-photo">
          <img src="/assets/team/3.jpg" alt="Ahmad Muhd Dantata" />
        </div>
        <h4>Ahmad Muhd Dantata</h4>
        <p>Media Producer</p>
      </div>
      <div className="team-member reveal stagger-4">
        <div className="team-photo">
          <img src="/assets/team/4.jpg" alt="Ahmad Ahmad Falaki" />
        </div>
        <h4>Ahmad Ahmad Falaki</h4>
        <p>Video Editor</p>
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

{/* ===================== CONTACT ===================== */}
<section id="contact" className="contact">
  <div className="wrap">
    <div className="contact-grid">
      <div className="reveal">
        <p className="eyebrow">Get In Touch</p>
        <h2 className="gsap-split">Let's open the door to your next project</h2>
        <p className="lead">Tell us about your event or organization, and we'll get back to you with how Brandor can help document and tell your story.</p>

        <div className="contact-detail">
          <div className="dot">@</div>
          <div><strong>Email</strong><span>brandorcreativeagency@gmail.com</span></div>
        </div>
        <div className="contact-detail">
          <div className="dot">L</div>
          <div><strong>Location</strong><span>No 1A Asma'u Yakubu Street, Off Lamido Crescent, Giginyu Junction, Kano State</span></div>
        </div>
      </div>

      <div className="contact-arch reveal">
        <h3>Start a conversation</h3>
        <form id="contactForm" onSubmit={(e) => { e.preventDefault(); alert('Thanks — we will get back to you shortly.'); }}>
          <div className="form-row">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" placeholder="Your name" required />
          </div>
          <div className="form-row">
            <label htmlFor="org">Organization</label>
            <input type="text" id="org" name="org" placeholder="Organization name" />
          </div>
          <div className="form-row">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="you@example.com" required />
          </div>
          <div className="form-row">
            <label htmlFor="service">Service needed</label>
            <select id="service" name="service">
              <option>Event Coverage</option>
              <option>Media Production</option>
              <option>Branding &amp; Creative</option>
              <option>Not sure yet</option>
            </select>
          </div>
          <div className="form-row">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={3} placeholder="Tell us about your project"></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Send Message</button>
        </form>
      </div>
    </div>
  </div>
</section>

{/* ===================== FOOTER ===================== */}
<footer>
  <div className="wrap">
    <div className="footer-grid">
      <a href="#" className="logo-mark">
        <img src="/assets/brandor-logo-full.png" alt="Brandor Logo" style={{ height: '48px', borderRadius: '4px' }} />
      </a>
      <div className="footer-links">
        <a href="#services">Services</a>
        <a href="#approach">Approach</a>
        <a href="#why">Why Brandor</a>
        <a href="#team">Team</a>
        <a href="#clients">Clients</a>
        <a href="#contact">Contact</a>
      </div>
    </div>
    <div className="footer-bottom">
      <span>© 2026 Brandor Your Ultimate Branding Door</span>
      <span>Kano State, Nigeria</span>
    </div>
  </div>
</footer>

{/* Back to Top Button */}
<button className="btt-btn" id="bttBtn" aria-label="Back to top">↑</button>


    </>
  )
}
