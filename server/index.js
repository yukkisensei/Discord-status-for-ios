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

const defaultOrigin = process.env.CLIENT_URL || 'http://localhost:5173';
const extraOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
const allowedOrigins = [defaultOrigin, ...extraOrigins];

const regexOrigins = (process.env.CORS_ALLOW_REGEX || '')
  .split(',')
  .map((pattern) => pattern.trim())
  .filter(Boolean)
  .map((pattern) => {
    try {
      return new RegExp(pattern);
    } catch (error) {
      console.warn(`⚠️  Invalid CORS regex pattern skipped: ${pattern}`);
      return null;
    }
  })
  .filter(Boolean);

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || regexOrigins.some((regex) => regex.test(origin))) {
      return callback(null, true);
    }
    return callback(new Error(`CORS blocked origin: ${origin}`));
  },
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
