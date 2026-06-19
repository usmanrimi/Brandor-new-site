const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  await prisma.teamMember.deleteMany({})
  await prisma.teamMember.createMany({
    data: [
      { name: "Usman Auwal", role: "Founder & Creative Director", imageUrl: "/assets/team/1.png" },
      { name: "Maryam Ado Wada", role: "Communications Officer", imageUrl: "/assets/team/5.jpg" }
    ]
  })

  await prisma.project.deleteMany({})
  await prisma.project.createMany({
    data: [
      { title: "Kano Tech Summit", client: "TechBridge", category: "Event Documentation", date: "Oct 2023", location: "Kano", description: "Comprehensive coverage of the largest tech event in Northern Nigeria.", images: "/assets/portfolio/p1.jpg" },
      { title: "Empower Her Campaign", client: "Women First NGO", category: "Strategic Storytelling", date: "Jan 2024", location: "Abuja", description: "A documentary series highlighting the impact of women empowerment programs.", images: "/assets/portfolio/p2.jpg" },
      { title: "Brand Identity Revamp", client: "Savannah Trust", category: "Branding", date: "Mar 2024", location: "Kaduna", description: "Complete brand overhaul including logo, guidelines, and corporate profile.", images: "/assets/portfolio/p3.jpg" },
      { title: "Climate Action Workshop", client: "Green Earth Initiative", category: "Event Documentation", date: "May 2024", location: "Kano", description: "Photography and highlight reels for a week-long workshop on climate resilience.", images: "/assets/portfolio/p4.jpg" }
    ]
  })

  await prisma.testimonial.deleteMany({})
  await prisma.testimonial.createMany({
    data: [
      { name: "Aisha Kabir", role: "Program Director", company: "Women First NGO", content: "Brandor transformed how we tell our stories. Their professionalism and eye for detail is unmatched in the region." },
      { name: "Ibrahim Musa", role: "CEO", company: "TechBridge", content: "The documentary they produced for our summit exceeded all expectations. Highly recommended creative agency." },
      { name: "Fatima Yusuf", role: "Communications Lead", company: "Savannah Trust", content: "Our brand identity is now world-class. Brandor understood our vision perfectly." }
    ]
  })

  console.log("All additional content seeded!")
}

main().catch(console.error).finally(() => prisma.$disconnect())
