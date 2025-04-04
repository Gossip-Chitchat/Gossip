export function PrivacyInfoCard() {
  return (
    <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
      <h3 className="text-lg font-display font-bold mb-2">關於隱私與安全</h3>
      <p className="text-gray-600">
        Gossip 聊天工具不會儲存任何對話紀錄，所有訊息僅存在記憶體中。
        一旦關閉應用程式，所有訊息將永久消失，確保您的隱私安全。
      </p>
    </div>
  );
} 
