use crate::application::service::chatroom::ChatroomService;
use crate::domain::ports::chatroom::CreateRoomPort;
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
    fn create_room(&self) -> Result<(), Error> {
        println!("Usecase: create_room");
        let result = self.chatroom_service.lock().unwrap().create_room();
        println!("Usecase: create_room result: {:?}", result);
        Ok(())
    }
}
