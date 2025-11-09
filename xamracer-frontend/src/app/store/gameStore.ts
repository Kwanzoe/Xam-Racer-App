import { create } from 'zustand';
import { Player } from '@/types';

interface Store {
  me: Player | null;
  players: Player[];
  position: number;
  totalBlocks: number;
  gameState: 'waiting' | 'countdown' | 'running' | 'finished';
  winnerId?: string | null;
  countdown: number;

  setPlayers: (players: Player[]) => void;
  setMe: (me: Player | null) => void;
  setGameState: (state: Store['gameState']) => void;
  setCountdown: (n: number) => void;
  moveMe: () => void;
  moveBot: (botId: string) => void;
  checkFinish: () => void;
  reset: () => void;
}

export const useGameStore = create<Store>((set, get) => ({
  me: null,
  players: [],
  position: 0,
  totalBlocks: 6,
  gameState: 'waiting',
  winnerId: null,
  countdown: 10,

  setPlayers(players) {
    set({ players });
  },

  setMe(me) {
    set({ me, position: me?.position ?? 0 });
  },

  setGameState(state) {
    set({ gameState: state });
  },

  setCountdown(n) {
    set({ countdown: n });
  },

  moveMe() {
    set((state) => {
      if (!state.me || state.gameState !== 'running') return state;
      const limit = state.totalBlocks - 1;
      const newPos = Math.min(state.me.position + 1, limit);
      const newPlayers = state.players.map((p) =>
        p.id === state.me!.id ? { ...p, position: newPos } : p
      );
      return { players: newPlayers, me: { ...state.me, position: newPos }, position: newPos };
    });
    get().checkFinish();
  },

  moveBot(botId) {
    set((state) => {
      if (state.gameState !== 'running') return state;
      const limit = state.totalBlocks - 1;
      const newPlayers = state.players.map((p) =>
        p.id === botId ? { ...p, position: Math.min(p.position + 1, limit) } : p
      );
      return { players: newPlayers };
    });
    get().checkFinish();
  },

  checkFinish() {
    const { players, totalBlocks, winnerId, gameState } = get();
    if (gameState === 'finished') return;
    const finisher = players.find((p) => p.position >= totalBlocks - 1);
    if (finisher && !winnerId) {
      set({ winnerId: finisher.id, gameState: 'finished' });
    }
  },

  reset() {
    set({
      players: [],
      me: null,
      position: 0,
      gameState: 'waiting',
      winnerId: null,
      countdown: 10,
      totalBlocks: 6,
    });
  },
}));