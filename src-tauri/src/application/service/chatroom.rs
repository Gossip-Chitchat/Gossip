use crate::domain::repository::chatroom::ChatroomRepository;
use anyhow::Error;
use std::sync::Arc;
use std::sync::Mutex;

pub trait ChatroomService: Send + Sync {
    fn create_room(&self) -> Result<(), Error>;
    fn get_room(&self) -> Result<(), Error>;
    fn get_room_list(&self) -> Result<(), Error>;
    fn exit_room(&self) -> Result<(), Error>;
}

pub struct ChatroomServiceImpl {
    pub chatroom_repository: Arc<Mutex<dyn ChatroomRepository>>,
}

impl ChatroomServiceImpl {
    pub fn new(chatroom_repository: Arc<Mutex<dyn ChatroomRepository>>) -> Self {
        Self {
            chatroom_repository,
        }
    }
}

impl ChatroomService for ChatroomServiceImpl {
    fn create_room(&self) -> Result<(), Error> {
        println!("Service: create_room");
        let result = self.chatroom_repository.lock().unwrap().create_room();
        println!("Service: create_room result: {:?}", result);
        Ok(())
    }

    fn get_room(&self) -> Result<(), Error> {
        println!("Service: get_room");
        let result = self.chatroom_repository.lock().unwrap().get_room();
        println!("Service: get_room result: {:?}", result);
        Ok(())
    }

    fn get_room_list(&self) -> Result<(), Error> {
        println!("Service: get_room_list");
        let result = self.chatroom_repository.lock().unwrap().get_room_list();
        println!("Service: get_room_list result: {:?}", result);
        Ok(())
    }

    fn exit_room(&self) -> Result<(), Error> {
        println!("Service: exit_room");
        let result = self.chatroom_repository.lock().unwrap().exit_room();
        println!("Service: exit_room result: {:?}", result);
        Ok(())
    }
}
