import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const servicesCount = await prisma.service.count()
    if (servicesCount > 0) {
      return NextResponse.json({ message: "Database already seeded!" })
    }

    const services = [
      { title: "Branding & Identity", description: "Building memorable brands that inspire trust, recognition, and growth.", icon: "Shield", order: 1 },
      { title: "Media Production", description: "Professional photography, videography, documentaries, and visual content production.", icon: "Camera", order: 2 },
      { title: "Event & Training Documentation", description: "Comprehensive coverage of trainings, workshops, conferences, and community programs.", icon: "MonitorPlay", order: 3 },
      { title: "Strategic Storytelling", description: "Transforming impact into compelling stories for stakeholders, donors, and audiences.", icon: "FileText", order: 4 },
      { title: "Marketing & Communications", description: "Helping organizations communicate effectively and strengthen their visibility.", icon: "Network", order: 5 },
      { title: "Training & Capacity Building", description: "Empowering individuals, businesses, and organizations through practical training and workshops.", icon: "TrendingUp", order: 6 },
      { title: "Community Engagement & Development", description: "Supporting community-focused initiatives, outreach programs, and social impact projects.", icon: "Users", order: 7 }
    ]

    for (const s of services) {
      await prisma.service.create({ data: s })
    }

    await prisma.teamMember.createMany({
      data: [
        { name: "Usman Auwal", role: "Founder & Creative Director", imageUrl: "/assets/team/1.png" },
        { name: "Maryam Ado Wada", role: "Communications Officer", imageUrl: "/assets/team/5.jpg" }
      ]
    })

    await prisma.project.createMany({
      data: [
        { title: "Kano Tech Summit", client: "TechBridge", category: "Event Documentation", date: "Oct 2023", location: "Kano", description: "Comprehensive coverage of the largest tech event in Northern Nigeria.", images: "/assets/portfolio/p1.jpg" },
        { title: "Empower Her Campaign", client: "Women First NGO", category: "Strategic Storytelling", date: "Jan 2024", location: "Abuja", description: "A documentary series highlighting the impact of women empowerment programs.", images: "/assets/portfolio/p2.jpg" },
        { title: "Brand Identity Revamp", client: "Savannah Trust", category: "Branding", date: "Mar 2024", location: "Kaduna", description: "Complete brand overhaul including logo, guidelines, and corporate profile.", images: "/assets/portfolio/p3.jpg" },
        { title: "Climate Action Workshop", client: "Green Earth Initiative", category: "Event Documentation", date: "May 2024", location: "Kano", description: "Photography and highlight reels for a week-long workshop on climate resilience.", images: "/assets/portfolio/p4.jpg" }
      ]
    })

    await prisma.testimonial.createMany({
      data: [
        { name: "Aisha Kabir", role: "Program Director", company: "Women First NGO", content: "Brandor transformed how we tell our stories. Their professionalism and eye for detail is unmatched in the region." },
        { name: "Ibrahim Musa", role: "CEO", company: "TechBridge", content: "The documentary they produced for our summit exceeded all expectations. Highly recommended creative agency." },
        { name: "Fatima Yusuf", role: "Communications Lead", company: "Savannah Trust", content: "Our brand identity is now world-class. Brandor understood our vision perfectly." }
      ]
    })

    return NextResponse.json({ message: "Successfully seeded the Supabase database!" })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
