use crate::domain::models::chat::ChatRoom;
use crate::domain::repository::chatroom::ChatroomRepository;
use crate::domain::service::chatroom::ChatroomService;
use anyhow::Error;
use std::sync::Arc;
use std::sync::Mutex;

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
    fn create_room(&self) -> Result<ChatRoom, Error> {
        println!("Service: create_room");

        let id = uuid::Uuid::now_v7().to_string();

        let result = self.chatroom_repository.lock().unwrap().create_room(id);

        println!("Service: create_room result: {:?}", result);
        match result {
            Ok(chatroom) => {
                println!("Service: create_room result: {:?}", chatroom);
                Ok(chatroom)
            }
            Err(e) => {
                println!("Service: create_room error: {:?}", e);
                Err(e)
            }
        }
    }

    fn get_room(&self) -> Result<ChatRoom, Error> {
        println!("Service: get_room");
        let result = self.chatroom_repository.lock().unwrap().get_room();
        println!("Service: get_room result: {:?}", result);
        match result {
            Ok(chatroom) => {
                println!("Service: get_room result: {:?}", chatroom);
                Ok(chatroom)
            }
            Err(e) => {
                println!("Service: get_room error: {:?}", e);
                Err(e)
            }
        }
    }

    fn get_room_list(&self) -> Result<Vec<ChatRoom>, Error> {
        println!("Service: get_room_list");
        let result = self.chatroom_repository.lock().unwrap().get_room_list();
        println!("Service: get_room_list result: {:?}", result);
        match result {
            Ok(chatrooms) => {
                println!("Service: get_room_list result: {:?}", chatrooms);
                Ok(chatrooms)
            }
            Err(e) => {
                println!("Service: get_room_list error: {:?}", e);
                Err(e)
            }
        }
    }

    fn exit_room(&self) -> Result<(), Error> {
        println!("Service: exit_room");
        let result = self.chatroom_repository.lock().unwrap().exit_room();
        println!("Service: exit_room result: {:?}", result);
        Ok(())
    }
}
