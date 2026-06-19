import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'
import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const category = formData.get('category') as string | null

    if (!file) {
      return NextResponse.json({ error: 'No file received.' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    
    // Create a unique filename
    const filename = `${uuidv4()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`
    
    // Path where the file will be saved
    // Note: On Vercel, public directory is read-only at runtime, 
    // but this works for local development as requested.
    const uploadDir = path.join(process.cwd(), 'public/uploads')
    const filepath = path.join(uploadDir, filename)

    // Write file
    await writeFile(filepath, buffer)
    
    // The public URL to access the file
    const fileUrl = `/uploads/${filename}`

    // Determine type
    let type = 'document'
    if (file.type.startsWith('image/')) type = 'image'
    else if (file.type.startsWith('video/')) type = 'video'

    // Save to Database
    const mediaAsset = await prisma.mediaAsset.create({
      data: {
        name: file.name,
        url: fileUrl,
        type: type,
        size: file.size,
        category: category || 'Uncategorized'
      }
    })

    return NextResponse.json({ success: true, file: mediaAsset }, { status: 201 })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json({ error: 'Failed to upload file.' }, { status: 500 })
  }
}
