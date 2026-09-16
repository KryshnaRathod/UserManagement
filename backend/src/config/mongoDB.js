const mongoose = require('mongoose');

const connectMongoDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error('❌ MongoDB Error: MONGO_URI env variable is not set. Set it in Render Dashboard → Environment, or in backend/.env for local dev.');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 15000 });

    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.log('❌ MongoDB Error:', error.message);
    process.exit(1);
  }
};

module.exports = connectMongoDB;