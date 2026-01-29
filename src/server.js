import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();
connectDB(); // Initialize the connection

const app = express();
app.use(express.json());

// Add a test route to see if server is working
app.get('/', (req, res) => res.send('API is running...'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in development mode on port ${PORT}`));