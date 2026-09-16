import React from 'react'
import { createTestimonial } from './actions'
import Link from 'next/link'
import * as Icons from 'lucide-react'
import MediaPicker from '../../components/MediaPicker'

export default function NewTestimonial() {
  return (
    <div>
      <header className="admin-header" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Link href="/admin/testimonials" style={{ color: 'var(--admin-text-light)' }}><Icons.ArrowLeft size={24} /></Link>
        <div>
          <h1 style={{ margin: 0 }}>Add Testimonial</h1>
          <p style={{ margin: 0 }}>Publish a new success story from a client.</p>
        </div>
      </header>

      <div className="admin-card">
        <form action={createTestimonial}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div className="form-group">
              <label htmlFor="name">Client Name</label>
              <input type="text" id="name" name="name" className="form-control" placeholder="e.g. Aisha Bello" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="role">Client Position/Role</label>
              <input type="text" id="role" name="role" className="form-control" placeholder="e.g. CEO" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="company">Organization/Company</label>
              <input type="text" id="company" name="company" className="form-control" placeholder="e.g. TechNova" required />
            </div>

            <MediaPicker name="imageUrl" label="Profile Image (Optional)" />
          </div>
          
          <div className="form-group">
            <label htmlFor="content">Testimonial Quote</label>
            <textarea id="content" name="content" className="form-control" rows={4} placeholder="Brandor completely transformed our visual identity..." required></textarea>
          </div>

          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '24px', background: '#f8fafc', padding: '16px', borderRadius: '8px' }}>
            <input type="checkbox" id="featured" name="featured" style={{ width: '20px', height: '20px', accentColor: 'var(--admin-primary)' }} />
            <div>
              <label htmlFor="featured" style={{ margin: 0, fontSize: '1rem' }}>Feature this testimonial</label>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--admin-text-light)' }}>Featured testimonials may be displayed on the homepage or highlighted.</p>
            </div>
          </div>

          <div style={{ marginTop: '32px', display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
            <Link href="/admin/testimonials" className="btn-admin" style={{ background: 'transparent', color: 'var(--admin-text-light)', border: '1px solid var(--admin-border)' }}>Cancel</Link>
            <button type="submit" className="btn-admin"><Icons.Save size={18} /> Save Testimonial</button>
          </div>
        </form>
      </div>
    </div>
  )
}
