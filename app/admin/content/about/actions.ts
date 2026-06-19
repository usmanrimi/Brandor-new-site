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
  
  await prisma.aboutContent.upsert({
    where: { id: 'global' },
    update: {
      aboutText,
      mission,
      vision,
      coreValues: '[]', // Placeholder
      process: '[]', // Placeholder
      whyUs: '[]' // Placeholder
    },
    create: {
      id: 'global',
      aboutText,
      mission,
      vision,
      coreValues: '[]',
      process: '[]',
      whyUs: '[]'
    }
  })

  revalidatePath('/about')
  revalidatePath('/admin/content/about')
  
  return { success: true }
}
