
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useThemeManager } from '@/plugins/ThemeManager';
import { useChatRoom } from '@/hooks/useChatRoom';
import UsersSidebar from '@/components/chat/UsersSidebar';
import BossAlert from '@/components/chat/BossAlert';
import ExcelComponents from '@/components/chat/ExcelComponents';
import ExcelStatusBar from '@/components/chat/ExcelStatusBar';

// Fake user data
const users = [
  { id: '1', name: '王小明' },
  { id: '2', name: '李小華' },
  { id: '3', name: '張小美' },
  { id: '4', name: 'You' }
];

const ChatRoom = () => {
  const location = useLocation();
  const { isHost } = location.state || {};
  const { getTheme } = useThemeManager();
  
  const {
    messages,
    newMessage,
    setNewMessage,
    currentTheme,
    bossAlert,
    messagesEndRef,
    handleThemeChange,
    sendMessage,
    handleKeyPress,
    triggerBossAlert,
    formatTime
  } = useChatRoom({ isHost });
  
  // 獲取當前主題插件
  const activeTheme = getTheme(currentTheme);
  
  // 使用主題的組件
  const HeaderComponent = activeTheme.headerComponent;
  const MessagesComponent = activeTheme.messagesComponent;
  const InputComponent = activeTheme.inputComponent;

  return (
    <div className={activeTheme.wrapperClassName(bossAlert)}>
      {/* Alert Banner */}
      <BossAlert bossAlert={bossAlert} />
      
      {/* Excel specific components */}
      <ExcelComponents 
        currentTheme={currentTheme} 
        activeTheme={activeTheme} 
        newMessage={newMessage} 
      />
      
      {/* Header */}
      <HeaderComponent 
        currentTheme={currentTheme}
        triggerBossAlert={triggerBossAlert}
        handleThemeChange={handleThemeChange}
      />
      
      {/* Main Chat Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Messages */}
        <MessagesComponent 
          messages={messages}
          messagesEndRef={messagesEndRef}
          formatTime={formatTime}
        />
        
        {/* Users Sidebar */}
        <UsersSidebar 
          users={users}
          currentTheme={currentTheme}
          activeTheme={activeTheme}
        />
      </div>
      
      {/* Message Input */}
      <InputComponent 
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        sendMessage={sendMessage}
        handleKeyPress={handleKeyPress}
      />
      
      {/* Excel Status Bar */}
      <ExcelStatusBar 
        currentTheme={currentTheme}
        activeTheme={activeTheme}
      />
    </div>
  );
};

export default ChatRoom;
