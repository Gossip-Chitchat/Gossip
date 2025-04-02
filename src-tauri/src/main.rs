// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
mod domain;
mod commands;
mod init;

use init::init_state;
use actix_web::{web, App, Error, HttpRequest, HttpResponse, HttpServer};
use actix_web_actors::ws;
use serde::{Deserialize, Serialize};
use std::sync::mpsc::{self, Sender, Receiver};
use tauri::{Emitter, Manager}; // for window access
// use tokio::sync::Mutex; // 如果你想要在多處共享就需要考慮 thread-safe
use actix::prelude::*;

// 這裡為了示範，假設我們會從 GET Query 裡面取一個 message
#[derive(Debug, serde::Deserialize)]
struct MessageQuery {
    message: String,
}

async fn receive_message_handler(
    // 把 Sender 放進 App 資料
    tx: web::Data<Sender<String>>,
    query: web::Query<MessageQuery>,
) -> impl actix_web::Responder {
    let message = query.into_inner().message;
    println!("Actix 收到 message: {}", message);

    // 把訊息送到主執行緒，稍後 Tauri 收到後會 emit 給前端
    if let Err(e) = tx.send(message) {
        eprintln!("Send to Tauri main thread failed: {}", e);
    }

    HttpResponse::Ok().body("message received")
}

// 定義 WebSocket 訊息結構
#[derive(Debug, Serialize, Deserialize)]
struct WsMessage {
    message_type: String,
    content: String,
    sender: String,
}

// WebSocket Handler
struct ChatWebSocket {
    tx: Sender<String>,
}

impl Actor for ChatWebSocket {
    type Context = ws::WebsocketContext<Self>;
}

// 處理 WebSocket 訊息
impl StreamHandler<Result<ws::Message, ws::ProtocolError>> for ChatWebSocket {
    fn handle(&mut self, msg: Result<ws::Message, ws::ProtocolError>, ctx: &mut Self::Context) {
        match msg {
            Ok(ws::Message::Text(text)) => {
                // 解析接收到的 JSON 訊息
                if let Ok(ws_message) = serde_json::from_str::<WsMessage>(&text) {
                    println!("WebSocket received: {:?}", ws_message);
                    
                    // 將訊息轉發到 Tauri 主線程
                    if let Err(e) = self.tx.send(text.to_string()) {
                        eprintln!("Failed to send to Tauri thread: {}", e);
                    }
                }
            }
            Ok(ws::Message::Ping(msg)) => {
                ctx.pong(&msg);
            }
            Ok(ws::Message::Close(reason)) => {
                ctx.close(reason);
                ctx.stop();
            }
            _ => (),
        }
    }
}

// WebSocket 連接處理函數
async fn ws_index(
    req: HttpRequest,
    stream: web::Payload,
    tx: web::Data<Sender<String>>,
) -> Result<HttpResponse, Error> {
    let ws = ChatWebSocket {
        tx: tx.get_ref().clone(),
    };
    ws::start(ws, &req, stream)
}

#[tokio::main]
async fn main() {
    let (tx, rx): (Sender<String>, Receiver<String>) = mpsc::channel();

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
                while let Ok(received_msg) = rx.recv() {
                    println!("Tauri 通過 channel 收到 WebSocket 訊息: {}", &received_msg);
                    println!("準備送給前端: {:?}", main_window);
                    let _ = main_window.emit("chat-message", received_msg);
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
