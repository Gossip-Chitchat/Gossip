
import { ReactNode } from "react";

// 定義聊天消息類型
export type Message = {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
  isSystem?: boolean;
};

// 定義主題類型
export type ThemeType = 'default' | 'excel' | 'code' | 'mail' | 'terminal';

// 主題插件接口
export interface ThemePlugin {
  id: ThemeType;
  name: string;
  icon?: ReactNode;
  headerComponent: React.FC<HeaderProps>;
  messagesComponent: React.FC<MessagesProps>;
  inputComponent: React.FC<InputProps>;
  wrapperClassName: (isBossAlert: boolean) => string;
  additionalComponents?: React.FC<any>[];
}

// 各組件道具類型
export interface HeaderProps {
  currentTheme: ThemeType;
  triggerBossAlert: () => void;
  handleThemeChange: (theme: ThemeType) => void;
  isMaximized?: boolean;
}

export interface MessagesProps {
  messages: Message[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
  formatTime: (date: Date) => string;
}

export interface InputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  sendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
}
