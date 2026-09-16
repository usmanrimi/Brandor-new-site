export const dynamic = "force-dynamic";
import React from 'react'
import { updateProject } from './actions'
import Link from 'next/link'
import * as Icons from 'lucide-react'
import { PrismaClient } from '@prisma/client'
import MediaPicker from '../../../components/MediaPicker'

const prisma = new PrismaClient()

export default async function EditProject({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id }
  })

  if (!project) {
    return <div>Project not found</div>
  }

  return (
    <div>
      <header className="admin-header" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Link href="/admin/projects" style={{ color: 'var(--admin-text-light)' }}><Icons.ArrowLeft size={24} /></Link>
        <div>
          <h1 style={{ margin: 0 }}>Edit Project</h1>
          <p style={{ margin: 0 }}>Update portfolio project details.</p>
        </div>
      </header>

      <div className="admin-card">
        <form action={updateProject}>
          <input type="hidden" name="id" value={project.id} />
          
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
            <div>
              <div className="form-group">
                <label htmlFor="title">Project Title</label>
                <input type="text" id="title" name="title" className="form-control" defaultValue={project.title} required />
              </div>
              
              <div className="form-group">
                <label htmlFor="description">Project Description & Story</label>
                <textarea id="description" name="description" className="form-control" rows={8} defaultValue={project.description} required></textarea>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px', marginTop: '24px', background: '#f8fafc', padding: '16px', borderRadius: '8px' }}>
                <div className="form-group">
                  <MediaPicker name="pdfUrl" defaultValue={project.pdfUrl || ''} label="PDF Report (Optional)" accept="application/pdf" />
                  <p style={{ margin: '0', fontSize: '0.85rem', color: 'var(--admin-text-light)' }}>Select a PDF report or paste an external link.</p>
                </div>
                
                <div className="form-group">
                  <label htmlFor="videoUrl">Video Link (Optional)</label>
                  <input type="text" id="videoUrl" name="videoUrl" className="form-control" placeholder="https://youtube.com/..." defaultValue={project.videoUrl || ''} />
                  <p style={{ margin: '8px 0 0 0', fontSize: '0.85rem', color: 'var(--admin-text-light)' }}>Link to an external video for this project.</p>
                </div>

                <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
                  <input type="checkbox" id="isPdfPublished" name="isPdfPublished" style={{ width: '20px', height: '20px', accentColor: 'var(--admin-primary)' }} defaultChecked={project.isPdfPublished} />
                  <div>
                    <label htmlFor="isPdfPublished" style={{ margin: 0, fontSize: '1rem' }}>Publish Report & Video</label>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--admin-text-light)' }}>Allow visitors to view the PDF/Video on the public site.</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="form-group">
                <label htmlFor="client">Client / Organization</label>
                <input type="text" id="client" name="client" className="form-control" defaultValue={project.client} required />
              </div>
              
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select id="category" name="category" className="form-control" defaultValue={project.category} required>
                  <option value="Media Production">Media Production</option>
                  <option value="Branding">Branding</option>
                  <option value="Event Documentation">Event Documentation</option>
                  <option value="Creative Direction">Creative Direction</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label htmlFor="date">Date / Year</label>
                  <input type="text" id="date" name="date" className="form-control" defaultValue={project.date} required />
                </div>
                <div className="form-group">
                  <label htmlFor="location">Location</label>
                  <input type="text" id="location" name="location" className="form-control" defaultValue={project.location} required />
                </div>
              </div>

              <MediaPicker name="images" defaultValue={project.images} label="Featured Image" />

              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '32px' }}>
                <input type="checkbox" id="featured" name="featured" defaultChecked={project.featured} style={{ width: '20px', height: '20px' }} />
                <label htmlFor="featured" style={{ margin: 0 }}>Feature on Homepage</label>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '32px', display: 'flex', gap: '16px', justifyContent: 'flex-end', borderTop: '1px solid var(--admin-border)', paddingTop: '24px' }}>
            <Link href="/admin/projects" className="btn-admin" style={{ background: 'transparent', color: 'var(--admin-text-light)', border: '1px solid var(--admin-border)' }}>Cancel</Link>
            <button type="submit" className="btn-admin"><Icons.Save size={18} /> Update Project</button>
          </div>
        </form>
      </div>
    </div>
  )
}
