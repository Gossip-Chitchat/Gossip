#![allow(unused)]
use crate::domain::models::plugin::Plugin;

#[tauri::command]
pub fn get_plugins_list_from_server() -> Vec<Plugin> {
    vec![]
}

#[tauri::command]
pub fn get_plugin_from_server(id: String) -> Plugin {
    Plugin {
        id,
        name: "".to_string(),
        description: "".to_string(),
    }
}

#[tauri::command]
pub fn install_plugin(id: String) -> bool {
    true
}


