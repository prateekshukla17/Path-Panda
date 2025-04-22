const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongoURL);

    console.log('✅ MongoDB connected!');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};
connectDB();
module.exports = { connectDB: connectDB };
