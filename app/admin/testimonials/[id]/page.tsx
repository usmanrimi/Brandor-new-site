export const dynamic = "force-dynamic";
import React from 'react'
import { updateTestimonial } from './actions'
import Link from 'next/link'
import * as Icons from 'lucide-react'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function EditTestimonial({ params }: { params: { id: string } }) {
  const item = await prisma.testimonial.findUnique({
    where: { id: params.id }
  })

  if (!item) {
    return <div>Testimonial not found</div>
  }

  return (
    <div>
      <header className="admin-header" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Link href="/admin/testimonials" style={{ color: 'var(--admin-text-light)' }}><Icons.ArrowLeft size={24} /></Link>
        <div>
          <h1 style={{ margin: 0 }}>Edit Testimonial</h1>
          <p style={{ margin: 0 }}>Update details for this testimonial.</p>
        </div>
      </header>

      <div className="admin-card">
        <form action={updateTestimonial}>
          <input type="hidden" name="id" value={item.id} />
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" name="name" className="form-control" defaultValue={item.name} required />
            </div>

            <div className="form-group">
              <label htmlFor="company">Company / Organization</label>
              <input type="text" id="company" name="company" className="form-control" defaultValue={item.company} required />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="role">Role / Position</label>
            <input type="text" id="role" name="role" className="form-control" defaultValue={item.role} required />
          </div>

          <div className="form-group">
            <label htmlFor="content">Testimonial Content</label>
            <textarea id="content" name="content" className="form-control" rows={4} defaultValue={item.content} required></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="imageUrl">Profile Image URL</label>
            <input type="text" id="imageUrl" name="imageUrl" className="form-control" defaultValue={item.imageUrl || ''} />
          </div>

          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '16px' }}>
            <input type="checkbox" id="featured" name="featured" defaultChecked={item.featured} style={{ width: '20px', height: '20px' }} />
            <label htmlFor="featured" style={{ margin: 0 }}>Feature this Testimonial</label>
          </div>

          <div style={{ marginTop: '32px', display: 'flex', gap: '16px', justifyContent: 'flex-end', borderTop: '1px solid var(--admin-border)', paddingTop: '24px' }}>
            <Link href="/admin/testimonials" className="btn-admin" style={{ background: 'transparent', color: 'var(--admin-text-light)', border: '1px solid var(--admin-border)' }}>Cancel</Link>
            <button type="submit" className="btn-admin"><Icons.Save size={18} /> Update Testimonial</button>
          </div>
        </form>
      </div>
    </div>
  )
}
