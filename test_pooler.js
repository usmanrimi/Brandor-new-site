const { Client } = require('pg');

async function main() {
  const url = `postgresql://postgres.apbkobhfnmcqqzqeeqss:Br%40ndor0123%40@aws-0-eu-north-1.pooler.supabase.com:6543/postgres?sslmode=require`;
  const client = new Client({ connectionString: url });
  try {
    await client.connect();
    console.log(`SUCCESS connected to eu-north-1!`);
    await client.end();
  } catch (e) {
    console.log("Failed to connect:", e);
  }
}

main();
