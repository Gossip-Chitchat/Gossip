import { LogIn } from 'lucide-react';

interface JoinRoomFormProps {
  joinLink: string;
  setJoinLink: (value: string) => void;
  joinRoom: () => void;
}

export function JoinRoomForm({ joinLink, setJoinLink, joinRoom }: JoinRoomFormProps) {
  return (
    <div className="space-y-4">
      <input
        type="text"
        value={joinLink}
        onChange={(e) => setJoinLink(e.target.value)}
        placeholder="輸入聊天室連結..."
        className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/20 text-gray-800 dark:text-gray-200 dark:bg-gray-800 dark:border-gray-700"
      />
      <button
        onClick={joinRoom}
        disabled={!joinLink}
        className="w-full py-3 px-4 rounded-lg bg-black text-white font-medium hover:bg-black/90 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
      >
        <LogIn size={18} />
        <span>加入聊天室</span>
      </button>
    </div>
  );
} 
