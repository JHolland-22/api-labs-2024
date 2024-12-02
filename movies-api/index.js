import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import moviesRouter from './api/movies'; // Import the movies router
import './db'; // Make sure the DB connection is established here
import defaultErrHandler from './errHandler'; // Default error handler

dotenv.config(); // Load environment variables

const app = express(); 
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies

// Register routes
app.use('/api/movies', moviesRouter); // Movies routes should be available at /api/movies

// Default error handler
app.use(defaultErrHandler); // Add this after routes to catch errors

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
