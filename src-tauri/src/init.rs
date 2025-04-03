use crate::application::repository::chatrooms::ChatroomsRepository;
use crate::application::service::chatroom::ChatroomServiceImpl;
use crate::application::usecase::chatroom::create::CreateRoomUsecase;
use crate::domain::models::state::AppState;
use crate::domain::repository::chatroom::ChatroomRepository;
use std::sync::Arc;
use std::sync::Mutex;

pub fn init_state() -> AppState {
    // Init Repo
    let chatrooms_repository = Arc::new(Mutex::new(ChatroomsRepository::new()));

    // Create repository as trait object
    let chatroom_repository_trait: Arc<Mutex<dyn ChatroomRepository>> =
        chatrooms_repository.clone();

    // Init Service
    let chatroom_service = Arc::new(Mutex::new(ChatroomServiceImpl::new(
        chatroom_repository_trait,
    )));

    // Init Usecase
    let create_room_usecase =
        Arc::new(Mutex::new(CreateRoomUsecase::new(chatroom_service.clone())));

    // Init State
    AppState::new(create_room_usecase, chatrooms_repository)
}
