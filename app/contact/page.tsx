export const dynamic = "force-dynamic";

export default function Contact() {
  return (
    <div style={{ paddingTop: '80px' }}>
      <section id="contact" className="contact" style={{ minHeight: 'calc(100vh - 80px)' }}>
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
              <form id="contactForm" action="#">
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
    </div>
  )
}
