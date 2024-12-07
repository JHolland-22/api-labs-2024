import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';

const router = express.Router();

// GET /api/movies - Get all movies
router.get('/', asyncHandler(async (req, res) => {
    // You could add a query parameter to filter the results, for example:
    const { genre, title } = req.query; // Extract query parameters
    
    const filter = {};
    
    // If genre or title is passed in the query, filter movies based on them
    if (genre) {
        filter.genre_ids = { $in: [parseInt(genre)] }; // Example: filter by genre
    }
    if (title) {
        filter.title = { $regex: title, $options: 'i' }; // Example: filter by title (case-insensitive)
    }

    const movies = await movieModel.find(filter); // Find movies with the applied filters
    res.status(200).json(movies); // Return the filtered movies
}));

// GET /api/movies/:id - Get movie details by ID
router.get('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params; // Get the ID from the URL parameter
    const movie = await movieModel.findByMovieDBId(id); // Find movie by its MovieDB ID
    if (movie) {
        res.status(200).json(movie); // If found, return the movie
    } else {
        res.status(404).json({ message: 'Movie not found' }); // Return 404 if not found
    }
}));

export default router;
