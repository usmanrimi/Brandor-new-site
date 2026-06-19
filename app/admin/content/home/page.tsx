import React from 'react'
import { PrismaClient } from '@prisma/client'
import { updateHomeContent } from './actions'

const prisma = new PrismaClient()

export default async function HomeCMS() {
  let content = await prisma.homeContent.findUnique({ where: { id: 'global' } })

  if (!content) {
    content = {
      id: 'global',
      heroEyebrow: "Kano · Creative Media Agency",
      heroHeadline: "Every program has a story. We open the door to tell it.",
      heroLead: "Brandor is a creative media and branding team helping NGOs, institutions, and businesses across Africa document their work, capture their impact, and build a brand worth remembering.",
      ctaText1: "Book a Project",
      ctaLink1: "/contact",
      ctaText2: "Explore Services",
      ctaLink2: "/services",
      marqueeText: "Branding, Storytelling, Documentation, Media Production, Creative Direction, Strategy",
      updatedAt: new Date()
    }
  }

  return (
    <div>
      <header className="admin-header">
        <h1>Homepage Management</h1>
        <p>Edit the hero section and calls-to-action.</p>
      </header>

      <div className="admin-card">
        <form action={updateHomeContent}>
          <div className="form-group">
            <label htmlFor="heroEyebrow">Hero Eyebrow (Small text above headline)</label>
            <input 
              type="text"
              id="heroEyebrow" 
              name="heroEyebrow" 
              className="form-control" 
              defaultValue={content.heroEyebrow}
            />
          </div>

          <div className="form-group">
            <label htmlFor="heroHeadline">Hero Headline</label>
            <textarea 
              id="heroHeadline" 
              name="heroHeadline" 
              className="form-control" 
              rows={2} 
              defaultValue={content.heroHeadline}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="heroLead">Hero Subheadline (Lead paragraph)</label>
            <textarea 
              id="heroLead" 
              name="heroLead" 
              className="form-control" 
              rows={3} 
              defaultValue={content.heroLead}
            ></textarea>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label htmlFor="ctaText1">Primary Button Text</label>
              <input 
                type="text"
                id="ctaText1" 
                name="ctaText1" 
                className="form-control" 
                defaultValue={content.ctaText1}
              />
            </div>
            <div className="form-group">
              <label htmlFor="ctaLink1">Primary Button Link</label>
              <input 
                type="text"
                id="ctaLink1" 
                name="ctaLink1" 
                className="form-control" 
                defaultValue={content.ctaLink1}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="marqueeText">Marquee Banner Text (Comma separated)</label>
            <input 
              type="text"
              id="marqueeText" 
              name="marqueeText" 
              className="form-control" 
              defaultValue={content.marqueeText}
            />
          </div>

          <button type="submit" className="btn-admin">Save Changes</button>
        </form>
      </div>
    </div>
  )
}
