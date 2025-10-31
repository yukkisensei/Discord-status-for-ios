# ✅ Deployment Checklist - Discord Custom Status

## 📋 **Tất Cả Thông Tin Cần Thiết**

### **🔐 MongoDB**
```
Username: yukkisensei
Password: Yukki_1802
Database: Yuu
Connection String: mongodb+srv://yukkisensei:Yukki_1802@yuu.yelpdn0.mongodb.net/Yuu?retryWrites=true&w=majority&appName=Yuu
```
Status: ✅ Ready

### **💬 Discord OAuth**
```
Client ID: 1433795871128031383
Client Secret: ghzYNEsJRef1HEzNEZ164HzzV00mRWcA
Application: Custom Status App
```
Status: ⚠️ Needs redirect URI setup

### **☁️ Cloudinary**
```
Cloud Name: dcnjcuceg
API Key: 133736299627539
API Secret: 5caDfrG8hCv9omPR9IotgWUHt0Q
```
Status: ✅ Ready

### **🚂 Railway (Backend)**
```
URL: https://discord-status-for-ios-production.up.railway.app
Domain: discord-status-for-ios-production.up.railway.app
```
Status: ⚠️ Needs environment variables

### **🌐 Vercel (Frontend)**
```
URL: https://discord-status-for-ios.vercel.app
Domain: discord-status-for-ios.vercel.app
```
Status: ⚠️ Needs environment variable

---

## 🎯 **Setup Steps**

### **Step 1: Discord Developer Portal** ⚠️ QUAN TRỌNG!

1. Vào: https://discord.com/developers/applications/1433795871128031383/oauth2
2. Scroll xuống **Redirects**
3. Click **Add Redirect**
4. Add 2 URLs:
   ```
   http://localhost:5000/auth/discord/callback
   https://discord-status-for-ios-production.up.railway.app/auth/discord/callback
   ```
5. Click **Save Changes**

**Không làm bước này = OAuth sẽ FAIL!** ❌

---

### **Step 2: Railway Environment Variables**

1. Vào Railway project: https://railway.app
2. Select project `Discord-status-for-ios`
3. Tab **Variables**
4. Click **Raw Editor**
5. Paste:

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://yukkisensei:Yukki_1802@yuu.yelpdn0.mongodb.net/Yuu?retryWrites=true&w=majority&appName=Yuu
DISCORD_CLIENT_ID=1433795871128031383
DISCORD_CLIENT_SECRET=ghzYNEsJRef1HEzNEZ164HzzV00mRWcA
DISCORD_REDIRECT_URI=https://discord-status-for-ios-production.up.railway.app/auth/discord/callback
SESSION_SECRET=prod_railway_secret_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0
CLOUDINARY_CLOUD_NAME=dcnjcuceg
CLOUDINARY_API_KEY=133736299627539
CLOUDINARY_API_SECRET=5caDfrG8hCv9omPR9IotgWUHt0Q
CLIENT_URL=https://discord-status-for-ios.vercel.app
```

6. Click **Save**
7. Railway tự động redeploy

---

### **Step 3: Vercel Environment Variable** (Optional)

Frontend dùng relative API paths, không cần env. Nhưng nếu muốn:

1. Vào Vercel project settings
2. Environment Variables
3. Add:
   ```
   VITE_API_URL=https://discord-status-for-ios-production.up.railway.app
   ```
4. Redeploy

---

### **Step 4: Test Local**

```bash
# Test backend
cd server
npm install
npm start

# Should see:
✅ Connected to MongoDB
🚀 Server running on port 5000

# Test frontend
cd ../client
npm install
npm run dev

# Open: http://localhost:5173
```

---

### **Step 5: Test Production**

1. **Backend Health:**
   ```
   https://discord-status-for-ios-production.up.railway.app/
   
   Should return: {"message":"Discord Custom Status API"}
   ```

2. **Frontend:**
   ```
   https://discord-status-for-ios.vercel.app/
   
   Should load homepage
   ```

3. **OAuth Flow:**
   - Click "Đăng Nhập Với Discord"
   - Authorize app
   - Should redirect to dashboard
   - Check có thấy username không

---

## 🔍 **Troubleshooting**

### **OAuth Error: redirect_uri_mismatch**

**Nguyên nhân:** Redirect URI chưa add vào Discord Portal

**Fix:**
1. Vào Discord Developer Portal
2. OAuth2 → Redirects
3. Add exact URL: `https://discord-status-for-ios-production.up.railway.app/auth/discord/callback`
4. Save

### **Cannot connect to MongoDB**

**Check:**
- [ ] Username/password đúng
- [ ] Network Access có `0.0.0.0/0`
- [ ] Connection string đúng format

### **Cloudinary upload failed**

**Check:**
- [ ] API Key đúng
- [ ] API Secret đúng (không có space)
- [ ] Cloud Name đúng

### **CORS Error**

**Check:**
- [ ] CLIENT_URL trong Railway = Vercel domain
- [ ] Không có trailing slash

### **Session Error**

**Check:**
- [ ] SESSION_SECRET đủ dài (min 32 chars)
- [ ] Different between local và production

---

## 📊 **Complete Environment Variables**

### **Local (`server/.env`):**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://yukkisensei:Yukki_1802@yuu.yelpdn0.mongodb.net/Yuu?retryWrites=true&w=majority&appName=Yuu
DISCORD_CLIENT_ID=1433795871128031383
DISCORD_CLIENT_SECRET=ghzYNEsJRef1HEzNEZ164HzzV00mRWcA
DISCORD_REDIRECT_URI=http://localhost:5000/auth/discord/callback
SESSION_SECRET=local_dev_secret_32_chars_minimum_change_in_production_please
CLOUDINARY_CLOUD_NAME=dcnjcuceg
CLOUDINARY_API_KEY=133736299627539
CLOUDINARY_API_SECRET=5caDfrG8hCv9omPR9IotgWUHt0Q
CLIENT_URL=http://localhost:5173
```

### **Railway Production:**
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://yukkisensei:Yukki_1802@yuu.yelpdn0.mongodb.net/Yuu?retryWrites=true&w=majority&appName=Yuu
DISCORD_CLIENT_ID=1433795871128031383
DISCORD_CLIENT_SECRET=ghzYNEsJRef1HEzNEZ164HzzV00mRWcA
DISCORD_REDIRECT_URI=https://discord-status-for-ios-production.up.railway.app/auth/discord/callback
SESSION_SECRET=prod_railway_secret_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0
CLOUDINARY_CLOUD_NAME=dcnjcuceg
CLOUDINARY_API_KEY=133736299627539
CLOUDINARY_API_SECRET=5caDfrG8hCv9omPR9IotgWUHt0Q
CLIENT_URL=https://discord-status-for-ios.vercel.app
```

---

## ✅ **Final Checklist**

### **Services Setup:**
- [ ] MongoDB cluster created
- [ ] Discord OAuth app created
- [ ] Cloudinary account setup
- [ ] Railway project created
- [ ] Vercel project created

### **Configuration:**
- [ ] Discord redirect URIs added (local + production)
- [ ] Railway environment variables set (10 variables)
- [ ] MongoDB network access configured (0.0.0.0/0)
- [ ] Session secrets generated (different for local/prod)

### **Code:**
- [ ] Code pushed to GitHub
- [ ] `.env` NOT in git (check .gitignore)
- [ ] Railway deployed successfully
- [ ] Vercel deployed successfully

### **Testing:**
- [ ] Local backend runs (`npm run dev`)
- [ ] Local frontend runs (`npm run dev`)
- [ ] Local OAuth works
- [ ] Production backend responds
- [ ] Production frontend loads
- [ ] Production OAuth works
- [ ] Can upload image
- [ ] Can set status
- [ ] Status saves to MongoDB

---

## 🎉 **All Done?**

If all checkboxes ✅, your app is LIVE! 🚀

**Frontend:** https://discord-status-for-ios.vercel.app
**Backend:** https://discord-status-for-ios-production.up.railway.app

**Next:** Setup worker và test Discord status update!
