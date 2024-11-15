import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { tasksData } from './tasksData';

const router = express.Router();

// Get all tasks
router.get('/', (req, res) => {
    res.json(tasksData);
});

// Get task details
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const task = tasksData.tasks.find(task => task.id === id);
    if (!task) {
        return res.status(404).json({ status: 404, message: 'Task not found' });
    }
    return res.status(200).json(task);
});

// Add a new task
router.post('/', (req, res) => {
    const { title, description, deadline, priority, done } = req.body;

    // Create the new task with additional properties
    const newTask = {
        id: uuidv4(), // Generate a unique ID
        title,
        description,
        deadline,
        priority,
        done,
        created_at: new Date().toISOString(), // Timestamp when the task is created
        updated_at: new Date().toISOString()  // Timestamp when the task is created
    };

    // Add the new task to the data
    tasksData.tasks.push(newTask);

    // Increment the total_results counter
    tasksData.total_results++;

    // Respond with the newly created task
    res.status(201).json(newTask);
});

export default router;
