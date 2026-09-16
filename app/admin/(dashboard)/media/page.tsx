"use client"
import React, { useState, useRef, useEffect } from 'react'
import * as Icons from 'lucide-react'

export default function AdminMediaPage() {
  const [uploading, setUploading] = useState(false)
  const [assets, setAssets] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch('/api/media')
      .then(res => res.json())
      .then(data => { setAssets(data); setLoading(false) })
      .catch(err => { console.error(err); setLoading(false) })
  }, [])

  const handleUploadClick = () => fileInputRef.current?.click()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const formData = new FormData()
      formData.append('file', file)

      try {
        const res = await fetch('/api/media/upload', { method: 'POST', body: formData })
        const data = await res.json()
        if (data.url) {
          setAssets(prev => [{ id: data.id, url: data.url, name: file.name, size: file.size, type: file.type, createdAt: new Date() }, ...prev])
        }
      } catch (error) { console.error('Upload failed', error) }
    }
    setUploading(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this media?')) return
    try {
      await fetch(`/api/media?id=${id}`, { method: 'DELETE' })
      setAssets(prev => prev.filter(a => a.id !== id))
      setSelectedIds(prev => { const n = new Set(prev); n.delete(id); return n })
    } catch (error) { console.error('Delete failed', error) }
  }

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0 || !confirm(`Delete ${selectedIds.size} items?`)) return
    try {
      await fetch(`/api/media?ids=${Array.from(selectedIds).join(',')}`, { method: 'DELETE' })
      setAssets(prev => prev.filter(a => !selectedIds.has(a.id)))
      setSelectedIds(new Set())
    } catch (error) { console.error('Bulk delete failed', error) }
  }

  const handleRename = async (id: string, currentName: string) => {
    const newName = window.prompt("Enter new file name:", currentName)
    if (!newName || newName === currentName) return
    try {
      await fetch(`/api/media`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name: newName })
      })
      setAssets(prev => prev.map(a => a.id === id ? { ...a, name: newName } : a))
    } catch (error) { console.error('Rename failed', error) }
  }

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) newSet.delete(id)
      else newSet.add(id)
      return newSet
    })
  }

  const filteredAssets = assets.filter(a => a.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <header className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1>Media Library</h1>
          <p>Upload, manage, search, and bulk edit your assets.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          {selectedIds.size > 0 && (
            <button className="btn-admin" style={{ background: '#ef4444' }} onClick={handleBulkDelete}>
              <Icons.Trash2 size={18} /> Delete Selected ({selectedIds.size})
            </button>
          )}
          <input type="file" multiple accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
          <button className="btn-admin" onClick={handleUploadClick} disabled={uploading}>
            {uploading ? <Icons.Loader className="animate-spin" size={18} /> : <Icons.Upload size={18} />}
            {uploading ? 'Uploading...' : 'Upload Media'}
          </button>
        </div>
      </header>

      <div style={{ marginBottom: '24px', position: 'relative', maxWidth: '400px' }}>
        <Icons.Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-light)' }} />
        <input 
          type="text" 
          placeholder="Search media files..." 
          value={search} 
          onChange={e => setSearch(e.target.value)}
          style={{ width: '100%', padding: '14px 16px 14px 44px', borderRadius: '12px', border: '1px solid var(--admin-border)', fontSize: '0.95rem', outline: 'none' }} 
        />
      </div>

      <div className="admin-card" style={{ background: 'transparent', border: 'none', boxShadow: 'none', padding: 0 }}>
        {loading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: 'var(--admin-text-light)' }}>
            <Icons.Loader className="animate-spin" size={32} style={{ margin: '0 auto 16px' }} />
            <p>Loading media...</p>
          </div>
        ) : filteredAssets.length === 0 ? (
          <div style={{ padding: '60px', textAlign: 'center', background: '#fff', borderRadius: '16px', border: '2px dashed var(--admin-border)' }}>
            <Icons.Image size={48} color="#cbd5e1" style={{ marginBottom: '16px' }} />
            <h3 style={{ color: 'var(--admin-primary)', marginBottom: '8px' }}>No media found</h3>
            <p style={{ color: 'var(--admin-text-light)', marginBottom: '24px' }}>Upload new media or change your search query.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '24px' }}>
            {filteredAssets.map((asset) => (
              <div key={asset.id} style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', border: `2px solid ${selectedIds.has(asset.id) ? 'var(--orange)' : 'var(--admin-border)'}`, position: 'relative', transition: 'border-color 0.2s' }}>
                
                <input 
                  type="checkbox" 
                  checked={selectedIds.has(asset.id)} 
                  onChange={() => toggleSelect(asset.id)} 
                  style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 10, width: '18px', height: '18px', cursor: 'pointer' }} 
                />

                <div style={{ width: '100%', aspectRatio: '1/1', background: '#f1f5f9', position: 'relative' }} onClick={() => toggleSelect(asset.id)}>
                  <img src={asset.url} alt={asset.name} style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }} loading="lazy" />
                  <div style={{ position: 'absolute', top: '8px', right: '8px', display: 'flex', gap: '8px' }} onClick={e => e.stopPropagation()}>
                    <button onClick={() => handleRename(asset.id, asset.name)} style={{ background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '4px', padding: '6px', cursor: 'pointer', color: 'var(--admin-primary)' }} title="Rename">
                      <Icons.Edit2 size={14} />
                    </button>
                    <button onClick={() => { navigator.clipboard.writeText(asset.url); alert('URL copied!'); }} style={{ background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '4px', padding: '6px', cursor: 'pointer', color: 'var(--admin-primary)' }} title="Copy URL">
                      <Icons.Copy size={14} />
                    </button>
                    <button onClick={() => handleDelete(asset.id)} style={{ background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '4px', padding: '6px', cursor: 'pointer', color: '#ef4444' }} title="Delete">
                      <Icons.Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <div style={{ padding: '12px' }}>
                  <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 600, color: 'var(--admin-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={asset.name}>{asset.name}</p>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--admin-text-light)' }}>{(asset.size / 1024).toFixed(1)} KB • {new Date(asset.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
