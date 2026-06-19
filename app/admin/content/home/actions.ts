"use server"

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

export async function updateHomeContent(formData: FormData) {
  const heroEyebrow = formData.get('heroEyebrow') as string
  const heroHeadline = formData.get('heroHeadline') as string
  const heroLead = formData.get('heroLead') as string
  const marqueeText = formData.get('marqueeText') as string
  const ctaText1 = formData.get('ctaText1') as string
  const ctaLink1 = formData.get('ctaLink1') as string
  
  await prisma.homeContent.upsert({
    where: { id: 'global' },
    update: {
      heroEyebrow,
      heroHeadline,
      heroLead,
      marqueeText,
      ctaText1,
      ctaLink1
    },
    create: {
      id: 'global',
      heroEyebrow,
      heroHeadline,
      heroLead,
      marqueeText,
      ctaText1,
      ctaLink1
    }
  })

  revalidatePath('/')
  revalidatePath('/admin/content/home')
  
  return { success: true }
}
