"use client"

import React, { useState, useEffect, useRef } from 'react'
import * as Icons from 'lucide-react'

export default function MediaPicker({ name, defaultValue, label }: { name: string, defaultValue?: string, label?: string }) {
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
        setAssets(prev => [{ id: data.id, url: data.url, name: file.name, size: file.size }, ...prev])
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

  return (
    <div className="form-group media-picker-container" style={{ marginBottom: '16px' }}>
      <label>{label || 'Featured Image'}</label>
      <input type="hidden" name={name} value={value} />
      
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <div style={{ width: '120px', height: '120px', borderRadius: '8px', border: '1px solid var(--admin-border)', background: '#f1f5f9', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {value ? (
            <img src={value} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <Icons.Image size={32} color="#cbd5e1" />
          )}
        </div>
        <div>
          <button type="button" onClick={handleOpen} className="btn-admin" style={{ background: '#fff', color: 'var(--admin-primary)', border: '1px solid var(--admin-border)' }}>
            <Icons.FolderOpen size={16} /> Browse Media
          </button>
          {value && (
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
                <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
                <button type="button" onClick={handleUploadClick} disabled={uploading} className="btn-admin">
                  {uploading ? 'Uploading...' : 'Upload New'}
                </button>
                <button type="button" onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><Icons.X size={24} /></button>
              </div>
            </div>
            <div style={{ flexGrow: 1, overflowY: 'auto', padding: '24px' }}>
              {loading ? (
                <div style={{ textAlign: 'center', padding: '40px', color: 'var(--admin-text-light)' }}>Loading...</div>
              ) : assets.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: 'var(--admin-text-light)' }}>No media found. Upload something!</div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '16px' }}>
                  {assets.map(asset => (
                    <div 
                      key={asset.id} 
                      onClick={() => handleSelect(asset.url)}
                      style={{ cursor: 'pointer', border: '2px solid transparent', borderRadius: '8px', overflow: 'hidden' }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--admin-accent)'}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
                    >
                      <img src={asset.url} alt={asset.name} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block' }} />
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
