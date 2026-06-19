export const dynamic = "force-dynamic";
import { PrismaClient } from '@prisma/client'
import { createTestimonial, deleteTestimonial } from '../actions'

const prisma = new PrismaClient()

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Manage Testimonials</h1>
      <a href="/admin" style={{ color: 'blue', textDecoration: 'underline', marginBottom: '20px', display: 'inline-block' }}>&larr; Back to Dashboard</a>
      
      <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', marginBottom: '40px' }}>
        <h3>Add New Testimonial</h3>
        <form action={createTestimonial} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
          <input type="text" name="name" placeholder="Client Name" required style={{ padding: '8px' }} />
          <input type="text" name="role" placeholder="Client Role" required style={{ padding: '8px' }} />
          <input type="text" name="company" placeholder="Company Name" required style={{ padding: '8px' }} />
          <input type="text" name="imageUrl" placeholder="Image URL (Optional)" style={{ padding: '8px' }} />
          <textarea name="content" placeholder="Testimonial Quote" required style={{ padding: '8px' }}></textarea>
          <button type="submit" style={{ padding: '10px', background: 'var(--orange)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Add Testimonial</button>
        </form>
      </div>

      <h3>Current Testimonials</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr style={{ background: '#e2e8f0', textAlign: 'left' }}>
            <th style={{ padding: '10px' }}>Name</th>
            <th style={{ padding: '10px' }}>Company</th>
            <th style={{ padding: '10px' }}>Quote</th>
            <th style={{ padding: '10px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {testimonials.map(testimonial => (
            <tr key={testimonial.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '10px' }}>{testimonial.name}</td>
              <td style={{ padding: '10px' }}>{testimonial.company}</td>
              <td style={{ padding: '10px' }}>{testimonial.content.substring(0, 50)}...</td>
              <td style={{ padding: '10px' }}>
                <form action={async () => { 'use server'; await deleteTestimonial(testimonial.id) }}>
                  <button type="submit" style={{ padding: '5px 10px', background: 'red', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
