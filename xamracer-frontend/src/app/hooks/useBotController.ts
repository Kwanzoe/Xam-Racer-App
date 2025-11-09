'use client';
import { useEffect } from 'react';
import { useGameStore } from '@/app/store/gameStore';

export function useBotController() {
  const players = useGameStore((s) => s.players);
  const moveBot = useGameStore((s) => s.moveBot);

  useEffect(() => {
    const bots = players.filter((p) => p.isBot);
    const intervals: NodeJS.Timeout[] = [];

    bots.forEach((b) => {
      const interval = setInterval(() => {
        moveBot(b.id);
      }, Math.random() * 2000 + 1000); // random delay 1–3 s
      intervals.push(interval);
    });

    return () => {
      intervals.forEach(clearInterval);
    };
  }, [players, moveBot]);
}
