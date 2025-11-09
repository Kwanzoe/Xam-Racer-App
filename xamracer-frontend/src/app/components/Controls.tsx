    'use client';
import { useGameStore } from '@/app/store/gameStore';

export default function Controls() {
  const moveMe = useGameStore((s) => s.moveMe);
  const reset = useGameStore((s) => s.reset);
  const players = useGameStore((s) => s.players);
  const me = useGameStore((s) => s.me);

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={moveMe}
        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Test Move Me
      </button>
      <button
        onClick={reset}
        className="rounded-md bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200"
      >
        Reset
      </button>
      <span className="text-xs text-gray-500">
        {me ? `${me.name}: pos ${me.position}` : 'No player joined'} • {players.length} players
      </span>
    </div>
  );
}
