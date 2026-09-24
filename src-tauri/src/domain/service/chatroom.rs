use crate::domain::models::chat::ChatRoom;
use anyhow::Error;

pub trait ChatroomService: Send + Sync {
    fn create_room(&self) -> Result<ChatRoom, Error>;
    // Not wired to a Tauri command yet.
    #[allow(dead_code)]
    fn get_room(&self) -> Result<ChatRoom, Error>;
    #[allow(dead_code)]
    fn get_room_list(&self) -> Result<Vec<ChatRoom>, Error>;
    #[allow(dead_code)]
    fn exit_room(&self) -> Result<(), Error>;
}
