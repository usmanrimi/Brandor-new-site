"use server"

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const prisma = new PrismaClient()

export async function updateInitiative(formData: FormData) {
  const id = formData.get('id') as string
  const type = formData.get('type') as string
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const date = formData.get('date') as string
  const imageUrl = formData.get('imageUrl') as string 
  const featured = formData.get('featured') === 'on'

  if (id) {
    await prisma.initiative.update({
      where: { id },
      data: {
        type,
        title,
        description,
        date,
        imageUrl: imageUrl || '/assets/why-image.jpg',
        featured
      }
    })
  }

  revalidatePath('/admin/initiatives')
  redirect('/admin/initiatives')
}
