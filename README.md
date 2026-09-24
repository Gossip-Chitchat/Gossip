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

- Node.js 18 以上（CI 使用 22）與 npm
- Rust stable toolchain
- Tauri 的系統依賴（Linux 需 `libwebkit2gtk-4.1-dev` 等），請參考 [Tauri Prerequisites](https://v2.tauri.app/start/prerequisites/)

### 安裝步驟

```bash
# 複製儲存庫
git clone https://github.com/Gossip-Chitchat/Gossip.git
cd Gossip

# 安裝依賴
npm ci

# 啟動桌面應用（開發模式）
npm run tauri dev
```

只想調整介面時可以用 `npm run dev` 單獨啟動前端（http://localhost:1420），但呼叫 Tauri 後端的功能在瀏覽器中不會運作。

## 🛠️ 技術棧

- **前端框架**: React + TypeScript
- **UI 元件**: shadcn/ui + Tailwind CSS
- **路由**: React Router
- **狀態管理**: React Query
- **桌面應用**: Tauri 2 (跨平台支持)
- **後端**: Rust + actix-web（WebSocket）+ MessagePack
- **測試**: Vitest + Testing Library、cargo test

## 💻 開發指南

### 專案結構

```
src/               # React 前端
├── components/    # UI 元件（ui/ 為 shadcn/ui 產生）
├── hooks/         # 自定義 Hooks
├── layouts/       # 頁面佈局
├── lib/           # 工具函數和庫
├── pages/         # 頁面組件
├── plugins/       # 偽裝主題插件
└── types/         # 共用型別
src-tauri/         # Rust 後端（Tauri commands、WebSocket server）
docs/              # API 與事件流程文件
```

### 可用的指令

- `npm run dev` - 只啟動前端開發伺服器
- `npm run tauri dev` - 啟動完整桌面應用
- `npm run build` - 型別檢查並構建前端
- `npm run tauri build` - 打包桌面應用安裝檔
- `npm run lint` - ESLint 檢查
- `npm run type-check` - TypeScript 型別檢查
- `npm test` - 執行前端測試（`npm run test:watch` 為監看模式）
- `cd src-tauri && cargo fmt --check && cargo clippy --all-targets -- -D warnings && cargo test` - 後端格式、靜態檢查與測試

以上檢查都會在 CI（`.github/workflows/ci.yml`）中對 `main` 的 push 與 pull request 執行。

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

- [開啟 Issue](https://github.com/Gossip-Chitchat/Gossip/issues)
- [發送郵件](mailto:support@gossip-chat.app)

---

<div align="center">
  <p>Made with ❤️ in Taiwan</p>
</div>
