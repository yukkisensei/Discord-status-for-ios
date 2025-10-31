# 🔐 Environment Variables - Tất Cả API Keys & Secrets

## 📋 **Tổng Quan**

Tất cả variables này phải được set trong:
- **Local Development**: File `server/.env`
- **Railway Production**: Railway Dashboard → Variables
- **Vercel Frontend**: Vercel Dashboard → Environment Variables (nếu cần)

---

## 🔑 **1. MongoDB (Database)**

### **Biến:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/discord-status?retryWrites=true&w=majority
```

### **Lấy Từ Đâu:**
1. Đăng ký https://www.mongodb.com/cloud/atlas
2. Create Free Cluster
3. Database Access → Add User (tạo username + password)
4. Network Access → Add IP: `0.0.0.0/0`
5. Connect → Drivers → Copy connection string
6. Replace `<password>` với password thật

### **Ví Dụ:**
```env
MONGODB_URI=mongodb+srv://myuser:MyP@ssw0rd@cluster0.abc123.mongodb.net/discord-status?retryWrites=true&w=majority
```

### **⚠️ Lưu Ý:**
- Username KHÔNG được có ký tự đặc biệt
- Password nếu có ký tự đặc biệt phải encode URL
- Database name: `discord-status` (hoặc tên bạn muốn)

---

## 💬 **2. Discord OAuth Application**

### **Biến:**
```env
DISCORD_CLIENT_ID=123456789012345678
DISCORD_CLIENT_SECRET=abcdefghijklmnopqrstuvwxyz123456
DISCORD_REDIRECT_URI=http://localhost:5000/auth/discord/callback
```

### **Lấy Từ Đâu:**
1. Vào https://discord.com/developers/applications
2. Click "New Application"
3. Đặt tên: "Discord Custom Status"
4. Tab **OAuth2** → General:
   - Copy **Client ID**
   - Copy **Client Secret** (click Reset nếu chưa thấy)
5. **OAuth2** → Redirects → Add:
   - Local: `http://localhost:5000/auth/discord/callback`
   - Production: `https://your-app.up.railway.app/auth/discord/callback`

### **Ví Dụ:**
```env
DISCORD_CLIENT_ID=1234567890123456789
DISCORD_CLIENT_SECRET=Abc123_DefGhi-JklMno456PqrStu
DISCORD_REDIRECT_URI=https://myapp.up.railway.app/auth/discord/callback
```

### **⚠️ Lưu Ý:**
- **Local**: Dùng `http://localhost:5000/...`
- **Production**: Dùng Railway domain thật
- Phải add redirect URI vào Discord Developer Portal

---

## 🔒 **3. Session Secret**

### **Biến:**
```env
SESSION_SECRET=randomly_generated_32_character_minimum_secret_key_here
```

### **Lấy Từ Đâu:**
Generate random string. Có thể dùng:

**Node.js:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Online:**
https://www.random.org/strings/

**Manual:**
Bấm phím random trên keyboard (min 32 ký tự)

### **Ví Dụ:**
```env
SESSION_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
```

### **⚠️ Lưu Ý:**
- **PHẢI KHÁC NHAU** giữa local và production
- Min 32 characters
- Bảo mật tuyệt đối (như password)

---

## ☁️ **4. Cloudinary (Image Storage)**

### **Biến:**
```env
CLOUDINARY_CLOUD_NAME=dxxxxxxxxxxxx
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz
```

### **Lấy Từ Đâu:**
1. Đăng ký https://cloudinary.com
2. Verify email
3. Login → Dashboard
4. Trong phần **Account Details**, copy:
   - **Cloud Name** (bắt đầu bằng `d`)
   - **API Key** (số)
   - **API Secret** (chữ + số)

### **Ví Dụ:**
```env
CLOUDINARY_CLOUD_NAME=dw1a2b3c4
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=Abc123DefGhi456JklMno789PqrStu
```

### **⚠️ Lưu Ý:**
- Cloud Name KHÔNG có @ hay http://
- Free tier: 25GB bandwidth/month
- API Secret bảo mật như password

---

## 🌐 **5. URLs (Server & Client)**

### **Biến:**
```env
CLIENT_URL=http://localhost:5173
PORT=5000
NODE_ENV=development
```

### **Giá Trị:**

#### **Local Development:**
```env
CLIENT_URL=http://localhost:5173
PORT=5000
NODE_ENV=development
```

#### **Production (Railway):**
```env
CLIENT_URL=https://your-frontend.vercel.app
PORT=5000
NODE_ENV=production
```

### **⚠️ Lưu Ý:**
- `PORT` Railway tự động set, có thể bỏ qua
- `CLIENT_URL` phải là domain thật của frontend
- Không có trailing slash `/` ở cuối URL

---

## 📊 **Bảng Tổng Hợp**

| Variable | Bắt Buộc? | Lấy Từ | Production Value Khác Local? |
|----------|-----------|--------|------------------------------|
| `MONGODB_URI` | ✅ | MongoDB Atlas | ❌ Same |
| `DISCORD_CLIENT_ID` | ✅ | Discord Developer | ❌ Same |
| `DISCORD_CLIENT_SECRET` | ✅ | Discord Developer | ❌ Same |
| `DISCORD_REDIRECT_URI` | ✅ | Manual | ✅ Different |
| `SESSION_SECRET` | ✅ | Generate random | ✅ Different |
| `CLOUDINARY_CLOUD_NAME` | ✅ | Cloudinary | ❌ Same |
| `CLOUDINARY_API_KEY` | ✅ | Cloudinary | ❌ Same |
| `CLOUDINARY_API_SECRET` | ✅ | Cloudinary | ❌ Same |
| `CLIENT_URL` | ✅ | Frontend URL | ✅ Different |
| `PORT` | ⚠️ | Railway auto-set | ✅ Different |
| `NODE_ENV` | ⚠️ | Manual | ✅ Different |

---

## 📝 **Template File `.env`**

### **Local Development (`server/.env`):**

```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/discord-status?retryWrites=true&w=majority

# Discord OAuth
DISCORD_CLIENT_ID=YOUR_DISCORD_CLIENT_ID
DISCORD_CLIENT_SECRET=YOUR_DISCORD_CLIENT_SECRET
DISCORD_REDIRECT_URI=http://localhost:5000/auth/discord/callback

# Session
SESSION_SECRET=YOUR_RANDOM_32_CHAR_SECRET_HERE

# Cloudinary
CLOUDINARY_CLOUD_NAME=YOUR_CLOUD_NAME
CLOUDINARY_API_KEY=YOUR_API_KEY
CLOUDINARY_API_SECRET=YOUR_API_SECRET

# Frontend URL
CLIENT_URL=http://localhost:5173
```

### **Production Railway:**

```env
# Server
NODE_ENV=production

# MongoDB  
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/discord-status?retryWrites=true&w=majority

# Discord OAuth
DISCORD_CLIENT_ID=YOUR_DISCORD_CLIENT_ID
DISCORD_CLIENT_SECRET=YOUR_DISCORD_CLIENT_SECRET
DISCORD_REDIRECT_URI=https://your-app.up.railway.app/auth/discord/callback

# Session (DIFFERENT from local!)
SESSION_SECRET=DIFFERENT_RANDOM_SECRET_FOR_PRODUCTION

# Cloudinary
CLOUDINARY_CLOUD_NAME=YOUR_CLOUD_NAME
CLOUDINARY_API_KEY=YOUR_API_KEY
CLOUDINARY_API_SECRET=YOUR_API_SECRET

# Frontend URL
CLIENT_URL=https://your-frontend.vercel.app
```

---

## 🚀 **Setup Instructions**

### **1. Local Development:**

```bash
# Copy template
cp server/.env.example server/.env

# Edit server/.env với text editor
# Fill in all values với thông tin thật
```

### **2. Railway Production:**

1. Vào Railway project
2. Click tab **Variables**
3. Add từng variable một (hoặc paste tất cả cùng lúc)
4. Click **Deploy** (tự động redeploy)

### **3. Verify Setup:**

**Test local:**
```bash
npm run dev
```

Check console output:
```
✅ Connected to MongoDB
🚀 Starting Discord workers...
🚀 Server running on port 5000
```

**Test production:**
- Check Railway logs
- Visit frontend URL
- Try login Discord
- Upload image test

---

## ⚠️ **Security Best Practices**

### **KHÔNG BAO GIỜ:**
- ❌ Commit file `.env` lên GitHub
- ❌ Share secrets publicly
- ❌ Hardcode secrets trong code
- ❌ Log secrets ra console

### **NÊN:**
- ✅ Dùng `.env.example` làm template (không có values thật)
- ✅ Add `.env` vào `.gitignore`
- ✅ Rotate secrets định kỳ
- ✅ Dùng secrets khác nhau cho local/prod
- ✅ Enable 2FA trên tất cả services

---

## 🔄 **Thay Đổi Secrets**

### **Nếu Secret Bị Lộ:**

**MongoDB:**
1. Atlas → Database Access → Edit User → Change Password
2. Update `MONGODB_URI` với password mới

**Discord:**
1. Developer Portal → OAuth2 → Reset Secret
2. Copy secret mới
3. Update `DISCORD_CLIENT_SECRET`

**Cloudinary:**
1. Settings → Security → Reset API Secret
2. Update `CLOUDINARY_API_SECRET`

**Session:**
1. Generate secret mới
2. Update `SESSION_SECRET`
3. **Lưu ý:** Users sẽ bị logout

---

## 📞 **Support**

Nếu gặp lỗi với environment variables:

1. **Check typos** - Copy/paste cẩn thận
2. **Check whitespace** - Không có space thừa
3. **Check quotes** - Không cần quotes trong `.env`
4. **Restart server** - Sau khi thay đổi `.env`
5. **Check Railway logs** - Nếu production không hoạt động

---

## ✅ **Checklist**

Trước khi deploy:

- [ ] Đã tạo MongoDB cluster
- [ ] Đã tạo Discord OAuth app
- [ ] Đã đăng ký Cloudinary
- [ ] Đã generate session secret
- [ ] Đã fill tất cả variables vào `.env`
- [ ] Đã test local (`npm run dev`)
- [ ] Đã add variables vào Railway
- [ ] Đã update Discord redirect URI với Railway domain
- [ ] Đã test production sau deploy

**Done! 🎉**
