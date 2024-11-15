import dotenv from 'dotenv';
import express from 'express';
import tasksRouter from './api/tasks';

dotenv.config();

const app = express();

const port = process.env.PORT || 8080; // Default to 8080 if PORT is not defined

// Middleware to parse JSON bodies
app.use(express.json());
