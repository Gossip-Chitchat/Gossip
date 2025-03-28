
import React from 'react';
import { cn } from '@/lib/utils';
import { ThemeType } from '@/types/theme-plugins';

interface UsersSidebarProps {
  users: { id: string; name: string }[];
  currentTheme: ThemeType;
  activeTheme: any;
}

const UsersSidebar = ({ users, currentTheme, activeTheme }: UsersSidebarProps) => {
  return (
    <div className={cn(
      "w-64 p-4 hidden md:block border-l",
      {
        'bg-white border-gray-100': currentTheme === 'default',
        'bg-[#f1f1f1] border-gray-300 p-0': currentTheme === 'excel',
        'bg-gray-800 border-gray-700': currentTheme === 'code',
        'bg-blue-50 border-blue-100': currentTheme === 'mail',
        'bg-black border-green-500/30': currentTheme === 'terminal'
      }
    )}>
      {currentTheme === 'excel' && activeTheme.additionalComponents?.[4] ? (
        React.createElement(activeTheme.additionalComponents[4])
      ) : (
        <>
          <h2 className={cn(
            "text-lg font-display font-bold mb-4",
            {
              'text-gray-800': currentTheme === 'default' || currentTheme === 'mail',
              'text-white': currentTheme === 'code',
              'text-green-400': currentTheme === 'terminal'
            }
          )}>
            線上用戶 ({users.length})
          </h2>
          
          <ul className="space-y-2">
            {users.map(user => (
              <li 
                key={user.id}
                className={cn(
                  "py-2 px-3 rounded-lg flex items-center gap-2",
                  {
                    'bg-gray-100': currentTheme === 'default',
                    'bg-green-100/50': currentTheme === 'excel',
                    'bg-gray-700': currentTheme === 'code',
                    'bg-blue-100/50': currentTheme === 'mail',
                    'border border-green-500/30': currentTheme === 'terminal'
                  }
                )}
              >
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  {
                    'bg-green-500': currentTheme !== 'terminal',
                    'bg-green-400': currentTheme === 'terminal'
                  }
                )}></div>
                <span>{user.name}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default UsersSidebar;
