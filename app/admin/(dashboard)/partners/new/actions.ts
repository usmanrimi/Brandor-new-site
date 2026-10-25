"use server"

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createPartner(formData: FormData) {
  const name = formData.get('name') as string
  const logoUrl = formData.get('logoUrl') as string
  const websiteUrl = formData.get('websiteUrl') as string
  const orderStr = formData.get('order') as string
  const order = parseInt(orderStr, 10) || 0

  await prisma.partner.create({
    data: {
      name,
      logoUrl: logoUrl || '/assets/partners/p1.png',
      websiteUrl: websiteUrl || null,
      order
    }
  })

  revalidatePath('/partners')
  revalidatePath('/')
  revalidatePath('/admin/partners')
  redirect('/admin/partners')
}
