"use server"

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const prisma = new PrismaClient()

export async function createService(formData: FormData) {
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const imageUrl = formData.get('imageUrl') as string
  const orderStr = formData.get('order') as string
  const order = parseInt(orderStr, 10) || 0

  await prisma.service.create({
    data: {
      title,
      description,
      imageUrl: imageUrl || '',
      order
    }
  })

  revalidatePath('/services')
  revalidatePath('/admin/services')
  redirect('/admin/services')
}
