import { useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { toast } from 'sonner';

export interface RoomInfo {
    id: string;
    link: string;
}

export function useRoomCreation() {
    const [roomLink, setRoomLink] = useState('');

    const handleCreateRoom = async () => {
        try {
            // 1. 調用 Tauri 命令並獲取房間資訊
            const roomInfo = await invoke<RoomInfo>("create_chatroom", {});

            // 2. 顯示房間連結
            setRoomLink(roomInfo.id);

            // 3. 顯示成功提示
            toast.success("聊天室建立成功！");
        } catch (error) {
            // 4. 錯誤處理
            toast.error("建立聊天室失敗：" + error);
        }
    };

    return {
        roomLink,
        setRoomLink,
        handleCreateRoom
    };
} 
