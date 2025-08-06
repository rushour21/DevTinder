const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () =>{
    try {
       await mongoose.connect(process.env.VITE_MONGODB_URL)
       console.log('MongoDB connected successfully');
     } catch (error) {
       throw new Error('MongoDB connection failed: ' + error.message);
     }
}

module.exports = connectDB;