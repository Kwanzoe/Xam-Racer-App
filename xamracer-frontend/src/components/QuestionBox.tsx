"use client";
import { useState } from "react";
import { useGameStore } from "@/store/gameStore";

export default function QuestionBox() {
  const { moveCar, reset } = useGameStore();

  const questions = [
    { text: "What is the capital of Japan?", answer: "Tokyo", options: ["Seoul", "Tokyo", "Beijing", "Bangkok"] },
    { text: "What color is the sky?", answer: "Blue", options: ["Blue", "Green", "Red", "Purple"] },
    { text: "2 + 2 = ?", answer: "4", options: ["3", "4", "5", "6"] },
    { text: "Which is a fruit?", answer: "Apple", options: ["Carrot", "Cucumber", "Apple", "Onion"] },
    { text: "Which is a mammal?", answer: "Whale", options: ["Shark", "Whale", "Octopus", "Crab"] },
    { text: "Which is a planet?", answer: "Mars", options: ["Moon", "Sun", "Mars", "Venus"] },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleAnswer = (option: string) => {
    const current = questions[currentQuestionIndex];
    if (option === current.answer) {
      moveCar();
      if (currentQuestionIndex < questions.length - 1)
        setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="mt-12 text-center">
      <h2 className="text-2xl font-bold mb-6">
        {questions[currentQuestionIndex].text}
      </h2>
      <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
        {questions[currentQuestionIndex].options.map((option, i) => (
          <button
            key={i}
            className="bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition"
            onClick={() => handleAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <button
        onClick={reset}
        className="mt-6 text-sm text-gray-500 hover:text-gray-700"
      >
        Reset Game
      </button>
    </div>
  );
}
