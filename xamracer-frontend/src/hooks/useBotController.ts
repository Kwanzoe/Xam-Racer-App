"use client";
import { useEffect } from "react";
import { useGameStore } from "@/store/gameStore";

export function useBotController() {
  const { moveBot, totalBlocks, botPositions } = useGameStore();

  useEffect(() => {
    const intervals = botPositions.map((_, index) => {
      const interval = setInterval(() => {
        moveBot(index);
      }, Math.random() * (60000 - 30000) + 30000); // random 30-60s
      return interval;
    });

    return () => intervals.forEach(clearInterval);
  }, [botPositions.length, totalBlocks, moveBot]);
}