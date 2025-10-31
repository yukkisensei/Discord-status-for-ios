import cron from 'node-cron';
import User from '../models/User.js';
import { updateDiscordStatus } from '../services/discord.js';

export function startStatusWorker() {
  console.log('🔄 Starting status worker...');
  
  // Run every 5 minutes
  cron.schedule('*/5 * * * *', async () => {
    try {
      console.log('⏰ Running status update task...');
      
      // Find all users with enabled custom status
      const users = await User.find({
        'customStatus.enabled': true
      });
      
      console.log(`Found ${users.length} users with enabled status`);
      
      for (const user of users) {
        try {
          await updateDiscordStatus(user);
          console.log(`✅ Updated status for ${user.username}`);
        } catch (error) {
          console.error(`❌ Failed to update status for ${user.username}:`, error.message);
        }
      }
    } catch (error) {
      console.error('Status worker error:', error);
    }
  });
  
  console.log('✅ Status worker started');
}
