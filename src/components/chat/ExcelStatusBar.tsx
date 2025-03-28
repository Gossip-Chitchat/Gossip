
import React from 'react';
import { ThemeType } from '@/types/theme-plugins';

interface ExcelStatusBarProps {
  currentTheme: ThemeType;
  activeTheme: any;
}

const ExcelStatusBar = ({ currentTheme, activeTheme }: ExcelStatusBarProps) => {
  if (currentTheme !== 'excel' || !activeTheme.additionalComponents?.[3]) return null;
  
  return React.createElement(activeTheme.additionalComponents[3]);
};

export default ExcelStatusBar;
