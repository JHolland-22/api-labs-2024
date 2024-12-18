import express from 'express';
import User from './userModel';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';



const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ code: 500, msg: 'Failed to fetch users', error: error.message });
    }
});

//.... code as before

// register(Create)/Authenticate User
router.post('/', asyncHandler(async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ success: false, msg: 'Username and password are required.' });
        }
        if (req.query.action === 'register') {
            await registerUser(req, res);
        } else {
            await authenticateUser(req, res);
        }
    } catch (error) {
        // Log the error and return a generic error message
        console.error(error);
        res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
}));

// ... Code as before

// Update a user
router.put('/:id', async (req, res) => {
    try {
        if (req.body._id) delete req.body._id;
        const result = await User.updateOne({ _id: req.params.id }, req.body);
        if (result.matchedCount) {
            res.status(200).json({ code: 200, msg: 'User updated successfully' });
        } else {
            res.status(404).json({ code: 404, msg: 'Unable to update user' });
        }
    } catch (error) {
        res.status(500).json({ code: 500, msg: 'Error updating user', error: error.message });
    }
});



export default router;
