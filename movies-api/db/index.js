import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

// Ensure the environment variable is loaded correctly
if (!process.env.MONGO_DB) {
  console.error('MongoDB URI is not defined in .env file');
  process.exit(1); // Exit the application if DB URI is missing
}

// Connect to the database
mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch((err) => {
    console.error(`Database connection error: ${err.message}`);
    process.exit(1); // Exit the application if connection fails
  });

const db = mongoose.connection;

// Listen for DB connection events
db.on('disconnected', () => {
  console.log('Database disconnected');
});

db.once('open', () => {
  console.log(`Database connected to ${db.name} on ${db.host}`);
});
