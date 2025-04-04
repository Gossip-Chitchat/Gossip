use anyhow::Error;

use crate::domain::models::chat::ChatRoom;

pub trait CreateRoomPort: Send + Sync {
    fn create_room(&self) -> Result<ChatRoom, Error>;
}

pub trait GetRoomPort: Send + Sync {
    fn get_room(&self) -> Result<ChatRoom, Error>;
}

pub trait GetRoomListPort: Send + Sync {
    fn get_room_list(&self) -> Result<Vec<ChatRoom>, Error>;
}

pub trait ExitRoomPort: Send + Sync {
    fn exit_room(&self) -> Result<(), Error>;
}
