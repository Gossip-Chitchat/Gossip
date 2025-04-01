use crate::domain::models::chat::ChatRoom;

/// Create a new chatroom
#[tauri::command]
pub fn create_chatroom() -> ChatRoom {
    let id = uuid::Uuid::now_v7().to_string();
    ChatRoom::new(
        true, 
        id, 
    )
}
