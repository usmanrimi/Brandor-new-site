export const dynamic = "force-dynamic";
import React from 'react'
import { updateTeamMember } from './actions'
import Link from 'next/link'
import * as Icons from 'lucide-react'
import { PrismaClient } from '@prisma/client'
import MediaPicker from '../../components/MediaPicker'

const prisma = new PrismaClient()

export default async function EditTeamMember({ params }: { params: { id: string } }) {
  const member = await prisma.teamMember.findUnique({
    where: { id: params.id }
  })

  if (!member) {
    return <div>Team member not found</div>
  }

  return (
    <div>
      <header className="admin-header" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Link href="/admin/team" style={{ color: 'var(--admin-text-light)' }}><Icons.ArrowLeft size={24} /></Link>
        <div>
          <h1 style={{ margin: 0 }}>Edit Team Member</h1>
          <p style={{ margin: 0 }}>Update details for {member.name}.</p>
        </div>
      </header>

      <div className="admin-card">
        <form action={updateTeamMember}>
          <input type="hidden" name="id" value={member.id} />
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" name="name" className="form-control" defaultValue={member.name} required />
            </div>
            
            <div className="form-group">
              <label htmlFor="role">Position</label>
              <input type="text" id="role" name="role" className="form-control" defaultValue={member.role} required />
            </div>

            <MediaPicker name="imageUrl" defaultValue={member.imageUrl} label="Profile Image" />
          </div>
          
          <div className="form-group">
            <label htmlFor="bio">Biography</label>
            <textarea id="bio" name="bio" className="form-control" rows={4} defaultValue={member.bio || ''}></textarea>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div className="form-group">
              <label htmlFor="linkedinUrl">LinkedIn URL (Optional)</label>
              <input type="url" id="linkedinUrl" name="linkedinUrl" className="form-control" defaultValue={member.linkedinUrl || ''} />
            </div>
            
            <div className="form-group">
              <label htmlFor="twitterUrl">Twitter/X URL (Optional)</label>
              <input type="url" id="twitterUrl" name="twitterUrl" className="form-control" defaultValue={member.twitterUrl || ''} />
            </div>
          </div>

          <div style={{ marginTop: '32px', display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
            <Link href="/admin/team" className="btn-admin" style={{ background: 'transparent', color: 'var(--admin-text-light)', border: '1px solid var(--admin-border)' }}>Cancel</Link>
            <button type="submit" className="btn-admin"><Icons.Save size={18} /> Update Member</button>
          </div>
        </form>
      </div>
    </div>
  )
}
