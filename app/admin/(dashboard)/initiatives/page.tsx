export const dynamic = "force-dynamic";
import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import * as Icons from 'lucide-react'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

async function deleteInitiative(formData: FormData) {
  'use server'
  const id = formData.get('id') as string
  if (id) {
    await prisma.initiative.delete({ where: { id } })
    revalidatePath('/admin/initiatives')
  }
}

export default async function AdminInitiativesPage() {
  const initiatives = await prisma.initiative.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <div>
      <header className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Initiatives Management</h1>
          <p>Manage your Programs, Workshops, and Community Services.</p>
        </div>
        <Link href="/admin/initiatives/new" className="btn-admin">
          <Icons.Plus size={18} /> Add Initiative
        </Link>
      </header>

      <div className="admin-card" style={{ padding: '0' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ paddingLeft: '24px' }}>Title</th>
              <th>Type</th>
              <th>Date</th>
              <th>Featured</th>
              <th style={{ paddingRight: '24px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {initiatives.map(item => (
              <tr key={item.id}>
                <td style={{ paddingLeft: '24px', fontWeight: '500', color: 'var(--admin-primary)' }}>{item.title}</td>
                <td><span style={{ background: '#f8fafc', padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>{item.type}</span></td>
                <td>{item.date || '-'}</td>
                <td>
                  {item.featured ? <Icons.Star size={18} color="var(--admin-accent)" fill="var(--admin-accent)" /> : <Icons.Star size={18} color="#cbd5e1" />}
                </td>
                <td style={{ paddingRight: '24px', textAlign: 'right' }}>
                  <Link href={`/admin/initiatives/${item.id}`} style={{ color: 'var(--admin-text-light)', marginRight: '16px' }}><Icons.Edit size={18} /></Link>
                  <form action={deleteInitiative} style={{ display: 'inline' }}>
                    <input type="hidden" name="id" value={item.id} />
                    <button type="submit" style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Icons.Trash2 size={18} /></button>
                  </form>
                </td>
              </tr>
            ))}
            {initiatives.length === 0 && (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: '40px', color: 'var(--admin-text-light)' }}>No initiatives found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
