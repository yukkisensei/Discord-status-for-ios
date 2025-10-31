import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  discordId: {
    type: String,
    required: true,
    unique: true
  },
  username: String,
  discriminator: String,
  avatar: String,
  email: String,
  accessToken: String,
  refreshToken: String,
  discordUserToken: {
    type: String,
    select: false // Không trả về khi query thường vì bảo mật
  },
  workerEnabled: {
    type: Boolean,
    default: false
  },
  workerError: String,
  customStatus: {
    name: String,
    emoji: String,
    imageUrl: String,
    startTime: Date,
    enabled: {
      type: Boolean,
      default: false
    }
  },
  lastStatusUpdate: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('User', userSchema);
