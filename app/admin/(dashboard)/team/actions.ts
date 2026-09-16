'use server'
import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

export async function deleteTeamMember(id: string) {
  if (id) {
    await prisma.teamMember.delete({ where: { id } })
    revalidatePath('/admin/team')
    revalidatePath('/team')
  }
}

export async function reorderTeamMembers(activeId: string, overId: string, membersList: any[]) {
  const transactions = membersList.map((member, index) => 
    prisma.teamMember.update({
      where: { id: member.id },
      data: { order: index }
    })
  )
  await prisma.$transaction(transactions)
  revalidatePath('/admin/team')
  revalidatePath('/team')
}
