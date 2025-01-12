// src/lib/dbConfig.ts
import mongoose from 'mongoose';

const dbConnect = async () => {
  const MONGO_URI: string | undefined = process.env.MONGO_URI;

  if (!MONGO_URI) {
    throw new Error('MONGO_URI is not defined');
  }

  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // 5 seconds
    });

    mongoose.connection.once('open', () => {
      console.log('Connected to MongoDB');
    });

    mongoose.connection.on('error', (err) => {
      if (err instanceof Error) {
        console.error('Error connecting to MongoDB:', err.message);
      } else {
        console.error('An unexpected error occurred');
      }
    });

  } catch (error) {
    console.error('Initial connection failed:', error);
    process.exit(1); // Exit the process with a non-zero exit code
  }
};

export default dbConnect;
