# Chatroom Commands

實作位於 `src-tauri/src/commands/chatroom/`。只有 `create_chatroom` 走完整的 usecase → service → repository 分層，其餘三個 command 目前是 stub。

## 型別

```typescript
// 對應 src-tauri/src/domain/models/chat.rs
interface ChatRoom {
  is_owner: boolean;   // 是否為房主（本機建立的房間為 true）
  id: string;          // UUIDv7 字串
  created_at: string;  // RFC 3339 時間字串（chrono DateTime<Utc>）
}
```

## create_chatroom

建立聊天室，存進本機記憶體（`ChatroomsRepository` 的 `HashMap`），不會寫入磁碟。

- **參數**：無
- **回傳**：`ChatRoom`，`is_owner` 為 `true`，`id` 為新產生的 UUIDv7
- **錯誤**：`"Chatroom already exists"`（id 重複時；正常情況下不會發生）

```typescript
const room = await invoke<ChatRoom>('create_chatroom');
```

前端目前把 `room.id` 直接當作「聊天室連結」顯示（`src/hooks/useRoomCreation.ts`），它不含房主位址，其他電腦無法用它加入。

## get_chatroom（stub）

- **參數**：`id: string`
- **回傳**：新建立的 `ChatRoom`，`id` 為傳入值、`is_owner` 為 `false`、`created_at` 為呼叫當下時間。**不會查詢 repository**。

## get_chatroom_list（stub）

- **參數**：無
- **回傳**：永遠是空陣列 `[]`。

## delete_chatroom（stub）

- **參數**：`id: string`
- **回傳**：永遠是 `true`，實際上不會刪除任何東西。
