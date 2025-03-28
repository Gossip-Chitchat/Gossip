# Gossip - 隱私優先的匿名聊天應用

<div align="center">
  <img src="./public/logo.png" alt="Gossip Logo" width="200" />
  <p><em>私密聊天，群組對話，真實連接</em></p>
</div>

## 👋 簡介

Gossip 是一款專注於隱私的現代聊天應用，讓用戶能夠創建暫時性的聊天室並輕鬆地與朋友、同事或陌生人溝通，無需註冊或個人資訊。

特色功能：

- 🔒 無需註冊即可使用
- 🪄 一鍵創建暫時性聊天室
- 🎭 完全匿名的溝通方式
- 🖥️ 老闆鍵功能（快速切換至工作相關界面）
- 🎨 多種界面主題切換
- 📱 響應式設計，適合所有裝置

## 🚀 快速開始

### 前置需求

- Node.js (v18+)
- npm (v9+)

### 安裝步驟

```bash
# 複製儲存庫
git clone https://github.com/your-username/gossip.git
cd gossip

# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev
```

### 使用 Docker

```bash
# 構建映像
docker build -t gossip .

# 執行容器
docker run -p 1420:1420 gossip
```

## 🛠️ 技術棧

- **前端框架**: React + TypeScript
- **UI 元件**: shadcn/ui + Tailwind CSS
- **路由**: React Router
- **狀態管理**: React Query
- **桌面應用**: Tauri (跨平台支持)

## 💻 開發指南

### 專案結構

```
src/
├── assets/        # 靜態資源
├── components/    # UI 元件
├── layouts/       # 頁面佈局
├── hooks/         # 自定義 Hooks
├── lib/           # 工具函數和庫
└── pages/         # 頁面組件
```

### 可用的指令

- `npm run dev` - 啟動開發伺服器
- `npm run build` - 構建生產版本
- `npm run preview` - 預覽生產構建
- `npm run tauri` - 啟動 Tauri 桌面應用

## 🤝 貢獻指南

我們歡迎所有形式的貢獻，包括功能請求、錯誤報告和程式碼提交。

1. Fork 此儲存庫
2. 創建您的功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 開啟 Pull Request

請確保您的程式碼遵循我們的代碼風格並通過所有測試。

## 📜 授權

此專案採用 MIT 授權 - 詳情請參閱 [LICENSE](LICENSE) 文件。

## 📊 隱私政策

Gossip 不收集用戶的個人識別資訊。聊天內容僅保留在參與者的設備上，且聊天室自動在一段時間後銷毀。

## 📱 支援

如有任何問題或建議，請透過以下方式聯繫：

- [開啟 Issue](https://github.com/your-username/gossip/issues)
- [發送郵件](mailto:support@gossip-chat.app)

---

<div align="center">
  <p>Made with ❤️ in Taiwan</p>
</div>
