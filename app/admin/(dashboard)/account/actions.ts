"use server"

import { PrismaClient } from '@prisma/client'
import { redirect } from 'next/navigation'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function updatePassword(formData: FormData) {
  const currentPassword = formData.get('currentPassword') as string
  const newPassword = formData.get('newPassword') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (!currentPassword || !newPassword || !confirmPassword) {
    redirect('/admin/account?error=All fields are required')
  }

  if (newPassword !== confirmPassword) {
    redirect('/admin/account?error=New passwords do not match')
  }

  if (newPassword.length < 8) {
    redirect('/admin/account?error=Password must be at least 8 characters')
  }

  // Get the single admin user (assuming 1 admin)
  const admin = await prisma.adminUser.findFirst()
  if (!admin) {
    redirect('/admin/account?error=Admin account not found')
  }

  // Use sync versions to avoid WASM panic in this Next.js environment
  const isValid = bcrypt.compareSync(currentPassword, admin.password)
  
  if (!isValid) {
    redirect('/admin/account?error=Incorrect current password')
  }

  const hashedPassword = bcrypt.hashSync(newPassword, 10)

  await prisma.adminUser.update({
    where: { id: admin.id },
    data: { password: hashedPassword }
  })

  redirect('/admin/account?success=Password updated successfully')
}
