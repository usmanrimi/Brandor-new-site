const { PrismaClient } = require('@prisma/client');

const regions = [
  'aws-0-us-east-1',
  'aws-0-us-west-1',
  'aws-0-eu-west-1',
  'aws-0-eu-central-1',
  'aws-0-eu-west-2',
  'aws-0-eu-west-3',
  'aws-0-eu-north-1',
  'aws-0-ap-south-1',
  'aws-0-ap-southeast-1',
  'aws-0-ap-southeast-2',
  'aws-0-ap-northeast-1',
  'aws-0-ap-northeast-2',
  'aws-0-sa-east-1',
  'aws-0-ca-central-1'
];

async function testRegions() {
  for (const region of regions) {
    const url = `postgresql://postgres.jxzdrnnxxctdbefpouds:Br%40ndor0123%40@${region}.pooler.supabase.com:6543/postgres?pgbouncer=true`;
    console.log(`Testing ${region}...`);
    
    const prisma = new PrismaClient({
      datasources: { db: { url } }
    });
    
    try {
      const res = await prisma.aboutContent.findFirst();
      console.log(`SUCCESS! Found working region: ${region}`);
      return;
    } catch (e) {
      if (e.message.includes('tenant/user')) {
        // Wrong region
        console.log(`  Failed (tenant not found)`);
      } else {
        console.log(`  Failed (${e.message})`);
      }
    } finally {
      await prisma.$disconnect();
    }
  }
  console.log('No working region found.');
}

testRegions();
