// src/db.ts

import mongoose from "mongoose";
import { Todo } from "@/models/todo.model";

const MONGODB_URI: string = process.env.VERCEL_MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the VERCEL_MONGODB_URI environment variable inside .env');
}

export async function connectDB() {
    await mongoose.connect(MONGODB_URI);
    // Ensure Mongoose Indexes Are Created
    await Promise.all([
      Todo.init(),
    ]);
    console.log("MongoDB connected");
}

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ MongoDB disconnected');
});

mongoose.connection.on('reconnected', () => {
  console.log('✅ MongoDB reconnected');
});
