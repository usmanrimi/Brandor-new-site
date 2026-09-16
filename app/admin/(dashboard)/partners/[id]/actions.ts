"use server"

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const prisma = new PrismaClient()

export async function updatePartner(formData: FormData) {
  const id = formData.get('id') as string
  const name = formData.get('name') as string
  const logoUrl = formData.get('logoUrl') as string
  const websiteUrl = formData.get('websiteUrl') as string
  const orderStr = formData.get('order') as string
  const order = parseInt(orderStr, 10) || 0

  if (id) {
    await prisma.partner.update({
      where: { id },
      data: {
        name,
        logoUrl,
        websiteUrl: websiteUrl || null,
        order
      }
    })
  }

  revalidatePath('/admin/partners')
  revalidatePath('/')
  redirect('/admin/partners')
}
