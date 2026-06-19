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
          <a href="/admin/projects" className="admin-btn" style={{ display: 'inline-block', textDecoration: 'none', textAlign: 'center' }}>Manage Projects</a>
        </div>
        
        <div className="admin-card">
          <h2>Services</h2>
          <p>Update your core documentation and storytelling services.</p>
          <a href="/admin/services" className="admin-btn" style={{ display: 'inline-block', textDecoration: 'none', textAlign: 'center' }}>Manage Services</a>
        </div>
        
        <div className="admin-card">
          <h2>Team Members</h2>
          <p>Add new team members and edit their profiles.</p>
          <a href="/admin/team" className="admin-btn" style={{ display: 'inline-block', textDecoration: 'none', textAlign: 'center' }}>Manage Team</a>
        </div>
        
        <div className="admin-card">
          <h2>Testimonials</h2>
          <p>Manage client success stories and reviews.</p>
          <a href="/admin/testimonials" className="admin-btn" style={{ display: 'inline-block', textDecoration: 'none', textAlign: 'center' }}>Manage Testimonials</a>
        </div>
      </div>
    </div>
  )
}
