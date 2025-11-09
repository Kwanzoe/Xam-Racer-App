'use client';
import { motion } from 'framer-motion';
import { useGameStore } from '@/app/store/gameStore';

export default function Track() {
  const players = useGameStore((s) => s.players);
  const totalBlocks = useGameStore((s) => s.totalBlocks);

  return (
    <div className="w-full max-w-3xl space-y-4">
      {players.map((p) => (
        <div key={p.id} className="relative bg-gray-200 rounded-full h-4 overflow-hidden">
          <motion.div
            className={`absolute top-0 left-0 h-4 rounded-full ${
              p.isBot ? 'bg-red-500' : 'bg-blue-600'
            }`}
            animate={{ width: `${((p.position + 1) / totalBlocks) * 100}%` }}
            transition={{ type: 'spring', stiffness: 80 }}
          />
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-white font-medium">
            {p.name}
          </span>
        </div>
      ))}
    </div>
  );
}
