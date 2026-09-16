'use client'

import React, { useState } from 'react'

export default function TeamCard({ member, index }: { member: any, index: number }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div 
      className={	eam-member-card reveal stagger- }
      onClick={() => setExpanded(!expanded)}
    >
      <div className="team-portrait">
        <img src={member.imageUrl} alt={member.name} />
        <div className="team-overlay">
          {member.bio && (
            <div className="team-bio-text">
              {member.bio}
            </div>
          )}
        </div>
      </div>
      <div className="team-info">
        <h4>{member.name}</h4>
        <p>{member.role}</p>
        {member.bio && (
          <button className="mobile-bio-btn" onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}>
            {expanded ? 'Hide Bio' : 'View Bio'}
          </button>
        )}
      </div>
    </div>
  )
}
