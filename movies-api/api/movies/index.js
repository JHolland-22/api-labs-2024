import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';

const router = express.Router();

// Get all movies
router.get('/', asyncHandler(async (req, res) => {
    const movies = await movieModel.find();
    if (movies.length > 0) {
        res.status(200).json(movies);
    } else {
        res.status(404).json({ message: 'No movies found in the database' });
    }
}));

// Get a movie by ID
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({ message: 'Movie not found' });
    }
}));

export default router;
