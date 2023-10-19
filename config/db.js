// backend/config/db.js

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connectionString = 'mongodb://127.0.0.1:27017/AIassignment'; // Replace with your MongoDB connection string
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectDB;
