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
  const wsRef = useRef<WebSocket | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Function to automatically hide sidebar when theme changes
  const handleThemeChange = (newTheme: ThemeType) => {
    setCurrentTheme(newTheme);

    // Dispatch a custom event to notify the sidebar to hide
    const hideSidebarEvent = new CustomEvent('hideSidebar');
    window.dispatchEvent(hideSidebarEvent);
  };

  // 初始化 WebSocket 連接
  useEffect(() => {
    wsRef.current = new WebSocket('ws://127.0.0.1:9123/ws');

    wsRef.current.onopen = () => {
      console.log('WebSocket connected');
      // 發送加入聊天室訊息
      if (wsRef.current) {
        wsRef.current.send(JSON.stringify({
          message_type: 'join',
          content: isHost ? '創建了聊天室' : '加入了聊天室',
          sender: 'System'
        }));
      }
    };

    wsRef.current.onmessage = (event) => {
      const wsMessage = JSON.parse(event.data);
      const newMessage: Message = {
        id: Date.now().toString(),
        content: wsMessage.content,
        sender: wsMessage.sender,
        timestamp: new Date(),
        isSystem: wsMessage.sender === 'System'
      };
      setMessages(prev => [...prev, newMessage]);
    };
    wsRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
      // Implement reconnection strategy here
    };


    return () => {
      wsRef.current?.close();
    };
  }, [isHost]);

  // 發送訊息
  const sendMessage = () => {
    if (!newMessage.trim() || !wsRef.current) return;

    const message = {
      message_type: 'chat',
      content: newMessage,
      sender: 'You'
    };

    wsRef.current.send(JSON.stringify(message));
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
