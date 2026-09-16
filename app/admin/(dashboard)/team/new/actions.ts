"use server"

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const prisma = new PrismaClient()

export async function createTeamMember(formData: FormData) {
  const name = formData.get('name') as string
  const role = formData.get('role') as string
  const bio = formData.get('bio') as string
  const imageUrl = formData.get('imageUrl') as string
  const linkedinUrl = formData.get('linkedinUrl') as string
  const twitterUrl = formData.get('twitterUrl') as string

  await prisma.teamMember.create({
    data: {
      name,
      role,
      bio,
      imageUrl: imageUrl || '/assets/why-image.jpg',
      linkedinUrl,
      twitterUrl
    }
  })

  revalidatePath('/team')
  revalidatePath('/admin/team')
  redirect('/admin/team')
}
