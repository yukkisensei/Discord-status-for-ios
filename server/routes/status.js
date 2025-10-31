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

// Get current status
router.get('/', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId).select('customStatus');
    res.json(user.customStatus || {});
  } catch (error) {
    console.error('Get status error:', error);
    res.status(500).json({ error: 'Failed to get status' });
  }
});

// Update status
router.post('/', requireAuth, async (req, res) => {
  try {
    const { name, emoji, imageUrl, startTime, enabled } = req.body;
    
    const user = await User.findById(req.session.userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Update user's custom status
    user.customStatus = {
      name: name || '',
      emoji: emoji || '',
      imageUrl: imageUrl || '',
      startTime: startTime ? new Date(startTime) : new Date(),
      enabled: enabled !== undefined ? enabled : true
    };
    
    await user.save();
    
    // Try to update Discord status immediately if worker is running
    if (enabled && user.workerEnabled) {
      try {
        await discordManager.syncUserStatus(user._id);
      } catch (error) {
        console.error('Failed to update Discord status:', error.message);
        // Don't fail the request if Discord update fails
      }
    }
    
    res.json({
      ...user.customStatus.toObject(),
      workerRunning: user.workerEnabled
    });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ error: 'Failed to update status' });
  }
});

// Toggle status
router.post('/toggle', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    if (!user.customStatus) {
      return res.status(400).json({ error: 'No status configured' });
    }
    
    user.customStatus.enabled = !user.customStatus.enabled;
    await user.save();
    
    // Update Discord status immediately if worker is running
    if (user.workerEnabled) {
      try {
        await discordManager.syncUserStatus(user._id);
      } catch (error) {
        console.error('Failed to update Discord status:', error.message);
      }
    }
    
    res.json({
      ...user.customStatus.toObject(),
      workerRunning: user.workerEnabled
    });
  } catch (error) {
    console.error('Toggle status error:', error);
    res.status(500).json({ error: 'Failed to toggle status' });
  }
});

export default router;
