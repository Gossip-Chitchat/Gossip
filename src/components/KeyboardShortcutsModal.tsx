
import React from 'react';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const ShortcutItem = ({ keys, description }: { keys: string[]; description: string }) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
    <span className="text-sm text-gray-700">{description}</span>
    <div className="flex gap-1">
      {keys.map((key, index) => (
        <React.Fragment key={index}>
          <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-md shadow-sm">
            {key}
          </kbd>
          {index < keys.length - 1 && <span className="text-gray-500 mx-0.5">+</span>}
        </React.Fragment>
      ))}
    </div>
  </div>
);

const KeyboardShortcutsModal = () => {
  const shortcuts = [
    {
      keys: ['Ctrl', 'Shift', 'V'],
      description: '切換側邊欄狀態（展開/精簡/隱藏）'
    },
    {
      keys: ['Ctrl', 'Shift', 'B'],
      description: '老闆警示（緊急隱藏）'
    }
    // Add more shortcuts here as they are implemented
  ];

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>鍵盤快捷鍵</DialogTitle>
        <DialogDescription>
          使用以下快捷鍵可以更快速地操作應用程式
        </DialogDescription>
      </DialogHeader>
      <div className="mt-4">
        <div className="space-y-1">
          {shortcuts.map((shortcut, index) => (
            <ShortcutItem
              key={index}
              keys={shortcut.keys}
              description={shortcut.description}
            />
          ))}
        </div>
      </div>
    </DialogContent>
  );
};

export default KeyboardShortcutsModal;
