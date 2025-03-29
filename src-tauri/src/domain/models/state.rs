use crate::domain::models::chat::ChatRoom;
use crate::domain::models::plugin::Plugin;

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct AppState {
    pub chatrooms: Vec<ChatRoom>,
    pub plugins: Vec<Plugin>,
}

impl AppState {
    pub fn new() -> Self {
        Self { chatrooms: vec![], plugins: vec![] }
    }
}
