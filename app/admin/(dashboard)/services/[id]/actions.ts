"use server"

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const prisma = new PrismaClient()

export async function updateService(formData: FormData) {
  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const imageUrl = formData.get('imageUrl') as string
  const orderStr = formData.get('order') as string
  const order = parseInt(orderStr, 10) || 0

  if (id) {
    await prisma.service.update({
      where: { id },
      data: {
        title,
        description,
        imageUrl: imageUrl || '',
        order
      }
    })
  }

  revalidatePath('/services')
  revalidatePath('/')
  revalidatePath('/admin/services')
  redirect('/admin/services')
}
