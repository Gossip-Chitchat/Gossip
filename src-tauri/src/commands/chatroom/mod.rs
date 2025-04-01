#![allow(unused)]
use crate::domain::models::chat::ChatRoom;
pub mod create;

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
    let chatroom = ChatRoom::new(false, id);
    chatroom
}



/// Delete a chatroom
#[tauri::command]
pub fn delete_chatroom(id: String) -> bool {
    true
}

