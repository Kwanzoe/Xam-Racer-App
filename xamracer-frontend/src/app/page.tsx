import Track from "@/components/Track";
import QuestionBox from "@/components/QuestionBox";

export default function GamePage() {
  return (
    <div className="flex flex-col items-center">
      <Track />
      <QuestionBox />
    </div>
  );
}
