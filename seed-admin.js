const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  const username = 'brandorcreativeagencycom.ng'
  const plainPassword = 'Br@ndor0123@'

  const hashedPassword = await bcrypt.hash(plainPassword, 10)

  const admin = await prisma.adminUser.upsert({
    where: { username },
    update: { password: hashedPassword },
    create: { username, password: hashedPassword }
  })

  console.log('Admin user created successfully:', admin.username)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
