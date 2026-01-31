import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';


dotenv.config();
connectDB(); // Initialize the connection

const app = express();
app.use(express.json());

// Add a test route to see if server is working
app.get('/', (req, res) => res.send('API is running...'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, console.log(`Server running in development mode on port ${PORT}`));



// ... under your middleware
app.use('/api/users', userRoutes);


// ... existing imports


// ... your routes
app.use('/api/users', userRoutes);

// ... Error Middleware (MUST be at the bottom)
app.use(notFound);
app.use(errorHandler);

