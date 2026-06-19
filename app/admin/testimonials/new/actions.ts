"use server"

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const prisma = new PrismaClient()

export async function createTestimonial(formData: FormData) {
  const name = formData.get('name') as string
  const role = formData.get('role') as string
  const company = formData.get('company') as string
  const content = formData.get('content') as string
  const imageUrl = formData.get('imageUrl') as string
  const featured = formData.get('featured') === 'on'

  await prisma.testimonial.create({
    data: {
      name,
      role,
      company,
      content,
      imageUrl: imageUrl || null,
      featured
    }
  })

  revalidatePath('/testimonials')
  revalidatePath('/admin/testimonials')
  redirect('/admin/testimonials')
}
