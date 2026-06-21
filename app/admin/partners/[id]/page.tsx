export const dynamic = "force-dynamic";
import React from 'react'
import { updatePartner } from './actions'
import Link from 'next/link'
import * as Icons from 'lucide-react'
import { PrismaClient } from '@prisma/client'
import MediaPicker from '../../components/MediaPicker'

const prisma = new PrismaClient()

export default async function EditPartner({ params }: { params: { id: string } }) {
  const item = await prisma.partner.findUnique({
    where: { id: params.id }
  })

  if (!item) {
    return <div>Partner not found</div>
  }

  return (
    <div>
      <header className="admin-header" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Link href="/admin/partners" style={{ color: 'var(--admin-text-light)' }}><Icons.ArrowLeft size={24} /></Link>
        <div>
          <h1 style={{ margin: 0 }}>Edit Partner</h1>
          <p style={{ margin: 0 }}>Update details for {item.name}.</p>
        </div>
      </header>

      <div className="admin-card">
        <form action={updatePartner}>
          <input type="hidden" name="id" value={item.id} />
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div className="form-group">
              <label htmlFor="name">Partner Name</label>
              <input type="text" id="name" name="name" className="form-control" defaultValue={item.name} required />
            </div>

            <MediaPicker name="logoUrl" defaultValue={item.logoUrl} label="Logo Image" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div className="form-group">
              <label htmlFor="websiteUrl">Website URL (Optional)</label>
              <input type="url" id="websiteUrl" name="websiteUrl" className="form-control" defaultValue={item.websiteUrl || ''} />
            </div>

            <div className="form-group">
              <label htmlFor="order">Display Order</label>
              <input type="number" id="order" name="order" className="form-control" defaultValue={item.order} required />
            </div>
          </div>

          <div style={{ marginTop: '32px', display: 'flex', gap: '16px', justifyContent: 'flex-end', borderTop: '1px solid var(--admin-border)', paddingTop: '24px' }}>
            <Link href="/admin/partners" className="btn-admin" style={{ background: 'transparent', color: 'var(--admin-text-light)', border: '1px solid var(--admin-border)' }}>Cancel</Link>
            <button type="submit" className="btn-admin"><Icons.Save size={18} /> Update Partner</button>
          </div>
        </form>
      </div>
    </div>
  )
}
