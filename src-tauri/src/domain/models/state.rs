use std::sync::Arc;

use crate::domain::models::chat::ChatRoom;
use crate::domain::models::plugin::Plugin;
use crate::application::usecase::chatroom::create::CreateRoomUsecase;
use std::sync::Mutex;

#[derive(Clone, Debug)]
pub struct AppState {
    pub chatrooms: Vec<ChatRoom>,
    pub plugins: Vec<Plugin>,
    pub create_room_usecase: Arc<Mutex<CreateRoomUsecase>>,
}

impl AppState {
    pub fn new(create_room_usecase: CreateRoomUsecase) -> Self {
        Self { 
            chatrooms: vec![], 
            plugins: vec![], 
            create_room_usecase: Arc::new(Mutex::new(create_room_usecase)),
        }
    }
}
