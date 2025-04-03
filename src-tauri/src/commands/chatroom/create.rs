use crate::domain::models::chat::ChatRoom;
use crate::domain::models::state::AppState;
use crate::domain::ports::chatroom::CreateRoomPort;
use tauri::State;

/// Create a new chatroom
#[tauri::command]
pub fn create_chatroom(state: State<AppState>) -> ChatRoom {
    let create_room_usecase = state.inner().create_room_usecase.clone();
    let id = uuid::Uuid::now_v7().to_string();
    
    if let Ok(mut use_case) = create_room_usecase.lock() {
        let _ = use_case.create_room(); // Ignoring the result, but only calling once
    }
    
    ChatRoom::new(true, id)
}
