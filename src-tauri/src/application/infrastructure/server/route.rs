use actix_web::{web, Error, HttpRequest, HttpResponse};
use actix_web_actors::ws;
use serde::{Deserialize, Serialize};
use std::sync::mpsc::Sender;
use actix::prelude::*;
use rmp_serde::{Deserializer, Serializer};
use bytes::Bytes;

// 定義 WebSocket 訊息結構
#[derive(Debug, Serialize, Deserialize)]
pub struct WsMessage {
    pub message_type: String,
    pub content: String,
    pub sender: String,
}

// WebSocket Handler
struct ChatWebSocket {
    tx: Sender<Vec<u8>>,
}

impl Actor for ChatWebSocket {
    type Context = ws::WebsocketContext<Self>;
}

// 處理 WebSocket 訊息
impl StreamHandler<Result<ws::Message, ws::ProtocolError>> for ChatWebSocket {
    fn handle(&mut self, msg: Result<ws::Message, ws::ProtocolError>, ctx: &mut Self::Context) {
        match msg {
            Ok(ws::Message::Binary(bin)) => {
                // 嘗試將二進制數據解析為 MessagePack 格式的 WsMessage
                let mut de = Deserializer::new(&bin[..]);
                match Deserialize::deserialize(&mut de) {
                    Ok(ws_message) => {
                        let message: WsMessage = ws_message;
                        println!("WebSocket received MessagePack: {:?}", message);
                        
                        // 直接將二進制數據轉發到 Tauri 主線程
                        if let Err(e) = self.tx.send(bin.to_vec()) {
                            eprintln!("Failed to send msgpack to Tauri thread: {}", e);
                        }
                    },
                    Err(e) => {
                        eprintln!("Failed to deserialize MessagePack: {}", e);
                    }
                }
            },
            Ok(ws::Message::Text(text)) => {
                // 為了兼容性，仍然支持 JSON
                println!("Warning: Received text message, but binary MessagePack is preferred");
                if let Ok(ws_message) = serde_json::from_str::<WsMessage>(&text) {
                    println!("WebSocket received JSON: {:?}", ws_message);
                    
                    // 將 JSON 轉換為 MessagePack
                    let mut buf = Vec::new();
                    if let Ok(_) = ws_message.serialize(&mut Serializer::new(&mut buf)) {
                        // 將轉換後的 MessagePack 數據發送到 Tauri 主線程
                        if let Err(e) = self.tx.send(buf) {
                            eprintln!("Failed to send msgpack to Tauri thread: {}", e);
                        }
                    }
                }
            },
            Ok(ws::Message::Ping(msg)) => {
                ctx.pong(&msg);
            },
            Ok(ws::Message::Close(reason)) => {
                ctx.close(reason);
                ctx.stop();
            },
            _ => (),
        }
    }
}

// WebSocket 連接處理函數
pub async fn ws_index(
    req: HttpRequest,
    stream: web::Payload,
    tx: web::Data<Sender<Vec<u8>>>,
) -> Result<HttpResponse, Error> {
    let ws = ChatWebSocket {
        tx: tx.get_ref().clone(),
    };
    ws::start(ws, &req, stream)
}
