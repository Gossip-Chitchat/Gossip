use crate::domain::models::chat::ChatRoom;
use crate::domain::ports::chatroom::CreateRoomPort;
use crate::domain::service::chatroom::ChatroomService;
use anyhow::Error;
use std::sync::Arc;
use std::sync::Mutex;

#[derive(Clone)]
pub struct CreateRoomUsecase {
    chatroom_service: Arc<Mutex<dyn ChatroomService>>,
}

impl CreateRoomUsecase {
    pub fn new(chatroom_service: Arc<Mutex<dyn ChatroomService>>) -> Self {
        Self { chatroom_service }
    }
}

impl CreateRoomPort for CreateRoomUsecase {
    fn create_room(&self) -> Result<ChatRoom, Error> {
        println!("Usecase: create_room");
        let result = self.chatroom_service.lock().unwrap().create_room();

        match result {
            Ok(chatroom) => {
                println!("Usecase: create_room result: {:?}", chatroom);
                Ok(chatroom)
            }
            Err(e) => {
                println!("Usecase: create_room error: {:?}", e);
                Err(e)
            }
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    struct StubService {
        result: fn() -> Result<ChatRoom, Error>,
    }

    impl ChatroomService for StubService {
        fn create_room(&self) -> Result<ChatRoom, Error> {
            (self.result)()
        }

        fn get_room(&self) -> Result<ChatRoom, Error> {
            unimplemented!()
        }

        fn get_room_list(&self) -> Result<Vec<ChatRoom>, Error> {
            unimplemented!()
        }

        fn exit_room(&self) -> Result<(), Error> {
            unimplemented!()
        }
    }

    fn usecase_with(result: fn() -> Result<ChatRoom, Error>) -> CreateRoomUsecase {
        CreateRoomUsecase::new(Arc::new(Mutex::new(StubService { result })))
    }

    #[test]
    fn create_room_returns_room_from_service() {
        let usecase = usecase_with(|| Ok(ChatRoom::new(true, "room-1".to_string())));

        let room = usecase.create_room().unwrap();

        assert_eq!(room.id, "room-1");
        assert!(room.is_owner);
    }

    #[test]
    fn create_room_propagates_service_error() {
        let usecase = usecase_with(|| Err(anyhow::anyhow!("Chatroom already exists")));

        let err = usecase.create_room().unwrap_err();

        assert_eq!(err.to_string(), "Chatroom already exists");
    }
}
