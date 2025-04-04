import { useState, useEffect } from 'react';
import { listen } from '@tauri-apps/api/event';
import { decode } from '@msgpack/msgpack';

// 聊天訊息類型定義
export interface ChatMessage {
    message_type: string;
    content: string;
    sender: string;
}

// 特定類型消息處理器介面
interface MessageHandlers {
    [key: string]: (message: ChatMessage) => void;
}

export function useChatMessages() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [handlers, setHandlers] = useState<MessageHandlers>({});

    // 註冊特定類型消息的處理器
    const registerHandler = (messageType: string, handler: (message: ChatMessage) => void) => {
        setHandlers(prev => ({
            ...prev,
            [messageType]: handler
        }));
    };

    useEffect(() => {
        // 監聽 MessagePack 格式的消息
        const unlistenMsgpack = listen<Uint8Array>('chat-message-msgpack', (event) => {
            try {
                // 解碼 MessagePack 資料
                const msgpackData = event.payload;
                console.log("收到 MessagePack 數據:", msgpackData);

                // 使用 @msgpack/msgpack 庫解碼
                const decodedMessage = decode(msgpackData) as ChatMessage;
                console.log("解碼後的消息:", decodedMessage);

                // 添加消息到狀態
                setMessages(prev => [...prev, decodedMessage]);

                // 調用對應類型的處理器
                const handler = handlers[decodedMessage.message_type];
                if (handler) {
                    handler(decodedMessage);
                }
            } catch (error) {
                console.error("解析 MessagePack 失敗:", error);
            }
        });

        // 組件卸載時清理事件監聽
        return () => {
            unlistenMsgpack.then(unlisten => unlisten());
        };
    }, [handlers]);

    return {
        messages,
        registerHandler
    };
} 
