import { create } from "zustand";

interface GameState {
  position: number;
  botPositions: number[];
  totalBlocks: number;
  moveCar: () => void;
  moveBot: (botIndex: number) => void;
  reset: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  position: 0,
  botPositions: [0, 0, 0], // 3 bots
  totalBlocks: 6,

  moveCar: () =>
    set((state) => ({
      position: Math.min(state.position + 1, state.totalBlocks - 1),
    })),

  moveBot: (botIndex) =>
    set((state) => {
      const newPositions = [...state.botPositions];
      newPositions[botIndex] = Math.min(
        newPositions[botIndex] + 1,
        state.totalBlocks - 1
      );
      return { botPositions: newPositions };
    }),

  reset: () =>
    set({
      position: 0,
      botPositions: [0, 0, 0],
    }),
}));
