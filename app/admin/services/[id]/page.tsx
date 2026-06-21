export const dynamic = "force-dynamic";
import React from 'react'
import { updateService } from './actions'
import Link from 'next/link'
import * as Icons from 'lucide-react'
import { PrismaClient } from '@prisma/client'
import MediaPicker from '../../components/MediaPicker'

const prisma = new PrismaClient()

export default async function EditService({ params }: { params: { id: string } }) {
  const service = await prisma.service.findUnique({
    where: { id: params.id }
  })

  if (!service) {
    return <div>Service not found</div>
  }

  return (
    <div>
      <header className="admin-header" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Link href="/admin/services" style={{ color: 'var(--admin-text-light)' }}><Icons.ArrowLeft size={24} /></Link>
        <div>
          <h1 style={{ margin: 0 }}>Edit Service</h1>
          <p style={{ margin: 0 }}>Update details for {service.title}.</p>
        </div>
      </header>

      <div className="admin-card">
        <form action={updateService}>
          <input type="hidden" name="id" value={service.id} />
          
          <div className="form-group">
            <label htmlFor="title">Service Title</label>
            <input type="text" id="title" name="title" className="form-control" defaultValue={service.title} required />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" className="form-control" rows={3} defaultValue={service.description} required></textarea>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <MediaPicker name="imageUrl" defaultValue={service.imageUrl || ''} label="Service Featured Image" />
            
            <div className="form-group">
              <label htmlFor="order">Display Order</label>
              <input type="number" id="order" name="order" className="form-control" defaultValue={service.order} required />
            </div>
          </div>

          <div style={{ marginTop: '32px', display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
            <Link href="/admin/services" className="btn-admin" style={{ background: 'transparent', color: 'var(--admin-text-light)', border: '1px solid var(--admin-border)' }}>Cancel</Link>
            <button type="submit" className="btn-admin"><Icons.Save size={18} /> Update Service</button>
          </div>
        </form>
      </div>
    </div>
  )
}
