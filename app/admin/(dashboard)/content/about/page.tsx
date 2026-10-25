import React from 'react'
import { prisma } from '@/lib/prisma'
import { updateAboutContent } from './actions'
import AboutCMSClient from './AboutCMSClient'

export const dynamic = "force-dynamic";

export default async function AboutCMS() {
  let content = await prisma.aboutContent.findUnique({ where: { id: 'global' } })

  if (!content) {
    content = {
      id: 'global',
      aboutText: "Brandor is a creative branding, media production, and storytelling agency dedicated to helping organizations, businesses, institutions, and development partners communicate their impact with clarity, creativity, and purpose.\n\nWe believe every project, every event, and every initiative has a story worth telling. Our role is to transform moments, achievements, and ideas into compelling visual experiences that inspire trust, engagement, and action.\n\nFrom corporate branding and media production to event documentation, strategic storytelling, and capacity building, we help our clients showcase their work professionally while creating meaningful connections with their audiences.",
      mission: "To empower brands, organizations, and communities through strategic branding, impactful storytelling, professional media production, and capacity-building initiatives that drive visibility, growth, and lasting impact.",
      vision: "To become Africa's leading creative agency for branding, storytelling, and impact documentation, helping organizations communicate their value, amplify their achievements, and inspire positive change.",
      coreValues: "",
      process: "[]",
      whyUs: "[]",
      aboutHeroImage: "/assets/hero-image.jpg",
      whyUsImage: "/assets/why-image.jpg",
      updatedAt: new Date()
    }
  }

  return (
    <div>
      <header className="admin-header">
        <h1>About Us Management</h1>
        <p>Edit the core story, mission, vision, and official core values of Brandor.</p>
      </header>

      <div className="admin-card">
        <AboutCMSClient 
          content={{
            aboutText: content.aboutText,
            mission: content.mission,
            vision: content.vision,
            coreValues: content.coreValues,
            aboutHeroImage: content.aboutHeroImage,
            whyUsImage: content.whyUsImage,
          }}
          updateAction={updateAboutContent}
        />
      </div>
    </div>
  )
}
