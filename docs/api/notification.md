# Notification Commands

目前沒有任何通知相關的 command。`src-tauri/src/commands/notification/`、`application/usecase/notification/`、`application/service/notification/` 都是空模組，`domain/models/events/notification.rs` 只有一個尚未使用的 `Notification` struct。

老闆警示目前只在前端本機觸發（`src/hooks/useChatRoom.ts` 的 `triggerBossAlert`），不經過後端，也不會通知其他人。
