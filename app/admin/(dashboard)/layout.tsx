import '../admin.css'
import type { Metadata } from 'next'
import Link from 'next/link'
import * as Icons from 'lucide-react'
import LogoutButton from '../components/LogoutButton'

export const metadata: Metadata = {
  title: 'Brandor Super Admin Dashboard',
  description: 'Admin dashboard to manage Brandor premium agency site content',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="admin-layout">
      {/* Sidebar Navigation */}
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <img src="/assets/brandor-logo-full.png" alt="Brandor" style={{ maxWidth: '140px' }} />
        </div>
        
        <nav className="sidebar-nav">
          <Link href="/admin" className="nav-item">
            <Icons.LayoutDashboard size={18} /> Overview
          </Link>
          
          <p className="nav-group-label">Pages & Sections</p>
          <Link href="/admin/content/home" className="nav-item">
            <Icons.Home size={18} /> Home Page
          </Link>
          <Link href="/admin/content/about" className="nav-item">
            <Icons.Info size={18} /> About Us
          </Link>
          <Link href="/admin/branding" className="nav-item">
            <Icons.Palette size={18} /> Website Branding
          </Link>
          
          <p className="nav-group-label">Management</p>
          <Link href="/admin/services" className="nav-item">
            <Icons.Layers size={18} /> Services
          </Link>
          <Link href="/admin/projects" className="nav-item">
            <Icons.Briefcase size={18} /> Projects & Reports
          </Link>
          <Link href="/admin/team" className="nav-item">
            <Icons.Users size={18} /> Team
          </Link>
          <Link href="/admin/partners" className="nav-item">
            <Icons.Handshake size={18} /> Partners & Logos
          </Link>

          <p className="nav-group-label">Assets</p>
          <Link href="/admin/media" className="nav-item">
            <Icons.Image size={18} /> Media Library
          </Link>
          
          <p className="nav-group-label">System</p>
          <Link href="/admin/publish" className="nav-item">
            <Icons.UploadCloud size={18} /> Publish to GitHub
          </Link>
          <Link href="/admin/account" className="nav-item">
            <Icons.Settings size={18} /> Account Settings
          </Link>
        </nav>
        
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="avatar">B</div>
            <div>
              <p className="name">Brandor Admin</p>
              <p className="role">Superadmin</p>
            </div>
          </div>
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main">
        {children}
      </main>
    </div>
  )
}
