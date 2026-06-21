import React from 'react'
import { createTeamMember } from './actions'
import Link from 'next/link'
import * as Icons from 'lucide-react'
import MediaPicker from '../../components/MediaPicker'

export default function NewTeamMember() {
  return (
    <div>
      <header className="admin-header" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Link href="/admin/team" style={{ color: 'var(--admin-text-light)' }}><Icons.ArrowLeft size={24} /></Link>
        <div>
          <h1 style={{ margin: 0 }}>Add Team Member</h1>
          <p style={{ margin: 0 }}>Add a new profile to your agency roster.</p>
        </div>
      </header>

      <div className="admin-card">
        <form action={createTeamMember}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" name="name" className="form-control" placeholder="e.g. Maryam Ado Wada" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="role">Position</label>
              <input type="text" id="role" name="role" className="form-control" placeholder="e.g. Communications Officer" required />
            </div>

            <MediaPicker name="imageUrl" label="Profile Image" />
          </div>
          
          <div className="form-group">
            <label htmlFor="bio">Biography</label>
            <textarea id="bio" name="bio" className="form-control" rows={4} placeholder="Short professional biography..."></textarea>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div className="form-group">
              <label htmlFor="linkedinUrl">LinkedIn URL (Optional)</label>
              <input type="url" id="linkedinUrl" name="linkedinUrl" className="form-control" placeholder="https://linkedin.com/in/..." />
            </div>
            
            <div className="form-group">
              <label htmlFor="twitterUrl">Twitter/X URL (Optional)</label>
              <input type="url" id="twitterUrl" name="twitterUrl" className="form-control" placeholder="https://twitter.com/..." />
            </div>
          </div>

          <div style={{ marginTop: '32px', display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
            <Link href="/admin/team" className="btn-admin" style={{ background: 'transparent', color: 'var(--admin-text-light)', border: '1px solid var(--admin-border)' }}>Cancel</Link>
            <button type="submit" className="btn-admin"><Icons.Save size={18} /> Save Member</button>
          </div>
        </form>
      </div>
    </div>
  )
}
