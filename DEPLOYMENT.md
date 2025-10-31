# 🚀 Hướng Dẫn Deploy Lên Railway

## Bước 1: Chuẩn Bị

### 1.1. Tạo Tài Khoản
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Database miễn phí
- [Cloudinary](https://cloudinary.com/) - Lưu trữ hình ảnh
- [Discord Developer Portal](https://discord.com/developers/applications) - OAuth App
- [Railway](https://railway.app/) - Hosting server

### 1.2. Setup Discord Application

1. Vào https://discord.com/developers/applications
2. Click "New Application"
3. Đặt tên: "Discord Custom Status"
4. Vào tab **OAuth2** → **General**:
   - Copy **Client ID**
   - Copy **Client Secret**
   - Add Redirect URL: `https://your-app.up.railway.app/auth/discord/callback`
5. Vào **OAuth2** → **URL Generator**:
   - Scopes: `identify`, `email`

### 1.3. Setup MongoDB Atlas

1. Tạo cluster miễn phí
2. Create Database User (username + password)
3. Network Access → Add IP: `0.0.0.0/0` (allow all)
4. Connect → Drivers → Copy connection string
5. Replace `<password>` với password của bạn

### 1.4. Setup Cloudinary

1. Đăng ký tài khoản
2. Vào Dashboard
3. Copy:
   - Cloud Name
   - API Key
   - API Secret

## Bước 2: Deploy Lên Railway

### 2.1. Tạo Railway Project

1. Đăng nhập Railway với GitHub
2. Click "New Project"
3. Chọn "Deploy from GitHub repo"
4. Authorize và chọn repository: `yukkisensei/Discord-status-for-ios`

### 2.2. Configure Environment Variables

Click vào project → Variables → Add Variables:

```env
NODE_ENV=production
PORT=5000

# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/discord-status?retryWrites=true&w=majority

# Discord OAuth
DISCORD_CLIENT_ID=your_client_id_here
DISCORD_CLIENT_SECRET=your_client_secret_here
DISCORD_REDIRECT_URI=https://your-app.up.railway.app/auth/discord/callback

# Session
SESSION_SECRET=generate_random_string_here_min_32_chars

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Client URL (sẽ update sau khi deploy frontend)
CLIENT_URL=https://your-frontend.vercel.app
```

**Generate Session Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2.3. Configure Build

Railway tự động detect Node.js app. Đảm bảo có file `railway.json`:

```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "cd server && npm install && npm start",
    "restartPolicyType": "ON_FAILURE"
  }
}
```

### 2.4. Deploy

1. Railway sẽ tự động deploy
2. Copy domain: `https://your-app.up.railway.app`
3. Update Discord Redirect URI với domain này

## Bước 3: Deploy Frontend

### Option 1: Vercel (Khuyến nghị)

1. Vào https://vercel.com
2. Import GitHub repo
3. Framework Preset: Vite
4. Root Directory: `client`
5. Environment Variables:
   ```
   VITE_API_URL=https://your-app.up.railway.app
   ```
6. Deploy!

### Option 2: Netlify

1. Vào https://netlify.com
2. New site from Git
3. Build command: `cd client && npm install && npm run build`
4. Publish directory: `client/dist`
5. Environment Variables (như Vercel)

## Bước 4: Update Environment Variables

Sau khi có frontend domain, update Railway:

```env
CLIENT_URL=https://your-frontend.vercel.app
```

Và Discord Redirect URI:
```
https://your-app.up.railway.app/auth/discord/callback
```

## Bước 5: Test

1. Mở frontend URL
2. Click "Đăng Nhập Với Discord"
3. Authorize app
4. Setup worker (làm theo hướng dẫn trong app)
5. Set custom status
6. Check Discord profile!

## 🔧 Troubleshooting

### Server không start
- Check logs trong Railway dashboard
- Verify tất cả environment variables đã đúng
- Ensure MongoDB connection string correct

### OAuth redirect error
- Kiểm tra DISCORD_REDIRECT_URI match với Discord Developer Portal
- Ensure CLIENT_URL đúng

### Worker không hoạt động
- Check Discord user token còn valid
- Check server logs
- Try restart worker trong dashboard

## 📊 Monitor

Railway Dashboard:
- View logs
- Check metrics (CPU, RAM)
- Monitor deployments

MongoDB Atlas:
- Database size
- Connections
- Slow queries

## 💰 Chi Phí

Railway Free Tier:
- $5 credit/month
- ~500 hours uptime (đủ chạy 24/7 cho hobby)
- Nếu vượt: ~$5-10/month

MongoDB Atlas Free:
- 512MB storage
- Shared cluster
- Miễn phí mãi mãi

Cloudinary Free:
- 25 credits/month
- 25GB storage
- 25GB bandwidth

**Total: $0/month** (nếu trong free tier)

## 🔄 Updates

Khi có code mới:
1. Push lên GitHub
2. Railway tự động rebuild & deploy
3. Zero downtime!

## 🛡️ Security Best Practices

1. **Không commit** `.env` files
2. **Rotate** session secret định kỳ
3. **Monitor** unusual activities
4. **Backup** database regularly
5. **Use** strong passwords

## ⚡ Performance Tips

Railway Free Tier:
- Sleep sau 30 phút inactive
- Cold start ~5-10s
- Upgrade để 24/7 uptime

Optimize:
- Enable gzip compression
- Use CDN cho static assets
- Implement caching
- Database indexing

---

**Done!** Bạn đã có Discord Custom Status website chạy 24/7 cho nhiều users! 🎉
