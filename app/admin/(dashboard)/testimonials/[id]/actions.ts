"use server"

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const prisma = new PrismaClient()

export async function updateTestimonial(formData: FormData) {
  const id = formData.get('id') as string
  const name = formData.get('name') as string
  const role = formData.get('role') as string
  const company = formData.get('company') as string
  const content = formData.get('content') as string
  const imageUrl = formData.get('imageUrl') as string
  const featured = formData.get('featured') === 'on'

  if (id) {
    await prisma.testimonial.update({
      where: { id },
      data: {
        name,
        role,
        company,
        content,
        imageUrl: imageUrl || '',
        featured
      }
    })
  }

  revalidatePath('/admin/testimonials')
  revalidatePath('/')
  redirect('/admin/testimonials')
}
