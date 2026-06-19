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
    <div className="door-frame">
      <div className="arch-outer"></div>
      <div className="arch-inner">
        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(180deg, #FD8916 30%, rgba(23,59,97,0.5))' }}></div>
      </div>
      <div className="door-dot"></div>
      <div className="floating-tag">
        <div><strong>Now documenting</strong>Capacity-building workshop · Kano</div>
        <div>EST. BRANDOR</div>
      </div>
    </div>
  </div>
</section>

{/* ===================== MARQUEE ===================== */}
<div className="marquee">
  <div className="marquee-track">
    <span>Event Coverage</span><span>Media Production</span><span>Brand Identity</span><span>Documentary Storytelling</span><span>Social Media Branding</span>
    <span>Event Coverage</span><span>Media Production</span><span>Brand Identity</span><span>Documentary Storytelling</span><span>Social Media Branding</span>
  </div>
</div>

{/* ===================== SERVICES ===================== */}
<section id="services">
  <div className="wrap">
    <div className="section-head reveal">
      <p className="eyebrow">What We Do</p>
      <h2 className="gsap-split">Core services</h2>
      <p>Three doors into the same goal helping your organization show its work clearly, professionally, and memorably.</p>
    </div>
    <div className="services-grid">

      <div className="service-card reveal stagger-1">
        <div className="service-arch"></div>
        <h3>Corporate Event Coverage</h3>
        <p className="desc">Full documentation for trainings, workshops, conferences, and community programs so your impact reaches stakeholders and donors.</p>
        <ul>
          <li>Professional photography</li>
          <li>Full event video recording</li>
          <li>Speaker &amp; participant interviews</li>
          <li>Behind-the-scenes footage</li>
        </ul>
      </div>

      <div className="service-card reveal stagger-2">
        <div className="service-arch"></div>
        <h3>Media Production</h3>
        <p className="desc">We turn raw footage into content that tells the full story built for reports, social channels, and program archives.</p>
        <ul>
          <li>Documentary-style coverage</li>
          <li>Interview recordings</li>
          <li>Promotional videos</li>
          <li>Highlight reels</li>
        </ul>
      </div>

      <div className="service-card reveal stagger-3">
        <div className="service-arch"></div>
        <h3>Branding &amp; Creative</h3>
        <p className="desc">A strong, recognizable identity for your organization designed to carry your mission across every platform.</p>
        <ul>
          <li>Brand identity development</li>
          <li>Logo design</li>
          <li>Visual storytelling</li>
          <li>Social media branding</li>
        </ul>
      </div>

    </div>
  </div>
</section>

{/* ===================== APPROACH ===================== */}
<section id="approach" className="approach">
  <div className="wrap">
    <div className="section-head reveal">
      <p className="eyebrow">How We Work</p>
      <h2 className="gsap-split">Our approach</h2>
      <p>Every event and every brand has a story worth telling. Here's how we find it and bring it through.</p>
    </div>
    <div className="timeline">
      <div className="step reveal stagger-1">
        <div className="step-arch"></div>
        <h4>Understand the program</h4>
        <p>We study the objectives and goals of your event or organization before a single frame is shot.</p>
      </div>
      <div className="step reveal stagger-2">
        <div className="step-arch"></div>
        <h4>Strategic documentation</h4>
        <p>We capture key moments, speakers, and participant engagement with intention.</p>
      </div>
      <div className="step reveal stagger-3">
        <div className="step-arch"></div>
        <h4>Creative storytelling</h4>
        <p>Footage and images become meaningful visual narratives — not just raw clips.</p>
      </div>
      <div className="step reveal stagger-4">
        <div className="step-arch"></div>
        <h4>Professional delivery</h4>
        <p>High-quality media ready for reports, social media, and organizational documentation.</p>
      </div>
    </div>
  </div>
</section>

{/* ===================== WHY US ===================== */}
<section id="why">
  <div className="wrap">
    <div className="why-grid">
      <div className="why-visual reveal">
        <img src="/assets/icon-n.png" alt="Brandor icon" />
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
      <p className="eyebrow">Who We Work With</p>
      <h2 className="gsap-split">Built for organizations doing real work</h2>
      <p>From grassroots initiatives to large institutions, Brandor partners with teams who need their work seen and understood.</p>
    </div>
    <div className="client-pills reveal">
      <div className="client-pill">NGOs</div>
      <div className="client-pill">Development Programs</div>
      <div className="client-pill">Businesses &amp; Entrepreneurs</div>
      <div className="client-pill">Institutions &amp; Training Orgs</div>
      <div className="client-pill">Community Initiatives</div>
    </div>
    <div className="partner-logos reveal">
      <img src="/assets/icon-n.png" alt="Partner logo" className="partner-logo" />
      <img src="/assets/icon-n.png" alt="Partner logo" className="partner-logo" />
      <img src="/assets/icon-n.png" alt="Partner logo" className="partner-logo" />
      <img src="/assets/icon-n.png" alt="Partner logo" className="partner-logo" />
      <img src="/assets/icon-n.png" alt="Partner logo" className="partner-logo" />
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
