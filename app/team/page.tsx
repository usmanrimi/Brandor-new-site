export const dynamic = "force-dynamic";
import { PrismaClient } from '@prisma/client'
import TeamCard from './TeamCard'

const prisma = new PrismaClient()

export default async function Team() {
  let teamMembers: any[] = []
  
  try {
    teamMembers = await prisma.teamMember.findMany({ orderBy: { order: 'asc' } })
  } catch (error) {
    console.error("Database fallback")
    teamMembers = [
      { id: '1', name: 'Usman Rimi', role: 'Founder & CEO', imageUrl: '/team/usman.jpg' },
      { id: '2', name: 'Aisha Bello', role: 'Creative Director', imageUrl: '/team/aisha.jpg' },
      { id: '3', name: 'John Doe', role: 'Lead Developer', imageUrl: '/team/john.jpg' }
    ]
  }

  return (
    <div style={{ paddingTop: '120px' }}>
      <section id="team" className="team">
        <div className="wrap">
          <div className="section-head reveal" style={{ maxWidth: '800px', margin: '0 auto 64px', textAlign: 'center' }}>
            <p className="eyebrow" style={{ color: 'var(--orange)' }}>Our People</p>
            <h1 className="gsap-split" style={{ color: 'var(--denim)', fontSize: '3rem', marginBottom: '24px' }}>Meet the team behind the lens</h1>
            <p style={{ color: 'var(--ink)', fontSize: '1.1rem' }}>A collective of storytellers, strategists, and creatives dedicated to elevating your brand's narrative.</p>
          </div>
          
          <div className="team-grid">
            <style>{`
              .team-bio-text {
                color: #fff;
                font-size: 0.95rem;
                line-height: 1.6;
                transform: translateY(20px);
                opacity: 0;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
              }
              @media (hover: hover) {
                .team-member-card:hover .team-bio-text {
                  transform: translateY(0);
                  opacity: 1;
                }
                .team-overlay {
                  background: linear-gradient(to top, rgba(23,59,97,0.95) 0%, rgba(23,59,97,0.4) 60%, transparent 100%);
                  display: flex;
                  flex-direction: column;
                  justify-content: flex-end;
                  padding: 30px 24px;
                }
              }
              @media (hover: none), (max-width: 768px) {
                .team-bio-text {
                  transform: translateY(0);
                  opacity: 1;
                  display: none;
                }
                .team-member-card.expanded .team-bio-text {
                  display: block;
                }
                .mobile-bio-btn {
                  display: inline-block !important;
                }
                .team-overlay {
                  opacity: 1 !important;
                  background: linear-gradient(to top, rgba(23,59,97,0.85) 0%, transparent 100%);
                  display: flex;
                  flex-direction: column;
                  justify-content: flex-end;
                  padding: 20px;
                }
                .team-member-card.expanded .team-overlay {
                  background: rgba(23,59,97,0.9) !important;
                }
              }
              .mobile-bio-btn {
                display: none;
                background: var(--orange);
                color: #fff;
                border: none;
                padding: 6px 16px;
                border-radius: 20px;
                font-size: 0.85rem;
                font-weight: 600;
                margin-top: 12px;
                cursor: pointer;
              }
            `}</style>
            {teamMembers.map((member, i) => (
              <TeamCard key={member.id} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
