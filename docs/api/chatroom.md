# Chatroom API

This document describes the available commands for managing chatrooms in the Gossip application.

## Commands

### get_chatroom_list

Retrieves a list of all available chatrooms.

**Command Name:** `get_chatroom_list`

**Parameters:** None

**Returns:** `Vec<ChatRoom>`

**Example:**
```typescript
const chatrooms = await invoke('get_chatroom_list')
```

### get_chatroom

Retrieves a specific chatroom by its ID.

**Command Name:** `get_chatroom`

**Parameters:**
- `id` (string): The unique identifier of the chatroom

**Returns:** `ChatRoom`

**Example:**
```typescript
const chatroom = await invoke('get_chatroom', { id: 'chatroom-id' })
```

### create_chatroom

Creates a new chatroom.

**Command Name:** `create_chatroom`

**Parameters:**
- `name` (string): The name of the chatroom
- `description` (string): The description of the chatroom

**Returns:** `ChatRoom`

**Example:**
```typescript
const newChatroom = await invoke('create_chatroom', {
  name: 'My Chatroom',
  description: 'A new chatroom'
})
```

### delete_chatroom

Deletes a chatroom by its ID.

**Command Name:** `delete_chatroom`

**Parameters:**
- `id` (string): The unique identifier of the chatroom to delete

**Returns:** `boolean` - Returns `true` if deletion was successful

**Example:**
```typescript
const success = await invoke('delete_chatroom', { id: 'chatroom-id' })
```

## ChatRoom Type Definition

```typescript
interface ChatRoom {
  id: string;
  name: string;
  description: string;
  created_at: string;
}
``` 