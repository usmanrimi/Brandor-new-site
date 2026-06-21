import React from 'react'
import { createProject } from './actions'
import Link from 'next/link'
import * as Icons from 'lucide-react'
import MediaPicker from '../../components/MediaPicker'

export default function NewProject() {
  return (
    <div>
      <header className="admin-header" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Link href="/admin/projects" style={{ color: 'var(--admin-text-light)' }}><Icons.ArrowLeft size={24} /></Link>
        <div>
          <h1 style={{ margin: 0 }}>Add New Project</h1>
          <p style={{ margin: 0 }}>Create a new portfolio entry for your agency.</p>
        </div>
      </header>

      <div className="admin-card">
        <form action={createProject}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div className="form-group">
              <label htmlFor="title">Project Title</label>
              <input type="text" id="title" name="title" className="form-control" placeholder="e.g. Brandor Corporate Identity" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="client">Client Name</label>
              <input type="text" id="client" name="client" className="form-control" placeholder="e.g. Brandor" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select id="category" name="category" className="form-control">
                <option value="Branding">Branding</option>
                <option value="Media Production">Media Production</option>
                <option value="Event Documentation">Event Documentation</option>
                <option value="Strategic Storytelling">Strategic Storytelling</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="date">Completion Date</label>
              <input type="text" id="date" name="date" className="form-control" placeholder="e.g. October 2023" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input type="text" id="location" name="location" className="form-control" placeholder="e.g. Kano, Nigeria" required />
            </div>

            <MediaPicker name="images" label="Featured Image" />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Project Description</label>
            <textarea id="description" name="description" className="form-control" rows={5} placeholder="Describe the challenge, the solution, and the impact..." required></textarea>
          </div>

          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '24px', background: '#f8fafc', padding: '16px', borderRadius: '8px' }}>
            <input type="checkbox" id="featured" name="featured" style={{ width: '20px', height: '20px', accentColor: 'var(--admin-primary)' }} />
            <div>
              <label htmlFor="featured" style={{ margin: 0, fontSize: '1rem' }}>Feature this project</label>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--admin-text-light)' }}>Featured projects display a star badge and may be highlighted on the homepage.</p>
            </div>
          </div>

          <div style={{ marginTop: '32px', display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
            <Link href="/admin/projects" className="btn-admin" style={{ background: 'transparent', color: 'var(--admin-text-light)', border: '1px solid var(--admin-border)' }}>Cancel</Link>
            <button type="submit" className="btn-admin"><Icons.Save size={18} /> Save Project</button>
          </div>
        </form>
      </div>
    </div>
  )
}
