
import { ThemePlugin, ThemeType } from '@/types/theme-plugins';
import DefaultTheme from './themes/DefaultTheme';
import ExcelTheme from './themes/ExcelTheme';
import CodeTheme from './themes/CodeTheme';
import MailTheme from './themes/MailTheme';
import TerminalTheme from './themes/TerminalTheme';
import { useEffect, useState } from 'react';

// 內建主題
const builtInThemes: ThemePlugin[] = [
  DefaultTheme,
  ExcelTheme,
  CodeTheme,
  MailTheme,
  TerminalTheme
];

export function useThemeManager() {
  const [availableThemes, setAvailableThemes] = useState<ThemePlugin[]>(builtInThemes);
  
  // 這裡可以實現從 GitHub 或其他來源動態加載主題
  const loadThemeFromUrl = async (url: string) => {
    try {
      // 實際實現中，這裡需要使用適當的方法安全地加載和評估外部代碼
      // 為了演示目的，這裡簡化處理
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('無法加載主題插件');
      }
      
      // 在實際應用中，這裡需要更多的安全檢查和驗證
      console.log(`已嘗試從 ${url} 加載主題，但這只是一個演示。`);
      
      return null;
    } catch (error) {
      console.error('加載主題失敗:', error);
      return null;
    }
  };
  
  // 獲取指定ID的主題
  const getTheme = (themeId: ThemeType): ThemePlugin => {
    return availableThemes.find(theme => theme.id === themeId) || DefaultTheme;
  };
  
  // 註冊新主題
  const registerTheme = (theme: ThemePlugin) => {
    setAvailableThemes(prev => {
      // 檢查是否已存在同ID主題
      const existingIndex = prev.findIndex(t => t.id === theme.id);
      if (existingIndex >= 0) {
        // 替換現有主題
        const newThemes = [...prev];
        newThemes[existingIndex] = theme;
        return newThemes;
      }
      // 添加新主題
      return [...prev, theme];
    });
  };
  
  return {
    availableThemes,
    getTheme,
    registerTheme,
    loadThemeFromUrl
  };
}
