export const dynamic = "force-dynamic";

import React from 'react'
import { updatePassword } from './actions'
import * as Icons from 'lucide-react'

export default async function AccountSettings({ searchParams }: { searchParams: Promise<{ error?: string, success?: string }> }) {
  const { error, success } = await searchParams;
  return (
    <div>
      <header className="admin-header">
        <h1>Account Settings</h1>
        <p>Update your super admin password.</p>
      </header>

      <div className="admin-card" style={{ maxWidth: '600px' }}>
        {error && (
          <div style={{ padding: '16px', background: '#fee2e2', color: '#dc2626', borderRadius: '8px', marginBottom: '24px' }}>
            {error}
          </div>
        )}
        {success && (
          <div style={{ padding: '16px', background: '#dcfce7', color: '#16a34a', borderRadius: '8px', marginBottom: '24px' }}>
            {success}
          </div>
        )}

        <form action={updatePassword}>
          <div className="form-group">
            <label htmlFor="currentPassword">Current Password</label>
            <input 
              type="password" 
              id="currentPassword" 
              name="currentPassword" 
              className="form-control" 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input 
              type="password" 
              id="newPassword" 
              name="newPassword" 
              className="form-control" 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword" 
              className="form-control" 
              required 
            />
          </div>

          <div style={{ marginTop: '32px' }}>
            <button type="submit" className="btn-admin">
              <Icons.Save size={18} /> Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
