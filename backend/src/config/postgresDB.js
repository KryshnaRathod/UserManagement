const { Client } = require('pg');

const client = new Client({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
});

const connectPostgres = async () => {
  try {
    await client.connect();
    console.log('✅ PostgreSQL Connected');
  } catch (error) {
    console.log('❌ PostgreSQL Error:', error.message);
  }
};

module.exports = { connectPostgres, client };