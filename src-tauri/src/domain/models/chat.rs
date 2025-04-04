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
