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

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn create_room_stores_room_owned_by_creator() {
        let mut repo = ChatroomsRepository::new();

        let room = repo.create_room("room-1".to_string()).unwrap();

        assert!(room.is_owner);
        assert_eq!(room.id, "room-1");
        assert!(repo.chatrooms.contains_key("room-1"));
    }

    #[test]
    fn create_room_rejects_duplicate_id() {
        let mut repo = ChatroomsRepository::new();
        repo.create_room("room-1".to_string()).unwrap();

        let err = repo.create_room("room-1".to_string()).unwrap_err();

        assert_eq!(err.to_string(), "Chatroom already exists");
        assert_eq!(repo.chatrooms.len(), 1);
    }
}
