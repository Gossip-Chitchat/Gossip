import { act, renderHook } from '@testing-library/react';
import { clearMocks, mockIPC } from '@tauri-apps/api/mocks';
import { toast } from 'sonner';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useRoomCreation } from './useRoomCreation';

vi.mock('sonner', () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

afterEach(() => {
  clearMocks();
  vi.clearAllMocks();
});

describe('useRoomCreation', () => {
  it('invokes create_chatroom and shows the new room id', async () => {
    const commands: string[] = [];
    mockIPC((cmd) => {
      commands.push(cmd);
      if (cmd === 'create_chatroom') {
        return { id: '0192f0c1-7b3a-7cde-8f00-000000000001', is_owner: true };
      }
    });
    const { result } = renderHook(() => useRoomCreation());

    await act(() => result.current.handleCreateRoom());

    expect(commands).toEqual(['create_chatroom']);
    expect(result.current.roomLink).toBe('0192f0c1-7b3a-7cde-8f00-000000000001');
    expect(toast.success).toHaveBeenCalledOnce();
  });

  it('keeps the link empty and reports the error when the command fails', async () => {
    mockIPC(() => {
      throw new Error('Chatroom already exists');
    });
    const { result } = renderHook(() => useRoomCreation());

    await act(() => result.current.handleCreateRoom());

    expect(result.current.roomLink).toBe('');
    expect(toast.error).toHaveBeenCalledWith(expect.stringContaining('Chatroom already exists'));
  });
});
