const { Client } = require('pg');

const regions = [
  'eu-central-1',
  'eu-west-1',
  'eu-west-2',
  'eu-west-3',
  'us-east-1',
  'us-east-2',
  'us-west-1',
  'us-west-2',
  'ap-south-1',
  'ap-southeast-1',
  'ap-southeast-2',
  'ap-northeast-1',
  'ap-northeast-2',
  'sa-east-1',
  'ca-central-1'
];

async function testRegion(region) {
  const url = `postgresql://postgres.jxzdrnnxxctdbefpouds:Br%40ndor0123%40@aws-0-${region}.pooler.supabase.com:6543/postgres?sslmode=require`;
  const client = new Client({ connectionString: url });
  try {
    await client.connect();
    console.log(`SUCCESS: ${region} -> ${url}`);
    await client.end();
    return url;
  } catch (e) {
    // console.log(`Failed: ${region}`);
    return null;
  }
}

async function main() {
  console.log("Testing Supabase Pooler Regions...");
  const promises = regions.map(r => testRegion(r));
  const results = await Promise.all(promises);
  const found = results.find(r => r !== null);
  if (found) {
    console.log("FOUND URL:", found);
  } else {
    console.log("NO REGION FOUND");
  }
}

main();
