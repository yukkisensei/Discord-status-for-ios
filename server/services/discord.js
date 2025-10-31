import axios from 'axios';

const DISCORD_API = 'https://discord.com/api/v10';

export async function updateDiscordStatus(user) {
  if (!user.customStatus || !user.customStatus.enabled) {
    return;
  }
  
  try {
    const statusData = {
      custom_status: {
        text: user.customStatus.name || 'Custom Status'
      }
    };
    
    // Add emoji if provided
    if (user.customStatus.emoji) {
      statusData.custom_status.emoji_name = user.customStatus.emoji;
    }
    
    // Note: Discord API doesn't support setting custom status via OAuth tokens
    // This would require a self-bot approach which is against Discord TOS
    // Instead, we'll use this as a placeholder for the UI
    // The actual implementation would need Discord Bot with proper permissions
    
    // For now, we'll just log the attempt
    console.log(`Would update status for user ${user.username}:`, statusData);
    
    user.lastStatusUpdate = new Date();
    await user.save();
    
    return true;
  } catch (error) {
    console.error('Discord status update error:', error.response?.data || error.message);
    throw error;
  }
}

export async function refreshAccessToken(user) {
  if (!user.refreshToken) {
    throw new Error('No refresh token available');
  }
  
  try {
    const response = await axios.post(
      `${DISCORD_API}/oauth2/token`,
      new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: user.refreshToken
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    
    user.accessToken = response.data.access_token;
    user.refreshToken = response.data.refresh_token;
    await user.save();
    
    return response.data.access_token;
  } catch (error) {
    console.error('Token refresh error:', error.response?.data || error.message);
    throw error;
  }
}
