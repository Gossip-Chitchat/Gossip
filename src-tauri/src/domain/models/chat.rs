#![allow(unused)]
use chrono::{DateTime, Utc};
use std::collections::HashMap;
use std::sync::{Arc, Mutex};

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct ChatRoom {
    pub is_owner: bool,
    pub id: String,
    pub created_at: DateTime<Utc>,
}

impl ChatRoom {
    pub fn new(is_owner: bool, id: String) -> Self {
        Self {
            is_owner,
            id,
            created_at: Utc::now(),
        }
    }
}

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct ChatMessage {
    pub id: String,
    pub content: String,
    pub created_at: DateTime<Utc>,
    pub sender: String,
}

impl ChatMessage {
    pub fn new(id: String, content: String, sender: String) -> Self {
        Self {
            id,
            content,
            created_at: Utc::now(),
            sender,
        }
    }
}

#[derive(Debug, Clone)]
pub struct WebSocketConnection {
    pub connection_id: String,
    pub user_id: String,
    // 其他 WebSocket 連接相關信息
}

impl WebSocketConnection {
    pub fn new(connection_id: String, user_id: String) -> Self {
        Self {
            connection_id,
            user_id,
        }
    }
}

#[derive(Debug, Clone)]
pub struct ChatRoomRepository {
    // 存儲 room_id -> ChatRoom 的映射
    rooms: Arc<Mutex<HashMap<String, ChatRoom>>>,
    // 存儲 room_id -> 所有連接到該房間的 WebSocket 連接
    connections: Arc<Mutex<HashMap<String, Vec<WebSocketConnection>>>>,
}

impl ChatRoomRepository {
    pub fn new() -> Self {
        Self {
            rooms: Arc::new(Mutex::new(HashMap::new())),
            connections: Arc::new(Mutex::new(HashMap::new())),
        }
    }

    pub fn add_room(&self, room: ChatRoom) -> Result<(), String> {
        if let Ok(mut rooms) = self.rooms.lock() {
            rooms.insert(room.id.clone(), room);
            Ok(())
        } else {
            Err("Failed to acquire lock on rooms".to_string())
        }
    }

    pub fn get_room(&self, room_id: &str) -> Option<ChatRoom> {
        if let Ok(rooms) = self.rooms.lock() {
            rooms.get(room_id).cloned()
        } else {
            None
        }
    }

    pub fn add_connection(
        &self,
        room_id: &str,
        connection: WebSocketConnection,
    ) -> Result<(), String> {
        if let Ok(mut connections) = self.connections.lock() {
            connections
                .entry(room_id.to_string())
                .or_insert_with(Vec::new)
                .push(connection);
            Ok(())
        } else {
            Err("Failed to acquire lock on connections".to_string())
        }
    }

    pub fn get_connections(&self, room_id: &str) -> Vec<WebSocketConnection> {
        if let Ok(connections) = self.connections.lock() {
            connections.get(room_id).cloned().unwrap_or_default()
        } else {
            Vec::new()
        }
    }

    pub fn remove_connection(&self, room_id: &str, connection_id: &str) -> Result<(), String> {
        if let Ok(mut connections) = self.connections.lock() {
            if let Some(room_connections) = connections.get_mut(room_id) {
                room_connections.retain(|conn| conn.connection_id != connection_id);
                Ok(())
            } else {
                Err(format!("Room {} not found", room_id))
            }
        } else {
            Err("Failed to acquire lock on connections".to_string())
        }
    }
}
