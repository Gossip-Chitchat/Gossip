use crate::domain::models::chat::ChatRoom;
use crate::domain::ports::chatroom::CreateRoomPort;
use crate::domain::service::chatroom::ChatroomService;
use anyhow::Error;
use std::sync::Arc;
use std::sync::Mutex;

#[derive(Clone)]
pub struct CreateRoomUsecase {
    chatroom_service: Arc<Mutex<dyn ChatroomService>>,
}

impl CreateRoomUsecase {
    pub fn new(chatroom_service: Arc<Mutex<dyn ChatroomService>>) -> Self {
        Self { chatroom_service }
    }
}

impl CreateRoomPort for CreateRoomUsecase {
    fn create_room(&self) -> Result<ChatRoom, Error> {
        println!("Usecase: create_room");
        let result = self.chatroom_service.lock().unwrap().create_room();

        match result {
            Ok(chatroom) => {
                println!("Usecase: create_room result: {:?}", chatroom);
                Ok(chatroom)
            }
            Err(e) => {
                println!("Usecase: create_room error: {:?}", e);
                Err(e)
            }
        }
    }
}
