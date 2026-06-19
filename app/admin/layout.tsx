import './admin.css'
import type { Metadata } from 'next'

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
      {children}
    </div>
  )
}
