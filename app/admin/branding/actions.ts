"use server"

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

export async function updateBranding(formData: FormData) {
  const logoUrl = formData.get('logoUrl') as string
  const faviconUrl = formData.get('faviconUrl') as string

  // update logo
  if (logoUrl !== null && logoUrl !== undefined) {
    await prisma.setting.upsert({
      where: { key: 'websiteLogo' },
      update: { value: logoUrl },
      create: { key: 'websiteLogo', value: logoUrl }
    })
  }

  // update favicon
  if (faviconUrl !== null && faviconUrl !== undefined) {
    await prisma.setting.upsert({
      where: { key: 'websiteFavicon' },
      update: { value: faviconUrl },
      create: { key: 'websiteFavicon', value: faviconUrl }
    })
  }

  revalidatePath('/', 'layout') // Revalidate everything to update globally
}
