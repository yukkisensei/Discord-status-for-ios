# 📖 Hướng Dẫn Sử Dụng - Discord Custom Status

## 🚀 Bắt Đầu

### Bước 1: Đăng Ký

1. Mở website: `https://your-site.com`
2. Click **"Đăng Nhập Với Discord"**
3. Authorize app (cho phép truy cập thông tin Discord của bạn)
4. Tự động redirect về Dashboard

### Bước 2: Kích Hoạt 24/7 Worker

**⚠️ Quan trọng:** Để Discord status thật sự cập nhật, bạn cần kích hoạt worker.

#### 2.1. Lấy Discord User Token

1. Mở **Discord Web**: https://discord.com/app (phải là web, không phải app)
2. Nhấn `F12` hoặc `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
3. Chọn tab **Console**
4. Paste đoạn code này và nhấn Enter:

```javascript
window.webpackChunkdiscord_app.push([
  [Math.random()],
  {},
  req => {
    for (const m of Object.keys(req.c)
      .map(x => req.c[x].exports)
      .filter(x => x)) {
      if (m.default?.getToken) {
        return m.default.getToken();
      }
    }
  }
]);
```

5. Code sẽ trả về token (một chuỗi dài ~70 ký tự)
6. **Copy token này** (nhấn chuột phải → Copy)

**🔒 BẢO MẬT:**
- Token này có quyền truy cập TOÀN BỘ tài khoản Discord của bạn
- KHÔNG SHARE với bất kỳ ai
- Nếu bị lộ, đổi password Discord ngay

#### 2.2. Setup Worker

1. Quay lại Dashboard trên website
2. Tìm card **"24/7 Worker"**
3. Paste token vào ô input
4. Click **"Activate Worker"**
5. Đợi vài giây
6. ✅ Thấy "Worker Active" → Thành công!

### Bước 3: Tạo Custom Status

1. Trong Dashboard, tìm form **"Tạo Custom Status"**
2. Điền thông tin:
   - **Tên Trạng Thái**: Ví dụ "Đang code 💻"
   - **Emoji** (tùy chọn): 😎, 🎮, 💤, etc.
   - **Hình Ảnh** (tùy chọn): Click để upload
   - **Thời Gian**: Để trống = hiện tại
3. Click **"Lưu Status"**
4. Sau ~1 giây, check Discord profile của bạn!

## 📱 Sử Dụng Trên iOS

### iPhone/iPad

1. Mở **Safari** (không phải Chrome hay app khác)
2. Vào website
3. Đăng nhập Discord
4. Setup worker (làm theo hướng dẫn trên)
5. Từ giờ, bạn có thể:
   - Set status bất cứ lúc nào từ iPhone
   - Không cần mở máy tính
   - Discord tự động update

### Add to Home Screen (Optional)

1. Trong Safari, click nút **Share** (📤)
2. Chọn **"Add to Home Screen"**
3. Đặt tên icon
4. Giờ có app shortcut trên home screen!

## 🎨 Tính Năng

### Upload Hình Ảnh

1. Click vào box upload
2. Chọn hình từ thư viện hoặc chụp mới
3. Hình sẽ tự động upload lên Cloudinary
4. Preview xuất hiện ngay
5. Click **X** để xóa và chọn lại

**Giới hạn:**
- Max 5MB
- Format: JPG, PNG, GIF, WebP
- Tỷ lệ: Bất kỳ (sẽ tự động resize)

### Toggle Status On/Off

Trong card "Trạng Thái":
- Click **"Tắt Status"** → Discord status biến mất
- Click **"Bật Status"** → Discord status xuất hiện lại

Không cần edit lại, chỉ toggle on/off!

### Worker Control

Card "24/7 Worker":
- **Green dot** = Worker đang chạy ✅
- **Yellow spinner** = Đang khởi động ⏳
- **Gray dot** = Offline ❌

Actions:
- **Restart**: Nếu worker bị lỗi
- **Stop**: Tạm dừng worker (status không update nữa)

## ❓ FAQ

### Worker hiển thị "Offline" hoặc lỗi?

**Nguyên nhân phổ biến:**

1. **Token invalid/expired**
   - Solution: Lấy token mới và setup lại
   
2. **Discord phát hiện self-bot**
   - Solution: Đợi vài giờ rồi thử lại
   - Nếu vẫn lỗi: Có thể bị soft-ban, dùng tài khoản khác

3. **Server đang restart**
   - Solution: Đợi 1-2 phút, tự động recover

### Status không update?

Check list:
- [ ] Worker có đang "Running" không? (green dot)
- [ ] Status có được "enabled" không?
- [ ] Token còn valid không?
- [ ] Thử click "Restart" worker

### Tôi có thể dùng nhiều tài khoản Discord?

Có! Mỗi tài khoản Discord cần:
1. Đăng ký riêng trên website
2. Setup worker riêng với token của tài khoản đó

Không giới hạn số lượng users.

### Status có hiển thị khi tôi offline Discord?

**Không.** Discord custom status chỉ hiển thị khi:
- Discord app/web đang mở
- Tài khoản đang online/idle/dnd

Worker chỉ set status text, không thể làm bạn "online" khi đã offline.

### Chi phí sử dụng?

**Hoàn toàn MIỄN PHÍ** cho users! 

Server owner chịu chi phí hosting (~$0-5/tháng Railway).

### An toàn không?

**Về kỹ thuật:** Có, website sử dụng HTTPS, database encrypted.

**Về Discord TOS:** Không, sử dụng user token vi phạm TOS.

**Rủi ro:**
- Tài khoản có thể bị ban
- Khuyến nghị: Dùng tài khoản phụ
- Hoặc: Chấp nhận rủi ro

## 🛟 Support

### Lỗi "Invalid Token"

1. Đảm bảo copy đúng token (không thừa/thiếu ký tự)
2. Đảm bảo lấy từ Discord **WEB**, không phải app
3. Token bắt đầu bằng `mfa.` (nếu có 2FA) hoặc dài ~70 chars
4. Thử lấy token mới

### Lỗi "Worker Failed to Start"

1. Check console trong web (F12)
2. Thử logout và login lại
3. Clear browser cache
4. Contact admin nếu vẫn lỗi

### Discord Profile không hiển thị status?

Discord có thể:
- Cache cũ → Đợi 1-2 phút
- App chưa refresh → Force close và mở lại
- Status settings bị tắt → Check Privacy settings

### Token bị lộ, phải làm gì?

**NGAY LẬP TỨC:**
1. Đổi password Discord
2. Enable 2FA nếu chưa có
3. Revoke all authorized apps trong User Settings
4. Lấy token mới và setup lại worker

## 🎯 Tips & Tricks

### Status Suggestions

Popular statuses:
- 😴 Đi ngủ ~ zzz
- 🎮 Chơi [game name]
- 💻 Coding...
- 📚 Đang học
- 🎵 Nghe nhạc
- 🍜 Đi ăn
- 🎬 Xem phim

### Emoji Tips

- Dùng emoji phổ biến (hiển thị tốt hơn)
- Không dùng emoji custom Discord (không hoạt động)
- Unicode emoji hoạt động tốt nhất: 😊🎮💻🎵

### Best Practices

1. **Không spam** thay đổi status liên tục
2. **Update hợp lý** khi thật sự cần
3. **Backup token** (note riêng an toàn)
4. **Check worker** định kỳ
5. **Tôn trọng Discord TOS** (dùng có trách nhiệm)

---

**Chúc bạn sử dụng vui vẻ!** 🎉

Có vấn đề? Contact: [support email/Discord server]
