"use client";
import { useGameStore } from "@/store/gameStore";
import { motion } from "framer-motion";

export default function Track() {
  const { position } = useGameStore();

  const totalBlocks = 6;
  const lanes = 4;

  return (
    <div className="flex flex-col items-center gap-4">
      {Array.from({ length: lanes }).map((_, laneIndex) => (
        <div
          key={laneIndex}
          className="relative flex gap-2 bg-gray-200 rounded-xl p-2"
        >
          {Array.from({ length: totalBlocks }).map((_, blockIndex) => (
            <div
              key={blockIndex}
              className="w-16 h-16 bg-white border-2 border-gray-400 rounded-md"
            ></div>
          ))}

          {/* Car on first lane */}
          {laneIndex === 0 && (
            <motion.div
              className="absolute top-2 left-2 w-12 h-12 bg-red-500 rounded-md"
              animate={{
                x: position * 72, // distance per block (roughly 64px block + 8px gap)
              }}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
