
import { Send, TableProperties, AlertTriangle, Filter, SortAsc, Bold, Italic, Underline } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import AnimatedElement from '@/components/ui-elements/AnimatedElement';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { ThemePlugin, HeaderProps, MessagesProps, InputProps } from '@/types/theme-plugins';
import React from 'react';

// Excel column labels
const excelColumns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];

// Excel-specific components
const ExcelRibbon: React.FC = () => (
  <div className="bg-[#217346] text-white py-0.5 px-2 flex items-center text-xs">
    <div className="mr-6 flex items-center space-x-4">
      <span className="font-bold">檔案</span>
      <span>開始</span>
      <span>插入</span>
      <span>頁面配置</span>
      <span>公式</span>
      <span>資料</span>
      <span className="bg-[#1e6a40] py-1 px-2 rounded">檢視</span>
      <span>開發人員</span>
    </div>
  </div>
);

const ExcelFormulaBar: React.FC<{newMessage: string}> = ({ newMessage }) => (
  <div className="bg-[#f1f1f1] border-b border-gray-300 flex items-center px-2 py-1">
    <div className="flex items-center space-x-2 text-xs">
      <div className="border border-gray-300 px-2 py-1 bg-white w-16 text-center">B6</div>
      <div className="border border-gray-300 px-2 py-1 bg-white text-green-700 font-bold">=</div>
      <div className="border border-gray-300 px-2 py-1 bg-white w-80">{newMessage}</div>
    </div>
    <div className="ml-auto flex items-center space-x-1">
      <button className="p-1 hover:bg-gray-200 rounded"><Bold size={14} /></button>
      <button className="p-1 hover:bg-gray-200 rounded"><Italic size={14} /></button>
      <button className="p-1 hover:bg-gray-200 rounded"><Underline size={14} /></button>
    </div>
  </div>
);

const ExcelToolbar: React.FC = () => (
  <div className="bg-[#f1f1f1] border-b border-gray-300 py-1 px-4 flex items-center space-x-3 text-xs">
    <button className="flex items-center gap-1 border border-gray-300 px-2 py-1 rounded hover:bg-gray-200">
      <Filter size={12} />
      <span>篩選</span>
    </button>
    <button className="flex items-center gap-1 border border-gray-300 px-2 py-1 rounded hover:bg-gray-200">
      <SortAsc size={12} />
      <span>排序</span>
    </button>
    <div className="h-4 border-r border-gray-300 mx-1"></div>
    <div className="flex items-center gap-1">
      <span>字型:</span>
      <select className="border border-gray-300 px-1 py-0.5 rounded bg-white">
        <option>微軟正黑體</option>
      </select>
    </div>
    <div className="flex items-center gap-1">
      <span>大小:</span>
      <select className="border border-gray-300 px-1 py-0.5 rounded bg-white w-14">
        <option>11</option>
      </select>
    </div>
  </div>
);

const ExcelStatusBar: React.FC = () => (
  <div className="bg-[#217346] text-white py-1 px-3 flex justify-between text-xs">
    <div className="flex items-center gap-2">
      <span>就緒</span>
    </div>
    <div className="flex items-center gap-4">
      <span>100%</span>
      <div className="flex items-center gap-2">
        <span>第 1 頁</span>
        <span>|</span>
        <span>1 列 x {excelColumns.length} 欄</span>
      </div>
    </div>
  </div>
);

const ExcelWorksheetTabs: React.FC = () => (
  <div className="flex flex-col h-full">
    <div className="flex-1"></div>
    <div className="border-t border-gray-300 flex">
      <div className="bg-white border-r border-t border-gray-300 py-1 px-3 text-xs flex items-center gap-1 font-semibold">
        <span>聊天室工作表</span>
      </div>
      <div className="bg-gray-200 border-r border-t border-gray-300 py-1 px-3 text-xs flex items-center gap-1">
        <span>工作表2</span>
      </div>
      <div className="bg-gray-200 border-r border-t border-gray-300 py-1 px-3 text-xs flex items-center gap-1">
        <span>工作表3</span>
      </div>
    </div>
  </div>
);

// Generate Excel-like cells for a row
const renderExcelRow = (rowIndex: number) => {
  return (
    <TableRow key={`row-${rowIndex}`} className="border-b border-green-200 h-8">
      <TableCell className="font-medium text-center p-0 w-10 text-sm bg-green-100 border-r border-green-200">
        {rowIndex}
      </TableCell>
      {excelColumns.map((col) => (
        <TableCell key={`${col}${rowIndex}`} className="p-0 border-r border-green-200 text-xs text-gray-500"></TableCell>
      ))}
    </TableRow>
  );
};

// Excel main theme components
const ExcelHeader: React.FC<HeaderProps> = ({ currentTheme, triggerBossAlert, handleThemeChange }) => {
  return (
    <div className="py-3 px-4 flex items-center justify-between shadow-sm bg-[#217346] text-white">
      <h1 className="text-xl font-display font-bold flex items-center gap-2 text-white">
        <span className="text-lg">聊天室資料.xlsx</span>
        <span className="text-xs bg-[#1a5c38] px-2 py-1 rounded-sm">儲存完成</span>
      </h1>
      
      <div className="flex items-center gap-3">
        <button
          onClick={triggerBossAlert}
          className="bg-red-700 text-white hover:bg-red-800 p-2 rounded-lg flex items-center gap-1 text-sm"
        >
          <AlertTriangle size={16} />
          <span className="hidden sm:inline">老闆警示 (Ctrl+Shift+B)</span>
        </button>
        
        <select
          value={currentTheme}
          onChange={(e) => handleThemeChange(e.target.value as any)}
          className="bg-[#1a5c38] text-white border border-[#17533a] p-2 rounded-lg text-sm"
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

const ExcelMessages: React.FC<MessagesProps> = ({ messages, messagesEndRef, formatTime }) => {
  // Each message takes 1-4 rows depending on content length
  let currentRow = 5; // Start after header and some empty rows
  
  return (
    <ScrollArea className="flex-1 p-6">
      <AnimatedElement animation="fade-in">
        <div className="max-w-full mx-auto border border-green-200 bg-white">
          <Table>
            <TableBody>
              {/* Excel Header Row - Columns */}
              <TableRow className="border-b border-green-200 bg-green-100">
                <TableCell className="p-0 w-10 border-r border-green-200"></TableCell>
                {excelColumns.map((col) => (
                  <TableCell key={col} className="font-medium text-center p-0 w-20 text-sm border-r border-green-200">
                    {col}
                  </TableCell>
                ))}
              </TableRow>
              
              {/* Empty rows for spacing */}
              {[1, 2, 3, 4].map((i) => renderExcelRow(i))}
              
              {/* Messages as Excel data */}
              {messages.map((message, index) => {
                const startRow = currentRow;
                const messageHeight = Math.max(1, Math.ceil(message.content.length / 30)); // Estimate rows needed
                currentRow += messageHeight + 1; // +1 for spacing
                
                return (
                  <TableRow 
                    key={message.id} 
                    className={cn(
                      "border-b border-green-200",
                      message.isSystem ? "bg-yellow-50" : message.sender === "You" ? "bg-blue-50" : ""
                    )}
                  >
                    <TableCell className="font-medium text-center p-0 w-10 text-sm bg-green-100 border-r border-green-200">
                      {startRow}
                    </TableCell>
                    <TableCell className="p-1 border-r border-green-200 text-xs">
                      {message.sender}
                    </TableCell>
                    <TableCell 
                      colSpan={8} 
                      className={cn(
                        "p-1 border-r border-green-200 text-sm",
                        message.isSystem && message.content.includes('老闆') ? "font-bold text-red-600" : ""
                      )}
                    >
                      {message.content}
                    </TableCell>
                    <TableCell className="p-1 border-r border-green-200 text-xs text-gray-500">
                      {formatTime(message.timestamp)}
                    </TableCell>
                  </TableRow>
                );
              })}
              
              {/* Add some empty rows after messages */}
              {[...Array(5)].map((_, i) => renderExcelRow(currentRow + i))}
              
              <div ref={messagesEndRef} />
            </TableBody>
          </Table>
        </div>
      </AnimatedElement>
    </ScrollArea>
  );
};

const ExcelInput: React.FC<InputProps> = ({ newMessage, setNewMessage, sendMessage, handleKeyPress }) => {
  return (
    <div className="py-4 px-6 border-t bg-[#f1f1f1] border-gray-300">
      <div className="max-w-3xl mx-auto flex gap-2">
        <div className="flex-1 flex gap-2 items-center">
          <div className="w-24 text-xs font-medium text-gray-700">公式輸入:</div>
          <input
            type="text"
            value={`=CHAT("${newMessage}")`}
            readOnly
            className="flex-1 p-2 rounded border border-gray-300 bg-gray-50 text-xs text-gray-600"
          />
        </div>
        <div className="flex gap-2">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="輸入訊息..."
            className="p-2 rounded border border-gray-300 flex-1 min-w-[200px]"
          />
          <button
            onClick={sendMessage}
            className="p-2 rounded bg-[#217346] text-white hover:bg-[#1a5c38] flex items-center"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

const ExcelTheme: ThemePlugin = {
  id: 'excel',
  name: 'Excel 模式',
  icon: <TableProperties size={18} />,
  headerComponent: ExcelHeader,
  messagesComponent: ExcelMessages,
  inputComponent: ExcelInput,
  wrapperClassName: (isBossAlert) => "h-[calc(100vh-36px)] flex flex-col bg-[#f5f5f5] transition-colors duration-300",
  additionalComponents: [
    ExcelRibbon,
    ExcelFormulaBar,
    ExcelToolbar,
    ExcelStatusBar,
    ExcelWorksheetTabs
  ]
};

export default ExcelTheme;
