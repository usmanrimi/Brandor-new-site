import React from 'react'
import { createService } from './actions'
import Link from 'next/link'
import * as Icons from 'lucide-react'

export default function NewService() {
  return (
    <div>
      <header className="admin-header" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Link href="/admin/services" style={{ color: 'var(--admin-text-light)' }}><Icons.ArrowLeft size={24} /></Link>
        <div>
          <h1 style={{ margin: 0 }}>Add Service</h1>
          <p style={{ margin: 0 }}>Define a core capability or offering.</p>
        </div>
      </header>

      <div className="admin-card">
        <form action={createService}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div className="form-group">
              <label htmlFor="title">Service Title</label>
              <input type="text" id="title" name="title" className="form-control" placeholder="e.g. Media Production" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="icon">Lucide Icon Name</label>
              <input type="text" id="icon" name="icon" className="form-control" placeholder="e.g. Video, Camera, PenTool" required />
              <p style={{ fontSize: '0.8rem', color: 'var(--admin-text-light)', marginTop: '4px' }}>Find icon names at lucide.dev/icons</p>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Service Description</label>
            <textarea id="description" name="description" className="form-control" rows={4} placeholder="We deliver high-end video documentation..." required></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="order">Display Order</label>
            <input type="number" id="order" name="order" className="form-control" placeholder="0" style={{ width: '150px' }} defaultValue={0} required />
          </div>

          <div style={{ marginTop: '32px', display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
            <Link href="/admin/services" className="btn-admin" style={{ background: 'transparent', color: 'var(--admin-text-light)', border: '1px solid var(--admin-border)' }}>Cancel</Link>
            <button type="submit" className="btn-admin"><Icons.Save size={18} /> Save Service</button>
          </div>
        </form>
      </div>
    </div>
  )
}
