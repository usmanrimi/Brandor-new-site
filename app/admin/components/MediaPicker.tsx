"use client"

import React, { useState, useEffect, useRef } from 'react'
import * as Icons from 'lucide-react'

export default function MediaPicker({ name, defaultValue, label, accept = "image/*" }: { name: string, defaultValue?: string, label?: string, accept?: string }) {
  const [value, setValue] = useState(defaultValue || '')
  const [isOpen, setIsOpen] = useState(false)
  const [assets, setAssets] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const fetchMedia = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/media')
      const data = await res.json()
      setAssets(data)
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  const handleOpen = () => {
    setIsOpen(true)
    fetchMedia()
  }

  const handleSelect = (url: string) => {
    setValue(url)
    setIsOpen(false)
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    const file = files[0]
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData
      })
      const data = await res.json()
      if (data.url) {
        setAssets(prev => [{ id: data.id, url: data.url, name: file.name, size: file.size, type: file.type || 'unknown' }, ...prev])
        handleSelect(data.url)
      }
    } catch (error) {
      console.error('Upload failed', error)
    }
    setUploading(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const isPdf = (url: string) => url.toLowerCase().endsWith('.pdf') || url.includes('/pdf')
  
  // Format bytes to KB/MB
  const formatSize = (bytes: number) => {
    if (!bytes) return ''
    if (bytes < 1024) return bytes + ' B'
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
    else return (bytes / 1048576).toFixed(1) + ' MB'
  }

  // Filter assets based on accept prop
  const filteredAssets = assets.filter(a => {
    if (accept.includes('pdf')) return a.name.endsWith('.pdf') || (a.type && a.type.includes('pdf'))
    if (accept.includes('image')) return !a.name.endsWith('.pdf') && !(a.type && a.type.includes('pdf'))
    return true
  })

  return (
    <div className="form-group media-picker-container" style={{ marginBottom: '16px' }}>
      <label>{label || 'Featured Image'}</label>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        {accept.includes('image') ? (
          <div style={{ width: '120px', height: '120px', borderRadius: '8px', border: '1px solid var(--admin-border)', background: '#f1f5f9', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {value ? (
              <img src={value} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <Icons.Image size={32} color="#cbd5e1" />
            )}
          </div>
        ) : (
          <div style={{ flexGrow: 1 }}>
            <input type="text" name={name} value={value} onChange={e => setValue(e.target.value)} className="form-control" placeholder="https:// or upload a file..." />
          </div>
        )}
        
        {accept.includes('image') && <input type="hidden" name={name} value={value} />}
        
        <div>
          <button type="button" onClick={handleOpen} className="btn-admin" style={{ background: '#fff', color: 'var(--admin-primary)', border: '1px solid var(--admin-border)' }}>
            <Icons.FolderOpen size={16} /> Browse
          </button>
          {value && accept.includes('image') && (
            <button type="button" onClick={() => setValue('')} style={{ display: 'block', marginTop: '8px', background: 'none', border: 'none', color: '#ef4444', fontSize: '0.85rem', cursor: 'pointer', padding: 0 }}>
              Remove Image
            </button>
          )}
        </div>
      </div>

      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ background: '#fff', width: '90%', maxWidth: '800px', height: '80vh', borderRadius: '16px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ padding: '24px', borderBottom: '1px solid var(--admin-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ margin: 0, fontSize: '1.2rem' }}>Select Media</h2>
              <div style={{ display: 'flex', gap: '16px' }}>
                <input type="file" accept={accept} ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
                <button type="button" onClick={handleUploadClick} disabled={uploading} className="btn-admin">
                  {uploading ? 'Uploading...' : 'Upload New'}
                </button>
                <button type="button" onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><Icons.X size={24} /></button>
              </div>
            </div>
            <div style={{ flexGrow: 1, overflowY: 'auto', padding: '24px' }}>
              {loading ? (
                <div style={{ textAlign: 'center', padding: '40px', color: 'var(--admin-text-light)' }}>Loading...</div>
              ) : filteredAssets.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: 'var(--admin-text-light)' }}>No media found. Upload something!</div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '16px' }}>
                  {filteredAssets.map(asset => (
                    <div 
                      key={asset.id} 
                      onClick={() => handleSelect(asset.url)}
                      style={{ cursor: 'pointer', border: '2px solid transparent', borderRadius: '8px', overflow: 'hidden', background: '#f8fafc', display: 'flex', flexDirection: 'column' }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--admin-accent)'}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
                    >
                      <div style={{ height: '120px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#e2e8f0' }}>
                        {isPdf(asset.name || asset.url) ? <Icons.FileText size={48} color="var(--admin-primary)" /> : <img src={asset.url} alt={asset.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                      </div>
                      <div style={{ padding: '8px', fontSize: '0.75rem', color: 'var(--admin-text)', wordBreak: 'break-all' }}>
                        <div style={{ fontWeight: 600 }}>{asset.name}</div>
                        {asset.size > 0 && <div style={{ color: 'var(--admin-text-light)', marginTop: '4px' }}>{formatSize(asset.size)}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
