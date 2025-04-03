use crate::domain::models::chat::ChatRoom;

pub struct ChatroomsRepository {
    pub chatrooms: Vec<ChatRoom>,
}

impl ChatroomsRepository {
    pub fn new() -> Self {
        Self {
            chatrooms: vec![],
        }
    }
}


