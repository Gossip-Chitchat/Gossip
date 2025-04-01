#![allow(unused)]
use crate::domain::models::chat::ChatRoom;

/// Get a list of all chatrooms
#[tauri::command]   
pub fn get_chatroom_list() -> Result<Vec<ChatRoom>, String> {
    // TODO: Implement fetching chatrooms from a data source
    // For now, return an empty vector
    Ok(vec![])
}

/// Get a chatroom by id
#[tauri::command]
pub fn get_chatroom(id: String) -> ChatRoom {
    ChatRoom::new(false, id, "".to_string(), "".to_string())
}

/// Create a new chatroom
#[tauri::command]
pub fn create_chatroom(name: String, description: String) -> ChatRoom {
    ChatRoom::new(false, "".to_string(), name, description)
}

/// Delete a chatroom
#[tauri::command]
pub fn delete_chatroom(id: String) -> bool {
    true
}

