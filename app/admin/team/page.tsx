export const dynamic = "force-dynamic";
import { PrismaClient } from '@prisma/client'
import { createTeamMember, deleteTeamMember } from '../actions'

const prisma = new PrismaClient()

export default async function AdminTeamPage() {
  const team = await prisma.teamMember.findMany()

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
    <div>
      <header className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Team Management</h1>
          <p>Add, edit, or remove members from your agency roster.</p>
        </div>
        <Link href="/admin/team/new" className="btn-admin">
          <Icons.Plus size={18} /> Add Team Member
        </Link>
      </header>

      <div className="admin-card" style={{ padding: '0' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ paddingLeft: '24px', width: '80px' }}>Profile</th>
              <th>Name</th>
              <th>Position</th>
              <th>Social</th>
              <th style={{ paddingRight: '24px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map(member => (
              <tr key={member.id}>
                <td style={{ paddingLeft: '24px' }}>
                  <img src={member.imageUrl} alt={member.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--admin-border)' }} />
                </td>
                <td style={{ fontWeight: '500', color: 'var(--admin-primary)' }}>{member.name}</td>
                <td style={{ color: 'var(--admin-text-light)' }}>{member.role}</td>
                <td>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {member.linkedinUrl ? <Icons.Linkedin size={16} color="#0077b5" /> : null}
                    {member.twitterUrl ? <Icons.Twitter size={16} color="#1da1f2" /> : null}
                    {!member.linkedinUrl && !member.twitterUrl && <span style={{ color: '#cbd5e1', fontSize: '0.8rem' }}>None</span>}
                  </div>
                </td>
                <td style={{ paddingRight: '24px', textAlign: 'right' }}>
                  <Link href={`/admin/team/${member.id}`} style={{ color: 'var(--admin-text-light)', marginRight: '16px' }}><Icons.Edit size={18} /></Link>
                  <form action={deleteTeamMember} style={{ display: 'inline' }}>
                    <input type="hidden" name="id" value={member.id} />
                    <button type="submit" style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Icons.Trash2 size={18} /></button>
                  </form>
                </td>
              </tr>
            ))}
            {members.length === 0 && (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: '40px', color: 'var(--admin-text-light)' }}>No team members found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
