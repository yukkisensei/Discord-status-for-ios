import express from 'express';
import User from '../models/User.js';
import { discordManager } from '../services/multiUserDiscord.js';

const router = express.Router();

// Middleware to check authentication
const requireAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  next();
};

// Setup worker - User cung cấp Discord token
router.post('/setup', requireAuth, async (req, res) => {
  try {
    const { userToken } = req.body;
    
    if (!userToken) {
      return res.status(400).json({ error: 'Discord user token is required' });
    }

    const user = await User.findById(req.session.userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Lưu token (encrypted trong production)
    user.discordUserToken = userToken;
    user.workerEnabled = true;
    user.workerError = null;
    await user.save();

    // Start worker
    const started = await discordManager.startWorkerForUser(user._id);
    
    if (!started) {
      return res.status(400).json({ 
        error: 'Invalid Discord token or failed to start worker' 
      });
    }

    res.json({ 
      success: true,
      message: 'Worker started successfully',
      workerEnabled: true
    });
  } catch (error) {
    console.error('Setup worker error:', error);
    res.status(500).json({ error: 'Failed to setup worker' });
  }
});

// Stop worker
router.post('/stop', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Stop worker
    await discordManager.stopWorkerForUser(user._id);
    
    // Update database
    user.workerEnabled = false;
    await user.save();

    res.json({ 
      success: true,
      message: 'Worker stopped successfully',
      workerEnabled: false
    });
  } catch (error) {
    console.error('Stop worker error:', error);
    res.status(500).json({ error: 'Failed to stop worker' });
  }
});

// Restart worker
router.post('/restart', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId).select('+discordUserToken');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.discordUserToken) {
      return res.status(400).json({ error: 'No token configured' });
    }

    // Stop existing worker
    await discordManager.stopWorkerForUser(user._id);
    
    // Wait a bit
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Start new worker
    const started = await discordManager.startWorkerForUser(user._id);
    
    if (!started) {
      return res.status(400).json({ error: 'Failed to restart worker' });
    }

    // Clear error
    user.workerError = null;
    await user.save();

    res.json({ 
      success: true,
      message: 'Worker restarted successfully'
    });
  } catch (error) {
    console.error('Restart worker error:', error);
    res.status(500).json({ error: 'Failed to restart worker' });
  }
});

// Get worker status
router.get('/status', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const allWorkers = discordManager.getWorkersStatus();
    const myWorker = allWorkers.find(w => w.userId === user._id.toString());

    res.json({
      workerEnabled: user.workerEnabled,
      workerError: user.workerError,
      workerRunning: !!myWorker,
      workerReady: myWorker?.ready || false,
      workerUptime: myWorker?.uptime || null,
      lastStatusUpdate: user.lastStatusUpdate
    });
  } catch (error) {
    console.error('Get worker status error:', error);
    res.status(500).json({ error: 'Failed to get worker status' });
  }
});

// Get all workers status (admin only - optional)
router.get('/all', requireAuth, async (req, res) => {
  try {
    // TODO: Add admin check here
    const workers = discordManager.getWorkersStatus();
    res.json({ workers, total: workers.length });
  } catch (error) {
    console.error('Get all workers error:', error);
    res.status(500).json({ error: 'Failed to get workers status' });
  }
});

export default router;
