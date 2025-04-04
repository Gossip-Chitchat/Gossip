import AnimatedElement from '@/components/ui-elements/AnimatedElement';
import TitleBar from '@/components/ui-elements/TitleBar';
import { RoomLinkDisplay } from '../components/landing/RoomLinkDisplay';
import { CreateRoomButton } from '../components/landing/CreateRoomButton';
import { JoinRoomForm } from '../components/landing/JoinRoomForm';
import { PrivacyInfoCard } from '../components/landing/PrivacyInfoCard';
import { RoomCard } from '../components/landing/RoomCard';
import { useRoomCreation } from '@/hooks/useRoomCreation';
import { useRoomJoining } from '@/hooks/useRoomJoining';

const AppHome = () => {
  const { roomLink, handleCreateRoom } = useRoomCreation();
  const { joinLink, setJoinLink, joinRoom } = useRoomJoining();

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* 標題列 */}
      <TitleBar data-tauri-drag-region title="Gossip 首頁" />
      
      {/* 主內容區 */}
      <div className="flex-1 overflow-y-auto py-8 px-6 md:px-12"> 
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
              <RoomCard 
                title="建立聊天室"
                description="建立一個新的聊天室，並將連結分享給你的朋友或同事"
                delay={100}
              >
                {roomLink ? (
                  <RoomLinkDisplay roomLink={roomLink} />
                ) : (
                  <CreateRoomButton onClick={handleCreateRoom} />
                )}
              </RoomCard>
              
              {/* Join Room */}
              <RoomCard
                title="加入聊天室"
                description="輸入朋友分享給你的聊天室連結，立即加入對話"
                delay={200}
              >
                <JoinRoomForm 
                  joinLink={joinLink}
                  setJoinLink={setJoinLink}
                  joinRoom={joinRoom}
                />
              </RoomCard>
            </div>
            
            <AnimatedElement animation="fade-in" delay={300}>
              <PrivacyInfoCard />
            </AnimatedElement>
          </div>
        </AnimatedElement>
      </div>
    </div>
  );
};

export default AppHome;
