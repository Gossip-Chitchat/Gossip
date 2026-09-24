import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { JoinRoomForm } from './JoinRoomForm';

describe('JoinRoomForm', () => {
  it('disables the join button until a link is entered', () => {
    render(<JoinRoomForm joinLink="" setJoinLink={vi.fn()} joinRoom={vi.fn()} />);

    expect(screen.getByRole('button', { name: '加入聊天室' })).toBeDisabled();
  });

  it('forwards typed input and joins on click', () => {
    const setJoinLink = vi.fn();
    const joinRoom = vi.fn();
    render(<JoinRoomForm joinLink="room-1" setJoinLink={setJoinLink} joinRoom={joinRoom} />);

    fireEvent.change(screen.getByPlaceholderText('輸入聊天室連結...'), {
      target: { value: 'room-2' },
    });
    fireEvent.click(screen.getByRole('button', { name: '加入聊天室' }));

    expect(setJoinLink).toHaveBeenCalledWith('room-2');
    expect(joinRoom).toHaveBeenCalledOnce();
  });
});
