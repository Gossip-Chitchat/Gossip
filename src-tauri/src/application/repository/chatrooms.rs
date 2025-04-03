use anyhow::Error;
use std::collections::HashMap;

use crate::domain::models::chat::ChatRoom;
use crate::domain::repository::chatroom::ChatroomRepository;
#[derive(Clone)]
pub struct ChatroomsRepository {
    pub chatrooms: HashMap<String, ChatRoom>,
}

impl ChatroomsRepository {
    pub fn new() -> Self {
        Self {
            chatrooms: HashMap::new(),
        }
    }
}

impl ChatroomRepository for ChatroomsRepository {
    fn create_room(&self) -> Result<(), Error> {
        println!("create_room");
        Ok(())
    }

    fn get_room(&self) -> Result<(), Error> {
        println!("get_room");
        Ok(())
    }

    fn get_room_list(&self) -> Result<(), Error> {
        println!("get_room_list");
        Ok(())
    }

    fn exit_room(&self) -> Result<(), Error> {
        println!("exit_room");
        Ok(())
    }
}
