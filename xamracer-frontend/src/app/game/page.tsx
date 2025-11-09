'use client';
import { useEffect } from 'react';
import Navbar from '@/app/components/Navbar';
import Track from '@/app/components/Track';
import QuestionBox from '@/app/components/QuestionBox';
import WinnerPopup from '@/app/components/WinnerPopup';
import { useGameStore } from '@/app/store/gameStore';

export default function GamePage() {
  const setPlayers = useGameStore((s) => s.setPlayers);
  const setMe = useGameStore((s) => s.setMe);
  const setGameState = useGameStore((s) => s.setGameState);
  const { players, totalBlocks } = useGameStore();

  useEffect(() => {
    const mockPlayers = [
      { id: 'you-1', name: 'You', lane: 0, position: 0, isBot: false },
      { id: 'bot-a', name: 'Quiztron', lane: 1, position: 0, isBot: true },
      { id: 'bot-b', name: 'ByteBeast', lane: 2, position: 0, isBot: true },
      { id: 'bot-c', name: 'MC Mark', lane: 3, position: 0, isBot: true },
    ];
    setPlayers(mockPlayers);
    setMe(mockPlayers[0]);
    setGameState('countdown'); // 👈 show "Get ready…"

    const t = setTimeout(() => setGameState('running'), 3000); // 👈 3s later start
    return () => clearTimeout(t);
  }, [setPlayers, setMe, setGameState]);

  const winner = players.find((p) => p.position >= totalBlocks - 1);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-4xl mx-auto py-12 px-4 flex flex-col items-center gap-8">
        <Track />
        <QuestionBox />
        {winner && (
          <WinnerPopup
            name={winner.name}
            onPlayAgain={() => window.location.reload()}
            onExit={() => (window.location.href = '/')}
          />
        )}
      </div>
    </main>
  );
}
