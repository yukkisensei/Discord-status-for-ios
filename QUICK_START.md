# 🚀 Quick Start Guide

## Repository
```
https://github.com/yukkisensei/Discord-status-for-ios
```

## ⚡ Setup Nhanh (5 phút)

### 1. Clone Repository

```bash
git clone https://github.com/yukkisensei/Discord-status-for-ios.git
cd Discord-status-for-ios
```

### 2. Install Dependencies

```bash
npm run install:all
```

### 3. Setup Environment Variables

Tạo file `server/.env`:

```bash
cp server/.env.example server/.env
```

Edit `server/.env` với các giá trị thật:

```env
PORT=5000
MONGODB_URI=your_mongodb_uri
DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret
DISCORD_REDIRECT_URI=http://localhost:5000/auth/discord/callback
CLIENT_URL=http://localhost:5173
SESSION_SECRET=generate_random_32_chars
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 4. Run Development

```bash
npm run dev
```

Server: http://localhost:5000
Client: http://localhost:5173

## 🌐 Deploy Production

### Railway (Backend)

1. Push lên GitHub:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. Vào https://railway.app
3. New Project → Deploy from GitHub
4. Chọn `yukkisensei/Discord-status-for-ios`
5. Add environment variables (production values)
6. Deploy!

### Vercel (Frontend)

1. Vào https://vercel.com
2. Import GitHub repo: `yukkisensei/Discord-status-for-ios`
3. Root Directory: `client`
4. Framework: Vite
5. Deploy!

## 📚 Documentation

- [README.md](./README.md) - Overview & features
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Chi tiết deploy
- [USER_GUIDE.md](./USER_GUIDE.md) - Hướng dẫn end-users

## 🆘 Issues

Report bugs: https://github.com/yukkisensei/Discord-status-for-ios/issues

## 📝 License

MIT © yukkisensei
