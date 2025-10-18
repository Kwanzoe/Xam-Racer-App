"use client";
import { create } from "zustand";

interface GameState {
  position: number;
  moveCar: () => void;
  reset: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  position: 0, // start at block 0
  moveCar: () => set((state) => ({ position: Math.min(state.position + 1, 5) })), // move up to 6 blocks
  reset: () => set({ position: 0 }),
}));