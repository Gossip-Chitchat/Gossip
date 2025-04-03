use anyhow::Error;
pub trait ChatroomRepository: Send + Sync {
    fn create_room(&self) -> Result<(), Error>;
    fn get_room(&self) -> Result<(), Error>;
    fn get_room_list(&self) -> Result<(), Error>;
    fn exit_room(&self) -> Result<(), Error>;
}
