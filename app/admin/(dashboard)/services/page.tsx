export const dynamic = "force-dynamic";
import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import * as Icons from 'lucide-react'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

async function deleteService(formData: FormData) {
  'use server'
  const id = formData.get('id') as string
  if (id) {
    await prisma.service.delete({ where: { id } })
    revalidatePath('/admin/services')
    revalidatePath('/services')
    revalidatePath('/')
  }
}

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { order: 'asc' } })

  return (
    <div>
      <header className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Services Management</h1>
          <p>Define the core capabilities and offerings of your agency.</p>
        </div>
        <Link href="/admin/services/new" className="btn-admin">
          <Icons.Plus size={18} /> Add Service
        </Link>
      </header>

      <div className="admin-card" style={{ padding: '0' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ paddingLeft: '24px', width: '80px' }}>Image</th>
              <th>Service Name</th>
              <th>Description Snippet</th>
              <th>Order</th>
              <th style={{ paddingRight: '24px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map(service => (
              <tr key={service.id}>
                <td style={{ paddingLeft: '24px' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '8px', background: '#f1f5f9', overflow: 'hidden', border: '1px solid var(--admin-border)' }}>
                    {service.imageUrl ? (
                      <img src={service.imageUrl} alt={service.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icons.Image size={20} color="#cbd5e1" />
                      </div>
                    )}
                  </div>
                </td>
                <td style={{ fontWeight: '600', color: 'var(--admin-primary)' }}>{service.title}</td>
                <td style={{ maxWidth: '300px' }}>
                  <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--admin-text-light)' }}>
                    {service.description}
                  </div>
                </td>
                <td><span style={{ background: '#f8fafc', border: '1px solid var(--admin-border)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>{service.order}</span></td>
                <td style={{ paddingRight: '24px', textAlign: 'right' }}>
                  <Link href={`/admin/services/${service.id}`} style={{ color: 'var(--admin-text-light)', marginRight: '16px' }}><Icons.Edit size={18} /></Link>
                  <form action={deleteService} style={{ display: 'inline' }}>
                    <input type="hidden" name="id" value={service.id} />
                    <button type="submit" style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Icons.Trash2 size={18} /></button>
                  </form>
                </td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: '40px', color: 'var(--admin-text-light)' }}>No services defined.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
