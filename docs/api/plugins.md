# Plugin Commands

實作位於 `src-tauri/src/commands/plugins/mod.rs`，全部都是 stub。前端的偽裝主題目前是內建在 `src/plugins/themes/` 的 React 元件，**不經過這些 command**。

## 型別

```typescript
// 對應 src-tauri/src/domain/models/plugin.rs
interface Plugin {
  id: string;
  name: string;
  description: string;
}
```

## get_plugins_list_from_server（stub）

- **參數**：無
- **回傳**：永遠是空陣列 `[]`。

## get_plugin_from_server（stub）

- **參數**：`id: string`
- **回傳**：`Plugin`，`id` 為傳入值，`name` 與 `description` 為空字串。

## install_plugin（未註冊）

`install_plugin(id)` 有定義，但沒有加進 `generate_handler!`，從前端 `invoke('install_plugin')` 會失敗。

> 遠端安裝主題等於在 WebView 內執行外部程式碼，實作前需要先設計簽章與沙箱（見 Notion 的「設計特性、陷阱與觀察」）。
