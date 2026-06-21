import React from 'react'
import * as Icons from 'lucide-react'

export default function AdminMediaPage() {
  return (
    <div>
      <header className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Media Library</h1>
          <p>Upload and manage images and media files.</p>
        </div>
        <button className="btn-admin" style={{ opacity: 0.5, cursor: 'not-allowed' }}>
          <Icons.Upload size={18} /> Upload Media
        </button>
      </header>

      <div className="admin-card" style={{ padding: '60px', textAlign: 'center' }}>
        <Icons.CloudOff size={64} color="var(--admin-text-light)" style={{ marginBottom: '24px' }} />
        <h2 style={{ color: 'var(--admin-primary)', marginBottom: '16px' }}>Supabase Storage Not Configured</h2>
        <p style={{ color: 'var(--admin-text-light)', maxWidth: '500px', margin: '0 auto', lineHeight: '1.6' }}>
          Direct media uploads are currently disabled because Vercel Serverless Functions are read-only at runtime. 
          To enable the Media Library, please create a public bucket named <strong>brandor-media</strong> in your Supabase Dashboard, 
          and provide the necessary API keys to implement Supabase Storage.
        </p>
        <p style={{ marginTop: '24px', color: 'var(--admin-text)' }}>
          <strong>For now, you can directly paste external image URLs (e.g. Imgur, or direct links) into the "Image URL" fields across the admin panel.</strong>
        </p>
      </div>
    </div>
  )
}
