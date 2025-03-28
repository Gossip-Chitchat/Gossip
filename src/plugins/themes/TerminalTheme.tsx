
import { Send, Terminal, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import AnimatedElement from '@/components/ui-elements/AnimatedElement';
import { ThemePlugin, HeaderProps, MessagesProps, InputProps } from '@/types/theme-plugins';

const TerminalHeader: React.FC<HeaderProps> = ({ currentTheme, triggerBossAlert, handleThemeChange }) => {
  return (
    <div className="py-3 px-4 flex items-center justify-between shadow-sm bg-black text-green-400 border-b border-green-500/30">
      <h1 className="text-xl font-display font-bold">Terminal - bash</h1>
      
      <div className="flex items-center gap-3">
        <button
          onClick={triggerBossAlert}
          className="border border-green-500/30 hover:bg-green-900/20 p-2 rounded-lg flex items-center gap-1 text-sm"
        >
          <AlertTriangle size={16} />
          <span className="hidden sm:inline">老闆警示 (Ctrl+Shift+B)</span>
        </button>
        
        <select
          value={currentTheme}
          onChange={(e) => handleThemeChange(e.target.value as any)}
          className="bg-black text-green-400 border border-green-500/30 p-2 rounded-lg text-sm"
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

const TerminalMessages: React.FC<MessagesProps> = ({ messages, messagesEndRef, formatTime }) => {
  return (
    <ScrollArea className="flex-1 p-6">
      <AnimatedElement animation="fade-in">
        <div className="space-y-4 max-w-3xl mx-auto font-mono">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={cn(
                "p-2 rounded border border-green-500/20",
                {
                  'bg-green-900/20 ml-auto max-w-xs sm:max-w-sm': message.sender === 'You' && !message.isSystem,
                  'bg-black max-w-xs sm:max-w-sm': message.sender !== 'You' && !message.isSystem,
                  'text-center w-full pb-3 text-green-500/70 italic font-light border-0': message.isSystem && !message.content.includes('老闆'),
                  'bg-red-900/30 text-red-400 w-full text-center font-bold p-2 rounded-md': message.isSystem && message.content.includes('老闆')
                }
              )}
            >
              {!message.isSystem && (
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-green-400">{message.sender}@gossip:</span>
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

const TerminalInput: React.FC<InputProps> = ({ newMessage, setNewMessage, sendMessage, handleKeyPress }) => {
  return (
    <div className="py-4 px-6 border-t bg-black border-green-500/30">
      <div className="max-w-3xl mx-auto flex gap-2">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="輸入訊息..."
          className="flex-1 p-3 rounded-lg resize-none h-12 max-h-32 focus:outline-none bg-black border border-green-500/30 text-green-400 focus:ring-2 focus:ring-green-500/30 font-mono"
        />
        <button
          onClick={sendMessage}
          className="p-3 rounded-lg flex items-center justify-center bg-transparent border border-green-500/30 text-green-400 hover:bg-green-900/20"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

const TerminalTheme: ThemePlugin = {
  id: 'terminal',
  name: '終端機模式',
  icon: <Terminal size={18} />,
  headerComponent: TerminalHeader,
  messagesComponent: TerminalMessages,
  inputComponent: TerminalInput,
  wrapperClassName: (isBossAlert) => "h-[calc(100vh-36px)] flex flex-col bg-black text-green-400 transition-colors duration-300"
};

export default TerminalTheme;
