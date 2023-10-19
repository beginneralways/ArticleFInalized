// backend/app.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const connectDB = require('./config/db'); // Import the database connection function
const errorHandler = require('./middlewares/errorHandler'); // Import the error handler
const routes = require('./routes/routes'); // Import your routes
const cookieParser = require('cookie-parser');
const helmet= require('helmet');

// Configure CORS
// const corsOptions = {
//   origin: 'http://localhost:3001', // Update with the actual URL of your frontend app
//   credentials: true,
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Define the allowed HTTP methods
//   allowedHeaders: 'Content-Type,Authorization', // Define the allowed headers
// };
// app.use(cors({
//   origin: 'http://localhost:3001', // Replace with the actual URL of your frontend
//   credentials: true,
// }));

// app.use(cors(corsOptions));

// // Handle preflight requests for a specific route
// app.options('/api/articles', cors(corsOptions))

const corsOptions = {
  origin: ['http://localhost:3001','http://localhost:3001/api/articles'],
  // Replace with the origin you want to allow
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
  
};
// Use CORS middleware with the specified options
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());


// Connect to the database
connectDB(); // Call the connectDB function

// Use your routes
app.use('/api', routes);

// Use the error handler after your routes
app.use(errorHandler);


// Server configuration
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
