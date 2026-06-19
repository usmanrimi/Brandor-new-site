import { PrismaClient } from '@prisma/client'
import { createTeamMember, deleteTeamMember } from '../actions'

const prisma = new PrismaClient()

export default async function AdminTeamPage() {
  const team = await prisma.teamMember.findMany()

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Manage Team Members</h1>
      <a href="/admin" style={{ color: 'blue', textDecoration: 'underline', marginBottom: '20px', display: 'inline-block' }}>&larr; Back to Dashboard</a>
      
      <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', marginBottom: '40px' }}>
        <h3>Add New Team Member</h3>
        <form action={createTeamMember} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
          <input type="text" name="name" placeholder="Name (e.g. Maryam Ado Wada)" required style={{ padding: '8px' }} />
          <input type="text" name="role" placeholder="Position (e.g. Communications Officer)" required style={{ padding: '8px' }} />
          <input type="text" name="imageUrl" placeholder="Image URL (e.g. /assets/team/5.jpg)" required style={{ padding: '8px' }} />
          <textarea name="bio" placeholder="Short Bio (Optional)" style={{ padding: '8px' }}></textarea>
          <button type="submit" style={{ padding: '10px', background: 'var(--orange)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Add Member</button>
        </form>
      </div>

      <h3>Current Team Members</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr style={{ background: '#e2e8f0', textAlign: 'left' }}>
            <th style={{ padding: '10px' }}>Image</th>
            <th style={{ padding: '10px' }}>Name</th>
            <th style={{ padding: '10px' }}>Role</th>
            <th style={{ padding: '10px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {team.map(member => (
            <tr key={member.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '10px' }}><img src={member.imageUrl} width="40" style={{ borderRadius: '50%' }} /></td>
              <td style={{ padding: '10px' }}>{member.name}</td>
              <td style={{ padding: '10px' }}>{member.role}</td>
              <td style={{ padding: '10px' }}>
                <form action={async () => { 'use server'; await deleteTeamMember(member.id) }}>
                  <button type="submit" style={{ padding: '5px 10px', background: 'red', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
