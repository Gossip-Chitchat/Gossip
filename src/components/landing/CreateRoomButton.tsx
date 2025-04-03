import { PlusCircle } from 'lucide-react';

interface CreateRoomButtonProps {
  onClick: () => void;
}

export function CreateRoomButton({ onClick }: CreateRoomButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full py-3 px-4 rounded-lg bg-black text-white font-medium hover:bg-black/90 transition-all flex items-center justify-center gap-2"
    >
      <PlusCircle size={18} />
      <span>建立聊天室</span>
    </button>
  );
} 
