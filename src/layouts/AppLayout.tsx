
import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { 
  MessageSquare, 
  Settings, 
  Home, 
  LogOut, 
  MenuIcon,
  X,
  ChevronsLeft,
  ChevronsRight,
  Keyboard,
  Minimize2,
  Maximize2,
  Minus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import KeyboardShortcutsModal from '@/components/KeyboardShortcutsModal';

const AppLayout = () => {
  const [sidebarState, setSidebarState] = useState<'expanded' | 'narrow' | 'hidden'>('expanded');
  const [isMaximized, setIsMaximized] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'v') {
        setSidebarState(prev => {
          const states: ('expanded' | 'narrow' | 'hidden')[] = ['expanded', 'narrow', 'hidden'];
          const currentIndex = states.indexOf(prev);
          const nextIndex = (currentIndex + 1) % states.length;
          
          const stateNames = {
            expanded: '展開',
            narrow: '精簡',
            hidden: '隱藏'
          };
          toast({
            title: '側邊欄狀態已變更',
            description: `側邊欄已切換為${stateNames[states[nextIndex]]}模式`
          });
          
          return states[nextIndex];
        });
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toast]);

  useEffect(() => {
    const handleHideSidebar = () => {
      setSidebarState('hidden');
      toast({
        title: '側邊欄狀態已變更',
        description: '主題已變更，側邊欄已自動隱藏'
      });
    };

    window.addEventListener('hideSidebar', handleHideSidebar);
    return () => window.removeEventListener('hideSidebar', handleHideSidebar);
  }, [toast]);

  const toggleSidebar = () => {
    setSidebarState(prev => {
      if (prev === 'hidden') return 'expanded';
      if (prev === 'expanded') return 'hidden';
      return 'expanded';
    });
  };

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
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="h-9 bg-gradient-to-r from-gray-100/80 to-gray-200/80 backdrop-blur-sm flex items-center justify-between px-4 select-none shadow-[0_1px_2px_rgba(0,0,0,0.05)] border-b border-gray-200/50">
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-700">Gossip 聊天應用程式</span>
        </div>
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
      </div>

      <div className="flex flex-1 overflow-hidden">
        <button 
          className="lg:hidden fixed z-50 bottom-4 right-4 p-3 rounded-full bg-black text-white shadow-lg"
          onClick={toggleSidebar}
        >
          {sidebarState !== 'hidden' ? <X size={20} /> : <MenuIcon size={20} />}
        </button>

        <div 
          className={cn(
            "fixed lg:relative h-[calc(100vh-36px)] bg-white shadow-md transition-all duration-500 ease-in-out z-40",
            sidebarState === 'expanded' && "w-64",
            sidebarState === 'narrow' && "w-16",
            sidebarState === 'hidden' && "-translate-x-full lg:translate-x-[-100%] lg:w-0"
          )}
        >
          <div className="flex flex-col h-full">
            <div className={cn(
              "p-4 border-b flex items-center justify-between transition-all duration-300 ease-in-out",
              sidebarState === 'narrow' && "justify-center p-2"
            )}>
              {sidebarState === 'expanded' ? (
                <>
                  <div>
                    <h1 className="text-2xl font-display font-bold text-gradient-accent">Gossip</h1>
                    <p className="text-xs text-gray-500 mt-1">匿名聊天工具</p>
                  </div>
                  <button 
                    onClick={() => setSidebarState('narrow')}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    title="精簡側邊欄 (Ctrl+Shift+V)"
                  >
                    <ChevronsLeft size={18} />
                  </button>
                </>
              ) : sidebarState === 'narrow' ? (
                <>
                  <button 
                    onClick={() => setSidebarState('expanded')}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    title="展開側邊欄 (Ctrl+Shift+V)"
                  >
                    <ChevronsRight size={18} />
                  </button>
                </>
              ) : null}
            </div>
            
            <nav className={cn(
              "flex-1 p-4 transition-all duration-300 ease-in-out",
              sidebarState === 'narrow' && "p-2"
            )}>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => navigate('/app')}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-300 ease-in-out",
                      sidebarState === 'narrow' && "justify-center px-1"
                    )}
                    title={sidebarState === 'narrow' ? "首頁" : undefined}
                  >
                    <Home size={18} />
                    {sidebarState === 'expanded' && <span className="transition-opacity duration-300 ease-in-out">首頁</span>}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/app/chat')}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-300 ease-in-out",
                      sidebarState === 'narrow' && "justify-center px-1"
                    )}
                    title={sidebarState === 'narrow' ? "聊天室" : undefined}
                  >
                    <MessageSquare size={18} />
                    {sidebarState === 'expanded' && <span className="transition-opacity duration-300 ease-in-out">聊天室</span>}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/app/settings')}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-300 ease-in-out",
                      sidebarState === 'narrow' && "justify-center px-1"
                    )}
                    title={sidebarState === 'narrow' ? "設定" : undefined}
                  >
                    <Settings size={18} />
                    {sidebarState === 'expanded' && <span className="transition-opacity duration-300 ease-in-out">設定</span>}
                  </button>
                </li>
                <li>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button 
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-300 ease-in-out",
                          sidebarState === 'narrow' && "justify-center px-1"
                        )}
                        title={sidebarState === 'narrow' ? "快捷鍵" : undefined}
                      >
                        <Keyboard size={18} />
                        {sidebarState === 'expanded' && <span className="transition-opacity duration-300 ease-in-out">快捷鍵</span>}
                      </button>
                    </DialogTrigger>
                    <KeyboardShortcutsModal />
                  </Dialog>
                </li>
              </ul>
            </nav>
            
            <div className={cn(
              "p-4 border-t transition-all duration-300 ease-in-out",
              sidebarState === 'narrow' && "p-2"
            )}>
              <button 
                onClick={() => navigate('/')}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-300 ease-in-out",
                  sidebarState === 'narrow' && "justify-center px-1"
                )}
                title={sidebarState === 'narrow' ? "返回首頁" : undefined}
              >
                <LogOut size={18} />
                {sidebarState === 'expanded' && <span className="transition-opacity duration-300 ease-in-out">返回首頁</span>}
              </button>
            </div>
          </div>
        </div>
        
        {sidebarState === 'hidden' && (
          <button 
            className="hidden lg:flex fixed z-40 left-4 top-4 p-2 rounded-md bg-white shadow-md text-gray-600 hover:text-gray-800 transition-colors duration-300 ease-in-out transform hover:scale-105"
            onClick={() => setSidebarState('expanded')}
            title="顯示側邊欄 (Ctrl+Shift+V)"
          >
            <MenuIcon size={20} />
          </button>
        )}
        
        <div className="flex-1 h-full overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
