import React from 'react'
import { PrismaClient } from '@prisma/client'
import { updateAboutContent } from './actions'

export const dynamic = "force-dynamic";


const prisma = new PrismaClient()

export default async function AboutCMS() {
  let content = await prisma.aboutContent.findUnique({ where: { id: 'global' } })

  if (!content) {
    content = {
      id: 'global',
      aboutText: "Brandor is a creative branding, media production, and storytelling agency dedicated to helping organizations, businesses, institutions, and development partners communicate their impact with clarity, creativity, and purpose.\n\nWe believe every project, every event, and every initiative has a story worth telling. Our role is to transform moments, achievements, and ideas into compelling visual experiences that inspire trust, engagement, and action.\n\nFrom corporate branding and media production to event documentation, strategic storytelling, and capacity building, we help our clients showcase their work professionally while creating meaningful connections with their audiences.",
      mission: "To empower brands, organizations, and communities through strategic branding, impactful storytelling, professional media production, and capacity-building initiatives that drive visibility, growth, and lasting impact.",
      vision: "To become Africa's leading creative agency for branding, storytelling, and impact documentation, helping organizations communicate their value, amplify their achievements, and inspire positive change.",
      coreValues: "[]",
      process: "[]",
      whyUs: "[]",
      updatedAt: new Date()
    }
  }

  return (
    <div>
      <header className="admin-header">
        <h1>About Us Management</h1>
        <p>Edit the core story, mission, and vision of your agency.</p>
      </header>

      <div className="admin-card">
        <form action={updateAboutContent}>
          <div className="form-group">
            <label htmlFor="aboutText">About Brandor</label>
            <textarea 
              id="aboutText" 
              name="aboutText" 
              className="form-control" 
              rows={8} 
              defaultValue={content.aboutText}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="mission">Our Mission</label>
            <textarea 
              id="mission" 
              name="mission" 
              className="form-control" 
              rows={4} 
              defaultValue={content.mission}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="vision">Our Vision</label>
            <textarea 
              id="vision" 
              name="vision" 
              className="form-control" 
              rows={4} 
              defaultValue={content.vision}
            ></textarea>
          </div>

          <button type="submit" className="btn-admin">Save Changes</button>
        </form>
      </div>
    </div>
  )
}
