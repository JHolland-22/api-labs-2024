import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { tasksData } from './tasksData';
import asyncHandler from 'express-async-handler';


const router = express.Router();

// Get all tasks
router.get('/', async (req, res) => {
    const tasks = await Task.find().populate('userId', 'username');
    res.status(200).json(tasks);
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


// create a task
router.post('/', asyncHandler(async (req, res) => {
    const task = await Task(req.body).save();
    res.status(201).json(task);
}));

// Update a task
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const taskIndex = tasksData.tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({ status: 404, message: 'Task not found' });
    }

    const updatedTask = {
        ...tasksData.tasks[taskIndex],
        ...req.body,
        updated_at: new Date().toISOString(),
        id
    };

    tasksData.tasks[taskIndex] = updatedTask;
    res.json(updatedTask);
});

// Delete a task
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const taskIndex = tasksData.tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({ status: 404, message: 'Task not found' });
    }

    tasksData.tasks.splice(taskIndex, 1);
    tasksData.total_results--;
    res.status(204).send();
});

export default router;
