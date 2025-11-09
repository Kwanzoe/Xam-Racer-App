'use client';
import Navbar from '@/app/components/Navbar';
import LeaderboardList from '@/app/components/LeaderboardList';

const MOCK = [
  { id: 'u1', name: 'You', wins: 12, avgTimeSec: 18.4, rating: 1210 },
  { id: 'u2', name: 'Quiztron', wins: 9, avgTimeSec: 20.2, rating: 1188 },
  { id: 'u3', name: 'ByteBeast', wins: 8, avgTimeSec: 21.0, rating: 1165 },
  { id: 'u4', name: 'MC Mark', wins: 7, avgTimeSec: 22.7, rating: 1142 },
];

export default function LeaderboardPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
        <LeaderboardList items={MOCK} />
      </section>
    </main>
  );
}
