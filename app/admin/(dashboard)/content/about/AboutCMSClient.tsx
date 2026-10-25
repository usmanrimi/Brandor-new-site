"use client"

import React, { useState } from 'react'
import * as Icons from 'lucide-react'
import MediaPicker from '../../../components/MediaPicker'

interface AboutCMSClientProps {
  content: {
    aboutText: string
    mission: string
    vision: string
    coreValues: string
    aboutHeroImage?: string | null
    whyUsImage?: string | null
  }
  updateAction: (formData: FormData) => Promise<void>
}

export const APPROVED_CORE_VALUES = [
  'Creativity & Innovation: Developing fresh, imaginative media and visual solutions that elevate African narratives and capture audience attention.',
  'Inclusion & Accessibility: Championing accessible storytelling and inclusive media practices that empower marginalized communities, youths, and persons with disabilities.',
  'Integrity & Accountability: Upholding absolute transparency, honesty, and professional responsibility in every client partnership, donor engagement, and project delivery.',
  'Excellence & Professionalism: Delivering uncompromising craft, broadcast-grade production standards, and meticulous attention to detail in all our work.',
  'Purpose-Driven Storytelling: Transforming real human experiences, programs, and social impact into compelling narratives that drive meaningful change.',
  'Collaboration & Empowerment: Partnering closely with organizations, institutions, and communities to build lasting capacity, shared ownership, and mutual growth.'
].join('\n')

export default function AboutCMSClient({ content, updateAction }: AboutCMSClientProps) {
  const [coreValuesText, setCoreValuesText] = useState(content.coreValues || APPROVED_CORE_VALUES)
  const [appliedNotice, setAppliedNotice] = useState(false)

  const handleApplyApprovedValues = () => {
    setCoreValuesText(APPROVED_CORE_VALUES)
    setAppliedNotice(true)
    setTimeout(() => setAppliedNotice(false), 4000)
  }

  return (
    <form action={updateAction}>
      <div className="form-group">
        <label htmlFor="aboutText">About Brandor</label>
        <textarea 
          id="aboutText" 
          name="aboutText" 
          className="form-control" 
          rows={7} 
          defaultValue={content.aboutText}
        />
      </div>

      <div className="form-group">
        <label htmlFor="mission">Our Mission</label>
        <textarea 
          id="mission" 
          name="mission" 
          className="form-control" 
          rows={3} 
          defaultValue={content.mission}
        />
      </div>

      <div className="form-group">
        <label htmlFor="vision">Our Vision</label>
        <textarea 
          id="vision" 
          name="vision" 
          className="form-control" 
          rows={3} 
          defaultValue={content.vision}
        />
      </div>

      <div className="form-group">
        <label htmlFor="coreValues">Core Values (One per line in "Title: Description" format)</label>
        <textarea 
          id="coreValues" 
          name="coreValues" 
          className="form-control" 
          rows={7} 
          value={coreValuesText}
          onChange={(e) => setCoreValuesText(e.target.value)}
        />
      </div>

      {/* Approved Core Values Quick-Apply Box */}
      <div style={{
        backgroundColor: '#f8fafc',
        border: '1px solid #cbd5e1',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h4 style={{ margin: 0, color: 'var(--admin-primary)', fontSize: '0.95rem', fontWeight: 700 }}>
              Official Core Values (Brandor Standard)
            </h4>
            <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--admin-text-light)' }}>
              Creativity &amp; Innovation, Inclusion &amp; Accessibility, Integrity &amp; Accountability, Excellence &amp; Professionalism, Purpose-Driven Storytelling, Collaboration &amp; Empowerment.
            </p>
          </div>
          <button
            type="button"
            onClick={handleApplyApprovedValues}
            className="btn-admin"
            style={{
              backgroundColor: '#ffffff',
              color: 'var(--admin-primary)',
              border: '1px solid var(--admin-border)',
              fontSize: '0.82rem',
              padding: '8px 16px',
              whiteSpace: 'nowrap',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Icons.Check size={14} /> Apply Approved Values
          </button>
        </div>

        {appliedNotice && (
          <div style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem', marginBottom: '10px' }}>
            Official Core Values applied to the text field above. Click "Save Changes" below to publish.
          </div>
        )}

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
          {APPROVED_CORE_VALUES}
        </pre>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '24px' }}>
        <MediaPicker name="aboutHeroImage" defaultValue={content.aboutHeroImage || '/assets/hero-image.jpg'} label="About Hero Image" />
        <MediaPicker name="whyUsImage" defaultValue={content.whyUsImage || '/assets/why-image.jpg'} label="Why Choose Us Image" />
      </div>

      <button type="submit" className="btn-admin" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
        <Icons.Save size={18} /> Save Changes
      </button>
    </form>
  )
}
