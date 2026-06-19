"use server"

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

export async function updateSettings(formData: FormData) {
  const siteName = formData.get('siteName') as string
  const siteDesc = formData.get('siteDesc') as string
  const email = formData.get('email') as string
  const whatsapp = formData.get('whatsapp') as string
  const address = formData.get('address') as string

  await prisma.setting.upsert({
    where: { id: 'global' },
    update: {
      siteName,
      siteDesc,
      email,
      whatsapp,
      address
    },
    create: {
      id: 'global',
      siteName,
      siteDesc,
      email,
      whatsapp,
      address
    }
  })

  revalidatePath('/admin/settings')
  
  return { success: true }
}
