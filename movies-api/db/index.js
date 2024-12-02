import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

mongoose.connect(process.env.MONGO_DB)
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch((err) => {
    console.error(`Database connection error: ${err}`);
  });

const db = mongoose.connection;

db.on('disconnected', () => {
    console.log('Database disconnected');
});

db.once('open', () => {
    console.log(`Database connected to ${db.name} on ${db.host}`);
});
