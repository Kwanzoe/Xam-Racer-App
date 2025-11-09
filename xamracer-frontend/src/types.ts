// src/types.ts
export interface Player {
  id: string;
  name: string;
  lane: number;      // 0..3
  position: number;  // 0..5
  isBot?: boolean;
}

export type GameState = 'waiting' | 'countdown' | 'running' | 'finished';
