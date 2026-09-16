export const dynamic = "force-dynamic";
import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import * as Icons from 'lucide-react'
import SortableTeamList from './components/SortableTeamList'
import { reorderTeamMembers, deleteTeamMember } from './actions'

const prisma = new PrismaClient()

export default async function AdminTeamPage() {
  const members = await prisma.teamMember.findMany({ orderBy: { order: 'asc' } })

  return (
    <div>
      <header className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Team Management</h1>
          <p>Drag and drop to reorder members, edit profiles, or add new ones.</p>
        </div>
        <Link href="/admin/team/new" className="btn-admin">
          <Icons.Plus size={18} /> Add Team Member
        </Link>
      </header>

      <div className="admin-card" style={{ padding: '0' }}>
        <SortableTeamList initialMembers={members} reorderAction={reorderTeamMembers} deleteAction={deleteTeamMember} />
      </div>
    </div>
  )
}
