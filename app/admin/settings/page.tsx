import React from 'react'
import { PrismaClient } from '@prisma/client'
import { updateSettings } from './actions'

const prisma = new PrismaClient()

export default async function AdminSettings() {
  let settings = await prisma.setting.findUnique({ where: { id: 'global' } })

  if (!settings) {
    settings = {
      id: 'global',
      siteName: "Brandor",
      siteDesc: "Creative Media Agency",
      email: "hello@brandor.com",
      whatsapp: "+1234567890",
      address: "Kano State, Nigeria",
      updatedAt: new Date()
    }
  }

  return (
    <div>
      <header className="admin-header">
        <h1>Website Settings</h1>
        <p>Manage your global website configuration, contact info, and SEO details.</p>
      </header>

      <div className="admin-card">
        <form action={updateSettings}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div className="form-group">
              <label htmlFor="siteName">Site Name</label>
              <input type="text" id="siteName" name="siteName" className="form-control" defaultValue={settings.siteName} required />
            </div>
            
            <div className="form-group">
              <label htmlFor="siteDesc">Site Description (SEO)</label>
              <input type="text" id="siteDesc" name="siteDesc" className="form-control" defaultValue={settings.siteDesc} required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Contact Email</label>
              <input type="email" id="email" name="email" className="form-control" defaultValue={settings.email} required />
            </div>

            <div className="form-group">
              <label htmlFor="whatsapp">WhatsApp / Phone Number</label>
              <input type="text" id="whatsapp" name="whatsapp" className="form-control" defaultValue={settings.whatsapp} required />
            </div>
            
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label htmlFor="address">Physical Address</label>
              <textarea id="address" name="address" className="form-control" rows={3} defaultValue={settings.address} required></textarea>
            </div>
          </div>

          <button type="submit" className="btn-admin" style={{ marginTop: '16px' }}>Save Settings</button>
        </form>
      </div>
    </div>
  )
}
