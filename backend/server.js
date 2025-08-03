import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import sessionRoutes from './routes/sessionRoutes.js';

// Load .env variables
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // You can pass origin config here if needed
app.use(express.json());

// Routes
app.use('/api', authRoutes);
app.use('/api', sessionRoutes);

// MongoDB Connection
const PORT = process.env.PORT || 5000;
console.log("🌐 MONGO_URI:", process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ MongoDB Connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1); // Optional: stop server if DB fails
  });
