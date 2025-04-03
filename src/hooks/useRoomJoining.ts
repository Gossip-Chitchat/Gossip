import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useRoomJoining() {
    const navigate = useNavigate();
    const [joinLink, setJoinLink] = useState('');

    const joinRoom = () => {
        // In a real app, validate the link first
        navigate('/chat', { state: { roomLink: joinLink } });
    };

    return {
        joinLink,
        setJoinLink,
        joinRoom
    };
} 
