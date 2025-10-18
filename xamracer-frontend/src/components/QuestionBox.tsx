"use client";
import { useGameStore } from "@/store/gameStore";

export default function QuestionBox() {
  const { moveCar } = useGameStore();

  const question = {
    text: "What is the capital of Japan?",
    options: ["Seoul", "Tokyo", "Beijing", "Bangkok"],
  };

  return (
    <div className="mt-8 text-center">
      <h2 className="text-xl font-bold mb-4">{question.text}</h2>
      <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
        {question.options.map((option, index) => (
          <button
            key={index}
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            onClick={() => moveCar()}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
