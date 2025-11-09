'use client';
import { useEffect } from 'react';
import { useGameStore } from '@/app/store/gameStore';

export default function Countdown() {
  const n = useGameStore((s) => s.countdown);
  const gameState = useGameStore((s) => s.gameState);
  const setCountdown = useGameStore((s) => s.setCountdown);
  const setGameState = useGameStore((s) => s.setGameState);

  useEffect(() => {
    if (gameState !== 'countdown') return;
    if (n <= 0) {
      setGameState('running');
      return;
    }
    const id = window.setTimeout(() => setCountdown(n - 1), 1000);
    return () => clearTimeout(id);
  }, [n, gameState, setCountdown, setGameState]);

  if (gameState !== 'countdown') return null;

  return (
    <div className="text-5xl font-extrabold tracking-tight text-center">
      Race starts in {n}…
    </div>
  );
}
