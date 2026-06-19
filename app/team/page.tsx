export const dynamic = "force-dynamic";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function Team() {
  let teamMembers: any[] = []
  
  try {
    teamMembers = await prisma.teamMember.findMany({ orderBy: { createdAt: 'asc' } })
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
            {teamMembers.map((member, i) => (
              <div key={member.id} className={`team-member-card reveal stagger-${(i % 4) + 1}`}>
                <div className="team-portrait">
                  <img src={member.imageUrl} alt={member.name} />
                  <div className="team-overlay"></div>
                </div>
                <div className="team-info">
                  <h4>{member.name}</h4>
                  <p>{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
