import dotenv from 'dotenv';
import express from 'express';
import tasksRouter from './api/tasks'; // Import tasks router
import './db';


dotenv.config();

const app = express();

const port = process.env.PORT || 8080;

app.use(express.json());  // To parse JSON request bodies

app.use('/api/tasks', tasksRouter);  // Use tasksRouter for /api/tasks endpoints

app.listen(port, () => {
  console.info(`Server running at http://localhost:${port}`);
});
