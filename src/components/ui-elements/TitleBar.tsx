import { useNavigate } from 'react-router-dom';
import { X, Minimize2, Maximize2, Minus } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface TitleBarProps {
  title?: string;
  showWindowControls?: boolean;
}

export default function TitleBar({ 
  title = "Gossip 聊天應用程式", 
  showWindowControls = true 
}: TitleBarProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleMaximize = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsMaximized(true);
      }).catch(err => {
        toast({
          title: '全螢幕錯誤',
          description: `無法進入全螢幕模式: ${err.message}`,
          variant: 'destructive'
        });
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsMaximized(false);
        });
      }
    }
  };

  const handleMinimize = () => {
    toast({
      title: '視窗已最小化',
      description: '這是一個模擬的功能，網頁應用程式無法實際最小化視窗'
    });
  };

  const handleClose = () => {
    toast({
      title: '應用程式已關閉',
      description: '即將返回首頁'
    });
    
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <div 
      data-tauri-drag-region 
      className="h-9 bg-gradient-to-r from-gray-100/80 to-gray-200/80 backdrop-blur-sm flex items-center justify-between px-4 select-none shadow-[0_1px_2px_rgba(0,0,0,0.05)] border-b border-gray-200/50"
      style={{ userSelect: 'none' }}
    >
      <div data-tauri-drag-region className="flex items-center">
        <span data-tauri-drag-region className="text-sm font-medium text-gray-700">{title}</span>
      </div>
      
      {showWindowControls && (
        <div className="flex items-center space-x-2">
          <button 
            onClick={handleMinimize}
            className="w-7 h-7 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-200/70 transition-colors duration-200"
            title="最小化"
          >
            <Minus size={14} />
          </button>
          <button 
            onClick={handleMaximize}
            className="w-7 h-7 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-200/70 transition-colors duration-200"
            title={isMaximized ? "還原" : "最大化"}
          >
            {isMaximized ? 
              <Minimize2 size={14} /> : 
              <Maximize2 size={14} />
            }
          </button>
          <button 
            onClick={handleClose}
            className="w-7 h-7 flex items-center justify-center rounded-full text-gray-500 hover:bg-red-500 hover:text-white transition-colors duration-200"
            title="關閉"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
} 
