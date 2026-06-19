const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const services = [
  { title: "Branding & Identity", description: "Building memorable brands that inspire trust, recognition, and growth.", icon: "Shield", order: 1 },
  { title: "Media Production", description: "Professional photography, videography, documentaries, and visual content production.", icon: "Camera", order: 2 },
  { title: "Event & Training Documentation", description: "Comprehensive coverage of trainings, workshops, conferences, and community programs.", icon: "MonitorPlay", order: 3 },
  { title: "Strategic Storytelling", description: "Transforming impact into compelling stories for stakeholders, donors, and audiences.", icon: "FileText", order: 4 },
  { title: "Marketing & Communications", description: "Helping organizations communicate effectively and strengthen their visibility.", icon: "Network", order: 5 },
  { title: "Training & Capacity Building", description: "Empowering individuals, businesses, and organizations through practical training and workshops.", icon: "TrendingUp", order: 6 },
  { title: "Community Engagement & Development", description: "Supporting community-focused initiatives, outreach programs, and social impact projects.", icon: "Users", order: 7 }
]

async function main() {
  await prisma.service.deleteMany({})
  for (const s of services) {
    await prisma.service.create({ data: s })
  }
  console.log("Services seeded!")
}

main().catch(console.error).finally(() => prisma.$disconnect())
