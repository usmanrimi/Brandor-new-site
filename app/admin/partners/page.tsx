import React from 'react'
import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import * as Icons from 'lucide-react'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

async function deletePartner(formData: FormData) {
  'use server'
  const id = formData.get('id') as string
  if (id) {
    await prisma.partner.delete({ where: { id } })
    revalidatePath('/admin/partners')
    revalidatePath('/')
  }
}

export default async function AdminPartners() {
  const partners = await prisma.partner.findMany({ orderBy: { order: 'asc' } })

  return (
    <div>
      <header className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Clients & Partners</h1>
          <p>Manage the logos of organizations you've worked with.</p>
        </div>
        <Link href="/admin/partners/new" className="btn-admin">
          <Icons.Plus size={18} /> Add Partner
        </Link>
      </header>

      <div className="admin-card" style={{ padding: '0' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ paddingLeft: '24px', width: '80px' }}>Logo</th>
              <th>Organization Name</th>
              <th>Website URL</th>
              <th>Order</th>
              <th style={{ paddingRight: '24px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {partners.map(partner => (
              <tr key={partner.id}>
                <td style={{ paddingLeft: '24px' }}>
                  <div style={{ width: '60px', height: '40px', background: '#f8fafc', borderRadius: '4px', border: '1px solid var(--admin-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    <img src={partner.logoUrl} alt={partner.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                  </div>
                </td>
                <td style={{ fontWeight: '500', color: 'var(--admin-primary)' }}>{partner.name}</td>
                <td style={{ color: 'var(--admin-text-light)' }}>
                  {partner.websiteUrl ? (
                    <a href={partner.websiteUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--admin-primary)', textDecoration: 'underline' }}>{partner.websiteUrl}</a>
                  ) : 'N/A'}
                </td>
                <td><span style={{ background: '#f8fafc', border: '1px solid var(--admin-border)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>{partner.order}</span></td>
                <td style={{ paddingRight: '24px', textAlign: 'right' }}>
                  <form action={deletePartner} style={{ display: 'inline' }}>
                    <input type="hidden" name="id" value={partner.id} />
                    <button type="submit" style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Icons.Trash2 size={18} /></button>
                  </form>
                </td>
              </tr>
            ))}
            {partners.length === 0 && (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: '40px', color: 'var(--admin-text-light)' }}>No partners added yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
