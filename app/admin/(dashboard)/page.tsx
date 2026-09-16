import React from 'react'
import { PrismaClient } from '@prisma/client'
import * as Icons from 'lucide-react'
import Link from 'next/link'

export const dynamic = "force-dynamic";


const prisma = new PrismaClient()

export default async function AdminDashboard() {
  // Fetch dashboard stats
  const projectCount = await prisma.project.count()
  const teamCount = await prisma.teamMember.count()
  const testimonialCount = await prisma.testimonial.count()
  const partnerCount = await prisma.partner.count()

  // Fetch recent activities (dummy combined for now)
  const recentProjects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' }, take: 3 })

  return (
    <div>
      <header className="admin-header">
        <h1>Overview</h1>
        <p>Welcome back! Here's what's happening with Brandor.</p>
      </header>
      
      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-icon"><Icons.Briefcase size={24} /></div>
          <div className="stat-info">
            <h3>Total Projects</h3>
            <p>{projectCount}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon"><Icons.Users size={24} /></div>
          <div className="stat-info">
            <h3>Team Members</h3>
            <p>{teamCount}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon"><Icons.MessageSquare size={24} /></div>
          <div className="stat-info">
            <h3>Testimonials</h3>
            <p>{testimonialCount}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon"><Icons.Handshake size={24} /></div>
          <div className="stat-info">
            <h3>Partners</h3>
            <p>{partnerCount}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-widgets">
        <div className="widget">
          <h3><Icons.Activity size={20} /> Recent Activities</h3>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Name</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentProjects.map(project => (
                <tr key={project.id}>
                  <td><span style={{ background: '#e0f2fe', color: '#0284c7', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>Project</span></td>
                  <td style={{ fontWeight: 500 }}>{project.title}</td>
                  <td style={{ color: 'var(--admin-text-light)', fontSize: '0.9rem' }}>{new Date(project.createdAt).toLocaleDateString()}</td>
                  <td><Link href={`/admin/projects/${project.id}`} style={{ color: 'var(--admin-primary)', fontWeight: '600' }}>Edit</Link></td>
                </tr>
              ))}
              {recentProjects.length === 0 && (
                <tr><td colSpan={4} style={{ textAlign: 'center', color: '#64748b' }}>No recent activity.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="widget">
          <h3><Icons.Image size={20} /> Latest Media</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ aspectRatio: '1', background: '#e2e8f0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <Icons.ImageIcon color="#94a3b8" />
            </div>
            <div style={{ aspectRatio: '1', background: '#e2e8f0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <Icons.ImageIcon color="#94a3b8" />
            </div>
          </div>
          <Link href="/admin/media" className="btn-admin" style={{ width: '100%', justifyContent: 'center', marginTop: '16px', background: '#f1f5f9', color: 'var(--admin-primary)' }}>
            Manage Library
          </Link>
        </div>
      </div>
    </div>
  )
}
