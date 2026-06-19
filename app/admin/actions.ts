'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

// --- SERVICES ---
export async function createService(formData: FormData) {
  const data = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    icon: formData.get('icon') as string,
    order: parseInt(formData.get('order') as string || "0"),
  }
  await prisma.service.create({ data })
  revalidatePath('/')
  revalidatePath('/admin/services')
}

export async function deleteService(id: string) {
  await prisma.service.delete({ where: { id } })
  revalidatePath('/')
  revalidatePath('/admin/services')
}

// --- TEAM MEMBERS ---
export async function createTeamMember(formData: FormData) {
  const data = {
    name: formData.get('name') as string,
    role: formData.get('role') as string,
    bio: formData.get('bio') as string | undefined,
    imageUrl: formData.get('imageUrl') as string,
  }
  await prisma.teamMember.create({ data })
  revalidatePath('/')
  revalidatePath('/team')
  revalidatePath('/admin/team')
}

export async function deleteTeamMember(id: string) {
  await prisma.teamMember.delete({ where: { id } })
  revalidatePath('/')
  revalidatePath('/team')
  revalidatePath('/admin/team')
}

// --- PROJECTS ---
export async function createProject(formData: FormData) {
  const data = {
    title: formData.get('title') as string,
    client: formData.get('client') as string,
    category: formData.get('category') as string,
    date: formData.get('date') as string,
    location: formData.get('location') as string,
    description: formData.get('description') as string,
    images: formData.get('images') as string,
  }
  await prisma.project.create({ data })
  revalidatePath('/projects')
  revalidatePath('/admin/projects')
}

export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } })
  revalidatePath('/projects')
  revalidatePath('/admin/projects')
}

// --- TESTIMONIALS ---
export async function createTestimonial(formData: FormData) {
  const data = {
    name: formData.get('name') as string,
    role: formData.get('role') as string,
    company: formData.get('company') as string,
    content: formData.get('content') as string,
    imageUrl: formData.get('imageUrl') as string || undefined,
  }
  await prisma.testimonial.create({ data })
  revalidatePath('/testimonials')
  revalidatePath('/admin/testimonials')
}

export async function deleteTestimonial(id: string) {
  await prisma.testimonial.delete({ where: { id } })
  revalidatePath('/testimonials')
  revalidatePath('/admin/testimonials')
}
