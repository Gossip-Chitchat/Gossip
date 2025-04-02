# Plugins API

This document describes the available commands for managing plugins in the Gossip application.

## Commands

### get_plugins_list_from_server

Retrieves a list of all available plugins from the server.

**Command Name:** `get_plugins_list_from_server`

**Parameters:** None

**Returns:** `Vec<Plugin>`

**Example:**
```typescript
const plugins = await invoke('get_plugins_list_from_server')
```

### get_plugin_from_server

Retrieves a specific plugin by its ID from the server.

**Command Name:** `get_plugin_from_server`

**Parameters:**
- `id` (string): The unique identifier of the plugin

**Returns:** `Plugin`

**Example:**
```typescript
const plugin = await invoke('get_plugin_from_server', { id: 'plugin-id' })
```

### install_plugin

Installs a plugin by its ID.

**Command Name:** `install_plugin`

**Parameters:**
- `id` (string): The unique identifier of the plugin to install

**Returns:** `boolean` - Returns `true` if installation was successful

**Example:**
```typescript
const success = await invoke('install_plugin', { id: 'plugin-id' })
```

## Plugin Type Definition

```typescript
interface Plugin {
  id: string;
  name: string;
  description: string;
}
``` 