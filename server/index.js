const express = require('express');
const connectDB = require('./config/database');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');


const dotenv = require('dotenv');
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT || 3000;

app.use('/', authRoutes);



connectDB().then(() => {
  app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})});

