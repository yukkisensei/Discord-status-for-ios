# 🔧 Discord Developer Portal Setup

## 📋 Application Details

**Application Name:** Custom Status App
**Client ID:** 1433795871128031383
**Client Secret:** ghzYNEsJRef1HEzNEZ164HzzV00mRWcA

---

## ⚙️ Configuration Steps

### 1. OAuth2 Settings

Vào: https://discord.com/developers/applications/1433795871128031383/oauth2

#### **Redirects (Phải Add CẢ HAI!):**

```
✅ Local Development:
http://localhost:5000/auth/discord/callback

✅ Production Railway:
https://discord-status-for-ios-production.up.railway.app/auth/discord/callback
```

#### **OAuth2 Scopes:**
- ✅ `identify` - Read user info
- ✅ `email` - Read user email

### 2. General Information

- **Name:** Custom Status App
- **Description:** Control your Discord custom status from iOS
- **Icon:** (Optional) Upload icon 512x512px

### 3. Bot (KHÔNG CẦN)

❌ **KHÔNG CẦN tạo bot** cho project này
❌ Chỉ dùng OAuth2, không cần bot token

---

## ✅ Checklist

Setup Discord Application:
- [ ] Đã tạo application
- [ ] Đã copy Client ID: 1433795871128031383
- [ ] Đã copy Client Secret: ghzYNEsJRef1HEzNEZ164HzzV00mRWcA
- [ ] Đã add redirect URI local: `http://localhost:5000/auth/discord/callback`
- [ ] Đã add redirect URI production: `https://discord-status-for-ios-production.up.railway.app/auth/discord/callback`
- [ ] Đã set scopes: identify, email

---

## 🔗 Quick Links

- **Application Dashboard:** https://discord.com/developers/applications/1433795871128031383
- **OAuth2 Settings:** https://discord.com/developers/applications/1433795871128031383/oauth2
- **General Info:** https://discord.com/developers/applications/1433795871128031383/information
