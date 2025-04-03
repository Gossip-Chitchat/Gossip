import { useState } from 'react';
import { Check, Copy, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RoomLinkDisplayProps {
  roomLink: string;
}

export function RoomLinkDisplay({ roomLink }: RoomLinkDisplayProps) {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(roomLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between">
        <div className="truncate mr-2">{roomLink}</div>
        <button 
          onClick={copyToClipboard}
          className="flex-shrink-0 p-2 rounded-lg hover:bg-gray-200 transition-colors"
        >
          {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
        </button>
      </div>
      <button
        onClick={() => navigate('/app/chat', { state: { isHost: true, roomLink } })}
        className="w-full py-3 px-4 rounded-lg bg-black text-white font-medium hover:bg-black/90 transition-all flex items-center justify-center gap-2"
      >
        <LogIn size={18} />
        <span>進入聊天室</span>
      </button>
    </div>
  );
} 
