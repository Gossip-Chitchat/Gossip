use crate::domain::models::chat::ChatRoom;
use anyhow::Error;

pub trait ChatroomRepository: Send + Sync {
    fn create_room(&mut self, id: String) -> Result<ChatRoom, Error>;
    fn get_room(&self) -> Result<ChatRoom, Error>;
    fn get_room_list(&self) -> Result<Vec<ChatRoom>, Error>;
    fn exit_room(&self) -> Result<(), Error>;
}
