"use server"

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const prisma = new PrismaClient()

export async function createProject(formData: FormData) {
  const title = formData.get('title') as string
  const client = formData.get('client') as string
  const category = formData.get('category') as string
  const date = formData.get('date') as string
  const location = formData.get('location') as string
  const description = formData.get('description') as string
  const images = formData.get('images') as string // we assume they paste the URL or we build a media picker later
  const featured = formData.get('featured') === 'on'

  await prisma.project.create({
    data: {
      title,
      client,
      category,
      date,
      location,
      description,
      images: images || '/assets/why-image.jpg',
      featured
    }
  })

  revalidatePath('/projects')
  revalidatePath('/admin/projects')
  redirect('/admin/projects')
}
