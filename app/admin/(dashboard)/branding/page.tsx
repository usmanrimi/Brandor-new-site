export const dynamic = "force-dynamic";
import React from 'react'
import { PrismaClient } from '@prisma/client'
import { updateBranding } from './actions'
import * as Icons from 'lucide-react'
import MediaPicker from '../components/MediaPicker'

const prisma = new PrismaClient()

export default async function BrandingSettingsPage() {
  const settings = await prisma.setting.findUnique({
    where: { id: 'global' }
  })

  const logoUrl = settings?.logoUrl || ''
  const faviconUrl = settings?.faviconUrl || ''

  return (
    <div>
      <header className="admin-header">
        <h1>Website Branding</h1>
        <p>Manage your global website logo and favicon here.</p>
      </header>

      <div className="admin-card">
        <form action={updateBranding}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            <div>
              <h3>Website Logo</h3>
              <p style={{ color: 'var(--admin-text-light)', fontSize: '0.9rem', marginBottom: '16px' }}>This logo will appear in the navigation bar and footer.</p>
              <MediaPicker name="logoUrl" defaultValue={logoUrl} label="Logo Image" />
            </div>

            <div>
              <h3>Website Favicon</h3>
              <p style={{ color: 'var(--admin-text-light)', fontSize: '0.9rem', marginBottom: '16px' }}>This icon appears in the browser tab. Recommended size: 32x32px or 64x64px.</p>
              <MediaPicker name="faviconUrl" defaultValue={faviconUrl} label="Favicon Image" />
            </div>
          </div>

          <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--admin-border)', paddingTop: '24px' }}>
            <button type="submit" className="btn-admin"><Icons.Save size={18} /> Save Branding</button>
          </div>
        </form>
      </div>
    </div>
  )
}
