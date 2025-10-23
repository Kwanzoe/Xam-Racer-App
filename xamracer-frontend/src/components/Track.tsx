  "use client";
  import { useGameStore } from "@/store/gameStore";
  import { motion } from "framer-motion";
  import { PersonStanding } from "lucide-react";
  import { useBotController } from "@/hooks/useBotController";

  export default function Track() {
    const { position, botPositions } = useGameStore();
    const totalBlocks = 6;

    useBotController(); // start bot movement

    return (
      <div className="flex flex-col items-center justify-center gap-4 mt-6">
        {[position, ...botPositions].map((pos, laneIndex) => (
          <div
            key={laneIndex}
            className="relative flex gap-2 bg-gray-200 rounded-xl p-2"
          >
            {Array.from({ length: totalBlocks }).map((_, blockIndex) => (
              <div
                key={blockIndex}
                className="w-16 h-16 bg-white border-2 border-gray-400 rounded-md"
              />
            ))}

          <motion.div
            className="absolute left-4 top-2 h-16 flex items-center justify-center"
            animate={{ x: pos * 72 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
          >
            <PersonStanding
              size={36}
              className={laneIndex === 0 ? "text-blue-600" : "text-red-500"}
            />
         </motion.div>

          </div>
        ))}
      </div>
    );
  }
