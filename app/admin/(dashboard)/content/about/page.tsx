import React from 'react'
import { PrismaClient } from '@prisma/client'
import { updateAboutContent } from './actions'
import MediaPicker from '../../../components/MediaPicker'

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
      aboutHeroImage: "/assets/hero-image.jpg",
      whyUsImage: "/assets/why-image.jpg",
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

          <div className="form-group">
            <label htmlFor="coreValues">Core Values (One per line in "Title: Description" format)</label>
            <textarea 
              id="coreValues" 
              name="coreValues" 
              className="form-control" 
              rows={6} 
              defaultValue={content.coreValues}
            ></textarea>
          </div>

          {/* Proposed Copy Draft for User Review */}
          <div style={{
            backgroundColor: '#f8fafc',
            border: '1px solid #cbd5e1',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '24px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div>
                <h4 style={{ margin: 0, color: 'var(--admin-primary)', fontSize: '1rem', fontWeight: 700 }}>
                  Proposed Core Values Copy (Draft for Review)
                </h4>
                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--admin-text-light)' }}>
                  These proposed values will not overwrite your published values until you paste them into the box above and save.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const proposed = `Creativity with Purpose: We turn ideas into meaningful visuals and stories that serve clear goals.
Quality & Craft: We bring care, consistency, and attention to detail to every project.
Integrity & Trust: We work honestly, communicate clearly, and honour our commitments.
Collaboration: We listen closely and work with our clients as creative partners.
Authentic Storytelling: We represent people, organisations, and their experiences with accuracy and respect.
Learning & Innovation: We keep improving our skills and exploring better ways to create and communicate.`
                  const el = document.getElementById('coreValues') as HTMLTextAreaElement
                  if (el) el.value = proposed
                }}
                className="btn-admin"
                style={{
                  backgroundColor: '#ffffff',
                  color: 'var(--admin-primary)',
                  border: '1px solid var(--admin-border)',
                  fontSize: '0.82rem',
                  padding: '8px 16px',
                  whiteSpace: 'nowrap'
                }}
              >
                Apply Proposed Values
              </button>
            </div>
            <pre style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              padding: '14px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              color: '#334155',
              whiteSpace: 'pre-wrap',
              margin: 0,
              lineHeight: 1.6
            }}>
              {`Creativity with Purpose: We turn ideas into meaningful visuals and stories that serve clear goals.
Quality & Craft: We bring care, consistency, and attention to detail to every project.
Integrity & Trust: We work honestly, communicate clearly, and honour our commitments.
Collaboration: We listen closely and work with our clients as creative partners.
Authentic Storytelling: We represent people, organisations, and their experiences with accuracy and respect.
Learning & Innovation: We keep improving our skills and exploring better ways to create and communicate.`}
            </pre>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
            <MediaPicker name="aboutHeroImage" defaultValue={content.aboutHeroImage || ''} label="About Hero Image" />
            <MediaPicker name="whyUsImage" defaultValue={content.whyUsImage || ''} label="Why Us Section Image" />
          </div>

          <button type="submit" className="btn-admin">Save Changes</button>
        </form>
      </div>
    </div>
  )
}
