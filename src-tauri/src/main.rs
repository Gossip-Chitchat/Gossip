// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
mod domain;
mod commands;
mod init;

use init::init_state;
use actix_web::{web, App, HttpResponse, HttpServer, Responder};
use std::sync::mpsc::{self, Sender, Receiver};
use tauri::{Emitter, Manager}; // for window access
// use tokio::sync::Mutex; // 如果你想要在多處共享就需要考慮 thread-safe


// 這裡為了示範，假設我們會從 GET Query 裡面取一個 message
#[derive(Debug, serde::Deserialize)]
struct MessageQuery {
    message: String,
}

async fn receive_message_handler(
    // 把 Sender 放進 App 資料
    tx: web::Data<Sender<String>>,
    query: web::Query<MessageQuery>,
) -> impl Responder {
    let message = query.into_inner().message;
    println!("Actix 收到 message: {}", message);

    // 把訊息送到主執行緒，稍後 Tauri 收到後會 emit 給前端
    if let Err(e) = tx.send(message) {
        eprintln!("Send to Tauri main thread failed: {}", e);
    }

    HttpResponse::Ok().body("message received")
}

#[tokio::main]
async fn main() {
    
    
    let (tx, rx): (Sender<String>, Receiver<String>) = mpsc::channel();

    // 啟動一個獨立的 task，跑 Actix-Web 伺服器
    tokio::spawn(async move {
        // 這裡簡單監聽在 127.0.0.1:8080
        // /receive-message?message=Hello%20from%20Actix
        HttpServer::new(move || {
            App::new()
                // 把 sender 加到 Actix 的共享資料
                .app_data(web::Data::new(tx.clone()))
                .route("/receive-message", web::get().to(receive_message_handler))
        })
        .bind(("127.0.0.1", 8080))
        .expect("Cannot bind to port 8080")
        .run()
        .await
        .expect("Actix-Web Server crashed");
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


            // 開一個 thread 專門負責接收 rx，並把內容 emit 給前端
            std::thread::spawn(move || {
                while let Ok(received_msg) = rx.recv() {
                    println!("Tauri 收到來自 Actix 的 message: {}", &received_msg);
                    // 把 message 透過 emit 傳給前端
                    let _ = main_window.emit("receive-message", received_msg);
                }
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            commands::plugins::get_plugins_list_from_server,
            commands::plugins::get_plugin_from_server,
            commands::chatroom::create::create_chatroom,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
