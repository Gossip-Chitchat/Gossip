# Gossip API Documentation

This documentation describes the available commands in the Gossip application.

## Table of Contents

- [Plugins API](./plugins.md)
- [Notification API](./notification.md)
- [Chatroom API](./chatroom.md)

## General Information

All commands are exposed through Tauri's command system and can be called from the frontend using the `invoke` function.

### Example Usage

```typescript
import { invoke } from '@tauri-apps/api/tauri'

// Example of calling a command
const result = await invoke('command_name', { param1: 'value1' })
```

## Error Handling

All commands return appropriate error types when something goes wrong. Frontend code should handle these errors appropriately. 