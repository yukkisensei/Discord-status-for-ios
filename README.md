# Discord Custom Status Website 🎨

[![GitHub](https://img.shields.io/github/license/yukkisensei/Discord-status-for-ios?style=flat-square)](https://github.com/yukkisensei/Discord-status-for-ios/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/yukkisensei/Discord-status-for-ios?style=flat-square)](https://github.com/yukkisensei/Discord-status-for-ios/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/yukkisensei/Discord-status-for-ios?style=flat-square)](https://github.com/yukkisensei/Discord-status-for-ios/issues)

Một website với giao diện **Liquid Glass** cực kỳ đẹp mắt cho phép **NHIỀU NGƯỜI DÙNG** tạo và duy trì custom status Discord của họ **24/7**.

## ✨ Tính Năng

- 👥 **Multi-User System**: Nhiều người cùng lúc có thể sử dụng
- 🎭 **Custom Discord Status**: Tạo trạng thái Discord độc đáo với tên, emoji và hình ảnh
- ⚡ **Real-time Update**: Status update ngay lập tức (< 1 giây)
- 🔄 **24/7 Worker**: Server chạy workers cho từng user, duy trì status liên tục
- 📱 **iOS Control**: 100% control từ iPhone/iPad Safari
- 💎 **Giao Diện Liquid Glass**: UI tuyệt đẹp với hiệu ứng glass morphism và animations mượt mà
- 📱 **Responsive**: Hoàn toàn tối ưu cho mobile, không bị tràn lề
- 🎨 **Màu Xanh Lá Nhạt**: Thiết kế với primary color là màu xanh lá nhạt đẹp mắt
- 🔐 **Discord OAuth**: Đăng nhập an toàn với tài khoản Discord
- ☁️ **Cloudinary Integration**: Upload và lưu trữ hình ảnh an toàn
- 🗄️ **MongoDB Database**: Lưu trữ dữ liệu người dùng bền vững

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- TailwindCSS
- Framer Motion
- React Router
- Lucide Icons
- Axios

### Backend
- Node.js
- Express
- MongoDB (Mongoose)
- Discord OAuth2
- Cloudinary
- Node Cron (Background Worker)

## 🚀 Cài Đặt

### 1. Clone Repository
\`\`\`bash
git clone https://github.com/yukkisensei/Discord-status-for-ios.git
cd Discord-status-for-ios
\`\`\`

### 2. Cài Đặt Dependencies
\`\`\`bash
npm run install:all
\`\`\`

### 3. Cấu Hình Environment Variables

📋 **Xem chi tiết:** [SECRETS_CHECKLIST.md](./SECRETS_CHECKLIST.md) hoặc [ENVIRONMENT_VARIABLES.md](./ENVIRONMENT_VARIABLES.md)

Tạo file \`.env\` trong thư mục \`server/\`:

\`\`\`env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret
DISCORD_REDIRECT_URI=http://localhost:5000/auth/discord/callback
CLIENT_URL=http://localhost:5173
SESSION_SECRET=your_random_session_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
\`\`\`

### 4. Thiết Lập Discord Application

1. Truy cập [Discord Developer Portal](https://discord.com/developers/applications)
2. Tạo New Application
3. Vào **OAuth2** → **General**
   - Copy **Client ID** và **Client Secret**
   - Thêm Redirect URI: \`http://localhost:5000/auth/discord/callback\`
4. Vào **OAuth2** → **URL Generator**
   - Chọn scopes: \`identify\`, \`email\`

### 5. Thiết Lập MongoDB

- Tạo database trên [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Copy connection string vào \`MONGODB_URI\`

### 6. Thiết Lập Cloudinary

- Đăng ký tài khoản [Cloudinary](https://cloudinary.com/)
- Copy Cloud Name, API Key và API Secret từ Dashboard

## 🎯 Chạy Development

\`\`\`bash
# Chạy cả client và server
npm run dev

# Hoặc chạy riêng lẻ
npm run dev:client  # http://localhost:5173
npm run dev:server  # http://localhost:5000
\`\`\`

## 📦 Build Production

\`\`\`bash
npm run build
\`\`\`

## 🚂 Deploy trên Railway

### 1. Chuẩn bị
- Đẩy code lên GitHub repository
- Đăng ký [Railway](https://railway.app/)

### 2. Deploy Backend
1. Tạo New Project trên Railway
2. Deploy from GitHub repo
3. Chọn thư mục \`server\`
4. Thêm Environment Variables (từ file .env)
5. Deploy!

### 3. Deploy Frontend
1. Build frontend: \`cd client && npm run build\`
2. Deploy folder \`client/dist\` hoặc dùng Vercel/Netlify

### 4. Update Environment Variables
- Update \`DISCORD_REDIRECT_URI\` với domain Railway của bạn
- Update \`CLIENT_URL\` với domain frontend của bạn
- Update Discord OAuth Redirect URI trong Discord Developer Portal

## 📱 Giao Diện

### Home Page
- Hero section với animation
- Feature cards với glass morphism
- Discord login button

### Dashboard
- User profile card
- Status form với upload image
- Live status preview
- Toggle on/off status
- Responsive design hoàn hảo cho mobile

## 🎨 Tính Năng Giao Diện

- ✨ **Liquid Glass Effect**: Background blur với border trong suốt
- 🎭 **Mouse Follower**: Cursor custom theo dõi chuột
- 🌊 **Floating Animations**: Các elements animation mượt mà
- 🎨 **Gradient Background**: Background chuyển động với gradient
- 📱 **Mobile First**: Responsive hoàn hảo trên mọi thiết bị
- 🎯 **Hover Effects**: Smooth transitions và scale effects
- 💚 **Green Theme**: Màu xanh lá nhạt primary color đẹp mắt

## ⚙️ Background Worker

Worker tự động chạy mỗi 5 phút để:
- Kiểm tra users có status enabled
- Cập nhật Discord status
- Duy trì status ngay cả khi user offline

## 🎯 **Cách Hoạt Động - Multi-User System**

### **Architecture:**

```
👥 NHIỀU USERS (mỗi người một tài khoản)
    │
    ├─ User A: iPhone → Web app → Set status
    │      └─ Server Worker A → Discord A ✅
    │
    ├─ User B: Android → Web app → Set status  
    │      └─ Server Worker B → Discord B ✅
    │
    └─ User C: Desktop → Web app → Set status
           └─ Server Worker C → Discord C ✅

         ↓ TẤT CẢ CHẠY TRÊN
         
☁️ RAILWAY SERVER (1 server duy nhất)
    ├─ Web API
    ├─ MongoDB Database
    └─ Multi-User Discord Workers
```

### **User Flow:**

1. **Đăng ký** tài khoản trên web
2. **Cung cấp Discord User Token** (hướng dẫn chi tiết trong app)
3. Server tự động tạo **worker riêng** cho user
4. **Set status từ iOS/web bất cứ lúc nào**
5. ✅ Discord update tự động sau < 1 giây

### **Server Side:**

Server chạy **một Discord worker cho MỖI user**:
- User A → Discord Client A (logged in as User A)
- User B → Discord Client B (logged in as User B)
- User C → Discord Client C (logged in as User C)

Khi user update status → Worker tương ứng update Discord ngay lập tức.

## ⚠️ **Lưu Ý Quan Trọng**

### **Về Bảo Mật & Discord TOS:**

⚠️ **Cảnh Báo**: Project này sử dụng Discord User Tokens để set custom status, điều này:

- **Vi phạm Discord Terms of Service** (Self-bot)
- **Có rủi ro** tài khoản bị ban nếu Discord phát hiện
- **Chỉ nên dùng** với tài khoản phụ hoặc chấp nhận rủi ro

### **Giảm Thiểu Rủi Ro:**

✅ Update không quá thường xuyên (debounce)
✅ Chỉ set custom status, không spam
✅ Sử dụng user-agent giống Discord mobile
✅ Implement rate limiting

### **Disclaimer:**

Project này được tạo ra cho mục đích **educational**. Người dùng tự chịu trách nhiệm về việc sử dụng. Chúng tôi không khuyến khích vi phạm Discord TOS và không chịu trách nhiệm nếu tài khoản bị khóa.

## 📝 Lưu Ý

⚠️ **Quan Trọng**: Discord API không hỗ trợ việc set custom status qua OAuth tokens của user. Implementation hiện tại lưu trữ thông tin status nhưng không thực sự update lên Discord. Để thực hiện tính năng này hoàn chỉnh, bạn cần:

1. Sử dụng Discord Bot với proper permissions
2. Hoặc tạo Discord Rich Presence application
3. User cần install application/bot để set status

Project này phù hợp để làm template/UI demo hoặc có thể mở rộng với Discord Bot integration.

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

## 📄 License

MIT

## 🎉 Credits

Được tạo với ❤️ và ☕
