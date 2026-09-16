export const dynamic = "force-dynamic";
import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import * as Icons from 'lucide-react'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

async function deleteTestimonial(formData: FormData) {
  'use server'
  const id = formData.get('id') as string
  if (id) {
    await prisma.testimonial.delete({ where: { id } })
    revalidatePath('/admin/testimonials')
    revalidatePath('/testimonials')
  }
}

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <div>
      <header className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Client Testimonials</h1>
          <p>Manage success stories and quotes from your clients.</p>
        </div>
        <Link href="/admin/testimonials/new" className="btn-admin">
          <Icons.Plus size={18} /> Add Testimonial
        </Link>
      </header>

      <div className="admin-card" style={{ padding: '0' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ paddingLeft: '24px' }}>Client</th>
              <th>Organization</th>
              <th>Content Snippet</th>
              <th>Featured</th>
              <th style={{ paddingRight: '24px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map(testimonial => (
              <tr key={testimonial.id}>
                <td style={{ paddingLeft: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {testimonial.imageUrl ? (
                      <img src={testimonial.imageUrl} alt={testimonial.name} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--admin-accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyItems: 'center', fontSize: '0.9rem', fontWeight: 'bold' }}>
                        {testimonial.name.charAt(0)}
                      </div>
                    )}
                    <span style={{ fontWeight: '500', color: 'var(--admin-primary)' }}>{testimonial.name}</span>
                  </div>
                </td>
                <td>
                  <span style={{ display: 'block', fontWeight: '500' }}>{testimonial.company}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--admin-text-light)' }}>{testimonial.role}</span>
                </td>
                <td style={{ maxWidth: '300px' }}>
                  <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--admin-text-light)' }}>
                    "{testimonial.content}"
                  </div>
                </td>
                <td>
                  {testimonial.featured ? 
                    <Icons.Star size={18} color="var(--admin-accent)" fill="var(--admin-accent)" /> : 
                    <Icons.Star size={18} color="#cbd5e1" />
                  }
                </td>
                <td style={{ paddingRight: '24px', textAlign: 'right' }}>
                  <Link href={`/admin/testimonials/${testimonial.id}`} style={{ color: 'var(--admin-text-light)', marginRight: '16px' }}><Icons.Edit size={18} /></Link>
                  <form action={deleteTestimonial} style={{ display: 'inline' }}>
                    <input type="hidden" name="id" value={testimonial.id} />
                    <button type="submit" style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Icons.Trash2 size={18} /></button>
                  </form>
                </td>
              </tr>
            ))}
            {testimonials.length === 0 && (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: '40px', color: 'var(--admin-text-light)' }}>No testimonials found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
