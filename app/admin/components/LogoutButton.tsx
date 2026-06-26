"use client"
import React, { useState } from 'react'
import * as Icons from 'lucide-react'

export default function LogoutButton() {
  const [loading, setLoading] = useState(false)
  
  const handleLogout = async () => {
    setLoading(true)
    await fetch('/api/auth/logout', { method: 'POST' })
    window.location.href = '/'
  }

  return (
    <button onClick={handleLogout} className="logout-btn" style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444', fontWeight: 600, fontSize: '0.9rem', width: '100%', padding: '12px', borderRadius: '8px', transition: 'background 0.2s' }} disabled={loading} onMouseOver={e => e.currentTarget.style.background = '#fef2f2'} onMouseOut={e => e.currentTarget.style.background = 'none'}>
      {loading ? <Icons.Loader size={18} className="animate-spin" /> : <Icons.LogOut size={18} />}
      {loading ? 'Logging out...' : 'Secure Logout'}
    </button>
  )
}
