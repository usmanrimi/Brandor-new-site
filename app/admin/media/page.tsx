"use client"

import React, { useState, useRef } from 'react'
import * as Icons from 'lucide-react'

export default function AdminMediaPage() {
  const [uploading, setUploading] = useState(false)
  const [assets, setAssets] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Fetch initial media
  React.useEffect(() => {
    fetch('/api/media')
      .then(res => res.json())
      .then(data => {
        setAssets(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const formData = new FormData()
      formData.append('file', file)

      try {
        const res = await fetch('/api/media/upload', {
          method: 'POST',
          body: formData
        })
        const data = await res.json()
        if (data.url) {
          // Add to beginning of assets array
          setAssets(prev => [{ id: data.id, url: data.url, name: file.name, size: file.size, type: file.type, createdAt: new Date() }, ...prev])
        }
      } catch (error) {
        console.error('Upload failed', error)
      }
    }
    setUploading(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this media?')) return
    try {
      await fetch(`/api/media?id=${id}`, { method: 'DELETE' })
      setAssets(prev => prev.filter(a => a.id !== id))
    } catch (error) {
      console.error('Delete failed', error)
    }
  }

  return (
    <div>
      <header className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Media Library</h1>
          <p>Upload and manage all your images directly on your database.</p>
        </div>
        <input 
          type="file" 
          multiple 
          accept="image/*" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          onChange={handleFileChange}
        />
        <button className="btn-admin" onClick={handleUploadClick} disabled={uploading}>
          {uploading ? <Icons.Loader className="animate-spin" size={18} /> : <Icons.Upload size={18} />}
          {uploading ? 'Uploading...' : 'Upload Media'}
        </button>
      </header>

      <div className="admin-card" style={{ background: 'transparent', border: 'none', boxShadow: 'none', padding: 0 }}>
        {loading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: 'var(--admin-text-light)' }}>
            <Icons.Loader className="animate-spin" size={32} style={{ margin: '0 auto 16px' }} />
            <p>Loading media...</p>
          </div>
        ) : assets.length === 0 ? (
          <div style={{ padding: '60px', textAlign: 'center', background: '#fff', borderRadius: '16px', border: '2px dashed var(--admin-border)' }}>
            <Icons.Image size={48} color="#cbd5e1" style={{ marginBottom: '16px' }} />
            <h3 style={{ color: 'var(--admin-primary)', marginBottom: '8px' }}>No media uploaded yet</h3>
            <p style={{ color: 'var(--admin-text-light)', marginBottom: '24px' }}>Upload your first image to see it here.</p>
            <button className="btn-admin" onClick={handleUploadClick}>Upload Media</button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '24px' }}>
            {assets.map((asset) => (
              <div key={asset.id} style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--admin-border)' }}>
                <div style={{ width: '100%', aspectRatio: '1/1', background: '#f1f5f9', position: 'relative' }}>
                  <img src={asset.url} alt={asset.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '8px', right: '8px', display: 'flex', gap: '8px' }}>
                    <button onClick={() => { navigator.clipboard.writeText(asset.url); alert('URL copied!'); }} style={{ background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '4px', padding: '4px', cursor: 'pointer', color: 'var(--admin-primary)' }} title="Copy URL">
                      <Icons.Copy size={14} />
                    </button>
                    <button onClick={() => handleDelete(asset.id)} style={{ background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '4px', padding: '4px', cursor: 'pointer', color: '#ef4444' }} title="Delete">
                      <Icons.Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <div style={{ padding: '12px' }}>
                  <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 600, color: 'var(--admin-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{asset.name}</p>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--admin-text-light)' }}>{(asset.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
