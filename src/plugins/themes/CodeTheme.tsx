
import { Send, FileCode2, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import AnimatedElement from '@/components/ui-elements/AnimatedElement';
import { ThemePlugin, HeaderProps, MessagesProps, InputProps } from '@/types/theme-plugins';

const CodeHeader: React.FC<HeaderProps> = ({ currentTheme, triggerBossAlert, handleThemeChange }) => {
  return (
    <div className="py-3 px-4 flex items-center justify-between shadow-sm bg-gray-800 text-white">
      <h1 className="text-xl font-display font-bold">project.js - VS Code</h1>
      
      <div className="flex items-center gap-3">
        <button
          onClick={triggerBossAlert}
          className="bg-red-800/20 text-red-400 hover:bg-red-800/30 p-2 rounded-lg flex items-center gap-1 text-sm"
        >
          <AlertTriangle size={16} />
          <span className="hidden sm:inline">老闆警示 (Ctrl+Shift+B)</span>
        </button>
        
        <select
          value={currentTheme}
          onChange={(e) => handleThemeChange(e.target.value as any)}
          className="bg-gray-700 text-white border border-gray-600 p-2 rounded-lg text-sm"
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

const CodeMessages: React.FC<MessagesProps> = ({ messages, messagesEndRef, formatTime }) => {
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
                  'bg-gray-700 text-gray-100 max-w-xs sm:max-w-sm': message.sender !== 'You' && !message.isSystem,
                  'text-center w-full border-b border-gray-700 pb-3 text-gray-500 italic font-light': message.isSystem && !message.content.includes('老闆'),
                  'bg-red-900/30 text-red-400 w-full text-center font-bold p-2 rounded-md': message.isSystem && message.content.includes('老闆')
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

const CodeInput: React.FC<InputProps> = ({ newMessage, setNewMessage, sendMessage, handleKeyPress }) => {
  return (
    <div className="py-4 px-6 border-t bg-gray-800 border-gray-700">
      <div className="max-w-3xl mx-auto flex gap-2">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="輸入訊息..."
          className="flex-1 p-3 rounded-lg resize-none h-12 max-h-32 focus:outline-none bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-gray-500"
        />
        <button
          onClick={sendMessage}
          className="p-3 rounded-lg flex items-center justify-center bg-blue-500 text-white hover:bg-blue-600"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

const CodeTheme: ThemePlugin = {
  id: 'code',
  name: 'IDE 模式',
  icon: <FileCode2 size={18} />,
  headerComponent: CodeHeader,
  messagesComponent: CodeMessages,
  inputComponent: CodeInput,
  wrapperClassName: (isBossAlert) => "h-[calc(100vh-36px)] flex flex-col bg-gray-900 text-white transition-colors duration-300"
};

export default CodeTheme;
