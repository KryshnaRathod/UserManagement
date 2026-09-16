require('dotenv').config();

const app = require('./src/app');

const connectMongoDB = require('./src/config/mongoDB');
// const { connectPostgres } = require('./src/config/postgresDB');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect MongoDB
    await connectMongoDB();

    // Connect PostgreSQL
    // await connectPostgres();

    // Start Server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.log('❌ Server Error:', error);
  }
};

startServer();