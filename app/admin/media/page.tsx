"use client"

import React, { useState, useEffect } from 'react'
import * as Icons from 'lucide-react'

type MediaAsset = {
  id: string
  name: string
  url: string
  type: string
  size: number
  category: string | null
  createdAt: string
}

export default function AdminMedia() {
  const [media, setMedia] = useState<MediaAsset[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    // In a real app we'd fetch this from an API route.
    // For now we'll simulate the load since Prisma is server-side and this is a client component for the file upload.
    // Actually, a better way in App Router is to use a Server Component and pass the data down, 
    // but we'll fetch via a quick API route or just show the upload UI for now.
    fetchMedia()
  }, [])

  const fetchMedia = async () => {
    try {
      const res = await fetch('/api/media')
      if (res.ok) {
        const data = await res.json()
        setMedia(data)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    formData.append('category', 'General')

    setUploading(true)
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      if (res.ok) {
        fetchMedia() // Refresh the list
      } else {
        alert('Upload failed')
      }
    } catch (err) {
      console.error(err)
      alert('Upload failed')
    } finally {
      setUploading(false)
      // Reset the input
      e.target.value = ''
    }
  }

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url)
    alert('URL copied to clipboard!')
  }

  return (
    <div>
      <header className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Media Library</h1>
          <p>Centralized storage for your images, videos, and documents.</p>
        </div>
        
        <div>
          <label className="btn-admin" style={{ cursor: 'pointer' }}>
            <Icons.Upload size={18} /> {uploading ? 'Uploading...' : 'Upload File'}
            <input type="file" style={{ display: 'none' }} onChange={handleFileUpload} disabled={uploading} />
          </label>
        </div>
      </header>

      <div className="admin-card" style={{ padding: '0' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid var(--admin-border)', display: 'flex', gap: '16px' }}>
          <div style={{ position: 'relative', flexGrow: 1, maxWidth: '400px' }}>
            <Icons.Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-light)' }} />
            <input type="text" placeholder="Search files..." className="form-control" style={{ paddingLeft: '48px' }} />
          </div>
          <button className="btn-admin" style={{ background: '#f1f5f9', color: 'var(--admin-text)' }}>
            <Icons.Filter size={18} /> Type: All
          </button>
        </div>

        <div style={{ padding: '24px', minHeight: '400px' }}>
          {loading ? (
            <p style={{ color: 'var(--admin-text-light)', textAlign: 'center', marginTop: '40px' }}>Loading media...</p>
          ) : media.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--admin-text-light)' }}>
              <Icons.Image size={48} style={{ margin: '0 auto 16px auto', opacity: 0.5 }} />
              <h3>No media files yet</h3>
              <p>Upload your first image to get started.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
              {media.map((asset) => (
                <div key={asset.id} style={{ border: '1px solid var(--admin-border)', borderRadius: '8px', overflow: 'hidden' }}>
                  <div style={{ aspectRatio: '1', background: '#f1f5f9', position: 'relative' }}>
                    {asset.type === 'image' ? (
                      <img src={asset.url} alt={asset.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--admin-text-light)' }}>
                        <Icons.File size={32} />
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '12px' }}>
                    <p style={{ margin: '0 0 4px 0', fontSize: '0.85rem', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{asset.name}</p>
                    <p style={{ margin: '0 0 12px 0', fontSize: '0.75rem', color: 'var(--admin-text-light)' }}>{(asset.size / 1024).toFixed(1)} KB</p>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => copyToClipboard(asset.url)} style={{ flexGrow: 1, padding: '6px', fontSize: '0.75rem', background: '#f1f5f9', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '500' }}>Copy URL</button>
                      <button style={{ padding: '6px', fontSize: '0.75rem', background: '#fef2f2', color: '#ef4444', border: 'none', borderRadius: '4px', cursor: 'pointer' }}><Icons.Trash2 size={14} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
