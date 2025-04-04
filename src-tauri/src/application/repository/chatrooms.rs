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
    fn create_room(&mut self, id: String) -> Result<ChatRoom, Error> {
        println!("create_room");
        let chatroom = ChatRoom::new(true, id.clone());

        if self.chatrooms.contains_key(&id) {
            return Err(anyhow::anyhow!("Chatroom already exists"));
        }

        self.chatrooms.insert(id.clone(), chatroom.clone());
        Ok(chatroom)
    }

    fn get_room(&self) -> Result<ChatRoom, Error> {
        println!("get_room");
        Ok(ChatRoom::new(true, "".to_string()))
    }

    fn get_room_list(&self) -> Result<Vec<ChatRoom>, Error> {
        println!("get_room_list");
        Ok(vec![])
    }

    fn exit_room(&self) -> Result<(), Error> {
        println!("exit_room");
        Ok(())
    }
}
