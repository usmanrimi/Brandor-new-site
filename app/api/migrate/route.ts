import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    // Execute raw SQL to create the tables manually because Prisma db push is blocked on Vercel builds due to IPv6 limitations
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Service" (
        "id" TEXT NOT NULL,
        "title" TEXT NOT NULL,
        "description" TEXT NOT NULL,
        "icon" TEXT NOT NULL,
        "order" INTEGER NOT NULL DEFAULT 0,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
      );
    `);

    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "TeamMember" (
        "id" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "role" TEXT NOT NULL,
        "imageUrl" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "TeamMember_pkey" PRIMARY KEY ("id")
      );
    `);

    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Project" (
        "id" TEXT NOT NULL,
        "title" TEXT NOT NULL,
        "client" TEXT NOT NULL,
        "category" TEXT NOT NULL,
        "date" TEXT NOT NULL,
        "location" TEXT NOT NULL,
        "description" TEXT NOT NULL,
        "images" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
      );
    `);

    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Testimonial" (
        "id" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "role" TEXT NOT NULL,
        "company" TEXT NOT NULL,
        "imageUrl" TEXT,
        "content" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
      );
    `);

    return NextResponse.json({ message: "Database tables created successfully!" })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
