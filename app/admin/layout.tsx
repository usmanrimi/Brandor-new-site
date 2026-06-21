import './admin.css'
import type { Metadata } from 'next'
import Link from 'next/link'
import * as Icons from 'lucide-react'

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
          <p className="nav-group-label">Overview</p>
          <Link href="/admin" className="nav-item">
            <Icons.LayoutDashboard size={18} /> Dashboard
          </Link>
          
          <p className="nav-group-label">Pages & Content</p>
          <Link href="/admin/content/home" className="nav-item">
            <Icons.Home size={18} /> Homepage
          </Link>
          <Link href="/admin/content/about" className="nav-item">
            <Icons.Info size={18} /> About Us
          </Link>
          <Link href="/admin/services" className="nav-item">
            <Icons.Layers size={18} /> Services
          </Link>
          <Link href="/admin/initiatives" className="nav-item">
            <Icons.Target size={18} /> Initiatives
          </Link>
          
          <p className="nav-group-label">Portfolio</p>
          <Link href="/admin/projects" className="nav-item">
            <Icons.Briefcase size={18} /> Projects
          </Link>
          
          <p className="nav-group-label">Relations</p>
          <Link href="/admin/testimonials" className="nav-item">
            <Icons.MessageSquare size={18} /> Testimonials
          </Link>
          <Link href="/admin/team" className="nav-item">
            <Icons.Users size={18} /> Team Management
          </Link>
          <Link href="/admin/partners" className="nav-item">
            <Icons.Handshake size={18} /> Partners & Clients
          </Link>

          <p className="nav-group-label">Assets</p>
          <Link href="/admin/media" className="nav-item">
            <Icons.Image size={18} /> Media Library
          </Link>
          
          <p className="nav-group-label">Configuration</p>
          <Link href="/admin/branding" className="nav-item">
            <Icons.Palette size={18} /> Website Branding
          </Link>
          <Link href="/admin/settings" className="nav-item">
            <Icons.Settings size={18} /> Settings & Social
          </Link>
          <Link href="/admin/users" className="nav-item">
            <Icons.UserCog size={18} /> User Management
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
          <Link href="/" className="logout-btn">
            <Icons.LogOut size={16} /> Exit to Site
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main">
        {children}
      </main>
    </div>
  )
}
