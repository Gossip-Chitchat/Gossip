// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
mod application;
mod commands;
mod domain;
mod init;

use init::init_state;
use application::infrastructure::server::route::ws_index;
use actix_web::{web, App, HttpServer};
use std::sync::mpsc::{self, Sender, Receiver};
use tauri::{Emitter, Manager}; // for window access



#[tokio::main]
async fn main() {
    let (tx, rx): (Sender<Vec<u8>>, Receiver<Vec<u8>>) = mpsc::channel();

    // 啟動 WebSocket 服務器
    tokio::spawn(async move {
        HttpServer::new(move || {
            App::new()
                .app_data(web::Data::new(tx.clone()))
                .route("/ws", web::get().to(ws_index))
        })
        .bind(("127.0.0.1", 8080))
        .expect("Cannot bind to port 8080")
        .run()
        .await
        .expect("WebSocket server crashed");
    });

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            let main_window = app.get_webview_window("main").unwrap();
            
            #[cfg(debug_assertions)]
            {
                // main_window.open_devtools();
            }

            let app_state = init_state();
            app.manage(app_state);

            // 接收 WebSocket 訊息並轉發到前端
            std::thread::spawn(move || {
                while let Ok(msgpack_data) = rx.recv() {
                    println!("Tauri 通過 channel 收到 MessagePack 數據，長度: {}", msgpack_data.len());
                    
                    // 直接將 MessagePack 二進制數據發送給前端，讓前端自行解析
                    let _ = main_window.emit("chat-message", msgpack_data);
                }
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            commands::plugins::get_plugins_list_from_server,
            commands::plugins::get_plugin_from_server,
            commands::chatroom::create::create_chatroom,
            commands::chatroom::get_chatroom,
            commands::chatroom::get_chatroom_list,
            commands::chatroom::delete_chatroom,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
