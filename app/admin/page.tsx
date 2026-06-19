import React from 'react'

export default function AdminDashboard() {
  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Brandor Super Admin</h1>
        <p>Manage your premium agency website content</p>
      </header>
      
      <div className="admin-grid">
        <div className="admin-card">
          <h2>Portfolio Projects</h2>
          <p>Manage your case studies, event coverage, and documentaries.</p>
          <button className="admin-btn">Manage Projects</button>
        </div>
        
        <div className="admin-card">
          <h2>Services</h2>
          <p>Update your 8 core documentation and storytelling services.</p>
          <button className="admin-btn">Manage Services</button>
        </div>
        
        <div className="admin-card">
          <h2>Partner Logos</h2>
          <p>Add new logos to the animated partner showcase marquee.</p>
          <button className="admin-btn">Manage Partners</button>
        </div>

        <div className="admin-card">
          <h2>Blog & Insights</h2>
          <p>Publish impact stories and project updates.</p>
          <button className="admin-btn">Manage Posts</button>
        </div>
        
        <div className="admin-card">
          <h2>Testimonials</h2>
          <p>Manage client success stories and reviews.</p>
          <button className="admin-btn">Manage Testimonials</button>
        </div>
        
        <div className="admin-card">
          <h2>Global Settings</h2>
          <p>Update SEO, WhatsApp contact, and core site info.</p>
          <button className="admin-btn">Edit Settings</button>
        </div>
      </div>
    </div>
  )
}
