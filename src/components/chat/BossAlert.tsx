
import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface BossAlertProps {
  bossAlert: boolean;
}

const BossAlert = ({ bossAlert }: BossAlertProps) => {
  if (!bossAlert) return null;
  
  return (
    <div className="fixed inset-0 bg-red-500/80 flex items-center justify-center z-50 animate-pulse">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <AlertTriangle size={48} className="mx-auto mb-4 text-red-500" />
        <h2 className="text-2xl font-bold text-red-600">老闆來了！</h2>
        <p className="text-gray-600 mt-2">已自動切換至 Excel 模式</p>
      </div>
    </div>
  );
};

export default BossAlert;
