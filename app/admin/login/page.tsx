"use client"
import React, { useState } from 'react'
import * as Icons from 'lucide-react'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      
      if (res.ok) {
        window.location.href = '/admin' // Force full reload to bypass router cache and hit middleware
      } else {
        const data = await res.json()
        setError(data.error || 'Login failed')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--pure)', padding: '20px' }}>
      <div style={{ background: '#fff', padding: '48px', borderRadius: '24px', width: '100%', maxWidth: '440px', boxShadow: '0 20px 40px rgba(23,59,97,0.08)' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', borderRadius: '16px', background: 'var(--turquoise)', color: 'var(--pure)', marginBottom: '16px' }}>
            <Icons.Lock size={32} />
          </div>
          <h1 style={{ fontFamily: 'var(--display)', fontSize: '2rem', color: 'var(--denim)' }}>Admin Portal</h1>
          <p style={{ color: 'var(--ink)', opacity: 0.7 }}>Secure access for Brandor team members.</p>
        </div>
        
        {error && <div style={{ background: '#fef2f2', color: '#ef4444', padding: '12px 16px', borderRadius: '12px', marginBottom: '24px', fontSize: '0.9rem', textAlign: 'center', fontWeight: '500' }}>{error}</div>}
        
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, fontFamily: 'var(--mono)', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--denim)' }}>Username</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} required placeholder="Enter username" style={{ background: '#f8fafc', border: '2px solid transparent', borderRadius: '14px', padding: '14px 16px', fontSize: '0.95rem', outline: 'none', width: '100%' }} />
          </div>
          <div style={{ marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, fontFamily: 'var(--mono)', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--denim)' }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" style={{ background: '#f8fafc', border: '2px solid transparent', borderRadius: '14px', padding: '14px 16px', fontSize: '0.95rem', outline: 'none', width: '100%' }} />
          </div>
          <button type="submit" disabled={loading} style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', background: 'var(--orange)', color: 'var(--pure)', padding: '16px', borderRadius: '14px', border: 'none', fontSize: '1.05rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}>
            {loading ? <Icons.Loader className="animate-spin" size={20} /> : 'Sign In Securely'}
          </button>
        </form>
      </div>
    </div>
  )
}
