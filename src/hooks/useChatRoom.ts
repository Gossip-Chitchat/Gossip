
import { useState, useEffect, useRef } from 'react';
import { Message, ThemeType } from '@/types/theme-plugins';

interface UseChatRoomProps {
  isHost?: boolean;
}

export function useChatRoom({ isHost }: UseChatRoomProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('default');
  const [bossAlert, setBossAlert] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Function to automatically hide sidebar when theme changes
  const handleThemeChange = (newTheme: ThemeType) => {
    setCurrentTheme(newTheme);
    
    // Dispatch a custom event to notify the sidebar to hide
    const hideSidebarEvent = new CustomEvent('hideSidebar');
    window.dispatchEvent(hideSidebarEvent);
  };
  
  // Add some initial messages for demonstration
  useEffect(() => {
    const initialMessages: Message[] = [
      {
        id: '1',
        content: isHost ? '你已創建聊天室，房間連結已複製到剪貼簿' : '你已加入聊天室',
        sender: 'System',
        timestamp: new Date(),
        isSystem: true
      },
      {
        id: '2',
        content: '大家好！有人在嗎？',
        sender: '王小明',
        timestamp: new Date(Date.now() - 15 * 60000)
      },
      {
        id: '3',
        content: '嗨！我剛剛加入',
        sender: '李小華',
        timestamp: new Date(Date.now() - 10 * 60000)
      },
      {
        id: '4',
        content: '午餐吃什麼好呢？',
        sender: '張小美',
        timestamp: new Date(Date.now() - 5 * 60000)
      }
    ];
    
    setMessages(initialMessages);
  }, [isHost]);
  
  // Send message function
  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'You',
      timestamp: new Date()
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
  };
  
  // Handle enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  
  // Trigger boss alert
  const triggerBossAlert = () => {
    const alertMessage: Message = {
      id: Date.now().toString(),
      content: '⚠️ 老闆來了！⚠️',
      sender: 'System',
      timestamp: new Date(),
      isSystem: true
    };
    
    setMessages([...messages, alertMessage]);
    setBossAlert(true);
    handleThemeChange('excel');
    
    // Reset alert after 5 seconds
    setTimeout(() => {
      setBossAlert(false);
    }, 5000);
  };
  
  // Set keyboard shortcut for boss alert
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + Shift + B for boss alert
      if (e.ctrlKey && e.shiftKey && e.key === 'b') {
        triggerBossAlert();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [messages]);
  
  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  return {
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
  };
}
