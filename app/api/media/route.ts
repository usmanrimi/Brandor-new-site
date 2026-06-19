import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const media = await prisma.mediaAsset.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(media)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch media' }, { status: 500 })
  }
}
