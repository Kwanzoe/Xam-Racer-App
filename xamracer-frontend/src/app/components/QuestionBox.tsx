'use client';

import { useState } from 'react';
import { useGameStore } from '@/app/store/gameStore';

type Question = {
  text: string;
  answer: string;
  options: string[];
};

const QUESTIONS: Question[] = [
  { text: 'What is the capital of Japan?', answer: 'Tokyo', options: ['Seoul', 'Tokyo', 'Beijing', 'Bangkok'] },
  { text: 'What color is the sky?', answer: 'Blue', options: ['Blue', 'Green', 'Red', 'Purple'] },
  { text: '2 + 2 = ?', answer: '4', options: ['3', '4', '5', '6'] },
  { text: 'Which is a fruit?', answer: 'Apple', options: ['Carrot', 'Cucumber', 'Apple', 'Onion'] },
  { text: 'Which is a mammal?', answer: 'Whale', options: ['Shark', 'Whale', 'Octopus', 'Crab'] },
  { text: 'Which is a planet?', answer: 'Mars', options: ['Moon', 'Sun', 'Mars', 'Venus'] },
];

export default function QuestionBox() {
  const { moveMe } = useGameStore();
  const [idx, setIdx] = useState(0);
  const gameState = useGameStore((s) => s.gameState);
  const handle = (opt: string) => {
    if (QUESTIONS[idx].answer === opt) {
      moveMe();
      if (idx < QUESTIONS.length - 1) {
        setIdx((s) => s + 1);
      }
    } else {
      // On wrong answer - redirect to home and clear session points
      window.location.href = '/';
    }
  };

  return (
    <div
      className="opacity-100 transition-opacity"
      style={{ opacity: gameState === 'running' ? 1 : 0.5 }}
    >
      <h2 className="text-2xl font-semibold text-center mb-4">
        {gameState === 'running' ? QUESTIONS[idx].text : 'Get ready…'}
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {QUESTIONS[idx].options.map((o) => (
          <button
            key={o}
            disabled={gameState !== 'running'}  // ⬅️ added this
            onClick={() => handle(o)}            // your existing click handler
            className="py-3 rounded bg-blue-600 text-white disabled:opacity-50"
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
