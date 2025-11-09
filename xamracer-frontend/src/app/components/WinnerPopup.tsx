'use client';
import { motion } from 'framer-motion';

interface Props {
  name: string;
  onPlayAgain: () => void;
  onExit: () => void;
}

export default function WinnerPopup({ name, onPlayAgain, onExit }: Props) {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white rounded-2xl p-8 text-center shadow-xl max-w-sm w-full"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
      >
        <h2 className="text-3xl font-bold text-blue-700 mb-4">🏆 Winner!</h2>
        <p className="text-lg font-medium mb-6">{name} finished first!</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onPlayAgain}
            className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Play Again
          </button>
          <button
            onClick={onExit}
            className="px-4 py-2 rounded bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400 transition"
          >
            Exit
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
