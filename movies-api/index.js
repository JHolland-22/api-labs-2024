import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import moviesRouter from './api/movies';
import './db'; 
import defaultErrHandler from './errHandler';

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies

app.use('/api/movies', moviesRouter); // Register movie routes

app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' }); // Handle 404 errors
});

app.use(defaultErrHandler); // Default error handler

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
