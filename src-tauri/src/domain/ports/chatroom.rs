use anyhow::Error;

pub trait CreateRoomPort: Send + Sync {
    fn create_room(&self) -> Result<(), Error>;
}

pub trait GetRoomPort: Send + Sync {
    fn get_room(&self) -> Result<(), Error>;
}

pub trait GetRoomListPort: Send + Sync {
    fn get_room_list(&self) -> Result<(), Error>;
}

pub trait ExitRoomPort: Send + Sync {
    fn exit_room(&self) -> Result<(), Error>;
}
