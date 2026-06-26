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
    const ids = searchParams.get('ids')
    
    if (ids) {
      const idArray = ids.split(',')
      await prisma.mediaAsset.deleteMany({ where: { id: { in: idArray } } })
      return NextResponse.json({ success: true })
    }

    if (id) {
      await prisma.mediaAsset.delete({ where: { id } })
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: "ID required" }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete media" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, name } = await request.json()
    if (!id || !name) return NextResponse.json({ error: "Missing fields" }, { status: 400 })

    await prisma.mediaAsset.update({
      where: { id },
      data: { name }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update media" }, { status: 500 })
  }
}
