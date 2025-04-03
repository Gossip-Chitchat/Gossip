use crate::domain::models::state::AppState;
use crate::application::usecase::chatroom::create::CreateRoomUsecase;

pub fn init_state() -> AppState {

    // Init Repo

    // Init Service

    // Init Usecase
    let create_room_usecase = CreateRoomUsecase::new();


    // Init State
    AppState::new(
        create_room_usecase
    )
}
