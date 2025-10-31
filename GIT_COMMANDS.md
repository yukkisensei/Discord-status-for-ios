# 📝 Git Commands - Push Lên GitHub

## 🚀 Lần Đầu Tiên Push

### Bước 1: Initialize Git (nếu chưa có)

```bash
git init
```

### Bước 2: Add Remote Repository

```bash
git remote add origin https://github.com/yukkisensei/Discord-status-for-ios.git
```

### Bước 3: Add All Files

```bash
git add .
```

### Bước 4: Commit

```bash
git commit -m "Initial commit: Multi-user Discord Status System"
```

### Bước 5: Push

```bash
git push -u origin main
```

Hoặc nếu repo dùng `master`:

```bash
git push -u origin master
```

---

## 🔄 Cập Nhật Code Sau Này

### Mỗi Khi Thay Đổi Code:

```bash
# 1. Check những file đã thay đổi
git status

# 2. Add files (hoặc add specific files)
git add .

# 3. Commit với message mô tả
git commit -m "Add new feature: Worker auto-restart"

# 4. Push lên GitHub
git push
```

---

## 📋 Git Commands Hữu Ích

### Check Status

```bash
git status
```

### View History

```bash
git log --oneline
```

### Undo Changes (chưa commit)

```bash
# Undo tất cả changes
git reset --hard

# Undo specific file
git checkout -- filename
```

### Create Branch

```bash
# Tạo branch mới
git checkout -b feature/new-feature

# Push branch
git push -u origin feature/new-feature
```

### Switch Branch

```bash
git checkout main
git checkout feature/new-feature
```

### Pull Latest Changes

```bash
git pull origin main
```

---

## 🔐 Setup SSH (Khuyến Nghị)

### Tạo SSH Key:

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

### Copy Public Key:

```bash
# Windows
type ~/.ssh/id_ed25519.pub | clip

# Mac/Linux  
cat ~/.ssh/id_ed25519.pub | pbcopy
```

### Add SSH Key Vào GitHub:

1. GitHub → Settings → SSH and GPG keys
2. New SSH key
3. Paste key
4. Save

### Change Remote to SSH:

```bash
git remote set-url origin git@github.com:yukkisensei/Discord-status-for-ios.git
```

Giờ có thể push mà không cần nhập password!

---

## 🚨 .gitignore

Đảm bảo có file `.gitignore` để không commit những file nhạy cảm:

```gitignore
# Dependencies
node_modules/
client/node_modules/
server/node_modules/

# Environment variables
.env
*.env
.env.local
.env.production

# Build
dist/
build/
client/dist/

# Logs
*.log
npm-debug.log*

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo
```

---

## 📦 Cấu Trúc Repository

```
Discord-status-for-ios/
├── .github/
│   ├── FUNDING.yml
│   └── ISSUE_TEMPLATE/
├── client/              # Frontend React app
├── server/              # Backend Express app
├── .gitignore
├── LICENSE
├── README.md
├── DEPLOYMENT.md
├── USER_GUIDE.md
├── QUICK_START.md
└── package.json
```

---

## ✅ Checklist Trước Khi Push

- [ ] Test code local (`npm run dev`)
- [ ] Check không có lỗi
- [ ] Remove console.log debug
- [ ] Update .env.example nếu thêm biến mới
- [ ] Update README nếu có feature mới
- [ ] Commit message rõ ràng
- [ ] Push!

---

## 🎯 Railway Auto-Deploy

Sau khi push lên GitHub:

1. ✅ Railway tự động detect commit mới
2. ✅ Tự động build
3. ✅ Tự động deploy
4. ✅ Zero downtime!

Check Railway dashboard để xem deployment status.

---

**Happy Coding!** 🚀
