
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import AnimatedElement from '@/components/ui-elements/AnimatedElement';
import { ThemePlugin, HeaderProps, MessagesProps, InputProps } from '@/types/theme-plugins';
import { AlertTriangle } from 'lucide-react';

const DefaultHeader: React.FC<HeaderProps> = ({ currentTheme, triggerBossAlert, handleThemeChange }) => {
  return (
    <div className="py-3 px-4 flex items-center justify-between shadow-sm bg-white">
      <h1 className="text-xl font-display font-bold">Gossip 聊天室</h1>
      
      <div className="flex items-center gap-3">
        <button
          onClick={triggerBossAlert}
          className="bg-red-100 text-red-600 hover:bg-red-200 p-2 rounded-lg flex items-center gap-1 text-sm"
        >
          <AlertTriangle size={16} />
          <span className="hidden sm:inline">老闆警示 (Ctrl+Shift+B)</span>
        </button>
        
        <select
          value={currentTheme}
          onChange={(e) => handleThemeChange(e.target.value as any)}
          className="bg-gray-100 text-gray-800 p-2 rounded-lg text-sm"
        >
          <option value="default">預設主題</option>
          <option value="excel">Excel 模式</option>
          <option value="code">IDE 模式</option>
          <option value="mail">郵件模式</option>
          <option value="terminal">終端機模式</option>
        </select>
      </div>
    </div>
  );
};

const DefaultMessages: React.FC<MessagesProps> = ({ messages, messagesEndRef, formatTime }) => {
  return (
    <ScrollArea className="flex-1 p-6">
      <AnimatedElement animation="fade-in">
        <div className="space-y-4 max-w-3xl mx-auto">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={cn(
                "p-4 rounded-lg",
                {
                  'bg-blue-500 text-white ml-auto max-w-xs sm:max-w-sm': message.sender === 'You' && !message.isSystem,
                  'bg-gray-100 max-w-xs sm:max-w-sm': message.sender !== 'You' && !message.isSystem,
                  'text-center w-full border-b pb-3 text-gray-500 italic font-light': message.isSystem && !message.content.includes('老闆'),
                  'bg-red-100 text-red-800 w-full text-center font-bold p-2 rounded-md': message.isSystem && message.content.includes('老闆')
                }
              )}
            >
              {!message.isSystem && (
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">{message.sender}</span>
                  <span className="text-xs opacity-70">{formatTime(message.timestamp)}</span>
                </div>
              )}
              <p className={cn(
                message.isSystem && !message.content.includes('老闆') ? 'text-center py-1' : '',
              )}>
                {message.content}
              </p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </AnimatedElement>
    </ScrollArea>
  );
};

const DefaultInput: React.FC<InputProps> = ({ newMessage, setNewMessage, sendMessage, handleKeyPress }) => {
  return (
    <div className="py-4 px-6 border-t bg-white border-gray-100">
      <div className="max-w-3xl mx-auto flex gap-2">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="輸入訊息..."
          className="flex-1 p-3 rounded-lg resize-none h-12 max-h-32 focus:outline-none bg-white border border-gray-200 focus:ring-2 focus:ring-black/20"
        />
        <button
          onClick={sendMessage}
          className="p-3 rounded-lg flex items-center justify-center bg-black text-white hover:bg-black/90"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

const DefaultTheme: ThemePlugin = {
  id: 'default',
  name: '預設主題',
  headerComponent: DefaultHeader,
  messagesComponent: DefaultMessages,
  inputComponent: DefaultInput,
  wrapperClassName: (isBossAlert) => "h-[calc(100vh-36px)] flex flex-col bg-white transition-colors duration-300"
};

export default DefaultTheme;
