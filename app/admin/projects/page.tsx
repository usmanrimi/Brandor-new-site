export const dynamic = "force-dynamic";
import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import * as Icons from 'lucide-react'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

async function deleteProject(formData: FormData) {
  'use server'
  const id = formData.get('id') as string
  if (id) {
    await prisma.project.delete({ where: { id } })
    revalidatePath('/admin/projects')
    revalidatePath('/projects')
  }
}

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <div>
      <header className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Projects Portfolio</h1>
          <p>Manage your case studies, documentaries, and branding projects.</p>
        </div>
        <Link href="/admin/projects/new" className="btn-admin">
          <Icons.Plus size={18} /> Add New Project
        </Link>
      </header>

      <div className="admin-card" style={{ padding: '0' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid var(--admin-border)', display: 'flex', gap: '16px' }}>
          <div style={{ position: 'relative', flexGrow: 1, maxWidth: '400px' }}>
            <Icons.Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-light)' }} />
            <input type="text" placeholder="Search projects..." className="form-control" style={{ paddingLeft: '48px' }} />
          </div>
          <button className="btn-admin" style={{ background: '#f1f5f9', color: 'var(--admin-text)' }}>
            <Icons.Filter size={18} /> Filter
          </button>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ paddingLeft: '24px' }}>Project Title</th>
              <th>Client</th>
              <th>Category</th>
              <th>Date</th>
              <th>Featured</th>
              <th style={{ paddingRight: '24px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project.id}>
                <td style={{ paddingLeft: '24px', fontWeight: '500', color: 'var(--admin-primary)' }}>{project.title}</td>
                <td>{project.client}</td>
                <td><span style={{ background: '#f1f5f9', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600' }}>{project.category}</span></td>
                <td>{project.date}</td>
                <td>
                  {project.featured ? 
                    <Icons.Star size={18} color="var(--admin-accent)" fill="var(--admin-accent)" /> : 
                    <Icons.Star size={18} color="#cbd5e1" />
                  }
                </td>
                <td style={{ paddingRight: '24px', textAlign: 'right' }}>
                  <Link href={`/admin/projects/${project.id}`} style={{ color: 'var(--admin-text-light)', marginRight: '16px' }}><Icons.Edit size={18} /></Link>
                  <form action={deleteProject} style={{ display: 'inline' }}>
                    <input type="hidden" name="id" value={project.id} />
                    <button type="submit" style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Icons.Trash2 size={18} /></button>
                  </form>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: 'var(--admin-text-light)' }}>No projects found. Add your first project!</td></tr>
            )}
          </tbody>
        </table>
        
        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--admin-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem', color: 'var(--admin-text-light)' }}>
          <span>Showing {projects.length} results</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{ padding: '6px 12px', border: '1px solid var(--admin-border)', borderRadius: '6px', background: '#fff', cursor: 'pointer' }}>Previous</button>
            <button style={{ padding: '6px 12px', border: '1px solid var(--admin-border)', borderRadius: '6px', background: '#fff', cursor: 'pointer' }}>Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}
