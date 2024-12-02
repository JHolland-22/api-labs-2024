import express from 'express';
import User from './userModel';

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

// Register/Create User or Authenticate
router.post('/', async (req, res) => {
    try {
        if (req.query.action === 'register') {
            // Save new user to the DB
            const newUser = new User(req.body);
            await newUser.save();
            res.status(201).json({
                code: 201,
                msg: 'Successfully created new user.'
            });
        } else {
            // Authenticate user
            const user = await User.findOne(req.body);
            if (!user) {
                return res.status(401).json({ code: 401, msg: 'Authentication failed' });
            } else {
                return res.status(200).json({ code: 200, msg: 'Authentication successful', token: 'TEMPORARY_TOKEN' });
            }
        }
    } catch (error) {
        if (error.name === 'ValidationError') {
            // Handle validation errors
            return res.status(400).json({ code: 400, msg: 'Validation error', error: error.message });
        }
        // Handle other errors
        res.status(500).json({ code: 500, msg: 'Server error', error: error.message });
    }
});

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
