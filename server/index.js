import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import session from 'express-session';
import authRoutes from './routes/auth.js';
import statusRoutes from './routes/status.js';
import uploadRoutes from './routes/upload.js';
import workerRoutes from './routes/worker.js';
import { discordManager } from './services/multiUserDiscord.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Routes
app.use('/auth', authRoutes);
app.use('/api/status', statusRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/worker', workerRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Discord Custom Status API' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB');
    
    // Start all Discord workers for enabled users
    console.log('🚀 Starting Discord workers...');
    await discordManager.startAllWorkers();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`👥 Multi-user Discord status system ready`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
