
import React from 'react';
import { ThemeType } from '@/types/theme-plugins';

interface ExcelComponentsProps {
  currentTheme: ThemeType;
  activeTheme: any;
  newMessage: string;
}

const ExcelComponents = ({ currentTheme, activeTheme, newMessage }: ExcelComponentsProps) => {
  if (currentTheme !== 'excel') return null;
  
  return (
    <>
      {activeTheme.additionalComponents?.[0] && (
        React.createElement(activeTheme.additionalComponents[0])
      )}
      {activeTheme.additionalComponents?.[1] && (
        React.createElement(activeTheme.additionalComponents[1], { newMessage })
      )}
      {activeTheme.additionalComponents?.[2] && (
        React.createElement(activeTheme.additionalComponents[2])
      )}
    </>
  );
};

export default ExcelComponents;
