use crate::domain::models::chat::ChatRoom;
use crate::domain::models::state::AppState;
use crate::domain::ports::chatroom::CreateRoomPort;
use anyhow::Error;
use tauri::State;
/// Create a new chatroom
#[tauri::command]
pub fn create_chatroom(state: State<AppState>) -> Result<ChatRoom, String> {
    let create_usecase = state.inner().create_room_usecase.clone();

    println!("Command: create_chatroom");

    let result = create_usecase.lock().unwrap().create_room();

    match result {
        Ok(chatroom) => Ok(chatroom),
        Err(e) => Err(e.to_string()),
    }
}
