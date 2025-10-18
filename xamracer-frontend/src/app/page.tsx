"use client";
import Track from "@/components/Track";
import QuestionBox from "@/components/QuestionBox";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50">
      <Track />
      <QuestionBox />
    </main>
  );
}
