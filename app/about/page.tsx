export const dynamic = "force-dynamic";

export default function About() {
  return (
    <div style={{ paddingTop: '120px' }}>
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
      
      <section id="why" style={{ background: '#fff' }}>
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
    </div>
  )
}
