const { Client } = require('pg');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

async function main() {
  const url = `postgresql://postgres.apbkobhfnmcqqzqeeqss:Br%40ndor0123%40@aws-0-eu-north-1.pooler.supabase.com:6543/postgres?sslmode=require`;
  const client = new Client({ connectionString: url });
  try {
    await client.connect();
    console.log(`SUCCESS`);
    await client.end();
  } catch (e) {
    console.log("Failed:", e.message);
  }
}

main();
