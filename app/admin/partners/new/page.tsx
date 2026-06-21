import React from 'react'
import { createPartner } from './actions'
import Link from 'next/link'
import * as Icons from 'lucide-react'
import MediaPicker from '../../components/MediaPicker'

export default function NewPartner() {
  return (
    <div>
      <header className="admin-header" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Link href="/admin/partners" style={{ color: 'var(--admin-text-light)' }}><Icons.ArrowLeft size={24} /></Link>
        <div>
          <h1 style={{ margin: 0 }}>Add Partner</h1>
          <p style={{ margin: 0 }}>Upload a new client or partner logo.</p>
        </div>
      </header>

      <div className="admin-card">
        <form action={createPartner}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div className="form-group">
              <label htmlFor="name">Organization Name</label>
              <input type="text" id="name" name="name" className="form-control" placeholder="e.g. World Health Organization" required />
            </div>
            
            <MediaPicker name="logoUrl" label="Logo Image" />
            
            <div className="form-group">
              <label htmlFor="websiteUrl">Website URL (Optional)</label>
              <input type="url" id="websiteUrl" name="websiteUrl" className="form-control" placeholder="https://..." />
            </div>

            <div className="form-group">
              <label htmlFor="order">Display Order</label>
              <input type="number" id="order" name="order" className="form-control" placeholder="0" defaultValue={0} required />
            </div>
          </div>
          
          <div style={{ marginTop: '32px', display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
            <Link href="/admin/partners" className="btn-admin" style={{ background: 'transparent', color: 'var(--admin-text-light)', border: '1px solid var(--admin-border)' }}>Cancel</Link>
            <button type="submit" className="btn-admin"><Icons.Save size={18} /> Save Partner</button>
          </div>
        </form>
      </div>
    </div>
  )
}
