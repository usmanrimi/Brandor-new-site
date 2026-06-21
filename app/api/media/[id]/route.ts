import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const asset = await prisma.mediaAsset.findUnique({
      where: { id: params.id }
    })

    if (!asset || !asset.data) {
      return new NextResponse("Not Found", { status: 404 })
    }

    const matches = asset.data.match(/^data:(.+);base64,(.+)$/)
    if (!matches || matches.length !== 3) {
      return new NextResponse("Invalid format", { status: 500 })
    }

    const mimeType = matches[1]
    const base64Data = matches[2]
    const buffer = Buffer.from(base64Data, 'base64')

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': mimeType,
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    })
  } catch (error) {
    return new NextResponse("Error fetching media", { status: 500 })
  }
}
