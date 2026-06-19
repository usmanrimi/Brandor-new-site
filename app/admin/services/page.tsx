export const dynamic = "force-dynamic";
import { PrismaClient } from '@prisma/client'
import { createService, deleteService } from '../actions'
import * as LucideIcons from 'lucide-react'

const prisma = new PrismaClient()

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { order: 'asc' } })

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Manage Services</h1>
      <a href="/admin" style={{ color: 'blue', textDecoration: 'underline', marginBottom: '20px', display: 'inline-block' }}>&larr; Back to Dashboard</a>
      
      <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', marginBottom: '40px' }}>
        <h3>Add New Service</h3>
        <form action={createService} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
          <input type="text" name="title" placeholder="Service Title" required style={{ padding: '8px' }} />
          <textarea name="description" placeholder="Service Description" required style={{ padding: '8px' }}></textarea>
          <input type="text" name="icon" placeholder="Lucide Icon Name (e.g. Shield, Camera)" required style={{ padding: '8px' }} />
          <input type="number" name="order" placeholder="Display Order (e.g. 1)" required style={{ padding: '8px' }} />
          <button type="submit" style={{ padding: '10px', background: 'var(--orange)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Add Service</button>
        </form>
      </div>

      <h3>Current Services</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr style={{ background: '#e2e8f0', textAlign: 'left' }}>
            <th style={{ padding: '10px' }}>Icon</th>
            <th style={{ padding: '10px' }}>Title</th>
            <th style={{ padding: '10px' }}>Order</th>
            <th style={{ padding: '10px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map(service => {
            const IconComponent = (LucideIcons as any)[service.icon] || LucideIcons.CheckCircle;
            return (
              <tr key={service.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '10px' }}><IconComponent size={24} /></td>
                <td style={{ padding: '10px' }}>{service.title}</td>
                <td style={{ padding: '10px' }}>{service.order}</td>
                <td style={{ padding: '10px' }}>
                  <form action={async () => { 'use server'; await deleteService(service.id) }}>
                    <button type="submit" style={{ padding: '5px 10px', background: 'red', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                  </form>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}
