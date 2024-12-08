import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import usersRouter from './api/users';
import moviesRouter from './api/movies';
import './db'; // Database connection
import defaultErrHandler from './errHandler'; // Error handler

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/movies', moviesRouter);


app.use(defaultErrHandler); // Error handling middleware

app.listen(port, () => {
  console.info(`Server running at http://localhost:${port}`);
});

