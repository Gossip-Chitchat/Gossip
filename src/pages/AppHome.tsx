import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, LogIn, Copy, Check } from 'lucide-react';
import AnimatedElement from '@/components/ui-elements/AnimatedElement';
import { invoke } from '@tauri-apps/api/core';
import { toast } from 'sonner';

interface RoomInfo {
  id: string;
  link: string;
}

const AppHome = () => {
  const navigate = useNavigate();
  const [roomLink, setRoomLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [joinLink, setJoinLink] = useState('');
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(roomLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const joinRoom = () => {
    // In a real app, validate the link first
    navigate('/app/chat', { state: { roomLink: joinLink } });
  };

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
      toast.error("建立聊天室失敗：" + error.message);
    }
  };

  return (
    <div className="min-h-screen py-8 px-6 md:px-12">
      <AnimatedElement animation="fade-in">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-6">
            歡迎使用 Gossip 聊天工具
          </h1>
          <p className="text-lg text-gray-600 mb-12">
            免安裝伺服器，一鍵啟動的神祕聊天工具。即時匿名聊天，訊息不會留下任何紀錄！
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Create Room */}
            <AnimatedElement animation="slide-up" delay={100} className="h-full">
              <div className="glass p-8 rounded-2xl h-full">
                <h2 className="text-xl font-display font-bold mb-4">建立聊天室</h2>
                <p className="text-gray-600 mb-6">
                  建立一個新的聊天室，並將連結分享給你的朋友或同事
                </p>
                
                {roomLink ? (
                  <div className="space-y-4">
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between">
                      <div className="truncate mr-2">{roomLink}</div>
                      <button 
                        onClick={copyToClipboard}
                        className="flex-shrink-0 p-2 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                      </button>
                    </div>
                    <button
                      onClick={() => navigate('/app/chat', { state: { isHost: true, roomLink } })}
                      className="w-full py-3 px-4 rounded-lg bg-black text-white font-medium hover:bg-black/90 transition-all flex items-center justify-center gap-2"
                    >
                      <LogIn size={18} />
                      <span>進入聊天室</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleCreateRoom}
                    className="w-full py-3 px-4 rounded-lg bg-black text-white font-medium hover:bg-black/90 transition-all flex items-center justify-center gap-2"
                  >
                    <PlusCircle size={18} />
                    <span>建立聊天室</span>
                  </button>
                )}
              </div>
            </AnimatedElement>
            
            {/* Join Room */}
            <AnimatedElement animation="slide-up" delay={200} className="h-full">
              <div className="glass p-8 rounded-2xl h-full">
                <h2 className="text-xl font-display font-bold mb-4">加入聊天室</h2>
                <p className="text-gray-600 mb-6">
                  輸入朋友分享給你的聊天室連結，立即加入對話
                </p>
                
                <div className="space-y-4">
                  <input
                    type="text"
                    value={joinLink}
                    onChange={(e) => setJoinLink(e.target.value)}
                    placeholder="輸入聊天室連結..."
                    className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/20"
                  />
                  <button
                    onClick={joinRoom}
                    disabled={!joinLink}
                    className="w-full py-3 px-4 rounded-lg bg-black text-white font-medium hover:bg-black/90 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                  >
                    <LogIn size={18} />
                    <span>加入聊天室</span>
                  </button>
                </div>
              </div>
            </AnimatedElement>
          </div>
          
          <AnimatedElement animation="fade-in" delay={300}>
            <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
              <h3 className="text-lg font-display font-bold mb-2">關於隱私與安全</h3>
              <p className="text-gray-600">
                Gossip 聊天工具不會儲存任何對話紀錄，所有訊息僅存在記憶體中。
                一旦關閉應用程式，所有訊息將永久消失，確保您的隱私安全。
              </p>
            </div>
          </AnimatedElement>
        </div>
      </AnimatedElement>
    </div>
  );
};

export default AppHome;
