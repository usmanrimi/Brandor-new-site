const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  await prisma.service.deleteMany()

  const services = [
    { title: 'Branding & Identity', description: 'Building memorable brands that inspire trust, recognition, and growth.', imageUrl: '/assets/why-image.jpg', order: 1 },
    { title: 'Media Production', description: 'Professional photography, videography, documentaries, and visual content production.', imageUrl: '/assets/hero-image.jpg', order: 2 },
    { title: 'Event & Training Documentation', description: 'Comprehensive coverage of trainings, workshops, conferences, and community programs.', imageUrl: '/assets/why-image.jpg', order: 3 },
    { title: 'Strategic Storytelling', description: 'Transforming impact into compelling stories for stakeholders, donors, and audiences.', imageUrl: '/assets/hero-image.jpg', order: 4 },
    { title: 'Marketing & Communications', description: 'Helping organizations communicate effectively and strengthen their visibility.', imageUrl: '/assets/why-image.jpg', order: 5 },
    { title: 'Training & Capacity Building', description: 'Empowering individuals, businesses, and organizations through practical training and workshops.', imageUrl: '/assets/hero-image.jpg', order: 6 },
    { title: 'Community Engagement & Development', description: 'Supporting community-focused initiatives, outreach programs, and social impact projects.', imageUrl: '/assets/why-image.jpg', order: 7 }
  ]

  for (const s of services) {
    await prisma.service.create({ data: s })
  }

  console.log("Services seeded successfully")
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
