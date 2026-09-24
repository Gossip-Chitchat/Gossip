# Gossip Tauri Commands

前端透過 Tauri 的 `invoke` 呼叫 Rust 後端的 command。本目錄記錄**目前實際註冊**的 command 與其行為；尚未實作的設計放在 Notion 的 Gossip 頁面（D. 目標架構提案），不寫在這裡。

- [Chatroom](./chatroom.md)
- [Plugins](./plugins.md)
- [Notification](./notification.md)

## 呼叫方式（Tauri 2）

```typescript
import { invoke } from '@tauri-apps/api/core';

const room = await invoke<ChatRoom>('create_chatroom');
```

Command 參數以物件傳入，key 使用 Rust 參數名稱的 camelCase（例如 `{ id: 'room-1' }`）。

## 錯誤處理

回傳 `Result<T, String>` 的 command 失敗時，`invoke` 會 reject，錯誤值是字串（例如 `"Chatroom already exists"`）。直接回傳 `T` 的 command 不會失敗。

## Command 一覽

| Command | 參數 | 回傳 | 狀態 |
|---|---|---|---|
| `create_chatroom` | 無 | `Result<ChatRoom, String>` | 已實作 |
| `get_chatroom` | `id: string` | `ChatRoom` | stub |
| `get_chatroom_list` | 無 | `Result<ChatRoom[], String>` | stub（永遠回傳空陣列） |
| `delete_chatroom` | `id: string` | `boolean` | stub（永遠回傳 `true`） |
| `get_plugins_list_from_server` | 無 | `Plugin[]` | stub（永遠回傳空陣列） |
| `get_plugin_from_server` | `id: string` | `Plugin` | stub |

註冊清單在 `src-tauri/src/main.rs` 的 `tauri::generate_handler!`。新增 command 時請同步更新這張表。
