
import { useState } from 'react';
import { Save, Info, TableProperties, FileCode2, MailOpen, Terminal } from 'lucide-react';
import AnimatedElement from '@/components/ui-elements/AnimatedElement';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

type ThemePreview = {
  name: string;
  id: string;
  description: string;
  color: string;
  icon?: React.ReactNode;
};

const AppSettings = () => {
  const [shortcut, setShortcut] = useState('Ctrl+Shift+B');
  const [selectedTheme, setSelectedTheme] = useState('default');
  const [notificationSound, setNotificationSound] = useState(true);
  
  // Theme previews
  const themes: ThemePreview[] = [
    { id: 'default', name: '預設主題', description: '一般聊天介面', color: 'bg-white' },
    { 
      id: 'excel', 
      name: 'Excel 模式', 
      description: '類似試算表介面', 
      color: 'bg-[#217346]',
      icon: <TableProperties size={18} className="text-white" />
    },
    { 
      id: 'code', 
      name: 'IDE 模式', 
      description: '程式編輯器風格', 
      color: 'bg-gray-900',
      icon: <FileCode2 size={18} className="text-white" />
    },
    { 
      id: 'mail', 
      name: '郵件模式', 
      description: '電子郵件介面', 
      color: 'bg-blue-100',
      icon: <MailOpen size={18} />
    },
    { 
      id: 'terminal', 
      name: '終端機模式', 
      description: '命令列介面', 
      color: 'bg-black',
      icon: <Terminal size={18} className="text-green-400" />
    }
  ];
  
  const saveSettings = () => {
    // This would save to localStorage or Tauri backend in a real app
    alert('設定已儲存！');
  };

  return (
    <div className="h-[calc(100vh-36px)] overflow-hidden">
      <ScrollArea className="h-full">
        <AnimatedElement animation="fade-in">
          <div className="py-8 px-6 md:px-12">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
                設定
              </h1>
              <p className="text-lg text-gray-600 mb-12">
                自訂你的 Gossip 聊天工具體驗
              </p>
              
              <div className="space-y-12">
                {/* Theme Settings */}
                <section>
                  <h2 className="text-xl font-display font-bold mb-6 pb-2 border-b">主題設定</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {themes.map((theme) => (
                      <div
                        key={theme.id}
                        className={cn(
                          "p-4 rounded-xl border cursor-pointer transition-all",
                          selectedTheme === theme.id 
                            ? "ring-2 ring-black border-transparent" 
                            : "hover:shadow-md border-gray-200"
                        )}
                        onClick={() => setSelectedTheme(theme.id)}
                      >
                        <div 
                          className={cn(
                            "w-full h-20 rounded-lg mb-3 flex items-center justify-center", 
                            theme.color
                          )}
                        >
                          {theme.icon}
                        </div>
                        <h3 className="font-medium">{theme.name}</h3>
                        <p className="text-sm text-gray-500">{theme.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
                
                {/* Excel Theme Preview */}
                {selectedTheme === 'excel' && (
                  <section>
                    <h2 className="text-xl font-display font-bold mb-6 pb-2 border-b">Excel 模式預覽</h2>
                    
                    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                      {/* Excel header */}
                      <div className="bg-[#217346] text-white py-2 px-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">聊天室資料.xlsx</span>
                        </div>
                        <div className="flex items-center text-xs gap-4">
                          <span>共用</span>
                          <span>自動儲存</span>
                        </div>
                      </div>
                      
                      {/* Excel ribbon */}
                      <div className="bg-[#f1f1f1] border-b border-gray-300 py-1 px-4 flex items-center space-x-3 text-xs">
                        <div className="flex items-center space-x-4">
                          <span className="font-bold">檔案</span>
                          <span>開始</span>
                          <span>插入</span>
                          <span>頁面配置</span>
                          <span>公式</span>
                          <span>資料</span>
                          <span className="bg-[#1e6a40] py-1 px-2 rounded text-white">檢視</span>
                        </div>
                      </div>
                      
                      {/* Excel grid preview */}
                      <div className="bg-white p-4">
                        <div className="border border-gray-300 overflow-hidden">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr>
                                <th className="border border-gray-300 bg-gray-100 p-1 w-8"></th>
                                <th className="border border-gray-300 bg-gray-100 p-1 w-12 text-center text-xs">A</th>
                                <th className="border border-gray-300 bg-gray-100 p-1 w-12 text-center text-xs">B</th>
                                <th className="border border-gray-300 bg-gray-100 p-1 w-12 text-center text-xs">C</th>
                                <th className="border border-gray-300 bg-gray-100 p-1 w-12 text-center text-xs">D</th>
                              </tr>
                            </thead>
                            <tbody>
                              {[1, 2, 3, 4, 5].map(row => (
                                <tr key={row}>
                                  <td className="border border-gray-300 bg-gray-100 p-1 text-center text-xs">{row}</td>
                                  <td className="border border-gray-300 p-1"></td>
                                  <td className="border border-gray-300 p-1"></td>
                                  <td className="border border-gray-300 p-1"></td>
                                  <td className="border border-gray-300 p-1"></td>
                                </tr>
                              ))}
                              <tr>
                                <td className="border border-gray-300 bg-gray-100 p-1 text-center text-xs">6</td>
                                <td className="border border-gray-300 p-1 text-xs">王小明</td>
                                <td className="border border-gray-300 p-1 text-xs">大家好！有人在嗎？</td>
                                <td className="border border-gray-300 p-1 text-xs">10:30</td>
                                <td className="border border-gray-300 p-1"></td>
                              </tr>
                              <tr>
                                <td className="border border-gray-300 bg-gray-100 p-1 text-center text-xs">7</td>
                                <td className="border border-gray-300 p-1 text-xs">李小華</td>
                                <td className="border border-gray-300 p-1 text-xs">嗨！我剛剛加入</td>
                                <td className="border border-gray-300 p-1 text-xs">10:35</td>
                                <td className="border border-gray-300 p-1"></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="mt-2 text-xs text-gray-500">
                          * 在 Excel 模式下，聊天內容會融入表格中，完美偽裝成試算表
                        </div>
                      </div>
                    </div>
                  </section>
                )}
                
                {/* Keyboard Shortcuts */}
                <section>
                  <h2 className="text-xl font-display font-bold mb-6 pb-2 border-b">鍵盤快捷鍵</h2>
                  
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <label className="font-medium min-w-40">老闆警示</label>
                      <div className="flex-1">
                        <select
                          value={shortcut}
                          onChange={(e) => setShortcut(e.target.value)}
                          className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/20"
                        >
                          <option value="Ctrl+Shift+B">Ctrl+Shift+B</option>
                          <option value="Ctrl+Shift+X">Ctrl+Shift+X</option>
                          <option value="Alt+B">Alt+B</option>
                          <option value="F12">F12</option>
                        </select>
                        <p className="text-sm text-gray-500 mt-1">
                          按下此快捷鍵將向所有人發送警示，並自動切換至安全主題
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
                
                {/* Notification Settings */}
                <section>
                  <h2 className="text-xl font-display font-bold mb-6 pb-2 border-b">通知設定</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">通知音效</h3>
                        <p className="text-sm text-gray-500">收到新訊息時播放音效</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={notificationSound}
                          onChange={() => setNotificationSound(!notificationSound)}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-black/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                      </label>
                    </div>
                  </div>
                </section>
                
                {/* Privacy Note */}
                <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 mb-8 flex gap-4">
                  <Info size={24} className="text-gray-500 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-display font-bold mb-2">隱私提醒</h3>
                    <p className="text-gray-600">
                      Gossip 聊天工具不會永久儲存任何對話紀錄或個人資料。所有設定僅保存在你的裝置上，
                      沒有任何資料會被上傳到雲端或外部伺服器。
                    </p>
                  </div>
                </div>
                
                {/* Save Button */}
                <div className="flex justify-end pb-12">
                  <button
                    onClick={saveSettings}
                    className="py-3 px-6 rounded-lg bg-black text-white font-medium hover:bg-black/90 transition-all flex items-center gap-2"
                  >
                    <Save size={18} />
                    <span>儲存設定</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </AnimatedElement>
      </ScrollArea>
    </div>
  );
};

export default AppSettings;
