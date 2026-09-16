"use server"

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

export async function updateAboutContent(formData: FormData) {
  const aboutText = formData.get('aboutText') as string
  const mission = formData.get('mission') as string
  const vision = formData.get('vision') as string
  
  // In a real app, we'd parse the dynamic lists for coreValues, process, whyUs
  // For simplicity here, we'll store them as basic text or handle them if provided
  
  const aboutHeroImage = formData.get('aboutHeroImage') as string
  const whyUsImage = formData.get('whyUsImage') as string
  const coreValues = formData.get('coreValues') as string
  
  const existing = await prisma.aboutContent.findUnique({ where: { id: 'global' } })
  
  await prisma.aboutContent.upsert({
    where: { id: 'global' },
    update: {
      aboutText,
      mission,
      vision,
      coreValues: coreValues !== null ? coreValues : (existing?.coreValues || ''),
      aboutHeroImage: aboutHeroImage || '/assets/hero-image.jpg',
      whyUsImage: whyUsImage || '/assets/why-image.jpg'
    },
    create: {
      id: 'global',
      aboutText,
      mission,
      vision,
      coreValues: coreValues || existing?.coreValues || '',
      process: existing?.process || '',
      whyUs: existing?.whyUs || '',
      aboutHeroImage: aboutHeroImage || '/assets/hero-image.jpg',
      whyUsImage: whyUsImage || '/assets/why-image.jpg'
    }
  })

  revalidatePath('/about')
  revalidatePath('/admin/content/about')
}
