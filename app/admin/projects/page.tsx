import { PrismaClient } from '@prisma/client'
import { createProject, deleteProject } from '../actions'

const prisma = new PrismaClient()

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Manage Projects</h1>
      <a href="/admin" style={{ color: 'blue', textDecoration: 'underline', marginBottom: '20px', display: 'inline-block' }}>&larr; Back to Dashboard</a>
      
      <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', marginBottom: '40px' }}>
        <h3>Add New Project</h3>
        <form action={createProject} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
          <input type="text" name="title" placeholder="Project Title" required style={{ padding: '8px' }} />
          <input type="text" name="client" placeholder="Client Name" required style={{ padding: '8px' }} />
          <input type="text" name="category" placeholder="Category (e.g. Event Documentation)" required style={{ padding: '8px' }} />
          <input type="text" name="date" placeholder="Date (e.g. Oct 2023)" required style={{ padding: '8px' }} />
          <input type="text" name="location" placeholder="Location" required style={{ padding: '8px' }} />
          <input type="text" name="images" placeholder="Image URL (e.g. /assets/portfolio/1.jpg)" required style={{ padding: '8px' }} />
          <textarea name="description" placeholder="Project Description" required style={{ padding: '8px' }}></textarea>
          <button type="submit" style={{ padding: '10px', background: 'var(--orange)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Add Project</button>
        </form>
      </div>

      <h3>Current Projects</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr style={{ background: '#e2e8f0', textAlign: 'left' }}>
            <th style={{ padding: '10px' }}>Image</th>
            <th style={{ padding: '10px' }}>Title</th>
            <th style={{ padding: '10px' }}>Client</th>
            <th style={{ padding: '10px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(project => (
            <tr key={project.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '10px' }}><img src={project.images} width="40" style={{ borderRadius: '4px' }} /></td>
              <td style={{ padding: '10px' }}>{project.title}</td>
              <td style={{ padding: '10px' }}>{project.client}</td>
              <td style={{ padding: '10px' }}>
                <form action={async () => { 'use server'; await deleteProject(project.id) }}>
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
