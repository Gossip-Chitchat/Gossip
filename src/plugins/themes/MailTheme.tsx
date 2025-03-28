
import { Send, MailOpen, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import AnimatedElement from '@/components/ui-elements/AnimatedElement';
import { ThemePlugin, HeaderProps, MessagesProps, InputProps } from '@/types/theme-plugins';

const MailHeader: React.FC<HeaderProps> = ({ currentTheme, triggerBossAlert, handleThemeChange }) => {
  return (
    <div className="py-3 px-4 flex items-center justify-between shadow-sm bg-blue-100 text-blue-800">
      <h1 className="text-xl font-display font-bold">收件匣 - Outlook</h1>
      
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
          className="bg-blue-50 text-blue-800 border border-blue-200 p-2 rounded-lg text-sm"
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

const MailMessages: React.FC<MessagesProps> = ({ messages, messagesEndRef, formatTime }) => {
  return (
    <ScrollArea className="flex-1 p-6">
      <AnimatedElement animation="fade-in">
        <div className="space-y-4 max-w-3xl mx-auto">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={cn(
                "p-4 rounded-lg border",
                {
                  'bg-blue-50 border-blue-200 ml-auto max-w-xs sm:max-w-sm': message.sender === 'You' && !message.isSystem,
                  'bg-white border-blue-100 max-w-xs sm:max-w-sm': message.sender !== 'You' && !message.isSystem,
                  'text-center w-full border-b border-blue-100 pb-3 text-blue-500 italic font-light': message.isSystem && !message.content.includes('老闆'),
                  'bg-red-100 text-red-800 w-full text-center font-bold p-2 rounded-md border-red-200': message.isSystem && message.content.includes('老闆')
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

const MailInput: React.FC<InputProps> = ({ newMessage, setNewMessage, sendMessage, handleKeyPress }) => {
  return (
    <div className="py-4 px-6 border-t bg-blue-50 border-blue-100">
      <div className="max-w-3xl mx-auto flex gap-2">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="輸入訊息..."
          className="flex-1 p-3 rounded-lg resize-none h-12 max-h-32 focus:outline-none bg-white border border-blue-200 focus:ring-2 focus:ring-blue-300/50"
        />
        <button
          onClick={sendMessage}
          className="p-3 rounded-lg flex items-center justify-center bg-blue-600 text-white hover:bg-blue-700"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

const MailTheme: ThemePlugin = {
  id: 'mail',
  name: '郵件模式',
  icon: <MailOpen size={18} />,
  headerComponent: MailHeader,
  messagesComponent: MailMessages,
  inputComponent: MailInput,
  wrapperClassName: (isBossAlert) => "h-[calc(100vh-36px)] flex flex-col bg-blue-50 transition-colors duration-300"
};

export default MailTheme;
