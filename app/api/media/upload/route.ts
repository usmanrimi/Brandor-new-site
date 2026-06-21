import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const base64Data = buffer.toString('base64')
    const mimeType = file.type

    const dataUri = `data:${mimeType};base64,${base64Data}`

    const asset = await prisma.mediaAsset.create({
      data: {
        name: file.name,
        type: mimeType,
        size: file.size,
        data: dataUri,
        url: '' // will be updated immediately
      }
    })

    const finalUrl = `/api/media/${asset.id}`
    await prisma.mediaAsset.update({
      where: { id: asset.id },
      data: { url: finalUrl }
    })

    return NextResponse.json({ url: finalUrl, id: asset.id })

  } catch (error: any) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
