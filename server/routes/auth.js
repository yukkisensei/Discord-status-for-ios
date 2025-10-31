import express from 'express';
import axios from 'axios';
import User from '../models/User.js';

const router = express.Router();

const DISCORD_API = 'https://discord.com/api/v10';
const DISCORD_OAUTH_URL = 'https://discord.com/api/oauth2/authorize';

// Get Discord OAuth URL
router.get('/discord/url', (req, res) => {
  const params = new URLSearchParams({
    client_id: process.env.DISCORD_CLIENT_ID,
    redirect_uri: process.env.DISCORD_REDIRECT_URI,
    response_type: 'code',
    scope: 'identify email'
  });
  
  res.json({ url: `${DISCORD_OAUTH_URL}?${params}` });
});

// Discord OAuth callback
router.get('/discord/callback', async (req, res) => {
  const { code } = req.query;
  
  if (!code) {
    return res.redirect(`${process.env.CLIENT_URL}?error=no_code`);
  }
  
  try {
    // Exchange code for access token
    const tokenResponse = await axios.post(
      `${DISCORD_API}/oauth2/token`,
      new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: process.env.DISCORD_REDIRECT_URI
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    
    const { access_token, refresh_token } = tokenResponse.data;
    
    // Get user info
    const userResponse = await axios.get(`${DISCORD_API}/users/@me`, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });
    
    const discordUser = userResponse.data;
    
    // Save or update user in database
    let user = await User.findOne({ discordId: discordUser.id });
    
    if (user) {
      user.username = discordUser.username;
      user.discriminator = discordUser.discriminator;
      user.avatar = discordUser.avatar;
      user.email = discordUser.email;
      user.accessToken = access_token;
      user.refreshToken = refresh_token;
      await user.save();
    } else {
      user = await User.create({
        discordId: discordUser.id,
        username: discordUser.username,
        discriminator: discordUser.discriminator,
        avatar: discordUser.avatar,
        email: discordUser.email,
        accessToken: access_token,
        refreshToken: refresh_token
      });
    }
    
    // Store user ID in session
    req.session.userId = user._id.toString();
    
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  } catch (error) {
    console.error('Discord OAuth error:', error.response?.data || error.message);
    res.redirect(`${process.env.CLIENT_URL}?error=auth_failed`);
  }
});

// Get current user
router.get('/me', async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    
    const user = await User.findById(req.session.userId).select('-accessToken -refreshToken');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.json({ message: 'Logged out successfully' });
  });
});

export default router;
