export const dynamic = "force-dynamic";
import React from 'react'
import { updateInitiative } from './actions'
import Link from 'next/link'
import * as Icons from 'lucide-react'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function EditInitiative({ params }: { params: { id: string } }) {
  const item = await prisma.initiative.findUnique({
    where: { id: params.id }
  })

  if (!item) {
    return <div>Initiative not found</div>
  }

  return (
    <div>
      <header className="admin-header" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Link href="/admin/initiatives" style={{ color: 'var(--admin-text-light)' }}><Icons.ArrowLeft size={24} /></Link>
        <div>
          <h1 style={{ margin: 0 }}>Edit Initiative</h1>
          <p style={{ margin: 0 }}>Update details for {item.title}.</p>
        </div>
      </header>

      <div className="admin-card">
        <form action={updateInitiative}>
          <input type="hidden" name="id" value={item.id} />
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div className="form-group">
              <label htmlFor="title">Initiative Title</label>
              <input type="text" id="title" name="title" className="form-control" defaultValue={item.title} required />
            </div>

            <div className="form-group">
              <label htmlFor="type">Initiative Type</label>
              <select id="type" name="type" className="form-control" defaultValue={item.type} required>
                <option value="Program">Program</option>
                <option value="Workshop">Workshop</option>
                <option value="Community Service">Community Service</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" className="form-control" rows={4} defaultValue={item.description} required></textarea>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input type="text" id="date" name="date" className="form-control" defaultValue={item.date || ''} />
            </div>
            
            <div className="form-group">
              <label htmlFor="imageUrl">Cover Image URL</label>
              <input type="text" id="imageUrl" name="imageUrl" className="form-control" defaultValue={item.imageUrl || ''} />
            </div>
          </div>

          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '16px' }}>
            <input type="checkbox" id="featured" name="featured" defaultChecked={item.featured} style={{ width: '20px', height: '20px' }} />
            <label htmlFor="featured" style={{ margin: 0 }}>Feature this Initiative</label>
          </div>

          <div style={{ marginTop: '32px', display: 'flex', gap: '16px', justifyContent: 'flex-end', borderTop: '1px solid var(--admin-border)', paddingTop: '24px' }}>
            <Link href="/admin/initiatives" className="btn-admin" style={{ background: 'transparent', color: 'var(--admin-text-light)', border: '1px solid var(--admin-border)' }}>Cancel</Link>
            <button type="submit" className="btn-admin"><Icons.Save size={18} /> Update Initiative</button>
          </div>
        </form>
      </div>
    </div>
  )
}
