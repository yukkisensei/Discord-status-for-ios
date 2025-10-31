# 🔑 API Keys & Secrets Checklist

## ✅ **Danh Sách Tất Cả Secrets Cần Có**

### **1. MongoDB** 
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/discord-status
```
- 📍 **Lấy từ:** https://www.mongodb.com/cloud/atlas
- 🔧 **Setup:** Create cluster → Database Access → Network Access → Connect
- 💰 **Chi phí:** FREE (512MB)

---

### **2. Discord Client ID**
```env
DISCORD_CLIENT_ID=1234567890123456789
```
- 📍 **Lấy từ:** https://discord.com/developers/applications
- 🔧 **Setup:** New Application → OAuth2 → General → Copy Client ID
- 💰 **Chi phí:** FREE

---

### **3. Discord Client Secret**
```env
DISCORD_CLIENT_SECRET=abc123def456ghi789
```
- 📍 **Lấy từ:** Discord Developer Portal (same as above)
- 🔧 **Setup:** OAuth2 → General → Copy Client Secret
- 💰 **Chi phí:** FREE

---

### **4. Discord Redirect URI**
```env
# Local
DISCORD_REDIRECT_URI=http://localhost:5000/auth/discord/callback

# Production
DISCORD_REDIRECT_URI=https://your-app.up.railway.app/auth/discord/callback
```
- 📍 **Lấy từ:** Railway domain (sau khi deploy)
- 🔧 **Setup:** Discord OAuth2 → Redirects → Add URL
- ⚠️ **Lưu ý:** Phải add vào Discord Developer Portal!

---

### **5. Session Secret**
```env
SESSION_SECRET=random_32_char_minimum_secret_key
```
- 📍 **Generate:** `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- 🔧 **Setup:** Tự generate, paste vào
- ⚠️ **Lưu ý:** KHÁC NHAU giữa local và production!

---

### **6. Cloudinary Cloud Name**
```env
CLOUDINARY_CLOUD_NAME=dxxxxxxxxxxxx
```
- 📍 **Lấy từ:** https://cloudinary.com/console
- 🔧 **Setup:** Dashboard → Account Details → Cloud Name
- 💰 **Chi phí:** FREE (25GB/month)

---

### **7. Cloudinary API Key**
```env
CLOUDINARY_API_KEY=123456789012345
```
- 📍 **Lấy từ:** Cloudinary Dashboard (same as above)
- 🔧 **Setup:** Dashboard → Account Details → API Key
- 💰 **Chi phí:** FREE

---

### **8. Cloudinary API Secret**
```env
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz
```
- 📍 **Lấy từ:** Cloudinary Dashboard (same as above)
- 🔧 **Setup:** Dashboard → Account Details → API Secret
- 💰 **Chi phí:** FREE

---

### **9. Client URL**
```env
# Local
CLIENT_URL=http://localhost:5173

# Production
CLIENT_URL=https://your-frontend.vercel.app
```
- 📍 **Lấy từ:** Vercel domain (sau khi deploy frontend)
- 🔧 **Setup:** Deploy frontend → Copy domain → Paste vào
- 💰 **Chi phí:** FREE (Vercel free tier)

---

### **10. PORT** (Optional - Railway tự set)
```env
PORT=5000
```
- 📍 **Lấy từ:** Railway tự động
- 🔧 **Setup:** Không cần set trên Railway
- ⚠️ **Lưu ý:** Chỉ cần cho local development

---

### **11. NODE_ENV** (Optional)
```env
# Local
NODE_ENV=development

# Production
NODE_ENV=production
```
- 📍 **Lấy từ:** Manual
- 🔧 **Setup:** Set `production` trên Railway
- ⚠️ **Lưu ý:** Ảnh hưởng đến logging và error handling

---

## 📊 **Quick Reference Table**

| # | Variable | Bắt Buộc | Lấy Từ | Chi Phí |
|---|----------|----------|--------|---------|
| 1 | `MONGODB_URI` | ✅ | MongoDB Atlas | FREE |
| 2 | `DISCORD_CLIENT_ID` | ✅ | Discord Developer | FREE |
| 3 | `DISCORD_CLIENT_SECRET` | ✅ | Discord Developer | FREE |
| 4 | `DISCORD_REDIRECT_URI` | ✅ | Railway/Local | FREE |
| 5 | `SESSION_SECRET` | ✅ | Generate | FREE |
| 6 | `CLOUDINARY_CLOUD_NAME` | ✅ | Cloudinary | FREE |
| 7 | `CLOUDINARY_API_KEY` | ✅ | Cloudinary | FREE |
| 8 | `CLOUDINARY_API_SECRET` | ✅ | Cloudinary | FREE |
| 9 | `CLIENT_URL` | ✅ | Vercel | FREE |
| 10 | `PORT` | ⚠️ | Railway auto | FREE |
| 11 | `NODE_ENV` | ⚠️ | Manual | FREE |

**Total: 8 bắt buộc, 3 optional**

---

## 🚀 **Quick Setup (5 phút)**

### **Step 1: Đăng Ký Services**
- [ ] MongoDB Atlas account
- [ ] Discord Developer account  
- [ ] Cloudinary account

### **Step 2: Tạo Applications**
- [ ] MongoDB cluster + user
- [ ] Discord OAuth app
- [ ] Cloudinary dashboard

### **Step 3: Copy Keys**
- [ ] MongoDB connection string
- [ ] Discord Client ID + Secret
- [ ] Cloudinary credentials (3 values)

### **Step 4: Generate Secrets**
- [ ] Session secret (local)
- [ ] Session secret (production - khác local!)

### **Step 5: Fill `.env`**
```bash
cp server/.env.example server/.env
# Edit server/.env với text editor
# Paste tất cả values
```

### **Step 6: Test**
```bash
npm run dev
```

Check console:
```
✅ Connected to MongoDB
🚀 Server running on port 5000
```

---

## 📋 **Copy-Paste Template**

### **Local (`server/.env`):**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=
DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=
DISCORD_REDIRECT_URI=http://localhost:5000/auth/discord/callback
CLIENT_URL=http://localhost:5173
SESSION_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### **Railway Production:**
```env
NODE_ENV=production
MONGODB_URI=
DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=
DISCORD_REDIRECT_URI=https://YOUR_RAILWAY_DOMAIN/auth/discord/callback
CLIENT_URL=https://YOUR_VERCEL_DOMAIN
SESSION_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Fill in values sau `=`

---

## ⚠️ **Common Errors**

### **"Cannot connect to MongoDB"**
- ✅ Check username/password không có ký tự đặc biệt
- ✅ Check IP whitelist: `0.0.0.0/0`
- ✅ Check connection string format

### **"Discord OAuth failed"**
- ✅ Check Client ID và Secret đúng
- ✅ Check Redirect URI đã add vào Discord Portal
- ✅ Check Redirect URI match chính xác (có/không có trailing slash)

### **"Image upload failed"**
- ✅ Check Cloudinary credentials đúng
- ✅ Check Cloud Name không có @
- ✅ Check API Secret không có space

### **"Session error"**
- ✅ Check Session Secret đủ dài (min 32 chars)
- ✅ Restart server sau khi thay đổi

---

## 🔐 **Security Notes**

### **KHÔNG BAO GIỜ:**
❌ Commit `.env` lên GitHub
❌ Share secrets publicly  
❌ Hardcode trong code
❌ Log secrets ra console
❌ Dùng same secret cho local/prod

### **NÊN:**
✅ Dùng `.env.example` template
✅ Add `.env` vào `.gitignore`
✅ Generate strong secrets
✅ Rotate secrets định kỳ
✅ Enable 2FA trên services

---

## 💰 **Total Cost: $0/month**

Tất cả services đều có FREE tier:
- MongoDB Atlas: FREE 512MB
- Discord OAuth: FREE
- Cloudinary: FREE 25GB
- Railway: $5 credit/month (đủ 24/7)
- Vercel: FREE unlimited

**100% miễn phí cho hobby projects!** 🎉

---

## 📞 **Need Help?**

Chi tiết hơn: Xem `ENVIRONMENT_VARIABLES.md`

Issues: https://github.com/yukkisensei/Discord-status-for-ios/issues
