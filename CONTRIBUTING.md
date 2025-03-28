# 貢獻指南

非常感謝您對 Gossip 專案的關注！以下是參與貢獻的指南，請遵循這些步驟幫助我們改進專案。

## 如何貢獻

1. **Fork 這個儲存庫**：點擊頁面右上角的 Fork 按鈕
2. **複製您的分支**：`git clone https://github.com/YOUR-USERNAME/gossip.git`
3. **建立功能分支**：`git checkout -b feature/amazing-feature`
4. **提交您的更改**：`git commit -m '添加一些功能'`
5. **推送到分支**：`git push origin feature/amazing-feature`
6. **開啟 Pull Request**

## 開發流程

### 安裝依賴

```bash
npm install
```

### 啟動開發伺服器

```bash
npm run dev
```

### 檢查程式碼

```bash
npm run lint
npm run type-check
```

### 運行測試

```bash
npm test
```

## 程式碼風格指南

我們使用 ESLint 和 Prettier 來維護程式碼質量。請確保您的程式碼符合這些標準。

### JavaScript/TypeScript 規範

- 使用 2 個空格進行縮排
- 使用分號結束語句
- 使用單引號
- 避免使用 `var`，優先使用 `const`，其次使用 `let`
- 命名使用駝峰式命名法（camelCase）

### React 組件規範

- 使用函數組件和 Hooks
- 使用 TypeScript 類型定義
- 按以下順序組織組件程式碼：
  1. 導入
  2. 類型定義
  3. 常量
  4. 組件函數
  5. 輔助函數
  6. 導出

## 問題和功能請求

如果您發現 bug 或想要請求新功能，請先檢查現有問題，看是否已經有人提出。如果沒有，再創建新的問題。

### 報告 Bug

- 使用清晰的標題描述問題
- 詳細說明重現步驟
- 描述預期行為與實際行為的差異
- 包含相關截圖或錯誤日誌

### 功能請求

- 使用清晰的標題描述功能
- 解釋為什麼這個功能對專案有價值
- 提供盡可能詳細的功能說明和可能的實現方式

## 行為準則

請參見 [行為準則](CODE_OF_CONDUCT.md)，了解我們對社區的期望。

## Pull Request 流程

1. 確保您的 PR 包含一個清晰的標題和描述
2. 如果 PR 解決了特定問題，請在描述中引用該問題（例如 "Fixes #123"）
3. 保持 PR 的規模適中，避免包含過多不相關的更改
4. 確保所有測試都通過
5. PR 將由維護者審核，並可能要求進行更改

## 許可證

通過貢獻代碼，您同意您的貢獻將根據專案的 [MIT 許可證](LICENSE) 獲得許可。
