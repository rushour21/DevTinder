const express = require('express');
const connectDB = require('./config/database');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const requestRoutes = require('./routes/request');
const userRoutes =  require('./routes/user')


const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT || 3000;

app.use('/', authRoutes);
app.use('/', requestRoutes);
app.use('/', userRoutes)

connectDB().then(() => {
  app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})}).catch((error) => {
  console.error(error);  
});

 