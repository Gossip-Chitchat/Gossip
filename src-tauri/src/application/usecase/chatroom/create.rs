use anyhow::Error;
use crate::domain::ports::chatroom::CreateRoomPort;

#[derive(Clone)]
pub struct CreateRoomUsecase {
}

impl std::fmt::Debug for CreateRoomUsecase {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.debug_struct("CreateRoomUsecase").finish()
    }
}

impl Default for CreateRoomUsecase {
    fn default() -> Self {
        Self {
        }
    }
}

impl CreateRoomUsecase {
    pub fn new(
    ) -> Self {
        Self {
        }
    }
}

impl CreateRoomPort for CreateRoomUsecase { 
    fn create_room(&self) -> Result<(), Error> {
        Ok(())
    }
}
