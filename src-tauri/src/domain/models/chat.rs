#![allow(unused)]
use chrono::{DateTime, Utc};

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct ChatRoom {
    pub is_owner: bool,
    pub id: String,
    pub name: String,
    pub description: String,
    pub created_at: DateTime<Utc>,
}

impl ChatRoom {
    pub fn new(is_owner: bool, id: String, name: String, description: String) -> Self {
        Self { is_owner, id, name, description, created_at: Utc::now() }
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
        Self { id, content, created_at: Utc::now(), sender}
    }
}
    