use crate::domain::ports::chatroom::CreateRoomPort;
use crate::domain::repository::chatroom::ChatroomRepository;
use std::sync::Arc;
use std::sync::Mutex;

#[derive(Clone)]
pub struct AppState {
    pub create_room_usecase: Arc<Mutex<dyn CreateRoomPort>>,
    pub chatrooms_repository: Arc<Mutex<dyn ChatroomRepository>>,
}

impl AppState {
    pub fn new(
        create_room_usecase: Arc<Mutex<dyn CreateRoomPort>>,
        chatrooms_repository: Arc<Mutex<dyn ChatroomRepository>>,
    ) -> Self {
        Self {
            create_room_usecase,
            chatrooms_repository,
        }
    }
}
