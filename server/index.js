const dotenv = require('dotenv');
dotenv.config();
console.log("JWT Secret Loaded:", process.env.VITE_JWT_SECRET ? "Yes" : "No");

const express = require('express');
const connectDB = require('./config/database');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const requestRoutes = require('./routes/request');
const userRoutes = require('./routes/user')
const chatRoutes = require('./routes/chat');
const groupRoutes = require('./routes/group');
const cors = require('cors')
const http = require("http")

const initializeSocket = require('./utils/socket');

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT || 3000;

app.use('/', authRoutes);
app.use('/', requestRoutes);
app.use('/', userRoutes);
app.use('/', profileRoutes);
app.use('/', chatRoutes);
app.use('/', groupRoutes);

const server = http.createServer(app);
initializeSocket(server);

connectDB().then(() => {
  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  })
}).catch((error) => {
  console.error(error);
});

