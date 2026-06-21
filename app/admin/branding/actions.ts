"use server"

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

export async function updateBranding(formData: FormData) {
  const logoUrl = formData.get('logoUrl') as string
  const faviconUrl = formData.get('faviconUrl') as string

  const updateData: any = {}
  if (logoUrl !== null && logoUrl !== undefined) updateData.logoUrl = logoUrl
  if (faviconUrl !== null && faviconUrl !== undefined) updateData.faviconUrl = faviconUrl

  if (Object.keys(updateData).length > 0) {
    await prisma.setting.upsert({
      where: { id: "global" },
      update: updateData,
      create: { id: "global", ...updateData }
    })
  }

  revalidatePath('/', 'layout')
}
