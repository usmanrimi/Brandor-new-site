const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://postgres:Br%40ndor0123%40@db.jxzdrnnxxctdbefpouds.supabase.co:5432/postgres"
    }
  }
})

async function main() {
  // Clear existing team members
  await prisma.teamMember.deleteMany()
  
  // Create new team members
  const members = [
    {
      name: 'Usman Auwal',
      role: 'Founder & CEO',
      bio: 'Leading Brandor\'s creative vision, brand strategy, media production, and storytelling initiatives. Passionate about helping organizations communicate impact through branding, documentation, and strategic content.',
      imageUrl: '/assets/team/usman-auwal.png'
    },
    {
      name: 'Ahmad Muhd Dantata',
      role: 'Media Producer',
      bio: 'A dedicated media professional responsible for capturing, producing, and delivering high-quality visual content. Passionate about storytelling through photography, videography, and creative media production that helps organizations showcase their impact professionally.',
      imageUrl: '/assets/team/ahmad-muhd-dantata.jpg'
    },
    {
      name: 'Maryam Ado Wada',
      role: 'Communications Officer',
      bio: 'A communications professional dedicated to managing brand communication, content development, stakeholder engagement, and strategic messaging. Passionate about helping organizations communicate their impact effectively through compelling content, storytelling, and audience engagement.',
      imageUrl: '/assets/team/maryam-ado-wada.jpg'
    },
    {
      name: 'Ahmad Ahmad Falaki',
      role: 'Video Editor',
      bio: 'A creative video editor specializing in transforming raw footage into compelling visual stories. Skilled in editing, color correction, motion graphics integration, and post-production workflows that deliver engaging and professional content for organizations, brands, and events.',
      imageUrl: '/assets/team/ahmad-ahmad-falaki.jpg'
    },
    {
      name: 'Muhammad Sani Usman',
      role: 'Creative Director',
      bio: 'A creative leader responsible for overseeing concepts, visual direction, and creative execution across Brandor\'s projects. Passionate about transforming ideas into impactful brand experiences through innovation, strategic thinking, and compelling storytelling.',
      imageUrl: '/assets/team/muhammad-sani-usman.jpg'
    }
  ]
  
  for (const m of members) {
    await prisma.teamMember.create({ data: m })
  }
  
  console.log('Successfully seeded 5 team members.')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
