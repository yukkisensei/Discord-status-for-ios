import { Client } from 'discord.js-selfbot-v13';
import User from '../models/User.js';

class MultiUserDiscordManager {
  constructor() {
    this.clients = new Map(); // userId -> Discord Client
    this.reconnectAttempts = new Map(); // userId -> attempt count
  }

  // Khởi động worker cho một user
  async startWorkerForUser(userId) {
    try {
      const user = await User.findById(userId).select('+discordUserToken');
      
      if (!user || !user.discordUserToken) {
        console.log(`⚠️ No token for user ${userId}`);
        return false;
      }

      // Nếu đã có client đang chạy, skip
      if (this.clients.has(userId.toString())) {
        console.log(`✅ Worker already running for ${user.username}`);
        return true;
      }

      const client = new Client({
        checkUpdate: false,
        ws: { properties: { browser: 'Discord iOS' } } // Giả vờ là mobile để ít bị phát hiện
      });

      // Setup event handlers
      client.on('ready', async () => {
        console.log(`✅ Discord worker ready for ${user.username} (${client.user.tag})`);
        this.reconnectAttempts.set(userId.toString(), 0);
        
        // Sync status ngay lập tức
        await this.syncUserStatus(userId);
      });

      client.on('error', (error) => {
        console.error(`❌ Discord error for ${user.username}:`, error.message);
      });

      client.on('disconnect', () => {
        console.log(`🔌 Disconnected for ${user.username}`);
        this.handleDisconnect(userId);
      });

      // Đăng nhập
      await client.login(user.discordUserToken);
      this.clients.set(userId.toString(), client);
      
      console.log(`🚀 Started worker for ${user.username}`);
      return true;

    } catch (error) {
      console.error(`❌ Failed to start worker for ${userId}:`, error.message);
      
      // Nếu token invalid, disable worker
      if (error.message.includes('TOKEN_INVALID') || error.message.includes('401')) {
        await User.findByIdAndUpdate(userId, { 
          workerEnabled: false,
          workerError: 'Invalid token. Please update your token.'
        });
      }
      
      return false;
    }
  }

  // Sync status cho một user
  async syncUserStatus(userId) {
    try {
      const client = this.clients.get(userId.toString());
      if (!client) {
        console.log(`⚠️ No client found for ${userId}`);
        return false;
      }

      const user = await User.findById(userId);
      if (!user) return false;

      const status = user.customStatus;

      if (!status || !status.enabled) {
        // Clear status
        await client.user.setPresence({
          activities: [],
          status: 'online'
        });
        console.log(`🧹 Cleared status for ${user.username}`);
        return true;
      }

      // Set custom status
      const statusText = `${status.emoji || ''} ${status.name}`.trim();
      
      await client.user.setPresence({
        activities: [{
          type: 'CUSTOM',
          name: 'Custom Status',
          state: statusText
        }],
        status: 'online' // hoặc user có thể chọn: idle, dnd, invisible
      });

      // Update last sync time
      user.lastStatusUpdate = new Date();
      await user.save();

      console.log(`✅ Updated status for ${user.username}: ${statusText}`);
      return true;

    } catch (error) {
      console.error(`❌ Failed to sync status for ${userId}:`, error.message);
      return false;
    }
  }

  // Stop worker cho một user
  async stopWorkerForUser(userId) {
    const client = this.clients.get(userId.toString());
    if (client) {
      try {
        await client.destroy();
        this.clients.delete(userId.toString());
        this.reconnectAttempts.delete(userId.toString());
        console.log(`🛑 Stopped worker for ${userId}`);
        return true;
      } catch (error) {
        console.error(`❌ Error stopping worker:`, error.message);
        return false;
      }
    }
    return false;
  }

  // Handle disconnect và auto-reconnect
  async handleDisconnect(userId) {
    this.clients.delete(userId.toString());
    
    const attempts = this.reconnectAttempts.get(userId.toString()) || 0;
    
    if (attempts < 5) {
      console.log(`🔄 Attempting to reconnect for ${userId} (attempt ${attempts + 1}/5)`);
      this.reconnectAttempts.set(userId.toString(), attempts + 1);
      
      // Retry after delay
      setTimeout(() => {
        this.startWorkerForUser(userId);
      }, 5000 * (attempts + 1)); // Exponential backoff
    } else {
      console.log(`❌ Max reconnect attempts reached for ${userId}`);
      await User.findByIdAndUpdate(userId, {
        workerError: 'Connection lost. Please restart worker.'
      });
    }
  }

  // Khởi động workers cho tất cả users có workerEnabled = true
  async startAllWorkers() {
    try {
      const users = await User.find({ workerEnabled: true }).select('_id username');
      console.log(`🚀 Starting workers for ${users.length} users...`);
      
      for (const user of users) {
        await this.startWorkerForUser(user._id);
        // Delay nhỏ để tránh rate limit
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      console.log(`✅ All workers started`);
    } catch (error) {
      console.error('❌ Error starting workers:', error);
    }
  }

  // Get status của tất cả workers
  getWorkersStatus() {
    const status = [];
    for (const [userId, client] of this.clients.entries()) {
      status.push({
        userId,
        username: client.user?.tag,
        ready: client.isReady(),
        uptime: client.uptime
      });
    }
    return status;
  }
}

// Export singleton instance
export const discordManager = new MultiUserDiscordManager();
