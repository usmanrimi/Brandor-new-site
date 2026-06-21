import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const assets = await prisma.mediaAsset.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        url: true,
        type: true,
        size: true,
        category: true,
        createdAt: true,
        // specifically NOT selecting `data` to avoid huge payload!
      }
    })
    return NextResponse.json(assets)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch media" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 })
    }

    await prisma.mediaAsset.delete({
      where: { id }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete media" }, { status: 500 })
  }
}
